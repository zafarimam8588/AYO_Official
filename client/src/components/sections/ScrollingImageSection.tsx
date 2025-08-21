import { useRef, useEffect } from "react";

// Gallery images for "Our Work in Action"
const galleryImages = [
  {
    src: "https://images.pexels.com/photos/8422085/pexels-photo-8422085.jpeg",
    alt: "Children learning in Bihar classroom",
  },
  {
    src: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg",
    alt: "Healthcare program in villages",
  },
  {
    src: "https://images.pexels.com/photos/8923034/pexels-photo-8923034.jpeg",
    alt: "Skill development training",
  },
  {
    src: "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg",
    alt: "Community development activities",
  },
  {
    src: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
    alt: "Women empowerment program",
  },
  {
    src: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    alt: "Youth leadership development",
  },
];

const ScrollingImageSection = () => {
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  // Add the auto-scroll effect
  useEffect(() => {
    const galleryContainer = galleryScrollRef.current;
    if (!galleryContainer) return;

    let scrollSpeed = 0.5; // pixels per frame
    let animationId: number;

    const smoothScroll = () => {
      if (galleryContainer) {
        galleryContainer.scrollLeft += scrollSpeed;

        // Reset scroll when we've scrolled through half the content (since we doubled the images)
        const maxScroll = galleryContainer.scrollWidth / 2;
        if (galleryContainer.scrollLeft >= maxScroll) {
          galleryContainer.scrollLeft = 0;
        }

        animationId = requestAnimationFrame(smoothScroll);
      }
    };

    // Start the animation
    animationId = requestAnimationFrame(smoothScroll);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationId) cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(smoothScroll);
    };

    galleryContainer.addEventListener("mouseenter", handleMouseEnter);
    galleryContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (galleryContainer) {
        galleryContainer.removeEventListener("mouseenter", handleMouseEnter);
        galleryContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

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

      {/* Smooth Auto-scrolling Image Gallery */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          ref={galleryScrollRef}
          className="flex gap-6 overflow-x-scroll scrollbar-hide" // Changed from overflow-x-hidden to overflow-x-scroll
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={`${image.alt}-${index}`}
              className="flex-shrink-0 w-72 lg:w-80 relative group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 lg:h-56 object-cover rounded-2xl shadow-lg border border-orange-200/50 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Fade Effects */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>

      {/* CSS to hide scrollbars */}
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

export default ScrollingImageSection;
