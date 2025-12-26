import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import passport from "passport";

// ╔══════════════════════════════════════════════════════════════════╗
// ║                        IMPORT MODULES                            ║
// ╚══════════════════════════════════════════════════════════════════╝
import connectDB from "./config/database";
import "./config/passport"; // Import passport configuration

// ╔══════════════════════════════════════════════════════════════════╗
// ║                         ROUTE IMPORTS                            ║
// ╚══════════════════════════════════════════════════════════════════╝
import authRoutes from "./routes/authRoutes";
import memberRoutes from "./routes/memberRoutes";
import accountDeletionRoutes from "./routes/accountDeletionRoute";
import adminRoutes from "./routes/adminRoutes";
import subscribedEmailRoute from "./routes/subscribedEmailRoute";
import pictureRoutes from "./routes/pictureRoutes";
import contactMessageRoutes from "./routes/contactMessageRoutes";

// ╔══════════════════════════════════════════════════════════════════╗
// ║                      ENVIRONMENT CONFIG                          ║
// ╚══════════════════════════════════════════════════════════════════╝
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ╔══════════════════════════════════════════════════════════════════╗
// ║                      SECURITY MIDDLEWARE                         ║
// ╚══════════════════════════════════════════════════════════════════╝

// 🛡️  Helmet - Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false, // Required for some APIs
  })
);

// 🌐 CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🚦 Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === "production" ? 100 : 1000, // More lenient in dev
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable legacy headers
});
app.use(limiter);

// ╔══════════════════════════════════════════════════════════════════╗
// ║                       LOGGING MIDDLEWARE                         ║
// ╚══════════════════════════════════════════════════════════════════╝

// 📝 Morgan Logging Configuration
if (NODE_ENV === "development") {
  // Development: Colorful detailed logging
  app.use(morgan("dev"));
  console.log("🔍 Development logging enabled");
} else if (NODE_ENV === "production") {
  // Production: Apache combined log format
  app.use(morgan("combined"));
  console.log("📊 Production logging enabled");
} else {
  // Other environments: Simple logging
  app.use(morgan("tiny"));
  console.log("📋 Basic logging enabled");
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║                       BODY PARSING                               ║
// ╚══════════════════════════════════════════════════════════════════╝

// 📦 JSON & URL-encoded parsing with size limits
app.use(
  express.json({
    limit: "10mb",
    type: ["application/json", "text/plain"],
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 20,
  })
);

// ╔══════════════════════════════════════════════════════════════════╗
// ║                    AUTHENTICATION SETUP                          ║
// ╚══════════════════════════════════════════════════════════════════╝

// 🔐 Passport initialization (token-based auth)
app.use(passport.initialize());

// ╔══════════════════════════════════════════════════════════════════╗
// ║                        HEALTH CHECK                              ║
// ╚══════════════════════════════════════════════════════════════════╝

// 💓 Health monitoring endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running smoothly",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: `${process.uptime()} sec `,
  });
});

// ╔══════════════════════════════════════════════════════════════════╗
// ║                         API ROUTES                               ║
// ╚══════════════════════════════════════════════════════════════════╝

// 🔑 Authentication routes
app.use("/api/auth", authRoutes);

// 👤 Member management routes
app.use("/api/member", memberRoutes);

// 🗑️  Account deletion routes
app.use("/api/account-deletion", accountDeletionRoutes);

// 👑 Admin panel routes
app.use("/api/admin", adminRoutes);

// 📧 Email subscription routes
app.use("/api/email", subscribedEmailRoute);

// 🖼️  Picture upload and management routes
app.use("/api/pictures", pictureRoutes);

// 💬 Contact message routes
app.use("/api/contact-messages", contactMessageRoutes);

// ╔══════════════════════════════════════════════════════════════════╗
// ║                       ERROR HANDLING                             ║
// ╚══════════════════════════════════════════════════════════════════╝

// 🚫 404 Not Found Handler
app.use(/(.*)/, (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// 💥 Global Error Handler
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // Log the error details
    console.error("🔥 Global Error:", {
      message: error.message,
      stack: NODE_ENV === "development" ? error.stack : undefined,
      url: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    });

    // Handle different types of errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: Object.values(error.errors).map((err: any) => err.message),
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate key error",
        error: "Resource already exists",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Authentication token expired",
      });
    }

    // Default error response
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
      timestamp: new Date().toISOString(),
      ...(NODE_ENV === "development" && {
        stack: error.stack,
        details: error,
      }),
    });
  }
);

// ╔══════════════════════════════════════════════════════════════════╗
// ║                        SERVER STARTUP                            ║
// ╚══════════════════════════════════════════════════════════════════╝

const startServer = async (): Promise<void> => {
  try {
    // 🔌 Database connection
    console.log("🔄 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected successfully");

    // 🚀 Start the HTTP server
    app.listen(PORT, () => {
      console.log("\n" + "═".repeat(60));
      console.log("🚀 SERVER STARTED SUCCESSFULLY!");
      console.log("═".repeat(60));
      console.log(`🌐 Server running on: http://localhost:${PORT}`);
      console.log(`📱 Health check: http://localhost:${PORT}/health`);
      console.log(`🌍 Environment: ${NODE_ENV.toUpperCase()}`);
      console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
      console.log("═".repeat(60) + "\n");

      // Show available routes
      console.log("🔗 Available API Routes:");
      console.log("   📝 Auth:              /api/auth/*");
      console.log("   👤 Member:            /api/member/*");
      console.log("   🗑️  Account Deletion:  /api/account-deletion/*");
      console.log("   👑 Admin:             /api/admin/*");
      console.log("   💓 Health:            /health");
      console.log("");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    console.error("🔄 Attempting graceful shutdown...");
    process.exit(1);
  }
};

// ╔══════════════════════════════════════════════════════════════════╗
// ║                    GRACEFUL SHUTDOWN                             ║
// ╚══════════════════════════════════════════════════════════════════╝

// 🛑 Handle SIGTERM signal
process.on("SIGTERM", () => {
  console.log("\n🛑 SIGTERM received. Shutting down gracefully...");
  console.log("📊 Server statistics:");
  console.log(`   ⏱️  Uptime: ${Math.floor(process.uptime())} seconds`);
  console.log(
    `   💾 Memory usage: ${Math.round(
      process.memoryUsage().heapUsed / 1024 / 1024
    )}MB`
  );
  console.log("👋 Goodbye!");
  process.exit(0);
});

// 🛑 Handle SIGINT signal (Ctrl+C)
process.on("SIGINT", () => {
  console.log("\n🛑 SIGINT received. Shutting down gracefully...");
  console.log("📊 Server statistics:");
  console.log(`   ⏱️  Uptime: ${Math.floor(process.uptime())} seconds`);
  console.log(
    `   💾 Memory usage: ${Math.round(
      process.memoryUsage().heapUsed / 1024 / 1024
    )}MB`
  );
  console.log("👋 Goodbye!");
  process.exit(0);
});

// 🚀 Initialize the server
startServer();

export default app;
