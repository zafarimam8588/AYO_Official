// Simplified Picture Constants for Page-based Image System

// Page options for image assignment (simplified to 6 main pages)
export const PAGE_OPTIONS = [
  "home",
  "about",
  "contact",
  "programs",
  "team",
  "gallery",
] as const;

export type PageOption = (typeof PAGE_OPTIONS)[number];

// Gallery category options (only used when page = "gallery")
export const GALLERY_CATEGORIES = [
  "events-activities",
  "community-work",
  "education-training",
  "awareness-campaigns",
  "general",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

// Human-readable labels for pages
export const PAGE_LABELS: Record<PageOption, string> = {
  home: "Home Page",
  about: "About Us",
  contact: "Contact",
  programs: "Programs",
  team: "Our Team",
  gallery: "Gallery",
};

// Human-readable labels for gallery categories
export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  "events-activities": "Events & Activities",
  "community-work": "Community Work",
  "education-training": "Education & Training",
  "awareness-campaigns": "Awareness Campaigns",
  general: "General",
};

/**
 * Image limits per page based on actual usage in frontend components:
 * - home: 5 images (Hero uses #1, AboutSection uses #2-5)
 * - about: unlimited (carousel can show any number)
 * - contact: 1 image (only first image used for map background)
 * - programs: 0 (no images used, text-based page)
 * - team: 0 (no images used, placeholder avatars)
 * - gallery: unlimited (categorized gallery)
 *
 * null = unlimited, 0 = no images allowed
 */
export const PAGE_IMAGE_LIMITS: Record<PageOption, number | null> = {
  home: 5,
  about: null,
  contact: 1,
  programs: 0,
  team: 0,
  gallery: null,
};

// Helper to check if page accepts images
export function pageAcceptsImages(page: PageOption): boolean {
  const limit = PAGE_IMAGE_LIMITS[page];
  return limit === null || limit > 0;
}

// Helper to validate image number for a page
export function isValidImageNumber(
  page: PageOption,
  imageNumber: number
): boolean {
  const limit = PAGE_IMAGE_LIMITS[page];
  if (limit === null) {
    return imageNumber >= 1;
  } // unlimited but must be >= 1
  if (limit === 0) {
    return false;
  } // no images allowed
  return imageNumber >= 1 && imageNumber <= limit;
}

// Helper to get max image number for a page
export function getMaxImageNumber(page: PageOption): number | null {
  return PAGE_IMAGE_LIMITS[page];
}

// Helper to format image identifier for display
export function formatImageIdentifier(
  page: PageOption,
  imageNumber: number,
  category?: GalleryCategory
): string {
  const pageName = PAGE_LABELS[page] || page;
  if (page === "gallery" && category) {
    const categoryName = CATEGORY_LABELS[category] || category;
    return `${pageName} - ${categoryName} - Image ${imageNumber}`;
  }
  return `${pageName} - Image ${imageNumber}`;
}
