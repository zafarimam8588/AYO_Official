export interface GoogleAuthUrlResponse {
  success: boolean;
  data: {
    authURL: string;
  };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  profilePic?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
