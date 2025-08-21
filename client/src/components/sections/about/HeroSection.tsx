import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const heroScrollRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero poster images - high quality, full screen
  const heroImages = [
    {
      src: "https://images.pexels.com/photos/8422085/pexels-photo-8422085.jpeg",
      alt: "Children learning in Bihar classroom - Education empowerment",
    },
    {
      src: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg",
      alt: "Healthcare program reaching rural Bihar villages",
    },
    {
      src: "https://images.pexels.com/photos/8923034/pexels-photo-8923034.jpeg",
      alt: "Skill development training for youth in Bihar",
    },
    {
      src: "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg",
      alt: "Community development activities transforming lives",
    },
    {
      src: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      alt: "Women empowerment program creating opportunities",
    },
  ];

  // FIXED: Hero auto-scroll effect - seamless forward loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  // FIXED: Apply the slide transition with viewport units
  useEffect(() => {
    const heroContainer = heroScrollRef.current as unknown as HTMLDivElement; // Type assertion
    if (!heroContainer) return;

    heroContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
    heroContainer.style.transition = "transform 1s ease-in-out";
  }, [currentSlide]);
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* FIXED: Properly working auto-scroll slider */}
      <div
        ref={heroScrollRef}
        className="flex h-full"
        style={{
          width: `${heroImages.length * 100}vw`,
          willChange: "transform",
        }}
      >
        {heroImages.map((image, index) => (
          <div key={index} className="relative flex-shrink-0 h-full w-screen">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
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

      {/* Image indicator dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-6" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
