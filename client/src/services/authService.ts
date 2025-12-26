import type { LogoutResponse } from "@/types";
import axios from "axios";
import type {
  LoginFormValues,
  LoginResponse,
  GoogleAuthUrlResponse,
  CustomAxiosError,
} from "@/types/auth";

import type {
  RegisterFormValues,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

export const logoutUser = async (token: string) => {
  try {
    if (token) {
      const { data } = await axios.post<LogoutResponse>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/logout`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        console.log("Logout successful");
      } else {
        console.log("Logout response:", data.message);
      }
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
};

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

class AuthService {
  async login(credentials: LoginFormValues) {
    try {
      const response = await axios.post<LoginResponse>(
        `${BASE_URL}/api/auth/login`,
        credentials
      );

      return response.data.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? error.message ?? "Login failed";
      throw new Error(message);
    }
  }

  async getGoogleAuthUrl(): Promise<string> {
    try {
      const response = await axios.get<GoogleAuthUrlResponse>(
        `${BASE_URL}/api/auth/google/url`
      );

      if (response.data.success && response.data.data.authURL) {
        return response.data.data.authURL;
      } else {
        throw new Error("Failed to get Google auth URL");
      }
    } catch (error: unknown) {
      const axiosError = error as CustomAxiosError;

      if (axiosError.response) {
        const errorData = axiosError.response.data;
        throw new Error(
          errorData?.message || "Failed to initiate Google authentication"
        );
      } else if (axiosError.request) {
        throw new Error(
          "Network error. Please check your internet connection."
        );
      } else {
        throw new Error(axiosError.message || "An unexpected error occurred");
      }
    }
  }

  async register(formData: RegisterFormValues) {
    try {
      const payload: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        role: "member",
        isVerified: false,
      };

      const response = await axios.post<RegisterResponse>(
        `${BASE_URL}/api/auth/register`,
        payload
      );

      return response.data.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error.message ??
        "Registration failed";
      throw new Error(message);
    }
  }

  async logout(token: string) {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
}

export const authService = new AuthService();
