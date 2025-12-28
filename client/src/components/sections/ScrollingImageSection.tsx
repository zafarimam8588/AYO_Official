import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import { getAllPictures } from "@/services/pictureService";
import type { Picture } from "@/types";
import { Loader2, ZoomIn } from "lucide-react";
import { SectionHeader } from "@/components/common";
import { cn } from "@/lib/utils";
import { AdminImageBadge } from "@/components/common/AdminImageOverlay";

// Import Swiper styles
import "swiper/swiper-bundle.css";

const ScrollingImageSection = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchAboutPictures();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fetchAboutPictures = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPictures({
        pageName: "gallery",
        limit: 50,
      });
      setPictures(response.data);
    } catch (error: unknown) {
      console.error("Error fetching gallery pictures:", error);
      // Will use fallback images if fetch fails
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-india-green-50/30 via-white to-saffron-50/30"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(19, 136, 8, 0.03) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Our Impact"
          title="Our Work in Action"
          subtitle="See how we're making a difference across Bihar's communities"
          titleColor="gradient"
          badgeVariant="green"
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-saffron-500" />
          </div>
        ) : pictures.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 text-center">
            <p className="text-slate-600 text-lg mb-2">
              No images available at the moment
            </p>
            <p className="text-slate-500 text-sm">
              Please check back later for updates
            </p>
          </div>
        ) : (
          <div
            className={cn(
              "relative mt-12",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
          >
            <Swiper
              modules={[Autoplay, Pagination, FreeMode]}
              spaceBetween={24}
              slidesPerView="auto"
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={5000}
              freeMode={{
                enabled: true,
                momentum: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              className="about-images-swiper"
            >
              {pictures.map((picture) => (
                <SwiperSlide key={picture._id}>
                  <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                    <img
                      src={picture.imageUrl}
                      alt={`Gallery image ${picture.imageNumber}`}
                      className="w-full h-52 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium text-white line-clamp-2">
                        {`Gallery image ${picture.imageNumber}`}
                      </p>
                    </div>

                    {/* Zoom icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>

                    {/* Admin badge showing image identifier */}
                    <AdminImageBadge picture={picture} position="top-left" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <style>{`
          .about-images-swiper {
            padding: 20px 0 50px 0;
          }

          .about-images-swiper .swiper-pagination-bullet {
            background: var(--saffron-500);
            opacity: 0.5;
            width: 10px;
            height: 10px;
          }

          .about-images-swiper .swiper-pagination-bullet-active {
            opacity: 1;
            background: linear-gradient(to right, var(--saffron-500), var(--india-green-500));
            width: 12px;
            height: 12px;
          }
        `}</style>
      </div>
    </section>
  );
};

export default ScrollingImageSection;
