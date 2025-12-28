import crypto from "crypto";
import fs from "fs";
import path from "path";

// Queue configuration
const QUEUE_CONFIG = {
  enabled: process.env.EMAIL_QUEUE_ENABLED !== "false",
  workerIntervalMs: parseInt(
    process.env.EMAIL_QUEUE_WORKER_INTERVAL_MS || "5000",
    10
  ),
  maxRetries: parseInt(process.env.EMAIL_QUEUE_MAX_RETRIES || "3", 10),
  retentionDays: 7,
  cleanupIntervalMs: 24 * 60 * 60 * 1000, // 24 hours
};

// Email job priority
export type EmailPriority = "high" | "normal" | "low";

// Email job status
export type EmailJobStatus = "pending" | "processing" | "completed" | "failed";

// Email job interface
export interface EmailJob {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // Email details
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, unknown>;

  // Processing state
  status: EmailJobStatus;
  attempts: number;
  maxAttempts: number;
  nextRetryAt?: Date;
  lastError?: string;

  // Metadata
  priority: EmailPriority;
  tags?: string[];
}

// Queue statistics
export interface QueueStats {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  total: number;
}

class EmailQueueService {
  private queueDir: string;
  private isProcessing: boolean = false;
  private processingInterval: NodeJS.Timeout | null = null;
  private cleanupInterval: NodeJS.Timeout | null = null;
  private sendEmailFn: ((job: EmailJob) => Promise<void>) | null = null;

  constructor() {
    this.queueDir = path.join(process.cwd(), "data", "email-queue");
    this.ensureDirectories();
  }

  /**
   * Ensure queue directories exist
   */
  private ensureDirectories(): void {
    const dirs = ["pending", "processing", "completed", "failed"];
    for (const dir of dirs) {
      const dirPath = path.join(this.queueDir, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    }
  }

  /**
   * Set the email sending function
   */
  setSendEmailFunction(fn: (job: EmailJob) => Promise<void>): void {
    this.sendEmailFn = fn;
  }

  /**
   * Generate a unique job ID
   */
  private generateJobId(): string {
    return `${Date.now()}_${crypto.randomUUID()}`;
  }

  /**
   * Get file path for a job
   */
  private getJobPath(jobId: string, folder: string): string {
    return path.join(this.queueDir, folder, `${jobId}.json`);
  }

  /**
   * Read a job from file
   */
  private async readJob(
    jobId: string,
    folder: string
  ): Promise<EmailJob | null> {
    const filePath = this.getJobPath(jobId, folder);
    try {
      const content = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(content) as EmailJob;
    } catch {
      return null;
    }
  }

  /**
   * Write a job to file
   */
  private async writeJob(job: EmailJob, folder: string): Promise<void> {
    const filePath = this.getJobPath(job.id, folder);
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(job, null, 2),
      "utf-8"
    );
  }

  /**
   * Delete a job file
   */
  private async deleteJob(jobId: string, folder: string): Promise<void> {
    const filePath = this.getJobPath(jobId, folder);
    try {
      await fs.promises.unlink(filePath);
    } catch {
      // Ignore if file doesn't exist
    }
  }

  /**
   * Move a job between folders
   */
  private async moveJob(
    jobId: string,
    fromFolder: string,
    toFolder: string,
    updatedJob?: EmailJob
  ): Promise<void> {
    const job = updatedJob || (await this.readJob(jobId, fromFolder));
    if (!job) {
      return;
    }

    job.updatedAt = new Date();
    await this.writeJob(job, toFolder);
    await this.deleteJob(jobId, fromFolder);
  }

  /**
   * Add a job to the queue
   */
  async enqueue(
    jobData: Omit<
      EmailJob,
      "id" | "createdAt" | "updatedAt" | "status" | "attempts"
    >
  ): Promise<string> {
    const id = this.generateJobId();
    const job: EmailJob = {
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      to: jobData.to,
      subject: jobData.subject,
      templateName: jobData.templateName,
      templateData: jobData.templateData,
      status: "pending",
      attempts: 0,
      maxAttempts: jobData.maxAttempts || QUEUE_CONFIG.maxRetries,
      priority: jobData.priority || "normal",
      tags: jobData.tags,
    };

    await this.writeJob(job, "pending");
    return id;
  }

  /**
   * Get pending jobs sorted by priority and creation time
   */
  private async getPendingJobs(): Promise<EmailJob[]> {
    const pendingDir = path.join(this.queueDir, "pending");
    const files = await fs.promises.readdir(pendingDir);

    const jobs: EmailJob[] = [];
    for (const file of files) {
      if (!file.endsWith(".json")) {
        continue;
      }
      const jobId = file.replace(".json", "");
      const job = await this.readJob(jobId, "pending");
      if (job) {
        // Check if job is ready for retry
        if (job.nextRetryAt && new Date() < new Date(job.nextRetryAt)) {
          continue;
        }
        jobs.push(job);
      }
    }

    // Sort by priority (high first) and creation time
    const priorityOrder: Record<EmailPriority, number> = {
      high: 0,
      normal: 1,
      low: 2,
    };

    return jobs.sort((a, b) => {
      const priorityDiff =
        priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) {
        return priorityDiff;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }

  /**
   * Process a single job
   */
  private async processJob(job: EmailJob): Promise<void> {
    if (!this.sendEmailFn) {
      console.error("Email send function not configured");
      return;
    }

    // Move to processing
    job.status = "processing";
    await this.moveJob(job.id, "pending", "processing", job);

    try {
      // Send the email
      await this.sendEmailFn(job);

      // Success - move to completed
      job.status = "completed";
      job.updatedAt = new Date();
      await this.moveJob(job.id, "processing", "completed", job);

      console.log(`[EmailQueue] Job ${job.id} completed successfully`);
    } catch (error) {
      job.attempts += 1;
      job.lastError = error instanceof Error ? error.message : "Unknown error";
      job.updatedAt = new Date();

      if (job.attempts >= job.maxAttempts) {
        // Max retries exceeded - move to failed
        job.status = "failed";
        await this.moveJob(job.id, "processing", "failed", job);
        console.error(`[EmailQueue] Job ${job.id} failed permanently:`, error);
      } else {
        // Schedule retry with exponential backoff
        const backoffMs = this.calculateBackoff(job.attempts);
        job.nextRetryAt = new Date(Date.now() + backoffMs);
        job.status = "pending";
        await this.moveJob(job.id, "processing", "pending", job);
        console.warn(
          `[EmailQueue] Job ${job.id} will retry in ${backoffMs}ms (attempt ${job.attempts}/${job.maxAttempts})`
        );
      }
    }
  }

  /**
   * Calculate exponential backoff delay
   */
  private calculateBackoff(attempt: number): number {
    const baseMs = 1000;
    const maxBackoffMs = 5 * 60 * 1000; // 5 minutes max
    const backoff = baseMs * Math.pow(2, attempt);
    const jitter = Math.random() * 1000;
    return Math.min(backoff, maxBackoffMs) + jitter;
  }

  /**
   * Process the queue
   */
  async processQueue(): Promise<void> {
    if (this.isProcessing) {
      return;
    }
    if (!QUEUE_CONFIG.enabled) {
      return;
    }

    try {
      this.isProcessing = true;

      const pendingJobs = await this.getPendingJobs();
      for (const job of pendingJobs) {
        await this.processJob(job);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Start the queue worker
   */
  startWorker(): void {
    if (this.processingInterval) {
      return;
    }
    if (!QUEUE_CONFIG.enabled) {
      console.log("[EmailQueue] Queue is disabled");
      return;
    }

    console.log(
      `[EmailQueue] Starting worker (interval: ${QUEUE_CONFIG.workerIntervalMs}ms)`
    );

    // Initial processing
    this.processQueue();

    // Set up interval
    this.processingInterval = setInterval(() => {
      this.processQueue();
    }, QUEUE_CONFIG.workerIntervalMs);

    // Start cleanup job
    this.startCleanupJob();
  }

  /**
   * Stop the queue worker
   */
  stopWorker(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
      console.log("[EmailQueue] Worker stopped");
    }

    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Start the cleanup job
   */
  private startCleanupJob(): void {
    if (this.cleanupInterval) {
      return;
    }

    this.cleanupInterval = setInterval(async () => {
      await this.cleanup();
    }, QUEUE_CONFIG.cleanupIntervalMs);
  }

  /**
   * Clean up old completed and failed jobs
   */
  async cleanup(): Promise<{ completed: number; failed: number }> {
    const cutoff = new Date(
      Date.now() - QUEUE_CONFIG.retentionDays * 24 * 60 * 60 * 1000
    );
    let completed = 0;
    let failed = 0;

    for (const folder of ["completed", "failed"]) {
      const dir = path.join(this.queueDir, folder);
      const files = await fs.promises.readdir(dir);

      for (const file of files) {
        if (!file.endsWith(".json")) {
          continue;
        }

        const filePath = path.join(dir, file);
        const stat = await fs.promises.stat(filePath);

        if (stat.mtime < cutoff) {
          await fs.promises.unlink(filePath);
          if (folder === "completed") {
            completed++;
          } else {
            failed++;
          }
        }
      }
    }

    if (completed > 0 || failed > 0) {
      console.log(
        `[EmailQueue] Cleanup: removed ${completed} completed, ${failed} failed jobs`
      );
    }

    return { completed, failed };
  }

  /**
   * Get queue statistics
   */
  async getStats(): Promise<QueueStats> {
    const stats: QueueStats = {
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
      total: 0,
    };

    for (const folder of [
      "pending",
      "processing",
      "completed",
      "failed",
    ] as const) {
      const dir = path.join(this.queueDir, folder);
      const files = await fs.promises.readdir(dir);
      const count = files.filter((f) => f.endsWith(".json")).length;
      stats[folder] = count;
      stats.total += count;
    }

    return stats;
  }

  /**
   * Get failed jobs
   */
  async getFailedJobs(options?: {
    limit?: number;
    since?: Date;
  }): Promise<EmailJob[]> {
    const failedDir = path.join(this.queueDir, "failed");
    const files = await fs.promises.readdir(failedDir);

    const jobs: EmailJob[] = [];
    for (const file of files) {
      if (!file.endsWith(".json")) {
        continue;
      }
      const jobId = file.replace(".json", "");
      const job = await this.readJob(jobId, "failed");
      if (job) {
        if (options?.since && new Date(job.createdAt) < options.since) {
          continue;
        }
        jobs.push(job);
      }
    }

    // Sort by creation time (newest first)
    jobs.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return options?.limit ? jobs.slice(0, options.limit) : jobs;
  }

  /**
   * Retry a failed job
   */
  async retryFailedJob(jobId: string): Promise<boolean> {
    const job = await this.readJob(jobId, "failed");
    if (!job) {
      return false;
    }

    // Reset retry state
    job.attempts = 0;
    job.status = "pending";
    job.lastError = undefined;
    job.nextRetryAt = undefined;
    job.updatedAt = new Date();

    await this.moveJob(jobId, "failed", "pending", job);
    console.log(`[EmailQueue] Job ${jobId} queued for retry`);
    return true;
  }

  /**
   * Get a specific job
   */
  async getJob(jobId: string): Promise<EmailJob | null> {
    for (const folder of ["pending", "processing", "completed", "failed"]) {
      const job = await this.readJob(jobId, folder);
      if (job) {
        return job;
      }
    }
    return null;
  }

  /**
   * Check if queue is enabled
   */
  isEnabled(): boolean {
    return QUEUE_CONFIG.enabled;
  }
}

// Singleton instance
const emailQueueService = new EmailQueueService();

export default emailQueueService;
