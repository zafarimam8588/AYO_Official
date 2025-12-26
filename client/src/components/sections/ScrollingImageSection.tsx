import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import { getAllPictures } from "@/services/pictureService";
import type { Picture } from "@/types";
import { Loader2 } from "lucide-react";

// Import Swiper styles
import "swiper/swiper-bundle.css";

// No fallback images - will show message if no images from backend
const fallbackImages: { src: string; alt: string }[] = [];

const ScrollingImageSection = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAboutPictures();
  }, []);

  const fetchAboutPictures = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPictures({
        pageToDisplay: "gallery",
        limit: 50,
      });
      setPictures(response.data);
    } catch (error: any) {
      console.error("Error fetching gallery pictures:", error);
      // Will use fallback images if fetch fails
    } finally {
      setIsLoading(false);
    }
  };

  // Use database images if available, otherwise use fallback images
  const displayImages =
    pictures.length > 0
      ? pictures.map((pic) => ({
          src: pic.imageUrl,
          alt: pic.imageDescription,
        }))
      : fallbackImages;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="text-center mb-10 lg:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Our Work in Action
        </h2>
        <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
          See how we're making a difference across Bihar's communities
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
        </div>
      ) : displayImages.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-20 text-center">
          <p className="text-slate-600 text-lg mb-2">
            No images available at the moment
          </p>
          <p className="text-slate-500 text-sm">
            Please check back later for updates
          </p>
        </div>
      ) : (
        <div className="relative">
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
            {displayImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 lg:h-56 object-cover rounded-2xl shadow-lg border border-orange-200/50 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium line-clamp-2">
                      {image.alt}
                    </p>
                  </div>
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
          background: #f97316;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }
        
        .about-images-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(to right, #f97316, #10b981);
          width: 12px;
          height: 12px;
        }
      `}</style>
    </div>
  );
};

export default ScrollingImageSection;
