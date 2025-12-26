import {
  SupportOurMissionBtn,
  VolunteerNowBtn,
} from "@/components/misc/Buttons";
import { Heart, Award, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { getPicturesByPage } from "@/services/pictureService";

const HeroSection = () => {
  const [heroImage, setHeroImage] = useState<string>("");

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await getPicturesByPage("home");
        if (response.success && response.data && response.data.length > 0) {
          // Use the first image for hero section
          setHeroImage(response.data[0].imageUrl);
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
        // No image will be shown
      }
    };

    fetchHeroImage();
  }, []);

  return (
    <div
      className="relative py-14 overflow-hidden section-animate"
      style={{
        backgroundImage: `
        linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
        linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px),
        linear-gradient(0deg, rgba(255, 153, 51, 0.01) 1px, transparent 1px),
        linear-gradient(90deg, rgba(19, 136, 8, 0.01) 1px, transparent 1px)
      `,
        backgroundSize: "60px 60px, 60px 60px, 40px 40px, 40px 40px",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-green-600 p-3 rounded-2xl shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Azad Youth Organisation
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-600 to-slate-800 bg-clip-text text-transparent">
                Empowering Youth,
              </span>
              <span className="block bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                Building Tomorrow
              </span>
            </h1>

            <p className="text-xl text-slate-700 leading-relaxed max-w-2xl">
              Azad Youth Organization is dedicated to empowering youth and
              bringing positive change in society through education, health,
              environment, and social justice initiatives across Bihar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <SupportOurMissionBtn />
              <VolunteerNowBtn />
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  25K+
                </div>
                <div className="text-sm text-slate-600">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-sm text-slate-600">Villages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  10+
                </div>
                <div className="text-sm text-slate-600">Years Impact</div>
              </div>
            </div>
          </div>

          <div className="relative">
            {heroImage ? (
              <>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={heroImage}
                    alt="Children in Bihar classroom - Azad Youth Organisation"
                    width={600}
                    height={500}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute top-6 -left-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-orange-200">
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-500 p-2 rounded-full">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-600">
                        1,200+
                      </div>
                      <div className="text-xs text-slate-600">
                        Active Volunteers
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 p-2 rounded-full">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        150+
                      </div>
                      <div className="text-xs text-slate-600">
                        Learning Centers
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-50 to-green-50 h-[500px] flex items-center justify-center">
                <p className="text-slate-600 text-lg">Loading content...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
