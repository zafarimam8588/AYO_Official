import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Map } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getPicturesByPage } from "@/services/pictureService";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Main+Road+Motihari+East+Champaran+845401+Bihar+India";

const MapSection = () => {
  const [mapImage, setMapImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch map image from backend
  useEffect(() => {
    const fetchMapImage = async () => {
      try {
        const response = await getPicturesByPage("contact");
        if (response.success && response.data && response.data.length > 0) {
          setMapImage(response.data[0].imageUrl);
        }
      } catch (error) {
        console.error("Error fetching map image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapImage();
  }, []);

  // Intersection Observer for fade-in animation
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

  return (
    <section
      ref={sectionRef}
      className={`py-8 sm:py-12 lg:py-16 relative z-10 ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Map Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 bg-white/80 backdrop-blur-sm">
            {/* Map Image or Placeholder */}
            {isLoading ? (
              <Skeleton className="w-full h-48 sm:h-64 lg:h-80" />
            ) : mapImage ? (
              <img
                src={mapImage}
                alt="Location map showing Azad Youth Organisation office at Main Road, Motihari, East Champaran, Bihar"
                className="w-full h-48 sm:h-64 lg:h-80 object-cover"
              />
            ) : (
              // Enhanced placeholder map design
              <div className="w-full h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 relative overflow-hidden">
                {/* Map-like grid pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Decorative road lines */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200/60 transform -translate-y-1/2" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-slate-200/60 transform -translate-x-1/2" />
                  <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-slate-200/40" />
                  <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-slate-200/40" />
                  <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-slate-200/40" />
                  <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-slate-200/40" />
                </div>

                {/* Corner decorative elements */}
                <div className="absolute top-4 left-4 flex items-center gap-2 text-slate-400">
                  <Map className="h-4 w-4" />
                  <span className="text-xs font-medium">Motihari, Bihar</span>
                </div>

                {/* Center location marker with enhanced design */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Outer glow rings */}
                    <div className="absolute -inset-8 bg-saffron-400/10 rounded-full animate-pulse" />
                    <div className="absolute -inset-5 bg-saffron-400/20 rounded-full" />

                    {/* Main marker pin */}
                    <div className="relative">
                      {/* Pin body */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-saffron-500 via-saffron-600 to-india-green-600 rounded-full shadow-2xl flex items-center justify-center relative z-10">
                        <MapPin className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-md" />
                      </div>

                      {/* Pin pointer/tail */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent border-t-india-green-600 z-0" />

                      {/* Shadow under pin */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-slate-900/20 rounded-full blur-sm" />
                    </div>

                    {/* Animated pulse ring */}
                    <div className="absolute -inset-3 border-2 border-saffron-400/50 rounded-full animate-ping" />
                  </div>
                </div>

                {/* Bottom location text */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-slate-500 text-xs font-medium bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                    Main Road
                  </span>
                  <span className="text-slate-500 text-xs font-medium bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                    845401
                  </span>
                </div>
              </div>
            )}

            {/* Overlay Address Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-200/50 max-w-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-saffron-500 to-india-green-500 p-2.5 rounded-xl shadow-md flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm">
                      Azad Youth Organisation
                    </p>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Main Road, Motihari, East Champaran - 845401
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Get Directions Button - Desktop */}
            <div className="absolute bottom-4 right-4 hidden sm:block">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to our office on Google Maps"
                className="group inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-saffron-500 to-india-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <Navigation className="h-4 w-4 group-hover:animate-pulse" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Enhanced Mobile Get Directions Button */}
          <div className="mt-4 sm:hidden">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-saffron-500 to-india-green-500 text-white font-semibold rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
              aria-label="Get directions to our office on Google Maps"
            >
              <Navigation className="h-5 w-5" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
