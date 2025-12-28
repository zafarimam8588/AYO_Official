import { Heart, Users, MapPin, Calendar, ChevronDown } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import { getPicturesByPage } from "@/services/pictureService";
import { cn } from "@/lib/utils";
import { AdminImageBadge } from "@/components/common/AdminImageOverlay";
import type { Picture } from "@/types";

// Import Swiper styles
import "swiper/swiper-bundle.css";

// Counter animation hook
function useCountUp(
  end: number,
  duration: number = 2000,
  shouldAnimate: boolean = true
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, shouldAnimate]);

  return count;
}

const HeroSection = () => {
  const [heroPictures, setHeroPictures] = useState<Picture[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const livesCount = useCountUp(25000, 2500, isVisible);
  const villagesCount = useCountUp(500, 2500, isVisible);
  const yearsCount = useCountUp(10, 2000, isVisible);

  useEffect(() => {
    const fetchAboutHeroImages = async () => {
      try {
        const response = await getPicturesByPage("about");
        if (response.success && response.data && response.data.length > 0) {
          setHeroPictures(response.data);
        }
      } catch (error) {
        console.error("Error fetching about hero images:", error);
      }
    };

    fetchAboutHeroImages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        speed={1200}
        className="hero-swiper h-full w-full"
      >
        {heroPictures.length > 0 ? (
          heroPictures.map((picture, index) => (
            <SwiperSlide key={picture._id}>
              <div className="relative h-full w-full overflow-hidden bg-slate-900">
                {/* Image container with proper centering to prevent stretching */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={picture.imageUrl}
                    alt={`About page image ${picture.imageNumber}`}
                    className="min-w-full min-h-full w-auto h-auto object-cover"
                    style={{
                      objectPosition: "center center",
                    }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
                {/* Admin badge showing image identifier */}
                <AdminImageBadge picture={picture} position="top-right" />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="relative h-full w-full bg-gradient-to-br from-saffron-100 via-warm-50 to-india-green-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-600 font-medium">Loading...</p>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10 pointer-events-none">
        <div className="max-w-5xl mx-auto">
          {/* Animated badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full",
              "bg-white/12 backdrop-blur-md border border-white/25",
              "shadow-xl mb-8",
              isVisible ? "animate-scale-in" : "opacity-0"
            )}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-india-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-india-green-400" />
            </span>
            <span className="text-sm font-medium text-white/95 tracking-wide">
              Transforming Lives Across Bihar
            </span>
          </div>

          {/* Main heading */}
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6",
              isVisible ? "animate-fade-in animation-delay-100" : "opacity-0"
            )}
          >
            <div className="bg-gradient-to-br from-saffron-400 to-india-green-500 p-3 sm:p-4 rounded-2xl shadow-xl ring-4 ring-white/20">
              <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-saffron-100 to-white bg-clip-text text-transparent">
                Azad Youth Organisation
              </span>
            </h1>
          </div>

          <p
            className={cn(
              "text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto",
              "leading-relaxed drop-shadow-lg mb-10",
              isVisible ? "animate-fade-in animation-delay-200" : "opacity-0"
            )}
          >
            Empowering Bihar's youth through education, healthcare, and
            sustainable development initiatives
          </p>

          {/* Tricolor accent bar */}
          <div
            className={cn(
              "flex justify-center gap-2 mb-10",
              isVisible ? "animate-fade-in animation-delay-300" : "opacity-0"
            )}
          >
            <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-saffron-300 to-saffron-500 shadow-sm" />
            <div className="h-1.5 w-10 rounded-full bg-white/60 shadow-sm" />
            <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-india-green-400 to-india-green-600 shadow-sm" />
          </div>

          {/* Quick stats overlay - improved with stagger animations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-2xl mx-auto">
            {/* Lives Transformed */}
            <div
              className={cn(
                "bg-white/10 backdrop-blur-lg p-4 lg:p-6 rounded-2xl",
                "border border-white/20 shadow-xl",
                "transform transition-all duration-500",
                "hover:bg-white/15 hover:scale-105 hover:border-white/30",
                isVisible ? "animate-fade-in" : "opacity-0"
              )}
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {livesCount.toLocaleString()}+
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">
                Lives Transformed
              </div>
            </div>

            {/* Villages Reached */}
            <div
              className={cn(
                "bg-white/10 backdrop-blur-lg p-4 lg:p-6 rounded-2xl",
                "border border-white/20 shadow-xl",
                "transform transition-all duration-500",
                "hover:bg-white/15 hover:scale-105 hover:border-white/30",
                isVisible ? "animate-fade-in" : "opacity-0"
              )}
              style={{ animationDelay: "500ms" }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-india-green-400 to-india-green-600 flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {villagesCount}+
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">
                Villages Reached
              </div>
            </div>

            {/* Years of Impact */}
            <div
              className={cn(
                "bg-white/10 backdrop-blur-lg p-4 lg:p-6 rounded-2xl",
                "border border-white/20 shadow-xl",
                "transform transition-all duration-500",
                "hover:bg-white/15 hover:scale-105 hover:border-white/30",
                isVisible ? "animate-fade-in" : "opacity-0"
              )}
              style={{ animationDelay: "600ms" }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center shadow-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {yearsCount}+
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">
                Years of Impact
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in animation-delay-500">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/70 font-medium">
            Scroll to explore
          </span>
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-2">
            <ChevronDown className="w-4 h-4 text-white/80 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Decorative gradient overlays */}
      <div className="absolute top-0 left-0 w-1/3 h-32 bg-gradient-to-br from-saffron-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-32 bg-gradient-to-bl from-india-green-500/20 to-transparent pointer-events-none" />

      {/* Custom Swiper Styles */}
      <style>{`
        .hero-swiper {
          width: 100%;
          height: 100%;
        }

        .hero-swiper .swiper-pagination {
          bottom: 6rem !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 5px;
          background: linear-gradient(90deg, #FF9933 0%, #138808 100%);
        }

        @media (max-width: 640px) {
          .hero-swiper .swiper-pagination {
            bottom: 5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
