import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getPicturesByPage } from "@/services/pictureService";

const AboutSection = () => {
  const [images, setImages] = useState<
    Array<{ src: string; alt: string; border: string }>
  >([]);

  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    const fetchAboutImages = async () => {
      try {
        const response = await getPicturesByPage("about");
        if (response.success && response.data && response.data.length > 0) {
          // First image for background
          if (response.data[0]?.imageUrl) {
            setBackgroundImage(response.data[0].imageUrl);
          }

          // Images 2-5 for the grid (skip first background image)
          const aboutImages = response.data.slice(1, 5).map((pic, index) => ({
            src: pic.imageUrl,
            alt: pic.imageDescription,
            border:
              index % 2 === 0 ? "border-orange-200/50" : "border-green-200/50",
          }));

          // Use images from backend
          if (aboutImages.length > 0) {
            // Fill remaining slots with default images if needed
            while (aboutImages.length < 4) {
              const defaultImage = images[aboutImages.length];
              aboutImages.push(defaultImage);
            }
            setImages(aboutImages);
          }
        }
      } catch (error) {
        console.error("Error fetching about images:", error);
        // Keep default images and pattern on error
      }
    };

    fetchAboutImages();
  }, []);

  return (
    <div
      className="py-16 bg-white relative section-animate"
      style={
        backgroundImage
          ? {
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.92)),
                url(${backgroundImage})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {
              backgroundImage: `
                linear-gradient(90deg, rgba(255, 153, 51, 0.015) 1px, transparent 1px),
                linear-gradient(0deg, rgba(19, 136, 8, 0.015) 1px, transparent 1px),
                linear-gradient(45deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(19, 136, 8, 0.008) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px, 80px 80px, 120px 120px, 120px 120px",
            }
      }
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images Section */}
          <div className="relative">
            {/* Large Screen: 2x2 Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`rounded-2xl shadow-lg w-full h-48 object-cover border ${image.border} transition-all duration-300 group-hover:shadow-xl group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Small Screen: Horizontal Scroll */}
            <div className="sm:hidden relative">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((image, index) => (
                  <div key={index} className="flex-shrink-0 relative group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`rounded-2xl shadow-lg w-64 h-40 object-cover border ${image.border} transition-all duration-300`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                ))}
              </div>

              {/* Gradient fade effects for mobile scroll */}
              <div className="absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
              <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-orange-200/50 hidden sm:block">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  10+
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  Years of Impact
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-green-500 rounded"></div>
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-semibold uppercase tracking-wide">
                About Us
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              <span className="text-slate-800">Empowering Youth, Building</span>
              <span className="block bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                A Better Tomorrow
              </span>
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              Azad Youth Organization is a non-profit dedicated to empowering
              youth and bringing positive change in society through education,
              health, environment, and social justice. We believe that youth are
              the future of our nation, and we are committed to inspiring them
              to create a mature democracy where everyone is aware of their
              rights and responsibilities.
            </p>

            {/* Stats Row for Mobile */}
            <div className="sm:hidden bg-gradient-to-r from-orange-50 to-green-50 p-4 rounded-2xl border border-orange-200/30">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                    25K+
                  </div>
                  <div className="text-xs text-slate-600">Lives Changed</div>
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-xs text-slate-600">Villages</div>
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    10+
                  </div>
                  <div className="text-xs text-slate-600">Years</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3 group">
                <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                    Civic Awareness & Patriotism
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Spreading awareness about democratic values and inspiring
                    love for the nation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors duration-300">
                    Leadership Development
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Building future leaders with moral values and scientific
                    thinking
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                    Education Empowerment
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Scholarship programs and awareness initiatives to promote
                    higher education
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors duration-300">
                    Sustainable Environment
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Tree plantation drives and environmental protection
                    initiatives
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-4">
              <div className="bg-gradient-to-r from-orange-500/10 to-green-500/10 p-4 rounded-2xl border border-orange-200/30">
                <p className="text-slate-700 text-sm italic text-center">
                  "We believe that youth are the future of the nation. We are
                  committed to empowering them and inspiring them to bring
                  positive changes in society."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default AboutSection;
