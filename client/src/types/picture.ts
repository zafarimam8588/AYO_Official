// ==================== Type Definitions ====================

export type PageName =
  | "home"
  | "about"
  | "contact"
  | "programs"
  | "team"
  | "gallery";

export type GalleryCategory =
  | "events-activities"
  | "community-work"
  | "education-training"
  | "awareness-campaigns"
  | "general";

export interface Picture {
  _id: string;
  page: PageName;
  category?: GalleryCategory;
  imageNumber: number;
  imageUrl: string;
  cloudinaryPublicId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PictureFormData {
  page: PageName;
  category?: GalleryCategory;
  imageNumber: number;
  image: File;
}

export interface PictureUpdateData {
  page?: PageName;
  category?: GalleryCategory;
  imageNumber?: number;
}

// ==================== Response Types ====================

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

export interface SlotExistsResponse {
  success: boolean;
  data: Picture | null;
  exists: boolean;
}

export interface NextNumberResponse {
  success: boolean;
  data: {
    nextImageNumber: number;
  };
}

export interface SlotConflictResponse {
  success: false;
  message: string;
  existing: {
    id: string;
    imageUrl: string;
    page: PageName;
    imageNumber: number;
    category?: GalleryCategory;
  };
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

export interface CategorizedGalleryResponse {
  success: boolean;
  data: {
    all: Picture[];
    categorized: Record<GalleryCategory, Picture[]>;
    total: number;
  };
}

// ==================== Constants ====================

/**
 * Image limits per page based on actual usage in components:
 * - home: 5 images (Hero uses #1, AboutSection uses #2-5)
 * - about: unlimited (carousel can show any number)
 * - contact: 1 image (only first image used for map background)
 * - programs: 0 (no images used, text-based page)
 * - team: 0 (no images used, placeholder avatars)
 * - gallery: unlimited (categorized gallery)
 */
export const PAGE_IMAGE_LIMITS: Record<PageName, number | null> = {
  home: 5,
  about: null, // unlimited
  contact: 1,
  programs: 0, // no images
  team: 0, // no images
  gallery: null, // unlimited
};

export const PAGE_OPTIONS = [
  {
    value: "home" as const,
    label: "Home Page",
    maxImages: 5,
    description: "Hero image + 4 about section images",
  },
  {
    value: "about" as const,
    label: "About Us",
    maxImages: null,
    description: "Carousel can display unlimited images",
  },
  {
    value: "contact" as const,
    label: "Contact",
    maxImages: 1,
    description: "Single background image for map section",
  },
  {
    value: "programs" as const,
    label: "Programs",
    maxImages: 0,
    description: "No images - text-based page",
  },
  {
    value: "team" as const,
    label: "Our Team",
    maxImages: 0,
    description: "No images - uses placeholder avatars",
  },
  {
    value: "gallery" as const,
    label: "Gallery",
    maxImages: null,
    description: "Unlimited images per category",
  },
] as const;

export const GALLERY_CATEGORIES = [
  {
    value: "events-activities" as const,
    label: "Events & Activities",
    icon: "Calendar",
  },
  {
    value: "community-work" as const,
    label: "Community Work",
    icon: "Users",
  },
  {
    value: "education-training" as const,
    label: "Education & Training",
    icon: "GraduationCap",
  },
  {
    value: "awareness-campaigns" as const,
    label: "Awareness Campaigns",
    icon: "Megaphone",
  },
  { value: "general" as const, label: "General", icon: "Images" },
] as const;

// ==================== Helper Functions ====================

/**
 * Format image identifier for display
 * Examples:
 *   - "Home Page - Image 1"
 *   - "Gallery - Events & Activities - Image 3"
 */
export function formatImageIdentifier(picture: Picture): string {
  const pageLabel =
    PAGE_OPTIONS.find((p) => p.value === picture.page)?.label || picture.page;

  if (picture.page === "gallery" && picture.category) {
    const categoryLabel =
      GALLERY_CATEGORIES.find((c) => c.value === picture.category)?.label ||
      picture.category;
    return `${pageLabel} - ${categoryLabel} - Image ${picture.imageNumber}`;
  }

  return `${pageLabel} - Image ${picture.imageNumber}`;
}

/**
 * Get short image identifier
 * Examples:
 *   - "Home - 1"
 *   - "Gallery (Events) - 3"
 */
export function getShortImageIdentifier(picture: Picture): string {
  const pageName = picture.page.charAt(0).toUpperCase() + picture.page.slice(1);

  if (picture.page === "gallery" && picture.category) {
    const categoryShort = GALLERY_CATEGORIES.find(
      (c) => c.value === picture.category
    )?.label.split(" ")[0];
    return `${pageName} (${categoryShort}) - ${picture.imageNumber}`;
  }

  return `${pageName} - ${picture.imageNumber}`;
}

/**
 * Get max image number for a page
 * Returns null for unlimited, 0 for pages with no images
 */
export function getMaxImageNumber(page: PageName): number | null {
  return PAGE_IMAGE_LIMITS[page];
}

/**
 * Check if a page accepts images
 */
export function pageAcceptsImages(page: PageName): boolean {
  const limit = PAGE_IMAGE_LIMITS[page];
  return limit === null || limit > 0;
}

/**
 * Validate image number for a page
 * Returns true if valid, false if exceeds limit
 */
export function isValidImageNumber(
  page: PageName,
  imageNumber: number
): boolean {
  const limit = PAGE_IMAGE_LIMITS[page];
  if (limit === null) {
    return true;
  } // unlimited
  if (limit === 0) {
    return false;
  } // no images allowed
  return imageNumber >= 1 && imageNumber <= limit;
}
