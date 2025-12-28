import axios from "axios";
import type {
  PictureFormData,
  PictureUpdateData,
  PicturesResponse,
  PictureResponse,
  PictureStatsResponse,
  CategorizedGalleryResponse,
  SlotExistsResponse,
  NextNumberResponse,
  PageName,
  GalleryCategory,
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
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Upload a new picture with progress tracking
export const uploadPicture = async (
  formData: PictureFormData,
  onUploadProgress?: (progressEvent: { percentCompleted: number }) => void
): Promise<PictureResponse> => {
  const data = new FormData();
  data.append("page", formData.page);
  data.append("imageNumber", formData.imageNumber.toString());
  data.append("image", formData.image);

  if (formData.category) {
    data.append("category", formData.category);
  }

  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please login first.");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    onUploadProgress: onUploadProgress
      ? (progressEvent: { loaded: number; total?: number }) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress({ percentCompleted });
          }
        }
      : undefined,
  };

  const response = await axios.post<PictureResponse>(
    `${API_URL}/upload`,
    data,
    config
  );

  return response.data;
};

// Get all pictures with optional filtering
export const getAllPictures = async (params?: {
  pageNum?: number;
  limit?: number;
  pageName?: PageName;
  category?: GalleryCategory;
}): Promise<PicturesResponse> => {
  const queryParams: Record<string, string | number> = {};

  if (params?.pageNum) {
    queryParams.page = params.pageNum;
  }
  if (params?.limit) {
    queryParams.limit = params.limit;
  }
  if (params?.pageName) {
    queryParams.pageName = params.pageName;
  }
  if (params?.category) {
    queryParams.category = params.category;
  }

  const response = await axios.get<PicturesResponse>(API_URL, {
    params: queryParams,
    headers: getAuthHeaders(),
    withCredentials: true,
  });

  return response.data;
};

// Get pictures by page
export const getPicturesByPage = async (
  page: PageName
): Promise<PicturesResponse> => {
  const response = await axios.get<PicturesResponse>(
    `${API_URL}/page/${page}`,
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

// Check if image slot exists
export const getImageBySlot = async (
  page: PageName,
  imageNumber: number,
  category?: GalleryCategory
): Promise<SlotExistsResponse> => {
  const params: Record<string, string | number> = {
    page,
    imageNumber,
  };

  if (category) {
    params.category = category;
  }

  const response = await axios.get<SlotExistsResponse>(`${API_URL}/slot`, {
    params,
    headers: getAuthHeaders(),
    withCredentials: true,
  });

  return response.data;
};

// Get next available image number for a page/category
export const getNextImageNumber = async (
  page: PageName,
  category?: GalleryCategory
): Promise<NextNumberResponse> => {
  const params: Record<string, string> = { page };

  if (category) {
    params.category = category;
  }

  const response = await axios.get<NextNumberResponse>(
    `${API_URL}/next-number`,
    {
      params,
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );

  return response.data;
};

// Update picture details (move to different slot)
export const updatePicture = async (
  id: string,
  data: PictureUpdateData
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

// Get gallery pictures grouped by category
export const getCategorizedGallery =
  async (): Promise<CategorizedGalleryResponse> => {
    const response = await axios.get<CategorizedGalleryResponse>(
      `${API_URL}/gallery/categorized`,
      {
        headers: getAuthHeaders(),
        withCredentials: true,
      }
    );

    return response.data;
  };

// Replace picture image (keep slot, upload new image)
export const replacePictureImage = async (
  id: string,
  image: File,
  onUploadProgress?: (progressEvent: { percentCompleted: number }) => void
): Promise<PictureResponse> => {
  const data = new FormData();
  data.append("image", image);

  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please login first.");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    onUploadProgress: onUploadProgress
      ? (progressEvent: { loaded: number; total?: number }) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress({ percentCompleted });
          }
        }
      : undefined,
  };

  const response = await axios.put<PictureResponse>(
    `${API_URL}/${id}/replace`,
    data,
    config
  );

  return response.data;
};
