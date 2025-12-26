import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Heart, Users } from "lucide-react";

const OurProgramSection = () => {
  return (
    <div
      className="py-20 relative section-animate"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 153, 51, 0.03) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(19, 136, 8, 0.03) 100%)",
        backgroundImage: `
                linear-gradient(135deg, rgba(255, 153, 51, 0.015) 1px, transparent 1px),
                linear-gradient(-135deg, rgba(19, 136, 8, 0.015) 1px, transparent 1px),
                linear-gradient(45deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(19, 136, 8, 0.008) 1px, transparent 1px)
              `,
        backgroundSize: "50px 50px, 50px 50px, 100px 100px, 100px 100px",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-1 bg-orange-500 rounded"></div>
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-semibold uppercase tracking-wide">
              Our Programs
            </span>
            <div className="w-12 h-1 bg-green-500 rounded"></div>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Creating Change Through Action
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our comprehensive programs address the core challenges faced by
            Bihar's communities, creating sustainable solutions and
            opportunities for growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Education Program */}
          <Card
            className="p-6 text-center shadow-lg border border-orange-200/50 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl"
            style={{
              backgroundImage: `
                      linear-gradient(135deg, rgba(255, 153, 51, 0.05) 0%, transparent 100%),
                      linear-gradient(-45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px)
                    `,
              backgroundSize: "100% 100%, 30px 30px",
            }}
          >
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Education & Literacy
            </h3>
            <p className="text-slate-700 mb-6 leading-relaxed">
              Establishing learning centers, training teachers, and providing
              educational resources to ensure every child in Bihar has access to
              quality education.
            </p>
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">
                  Community Learning Centers
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">
                  Professional Teacher Training
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">
                  Widespread Student Enrollment
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white bg-white/80 py-2 font-medium"
            >
              Learn More
            </Button>
          </Card>

          {/* Healthcare Program */}
          <Card
            className="p-6 text-center shadow-lg border border-green-200/50 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl"
            style={{
              backgroundImage: `
                      linear-gradient(135deg, rgba(19, 136, 8, 0.05) 0%, transparent 100%),
                      linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
                    `,
              backgroundSize: "100% 100%, 30px 30px",
            }}
          >
            <div className="bg-gradient-to-br from-green-500 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Healthcare Access
            </h3>
            <p className="text-slate-700 mb-6 leading-relaxed">
              Mobile health clinics, medical camps, and healthcare awareness
              programs bringing essential medical services to underserved
              communities across Bihar.
            </p>
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">
                  Mobile Health Clinics
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">
                  Regular Medical Camps
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">
                  Extensive Patient Care
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white bg-white/80 py-2 font-medium"
            >
              Learn More
            </Button>
          </Card>

          {/* Skill Development */}
          <Card
            className="p-6 text-center shadow-lg border border-slate-200/50 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl"
            style={{
              backgroundImage: `
                      linear-gradient(135deg, rgba(100, 100, 100, 0.03) 0%, transparent 100%),
                      linear-gradient(-45deg, rgba(100, 100, 100, 0.015) 1px, transparent 1px)
                    `,
              backgroundSize: "100% 100%, 30px 30px",
            }}
          >
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Skill Development
            </h3>
            <p className="text-slate-700 mb-6 leading-relaxed">
              Vocational training programs, entrepreneurship support, and job
              placement assistance creating sustainable employment opportunities
              for Bihar's youth.
            </p>
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">
                  Vocational Training Centers
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">
                  Youth Skill Development
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">
                  Job Placement Support
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-slate-500 text-slate-600 hover:bg-slate-500 hover:text-white bg-white/80 py-2 font-medium"
            >
              Learn More
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OurProgramSection;
