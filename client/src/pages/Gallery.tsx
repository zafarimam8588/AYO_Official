import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Calendar,
  Users,
  GraduationCap,
  Megaphone,
  Images,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getCategorizedGallery } from "@/services/pictureService";
import type { Picture, GalleryCategory } from "@/types";
import { GALLERY_CATEGORIES } from "@/types";
import toast from "react-hot-toast";
import { SectionHeader } from "@/components/common";
import {
  GalleryLightbox,
  GalleryHeroCarousel,
  GalleryCategorySection,
} from "@/components/gallery";
import { GalleryImageCard } from "@/components/gallery/GalleryImageCard";
import { GalleryGridSkeleton } from "@/components/skeletons";
import { cn } from "@/lib/utils";

// Placeholder images for empty categories (NGO-themed from Unsplash)
const PLACEHOLDER_IMAGES: Record<
  GalleryCategory,
  { url: string; description: string }[]
> = {
  "events-activities": [
    {
      url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
      description: "Community gathering and celebration event",
    },
    {
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
      description: "Team building activities with volunteers",
    },
    {
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
      description: "Annual community festival celebration",
    },
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      description: "Cultural event and performances",
    },
  ],
  "community-work": [
    {
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      description: "Volunteers helping in community development",
    },
    {
      url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
      description: "Community service and outreach program",
    },
    {
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
      description: "Food distribution drive for underprivileged",
    },
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      description: "Healthcare camp in rural areas",
    },
  ],
  "education-training": [
    {
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      description: "Educational workshop for students",
    },
    {
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
      description: "Skill development training session",
    },
    {
      url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
      description: "Computer literacy program",
    },
    {
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      description: "Teacher training workshop",
    },
  ],
  "awareness-campaigns": [
    {
      url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
      description: "Health awareness campaign in villages",
    },
    {
      url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
      description: "Environmental awareness rally",
    },
    {
      url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
      description: "Women empowerment awareness program",
    },
    {
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
      description: "Youth awareness and motivation session",
    },
  ],
  general: [],
};

const iconMap: Record<string, React.ElementType> = {
  Calendar,
  Users,
  GraduationCap,
  Megaphone,
  Images,
};

interface CategorizedImages {
  all: Picture[];
  categorized: Record<GalleryCategory, Picture[]>;
}

const Gallery = () => {
  const [data, setData] = useState<CategorizedImages | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    currentIndex: number;
  }>({
    isOpen: false,
    currentIndex: 0,
  });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryPictures();
  }, []);

  const fetchGalleryPictures = async () => {
    try {
      setIsLoading(true);
      const response = await getCategorizedGallery();
      setData({
        all: response.data.all,
        categorized: response.data.categorized,
      });
    } catch (error: unknown) {
      console.error("Error fetching gallery pictures:", error);
      toast.error("Failed to load gallery images");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if we have any categorized images (non-general)
  const hasCategorizedImages = useMemo(() => {
    if (!data) {
      return false;
    }
    return GALLERY_CATEGORIES.some(
      (cat) =>
        cat.value !== "general" &&
        (data.categorized[cat.value]?.length || 0) > 0
    );
  }, [data]);

  // Get all real images for lightbox
  const allRealImages = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.all;
  }, [data]);

  const openLightbox = useCallback(
    (index: number) => {
      // Only open lightbox for real images
      if (index < allRealImages.length) {
        setLightbox({ isOpen: true, currentIndex: index });
      }
    },
    [allRealImages.length]
  );

  const closeLightbox = useCallback(() => {
    setLightbox({ isOpen: false, currentIndex: 0 });
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: index }));
  }, []);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return <GalleryGridSkeleton count={8} showHeader={true} />;
  }

  // Show placeholder content when no images at all
  if (!data || data.all.length === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10">
          {/* Header Section */}
          <div className="px-4 pb-8 pt-12 sm:pt-16 lg:pt-20">
            <div className="mx-auto max-w-7xl">
              <SectionHeader
                badge="Photo Gallery"
                title="Our Gallery"
                subtitle="Explore moments that capture our journey, achievements, and the lives we've touched across Bihar"
                titleColor="gradient"
              />
            </div>
          </div>

          {/* Show placeholder sections */}
          <div className="mx-auto max-w-7xl">
            {GALLERY_CATEGORIES.filter((cat) => cat.value !== "general").map(
              (category, index) => (
                <PlaceholderCategorySection
                  key={category.value}
                  category={category}
                  accentColor={index % 2 === 0 ? "saffron" : "green"}
                />
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative orbs */}
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-saffron-200/20 blur-3xl filter" />
      <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-india-green-200/20 blur-3xl filter" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="px-4 pb-8 pt-12 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              badge="Photo Gallery"
              title="Our Gallery"
              subtitle="Explore moments that capture our journey, achievements, and the lives we've touched across Bihar"
              titleColor="gradient"
            />
          </div>
        </div>

        {/* Hero Carousel */}
        <div className="mx-auto max-w-7xl px-4">
          <GalleryHeroCarousel
            images={data.all.slice(0, 10)}
            onImageClick={openLightbox}
          />
        </div>

        {/* Category Navigation Tabs - Always show when we have categories to display */}
        <div className="sticky top-0 z-20 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4">
            <div className="scrollbar-hide flex gap-2 overflow-x-auto py-3 sm:justify-center sm:gap-4">
              {GALLERY_CATEGORIES.filter((cat) => cat.value !== "general").map(
                (category) => {
                  const count = data.categorized[category.value]?.length || 0;
                  return (
                    <button
                      key={category.value}
                      onClick={() => scrollToCategory(category.value)}
                      className={cn(
                        "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                        activeCategory === category.value
                          ? "bg-gradient-to-r from-saffron-500 to-india-green-500 text-white shadow-lg"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {category.label}
                      {count > 0 && (
                        <span className="ml-2 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Category Sections */}
        <div className="mx-auto max-w-7xl">
          {GALLERY_CATEGORIES.filter((cat) => cat.value !== "general").map(
            (category, index) => {
              const images = data.categorized[category.value] || [];
              const hasRealImages = images.length > 0;

              return (
                <div key={category.value} id={category.value}>
                  {hasRealImages ? (
                    <GalleryCategorySection
                      id={`${category.value}-section`}
                      title={category.label}
                      iconName={category.icon}
                      images={images}
                      accentColor={index % 2 === 0 ? "saffron" : "green"}
                      onImageClick={(globalIdx) => {
                        // Find the actual index in all images
                        const imageId =
                          images[
                            globalIdx -
                              (data.all.indexOf(images[0]) >= 0
                                ? data.all.indexOf(images[0])
                                : 0)
                          ]?._id;
                        const realIndex = data.all.findIndex(
                          (img) => img._id === imageId
                        );
                        if (realIndex >= 0) {
                          openLightbox(realIndex);
                        }
                      }}
                      startIndex={0}
                    />
                  ) : (
                    <PlaceholderCategorySection
                      category={category}
                      accentColor={index % 2 === 0 ? "saffron" : "green"}
                    />
                  )}
                </div>
              );
            }
          )}

          {/* All Photos Section - Show all images in a grid if no categories have images */}
          {!hasCategorizedImages && data.all.length > 0 && (
            <section className="py-12 sm:py-16">
              <div className="container mx-auto px-4">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-saffron-400 to-india-green-500 shadow-lg">
                    <Images className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                      All Photos
                    </h2>
                    <div className="mt-1">
                      <span className="rounded-full bg-saffron-100 px-2.5 py-0.5 text-xs font-medium text-saffron-700">
                        {data.all.length}{" "}
                        {data.all.length === 1 ? "photo" : "photos"}
                      </span>
                    </div>
                  </div>
                  <div className="hidden flex-1 sm:block">
                    <div className="h-px border-t border-saffron-200" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                  {data.all.map((image, index) => (
                    <GalleryImageCard
                      key={image._id}
                      image={image}
                      onClick={() => openLightbox(index)}
                      accentColor={index % 2 === 0 ? "saffron" : "green"}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Bottom spacing */}
        <div className="h-16" />
      </div>

      {/* Lightbox - Only for real images */}
      <GalleryLightbox
        images={allRealImages}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />

      {/* Custom scrollbar hide style */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

// Placeholder section component for empty categories
function PlaceholderCategorySection({
  category,
  accentColor,
}: {
  category: (typeof GALLERY_CATEGORIES)[number];
  accentColor: "saffron" | "green";
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const Icon = iconMap[category.icon] || Images;
  const placeholders = PLACEHOLDER_IMAGES[category.value] || [];

  // Check scroll position and update arrow visibility
  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    checkScrollPosition();
    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const scrollBy = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const cardWidth = 280;
    const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const accentStyles = {
    saffron: {
      badge: "bg-saffron-100 text-saffron-700",
      iconBg: "bg-gradient-to-br from-saffron-400 to-saffron-500",
      border: "border-saffron-200",
      arrow: "bg-saffron-500 hover:bg-saffron-600 text-white",
      arrowDisabled: "bg-saffron-200 text-saffron-400 cursor-not-allowed",
    },
    green: {
      badge: "bg-india-green-100 text-india-green-700",
      iconBg: "bg-gradient-to-br from-india-green-400 to-india-green-500",
      border: "border-india-green-200",
      arrow: "bg-india-green-500 hover:bg-india-green-600 text-white",
      arrowDisabled:
        "bg-india-green-200 text-india-green-400 cursor-not-allowed",
    },
  };

  const styles = accentStyles[accentColor];

  return (
    <section id={category.value} className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl shadow-lg",
                styles.iconBg
              )}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                {category.label}
              </h2>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    styles.badge
                  )}
                >
                  Sample photos
                </span>
                {placeholders.length > 3 && (
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    Scroll to see more →
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollBy("left")}
              disabled={!canScrollLeft}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 shadow-md",
                canScrollLeft ? styles.arrow : styles.arrowDisabled
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy("right")}
              disabled={!canScrollRight}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 shadow-md",
                canScrollRight ? styles.arrow : styles.arrowDisabled
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Placeholder Images */}
        <div className="relative">
          {/* Left fade gradient */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden sm:block" />
          )}

          {/* Right fade gradient */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden sm:block" />
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {placeholders.map((placeholder, index) => (
              <div
                key={index}
                className={cn(
                  "flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[300px]",
                  "group relative cursor-default overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-300",
                  "hover:shadow-xl hover:scale-[1.02]",
                  accentColor === "saffron"
                    ? "border-saffron-200/50 hover:border-saffron-300"
                    : "border-india-green-200/50 hover:border-india-green-300",
                  "animate-image-reveal"
                )}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={placeholder.url}
                    alt={placeholder.description}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="line-clamp-2 text-sm font-medium text-white">
                        {placeholder.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Bottom accent bar */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full",
                    accentColor === "saffron"
                      ? "bg-gradient-to-r from-saffron-400 to-saffron-500"
                      : "bg-gradient-to-r from-india-green-400 to-india-green-500"
                  )}
                />
              </div>
            ))}
          </div>

          {/* Mobile scroll indicator */}
          {placeholders.length > 1 && (
            <div className="flex justify-center gap-1 mt-4 sm:hidden">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <ChevronLeft className="h-3 w-3" />
                Swipe to see more
                <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
