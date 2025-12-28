import {
  SupportOurMissionBtn,
  VolunteerNowBtn,
} from "@/components/misc/Buttons";
import { Heart, Award, BookOpen, Users, MapPin, Calendar } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getPicturesByPage } from "@/services/pictureService";
import { ImageContainer } from "@/components/common";
import { AdminImageBadge } from "@/components/common/AdminImageOverlay";
import type { Picture } from "@/types";

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
  const [heroPicture, setHeroPicture] = useState<Picture | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const livesCount = useCountUp(25000, 2000, isVisible);
  const villagesCount = useCountUp(500, 2000, isVisible);
  const yearsCount = useCountUp(10, 2000, isVisible);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await getPicturesByPage("home");
        if (response.success && response.data && response.data.length > 0) {
          // Find image #1 specifically, or use first available
          const image1 = response.data.find((pic) => pic.imageNumber === 1);
          setHeroPicture(image1 || response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchHeroImage();
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
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-b from-white to-warm-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile-first: Image first, then content. Desktop: content left, image right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Section - First on mobile, Second on desktop */}
          <div className="order-first lg:order-last w-full animate-fade-in animation-delay-200">
            <div className="relative">
              {heroPicture ? (
                <>
                  {/* Main Hero Image - using hero preset for optimized loading */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                    <ImageContainer
                      src={heroPicture.imageUrl}
                      alt="Children in Bihar classroom - Azad Youth Organisation"
                      aspectRatio="4:3"
                      rounded="none"
                      overlay="gradient-bottom"
                      hoverEffect="zoom"
                      priority
                      preset="hero"
                      className="w-full"
                    />
                    {/* Admin badge showing image identifier */}
                    <AdminImageBadge
                      picture={heroPicture}
                      position="top-right"
                    />
                  </div>

                  {/* Floating Stats Cards - Hidden on mobile, visible on tablet+ */}
                  <div className="hidden sm:flex absolute top-4 sm:top-6 left-2 sm:left-4 lg:-left-6 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-saffron-100 animate-float-slow hover-lift items-center gap-2 sm:gap-3">
                    <div className="bg-gradient-to-br from-saffron-400 to-saffron-600 p-2 sm:p-2.5 rounded-lg sm:rounded-xl">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-saffron-600">
                        1,200+
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-600 font-medium">
                        Active Volunteers
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex absolute -bottom-2 sm:-bottom-4 right-2 sm:right-4 lg:-right-6 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-india-green-100 animate-float-slow animation-delay-300 hover-lift items-center gap-2 sm:gap-3">
                    <div className="bg-gradient-to-br from-india-green-400 to-india-green-600 p-2 sm:p-2.5 rounded-lg sm:rounded-xl">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-india-green-600">
                        150+
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-600 font-medium">
                        Learning Centers
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-gradient-to-br from-saffron-50 to-india-green-50">
                  <div
                    className="w-full flex items-center justify-center"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <div className="text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4" />
                      <p className="text-slate-500 font-medium text-sm sm:text-base">
                        Loading image...
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section - Second on mobile, First on desktop */}
          <div className="order-last lg:order-first space-y-5 sm:space-y-6 lg:space-y-8">
            {/* Brand badge */}
            <div className="flex items-center gap-2 sm:gap-3 animate-fade-in">
              <div className="bg-gradient-to-br from-saffron-500 to-india-green-600 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                Azad Youth Organisation
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in animation-delay-100">
              <span className="bg-gradient-to-r from-saffron-600 to-slate-800 bg-clip-text text-transparent">
                Empowering Youth,
              </span>
              <span className="block bg-gradient-to-r from-india-green-600 via-slate-700 to-saffron-500 bg-clip-text text-transparent mt-1 sm:mt-2">
                Building Tomorrow
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl animate-fade-in animation-delay-200">
              Azad Youth Organization is dedicated to empowering youth and
              bringing positive change in society through education, health,
              environment, and social justice initiatives across Bihar.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in animation-delay-300">
              <SupportOurMissionBtn />
              <VolunteerNowBtn />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-200 animate-fade-in animation-delay-400">
              <div className="text-center group">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saffron-500" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-saffron-600 to-saffron-700 bg-clip-text text-transparent">
                    {livesCount.toLocaleString()}+
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-slate-600 font-medium">
                  Lives Transformed
                </div>
              </div>

              <div className="text-center group">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-india-green-500" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-india-green-600 to-india-green-700 bg-clip-text text-transparent">
                    {villagesCount}+
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-slate-600 font-medium">
                  Villages Reached
                </div>
              </div>

              <div className="text-center group">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saffron-500" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                    {yearsCount}+
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-slate-600 font-medium">
                  Years of Impact
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
