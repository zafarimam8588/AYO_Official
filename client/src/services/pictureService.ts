import axios from "axios";
import type {
  PictureFormData,
  PicturesResponse,
  PictureResponse,
  PictureStatsResponse,
} from "@/types";

const API_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/pictures`;

// Helper function to get auth token
const getAuthToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  return token;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers: any = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Upload a new picture with progress tracking
export const uploadPicture = async (
  formData: PictureFormData,
  onUploadProgress?: (progressEvent: any) => void
): Promise<PictureResponse> => {
  const data = new FormData();
  data.append("pageToDisplay", formData.pageToDisplay);
  data.append("positionOnPage", formData.positionOnPage.toString());
  data.append("imageDescription", formData.imageDescription);
  data.append("image", formData.image);

  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please login first.");
  }

  const response = await axios.post<PictureResponse>(
    `${API_URL}/upload`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      onUploadProgress: (progressEvent: any) => {
        if (onUploadProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress({ percentCompleted, ...progressEvent });
        }
      },
    } as any
  );

  return response.data;
};

// Get all pictures with optional filtering
export const getAllPictures = async (params?: {
  page?: number;
  limit?: number;
  pageToDisplay?: string;
}): Promise<PicturesResponse> => {
  const response = await axios.get<PicturesResponse>(API_URL, {
    params,
    headers: getAuthHeaders(),
    withCredentials: true,
  });

  return response.data;
};

// Get pictures by page
export const getPicturesByPage = async (
  pageToDisplay: string
): Promise<PicturesResponse> => {
  const response = await axios.get<PicturesResponse>(
    `${API_URL}/page/${pageToDisplay}`,
    {
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );

  return response.data;
};

// Get single picture by ID
export const getPictureById = async (id: string): Promise<PictureResponse> => {
  const response = await axios.get<PictureResponse>(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });

  return response.data;
};

// Update picture details
export const updatePicture = async (
  id: string,
  data: { pageToDisplay?: string; imageDescription?: string }
): Promise<PictureResponse> => {
  const response = await axios.put<PictureResponse>(`${API_URL}/${id}`, data, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });

  return response.data;
};

// Delete picture
export const deletePicture = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await axios.delete<{ success: boolean; message: string }>(
    `${API_URL}/${id}`,
    {
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );

  return response.data;
};

// Get picture statistics
export const getPictureStats = async (): Promise<PictureStatsResponse> => {
  const response = await axios.get<PictureStatsResponse>(
    `${API_URL}/stats/summary`,
    {
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );

  return response.data;
};
