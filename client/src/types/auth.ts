export interface LogoutSuccess {
  success: true;
  message: string;
}

export interface LogoutError {
  success: false;
  message: string;
  error?: string;
}

export type LogoutResponse = LogoutSuccess | LogoutError;

export interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isVerified: boolean;
  isProfileComplete: boolean;
}

// Add these interfaces to your existing auth.ts file

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  success: true;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
      isVerified: boolean;
      isProfileComplete: boolean;
    };
    token: string;
  };
}

export interface GoogleAuthUrlResponse {
  success: boolean;
  data: {
    authURL: string;
  };
}

export interface ApiError {
  message: string;
  error?: string;
}

export interface CustomAxiosError {
  response?: {
    data?: ApiError;
    status?: number;
    statusText?: string;
  };
  request?: any;
  message: string;
}
// Add these interfaces to your existing auth.ts file

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  googleId?: string;
  profilePic?: string;
  role?: "member" | "admin";
  isVerified?: boolean;
}

export interface RegisterResponse {
  success: true;
  message: string;
  data: {
    userId: string;
    email: string;
    fullName: string;
    role: string;
    isProfileComplete: boolean;
    needsVerification: boolean;
  };
}
