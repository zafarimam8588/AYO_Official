import { CheckCircle, Award, Calendar, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getPicturesByPage } from "@/services/pictureService";
import { ImageContainer } from "@/components/common";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AdminImageBadge } from "@/components/common/AdminImageOverlay";
import type { Picture } from "@/types";

interface ImageWithColor {
  picture: Picture;
  color: "saffron" | "green";
}

const AboutSection = () => {
  const [images, setImages] = useState<ImageWithColor[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHomeImages = async () => {
      try {
        // Fetch images from "home" page
        // Image #1 is used in HeroSection, images #2-5 are used here in the grid
        const response = await getPicturesByPage("home");
        if (response.success && response.data && response.data.length > 0) {
          // Use first image as background (subtle background effect)
          if (response.data[0]?.imageUrl) {
            setBackgroundImage(response.data[0].imageUrl);
          }

          // Use images #2-5 for the 4-image grid (skip image #1 which is in HeroSection)
          const gridImages = response.data
            .filter((pic) => pic.imageNumber >= 2 && pic.imageNumber <= 5)
            .sort((a, b) => a.imageNumber - b.imageNumber)
            .map((pic, index) => ({
              picture: pic,
              color: (index % 2 === 0 ? "saffron" : "green") as
                | "saffron"
                | "green",
            }));

          if (gridImages.length > 0) {
            setImages(gridImages);
          }
        }
      } catch (error) {
        console.error("Error fetching home images:", error);
      }
    };

    fetchHomeImages();
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

  const features = [
    {
      icon: CheckCircle,
      title: "Civic Awareness & Patriotism",
      description:
        "Spreading awareness about democratic values and inspiring love for the nation",
      color: "saffron" as const,
    },
    {
      icon: CheckCircle,
      title: "Leadership Development",
      description:
        "Building future leaders with moral values and scientific thinking",
      color: "green" as const,
    },
    {
      icon: CheckCircle,
      title: "Education Empowerment",
      description:
        "Scholarship programs and awareness initiatives to promote higher education",
      color: "saffron" as const,
    },
    {
      icon: CheckCircle,
      title: "Sustainable Environment",
      description:
        "Tree plantation drives and environmental protection initiatives",
      color: "green" as const,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.97), rgba(255, 255, 255, 0.95)),
                url(${backgroundImage})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Subtle gradient mesh background */}
      {!backgroundImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 0% 50%, rgba(255, 153, 51, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 100% 50%, rgba(19, 136, 8, 0.05) 0%, transparent 50%)
            `,
          }}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Images Section - 2x2 Grid for all screen sizes */}
          <div
            className={cn(
              "relative",
              isVisible ? "animate-slide-in-left" : "opacity-0"
            )}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {images.length > 0
                ? images.map((image, index) => (
                    <div
                      key={image.picture._id}
                      className={cn(
                        "relative group",
                        index === 0 && "sm:mt-6",
                        index === 3 && "sm:-mt-6"
                      )}
                    >
                      <ImageContainer
                        src={image.picture.imageUrl}
                        alt={`About image ${image.picture.imageNumber}`}
                        aspectRatio="4:3"
                        rounded="2xl"
                        hoverEffect="zoom"
                        borderColor={image.color}
                        className="transition-all duration-500"
                      />
                      {/* Admin badge showing image identifier */}
                      <AdminImageBadge
                        picture={image.picture}
                        position="top-right"
                      />
                    </div>
                  ))
                : Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        index === 0 && "sm:mt-6",
                        index === 3 && "sm:-mt-6"
                      )}
                    >
                      <Skeleton
                        className="w-full rounded-2xl"
                        style={{ aspectRatio: "4/3" }}
                      />
                    </div>
                  ))}
            </div>

            {/* Floating Stats Card */}
            <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl border border-saffron-100 hidden sm:flex items-center gap-3 sm:gap-4 animate-float-slow">
              <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-saffron-100 to-saffron-200">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-saffron-600" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                  10+
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">
                  Years of Impact
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className={cn(
              "space-y-5 sm:space-y-6",
              isVisible ? "animate-slide-in-right" : "opacity-0"
            )}
          >
            {/* Section badge */}
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 sm:w-8 rounded-full bg-saffron-500" />
              <div className="h-1 w-3 sm:w-4 rounded-full bg-slate-300" />
              <span className="bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent font-semibold uppercase tracking-wide text-xs sm:text-sm">
                About Us
              </span>
              <div className="h-1 w-3 sm:w-4 rounded-full bg-slate-300" />
              <div className="h-1 w-6 sm:w-8 rounded-full bg-india-green-500" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-slate-800">Empowering Youth, Building</span>
              <span className="block bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                A Better Tomorrow
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Azad Youth Organization is a non-profit dedicated to empowering
              youth and bringing positive change in society through education,
              health, environment, and social justice. We believe that youth are
              the future of our nation, and we are committed to inspiring them
              to create a mature democracy where everyone is aware of their
              rights and responsibilities.
            </p>

            {/* Mobile Stats Row */}
            <div className="sm:hidden bg-gradient-to-r from-saffron-50 to-india-green-50 p-4 rounded-xl border border-slate-200">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <Users className="w-3.5 h-3.5 text-saffron-500" />
                    <span className="text-lg font-bold text-saffron-600">
                      25K+
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-600">
                    Lives Changed
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-india-green-500" />
                    <span className="text-lg font-bold text-india-green-600">
                      500+
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-600">Villages</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <Award className="w-3.5 h-3.5 text-saffron-500" />
                    <span className="text-lg font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                      10+
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-600">Years</div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 sm:gap-3 group p-2.5 sm:p-3 rounded-lg sm:rounded-xl hover:bg-warm-50 transition-colors duration-300"
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 sm:h-6 sm:w-6 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                        feature.color === "saffron"
                          ? "text-saffron-500"
                          : "text-india-green-500"
                      )}
                    />
                    <div>
                      <h4
                        className={cn(
                          "font-semibold text-sm sm:text-base text-slate-900 transition-colors duration-300",
                          feature.color === "saffron"
                            ? "group-hover:text-saffron-600"
                            : "group-hover:text-india-green-600"
                        )}
                      >
                        {feature.title}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <div className="pt-2 sm:pt-4">
              <div className="bg-gradient-to-r from-saffron-50 to-india-green-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
                <p className="text-slate-600 text-xs sm:text-sm italic text-center leading-relaxed">
                  "We believe that youth are the future of the nation. We are
                  committed to empowering them and inspiring them to bring
                  positive changes in society."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
