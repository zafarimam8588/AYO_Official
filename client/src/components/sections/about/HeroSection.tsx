import { Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import { getPicturesByPage } from "@/services/pictureService";

// Import Swiper styles
import "swiper/swiper-bundle.css";

const HeroSection = () => {
  const [heroImages, setHeroImages] = useState<
    Array<{ src: string; alt: string }>
  >([]);

  useEffect(() => {
    const fetchAboutHeroImages = async () => {
      try {
        const response = await getPicturesByPage("about");
        if (response.success && response.data && response.data.length > 0) {
          const fetchedImages = response.data.map((pic) => ({
            src: pic.imageUrl,
            alt: pic.imageDescription,
          }));
          setHeroImages(fetchedImages);
        }
      } catch (error) {
        console.error("Error fetching about hero images:", error);
        // No images will be shown
      }
    };

    fetchAboutHeroImages();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        speed={1000}
        className="hero-swiper h-full w-full"
      >
        {heroImages.length > 0 ? (
          heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="relative h-full w-full bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center">
              <p className="text-slate-600 text-lg">Loading content...</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-orange-400 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
              Azad Youth Organisation
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Empowering Bihar's youth through education, healthcare, and
            sustainable development
          </p>

          {/* Quick stats overlay */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8 mt-8 lg:mt-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur p-3 lg:p-4 rounded-2xl border border-white/20">
              <div className="text-2xl lg:text-3xl font-bold text-white">
                25K+
              </div>
              <div className="text-xs lg:text-sm text-white/80">
                Lives Transformed
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur p-3 lg:p-4 rounded-2xl border border-white/20">
              <div className="text-2xl lg:text-3xl font-bold text-white">
                500+
              </div>
              <div className="text-xs lg:text-sm text-white/80">Villages</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-3 lg:p-4 rounded-2xl border border-white/20">
              <div className="text-2xl lg:text-3xl font-bold text-white">
                10+
              </div>
              <div className="text-xs lg:text-sm text-white/80">Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style>{`
        .hero-swiper {
          width: 100%;
          height: 100%;
        }
        
        .hero-swiper .swiper-pagination {
          bottom: 5rem !important;
        }
        
        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .hero-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: white;
        }
        
        @media (max-width: 640px) {
          .hero-swiper .swiper-pagination {
            bottom: 4rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
