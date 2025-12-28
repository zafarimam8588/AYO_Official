/**
 * Cloudinary URL transformation utilities
 *
 * Uses Cloudinary's URL-based transformations for on-demand image resizing
 * and optimization without storing multiple versions.
 */

export interface TransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "thumb" | "crop" | "limit" | "pad";
  quality?: number | "auto";
  format?: "auto" | "webp" | "jpg" | "png" | "avif";
  gravity?:
    | "auto"
    | "face"
    | "center"
    | "north"
    | "south"
    | "east"
    | "west"
    | "faces";
  aspectRatio?: string; // e.g., "16:9", "4:3", "1:1"
  blur?: number;
  effect?: string;
  dpr?: number | "auto"; // Device pixel ratio
}

// Preset transformations for common use cases
export const TRANSFORM_PRESETS = {
  // Small thumbnails for lists and grids
  thumbnail: {
    width: 150,
    height: 150,
    crop: "thumb" as const,
    gravity: "auto" as const,
    quality: "auto" as const,
    format: "auto" as const,
  },

  // Card images for gallery cards
  card: {
    width: 400,
    height: 300,
    crop: "fill" as const,
    gravity: "auto" as const,
    quality: "auto" as const,
    format: "auto" as const,
  },

  // Hero images for page headers
  hero: {
    width: 1920,
    height: 1080,
    crop: "fill" as const,
    gravity: "auto" as const,
    quality: "auto" as const,
    format: "auto" as const,
  },

  // Banner images for wide sections
  banner: {
    width: 1200,
    height: 400,
    crop: "fill" as const,
    gravity: "center" as const,
    quality: "auto" as const,
    format: "auto" as const,
  },

  // Gallery images for photo gallery
  gallery: {
    width: 800,
    height: 600,
    crop: "fill" as const,
    gravity: "auto" as const,
    quality: 80,
    format: "auto" as const,
  },

  // Gallery thumbnails for grid view
  galleryThumb: {
    width: 300,
    height: 225,
    crop: "fill" as const,
    gravity: "auto" as const,
    quality: "auto" as const,
    format: "auto" as const,
  },

  // Avatar/profile images
  avatar: {
    width: 100,
    height: 100,
    crop: "thumb" as const,
    gravity: "face" as const,
    quality: "auto" as const,
    format: "auto" as const,
  },

  // Background images (lower quality, blurred option)
  background: {
    width: 1920,
    height: 1080,
    crop: "fill" as const,
    quality: 60,
    format: "auto" as const,
  },

  // Section images for in-content use
  section: {
    width: 600,
    height: 400,
    crop: "fill" as const,
    gravity: "auto" as const,
    quality: "auto" as const,
    format: "auto" as const,
  },

  // Mobile-optimized hero
  heroMobile: {
    width: 768,
    height: 500,
    crop: "fill" as const,
    gravity: "auto" as const,
    quality: "auto" as const,
    format: "auto" as const,
  },
} as const;

export type PresetName = keyof typeof TRANSFORM_PRESETS;

/**
 * Generate a Cloudinary transform URL
 *
 * @param originalUrl - The original Cloudinary URL
 * @param options - Transform options
 * @returns Transformed URL
 *
 * @example
 * getTransformedUrl(url, { width: 400, height: 300, crop: "fill" })
 */
export function getTransformedUrl(
  originalUrl: string,
  options: TransformOptions
): string {
  // Validate it's a Cloudinary URL
  if (!originalUrl || !originalUrl.includes("cloudinary.com")) {
    return originalUrl;
  }

  // Build transformation string
  const transforms: string[] = [];

  if (options.width) {
    transforms.push(`w_${options.width}`);
  }
  if (options.height) {
    transforms.push(`h_${options.height}`);
  }
  if (options.crop) {
    transforms.push(`c_${options.crop}`);
  }
  if (options.quality) {
    transforms.push(`q_${options.quality}`);
  }
  if (options.format) {
    transforms.push(`f_${options.format}`);
  }
  if (options.gravity) {
    transforms.push(`g_${options.gravity}`);
  }
  if (options.aspectRatio) {
    transforms.push(`ar_${options.aspectRatio.replace(":", "_")}`);
  }
  if (options.blur) {
    transforms.push(`e_blur:${options.blur}`);
  }
  if (options.effect) {
    transforms.push(`e_${options.effect}`);
  }
  if (options.dpr) {
    transforms.push(`dpr_${options.dpr}`);
  }

  if (transforms.length === 0) {
    return originalUrl;
  }

  const transformString = transforms.join(",");

  // Insert transformation into URL
  // Cloudinary URL format: https://res.cloudinary.com/{cloud}/image/upload/{version}/{public_id}.{format}
  // We insert transforms after /upload/
  const uploadIndex = originalUrl.indexOf("/upload/");
  if (uploadIndex === -1) {
    return originalUrl;
  }

  const beforeUpload = originalUrl.substring(0, uploadIndex + 8); // includes "/upload/"
  const afterUpload = originalUrl.substring(uploadIndex + 8);

  return `${beforeUpload}${transformString}/${afterUpload}`;
}

/**
 * Get transformed URL using a preset
 *
 * @param originalUrl - The original Cloudinary URL
 * @param preset - Preset name
 * @returns Transformed URL
 *
 * @example
 * getPresetUrl(url, "thumbnail")
 * getPresetUrl(url, "hero")
 */
export function getPresetUrl(originalUrl: string, preset: PresetName): string {
  const presetOptions = TRANSFORM_PRESETS[preset];
  return getTransformedUrl(originalUrl, presetOptions as TransformOptions);
}

/**
 * Generate responsive srcset for an image
 *
 * @param originalUrl - The original Cloudinary URL
 * @param widths - Array of widths for srcset
 * @returns srcset string for use in img tag
 *
 * @example
 * <img src={url} srcSet={generateSrcSet(url)} />
 */
export function generateSrcSet(
  originalUrl: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): string {
  return widths
    .map((width) => {
      const url = getTransformedUrl(originalUrl, {
        width,
        crop: "scale",
        quality: "auto",
        format: "auto",
      });
      return `${url} ${width}w`;
    })
    .join(", ");
}

/**
 * Get optimized image URL with auto format and quality
 *
 * @param originalUrl - The original Cloudinary URL
 * @returns Optimized URL
 *
 * @example
 * getOptimizedUrl(url) // Adds auto quality and format
 */
export function getOptimizedUrl(originalUrl: string): string {
  return getTransformedUrl(originalUrl, {
    quality: "auto",
    format: "auto",
  });
}

/**
 * Get blurred placeholder URL for lazy loading
 *
 * @param originalUrl - The original Cloudinary URL
 * @returns Low-quality blurred placeholder URL
 */
export function getPlaceholderUrl(originalUrl: string): string {
  return getTransformedUrl(originalUrl, {
    width: 50,
    height: 50,
    crop: "scale",
    quality: 30,
    blur: 1000,
    format: "auto",
  });
}

/**
 * Get URL with specific dimensions while maintaining aspect ratio
 *
 * @param originalUrl - The original Cloudinary URL
 * @param maxWidth - Maximum width
 * @param maxHeight - Maximum height
 * @returns URL that fits within dimensions
 */
export function getFitUrl(
  originalUrl: string,
  maxWidth: number,
  maxHeight: number
): string {
  return getTransformedUrl(originalUrl, {
    width: maxWidth,
    height: maxHeight,
    crop: "limit",
    quality: "auto",
    format: "auto",
  });
}

/**
 * Generate sizes attribute for responsive images
 *
 * @param breakpoints - Object with breakpoint sizes
 * @returns sizes string for use in img tag
 *
 * @example
 * generateSizes({ sm: "100vw", md: "50vw", lg: "33vw" })
 */
export function generateSizes(
  breakpoints: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    default?: string;
  } = {}
): string {
  const sizes: string[] = [];

  if (breakpoints.xl) {
    sizes.push(`(min-width: 1280px) ${breakpoints.xl}`);
  }
  if (breakpoints.lg) {
    sizes.push(`(min-width: 1024px) ${breakpoints.lg}`);
  }
  if (breakpoints.md) {
    sizes.push(`(min-width: 768px) ${breakpoints.md}`);
  }
  if (breakpoints.sm) {
    sizes.push(`(min-width: 640px) ${breakpoints.sm}`);
  }
  sizes.push(breakpoints.default || "100vw");

  return sizes.join(", ");
}
