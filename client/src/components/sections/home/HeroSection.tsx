import { Button } from "@/components/ui/button";
import { Heart, Users, Award, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <div
      className="relative py-14 overflow-hidden"
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
                Building Hope,
              </span>
              <span className="block bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                Transforming Bihar
              </span>
            </h1>

            <p className="text-xl text-slate-700 leading-relaxed max-w-2xl">
              Join us in our mission to empower Bihar's youth through quality
              education, accessible healthcare, and sustainable development
              opportunities. Together, we can create lasting change in our
              communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-6 py-3 text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Heart className="h-4 w-4 mr-2" />
                Support Our Mission
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-6 py-3 text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white/80"
              >
                <Users className="h-4 w-4 mr-2" />
                Become a Volunteer
              </Button>
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/8422085/pexels-photo-8422085.jpeg"
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
                  <div className="text-lg font-bold text-green-600">150+</div>
                  <div className="text-xs text-slate-600">Learning Centers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
