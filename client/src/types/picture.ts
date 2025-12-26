export interface Picture {
  _id: string;
  pageToDisplay: string;
  positionOnPage: number;
  imageDescription: string;
  imageUrl: string;
  uploadedBy?: {
    _id: string;
    fullName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PictureFormData {
  pageToDisplay: string;
  positionOnPage: number;
  imageDescription: string;
  image: File;
}

export interface PicturesResponse {
  success: boolean;
  data: Picture[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  count?: number;
}

export interface PictureResponse {
  success: boolean;
  data: Picture;
  message?: string;
}

export interface PictureStats {
  total: number;
  byPage: Array<{
    _id: string;
    count: number;
  }>;
}

export interface PictureStatsResponse {
  success: boolean;
  data: PictureStats;
}

export const PAGE_OPTIONS = [
  { value: "home", label: "Home Page" },
  { value: "about", label: "About Us" },
  { value: "programs", label: "Programs" },
  { value: "gallery", label: "Gallery" },
  { value: "contact", label: "Contact" },
  { value: "donate", label: "Donate" },
  { value: "team", label: "Our Team" },
  { value: "partnership", label: "Partnership" },
  { value: "events", label: "Events" },
  { value: "achievements", label: "Achievements" },
  { value: "testimonials", label: "Testimonials" },
  { value: "other", label: "Other" },
] as const;
