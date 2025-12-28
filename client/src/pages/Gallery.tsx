import { useState, useEffect, useMemo, useCallback } from "react";
import { Images } from "lucide-react";
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

          {/* Empty gallery message */}
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-saffron-100 to-india-green-100">
                <Images className="h-10 w-10 text-saffron-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700">
                No Photos Yet
              </h3>
              <p className="max-w-md text-slate-500">
                Our gallery is being updated with exciting moments from our
                events and activities. Check back soon!
              </p>
            </div>
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

              // Only render categories that have images
              if (!hasRealImages) {
                return null;
              }

              return (
                <div key={category.value} id={category.value}>
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

export default Gallery;
