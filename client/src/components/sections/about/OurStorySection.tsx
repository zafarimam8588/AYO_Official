import { useState, useEffect } from "react";
import { getPicturesByPage } from "@/services/pictureService";

const OurStorySection = () => {
  const [storyImage, setStoryImage] = useState("");

  useEffect(() => {
    const fetchStoryImage = async () => {
      try {
        const response = await getPicturesByPage("about");
        if (response.success && response.data && response.data.length > 0) {
          // Use the first image from about page
          setStoryImage(response.data[0].imageUrl);
        }
      } catch (error) {
        console.error("Error fetching story image:", error);
        // No image will be shown
      }
    };

    fetchStoryImage();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Story Image with Stats Card */}
        <div className="relative order-2 lg:order-1">
          {storyImage ? (
            <>
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl group"
                style={{
                  backgroundImage: `
                    linear-gradient(135deg, rgba(255, 153, 51, 0.02) 0%, transparent 100%),
                    linear-gradient(45deg, rgba(19, 136, 8, 0.01) 1px, transparent 1px)
                  `,
                  backgroundSize: "100% 100%, 30px 30px",
                }}
              >
                <img
                  src={storyImage}
                  alt="Azad Youth Organisation - empowering Bihar's communities"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover border-2 border-orange-200/50 rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent rounded-2xl"></div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 -right-4 lg:-right-6 bg-white/95 backdrop-blur p-4 lg:p-6 rounded-2xl shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    10+
                  </p>
                  <p className="text-xs lg:text-sm text-slate-600 font-medium">
                    Years of Impact
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-50 to-green-50 h-64 sm:h-80 lg:h-96 flex items-center justify-center">
              <p className="text-slate-600 text-lg">Loading content...</p>
            </div>
          )}
        </div>

        {/* Story Content */}
        <div className="space-y-4 lg:space-y-6 order-1 lg:order-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 lg:w-12 h-1 bg-gradient-to-r from-orange-500 to-green-500 rounded"></div>
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-semibold uppercase tracking-wide text-sm lg:text-base">
              Our Journey
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 lg:mb-6">
            Our Story
          </h2>

          <div className="space-y-4 text-base lg:text-lg text-slate-700 leading-relaxed">
            <p>
              Azad Youth Organization is a non-profit organization dedicated to
              empowering youth and bringing positive change in society. We work
              in various fields such as education, health, environment, and
              social justice across Bihar.
            </p>
            <p>
              We believe that youth are the future of the nation. Through our
              comprehensive programs, we empower young people and inspire them
              to create positive changes in their communities. From Gandhi
              Jayanti celebrations to education awareness programs, we organize
              various initiatives throughout the year.
            </p>
            <p>
              Our mission is to educate youth about the values of democracy and
              patriotism, develop leadership skills and moral values, promote
              sustainable development, and build an inclusive society that
              celebrates communal harmony.
            </p>
          </div>

          {/* Additional Story Elements */}
          <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl border border-orange-200/30">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                25K+
              </div>
              <div className="text-xs text-slate-600">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-xs text-slate-600">Villages Reached</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStorySection;
