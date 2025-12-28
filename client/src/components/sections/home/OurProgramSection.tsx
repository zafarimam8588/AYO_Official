import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Heart, Users } from "lucide-react";

const OurProgramSection = () => {
  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative section-animate overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 250, 245, 1) 50%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      {/* Subtle gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 20% 20%, rgba(255, 153, 51, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 80% 80%, rgba(19, 136, 8, 0.03) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 sm:w-12 h-1 bg-saffron-500 rounded"></div>
            <span className="bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent font-semibold uppercase tracking-wide text-xs sm:text-sm">
              Our Programs
            </span>
            <div className="w-8 sm:w-12 h-1 bg-india-green-500 rounded"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Creating Change Through Action
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive programs address the core challenges faced by
            Bihar's communities, creating sustainable solutions and
            opportunities for growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Education Program */}
          <Card className="p-5 sm:p-6 text-center bg-white border border-saffron-100 hover:border-saffron-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl sm:rounded-2xl shadow-lg">
            <div className="bg-gradient-to-br from-saffron-500 to-saffron-600 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
              Education & Literacy
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
              Establishing learning centers, training teachers, and providing
              educational resources to ensure every child in Bihar has access to
              quality education.
            </p>
            <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 text-left">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-500 mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-700">
                  Community Learning Centers
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-500 mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-700">
                  Professional Teacher Training
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-500 mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-700">
                  Widespread Student Enrollment
                </span>
              </div>
            </div>
            <Button
              variant="warmOutline"
              className="w-full h-10 sm:h-11 font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg border-2 bg-white/90 text-sm sm:text-base"
            >
              Learn More
            </Button>
          </Card>

          {/* Healthcare Program */}
          <Card className="p-5 sm:p-6 text-center bg-white border border-india-green-100 hover:border-india-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl sm:rounded-2xl shadow-lg">
            <div className="bg-gradient-to-br from-india-green-500 to-india-green-600 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md">
              <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
              Healthcare Access
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
              Mobile health clinics, medical camps, and healthcare awareness
              programs bringing essential medical services to underserved
              communities across Bihar.
            </p>
            <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 text-left">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-india-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-700">
                  Mobile Health Clinics
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-india-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-700">
                  Regular Medical Camps
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-india-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-700">
                  Extensive Patient Care
                </span>
              </div>
            </div>
            <Button
              variant="greenOutline"
              className="w-full h-10 sm:h-11 font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg border-2 bg-white/90 text-sm sm:text-base"
            >
              Learn More
            </Button>
          </Card>

          {/* Skill Development */}
          <Card className="p-5 sm:p-6 text-center bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl sm:rounded-2xl shadow-lg">
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md">
              <Users className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
              Skill Development
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
              Vocational training programs, entrepreneurship support, and job
              placement assistance creating sustainable employment opportunities
              for Bihar's youth.
            </p>
            <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 text-left">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-700">
                  Vocational Training Centers
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-700">
                  Youth Skill Development
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-slate-700">
                  Job Placement Support
                </span>
              </div>
            </div>
            <Button
              variant="tricolor"
              className="w-full h-10 sm:h-11 font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg border-2 border-saffron-200/50 text-sm sm:text-base"
            >
              Learn More
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OurProgramSection;
