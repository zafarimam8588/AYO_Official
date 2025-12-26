export interface UserData {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  isProfileComplete: boolean;
  profilePic?: string;
}

export interface UsersResponse {
  success: boolean;
  message?: string;
  data: {
    users: UserData[];
    pagination: {
      current: number;
      total: number;
      count: number;
      totalUsers: number;
    };
  };
}
