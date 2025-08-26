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
  otp: string;
  type: "email-verification" | "password-reset";
  expiresAt: Date;
  createdAt: Date;
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
