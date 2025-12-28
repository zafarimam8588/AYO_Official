import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password?: string;
  googleId?: string;
  fullName: string;
  role: "member" | "admin";
  profilePic?: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}
// export interface Request extends Request {
//   user?: IUser;
// }

export interface IMemberProfile extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  phoneNumber: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  whyJoin: string;
  idProof?: string;

  // Status and Verification
  memberStatus: "not_submitted" | "pending" | "approved" | "rejected";
  membershipId?: string;

  // Admin fields
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IContent extends Document {
  section?: string;
  subsection?: string;
  type: "text" | "image" | "video";
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment extends Document {
  memberId?: Types.ObjectId;
  amount: number;
  currency: "INR";
  paymentMethod: "card" | "upi" | "netbanking" | "wallet";
  status: "pending" | "completed" | "failed" | "refunded";
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  donorInfo: {
    name: string;
    email: string;
    phoneNumber?: string;
    isAnonymous: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IOTP extends Document {
  email: string;
  otpHash: string;
  salt: string;
  type: "email-verification" | "password-reset";
  expiresAt: Date;
  createdAt: Date;

  // Security fields
  ipAddress: string;
  userAgent?: string;
  attempts: number;
  maxAttempts: number;
  isBlocked: boolean;
  blockedUntil?: Date;

  // Rate limiting fields
  requestCount: number;
  windowStart: Date;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: Partial<IUser>; // Changed from IUser to IMember
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface IAccountDeletionRequest extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  reason?: string;
  deletionStatus: "pending" | "approved" | "rejected";
  processedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscribedEmail extends Document {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPicture extends Document {
  _id: Types.ObjectId;
  pageToDisplay: string;
  imageDescription: string;
  imageUrl: string;
  uploadedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  userId: string;
  fullName: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface IArchivedUserProfile {
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: "Male" | "Female" | "Other";
  whyJoin?: string;
  idProof?: string;
  memberStatus?: "not_submitted" | "pending" | "approved" | "rejected";
  membershipId?: string;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  profileCreatedAt?: Date;
  profileUpdatedAt?: Date;
}

export interface IArchivedUser extends Document {
  _id: Types.ObjectId;
  originalUserId: Types.ObjectId;

  // Preserved User Data
  email: string;
  fullName: string;
  role: "member" | "admin";
  googleId?: string;
  profilePic?: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  userCreatedAt: Date;
  userUpdatedAt: Date;

  // Preserved Profile Data (optional)
  profile?: IArchivedUserProfile;

  // Archive Metadata
  archivedAt: Date;
  archivedBy: Types.ObjectId;
  archiveReason?: string;
  archiveSource: "admin_action" | "user_request" | "system";

  createdAt: Date;
  updatedAt: Date;
}
