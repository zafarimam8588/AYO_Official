import { Card } from "@/components/ui/card";
import { BookOpen, Heart, Users } from "lucide-react";

const OurPrograms = () => {
  return (
    <div
      className="py-12 lg:py-8 relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 153, 51, 0.03) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(19, 136, 8, 0.03) 100%)",
        backgroundImage: `
            linear-gradient(0deg, rgba(255, 153, 51, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(19, 136, 8, 0.01) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px)
          `,
        backgroundSize: "50px 50px, 50px 50px, 100px 100px",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Our Programs
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive solutions addressing the needs of Bihar's communities
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Education Program */}
          <Card
            className="p-6 shadow-lg border border-orange-200/50 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255, 153, 51, 0.04) 0%, transparent 100%)",
            }}
          >
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Education & Literacy
            </h3>
            <p className="text-slate-700 mb-4 text-sm lg:text-base">
              Building learning centers, training teachers, and providing
              educational resources to ensure every child in Bihar has access to
              quality education.
            </p>

            <ul className="text-sm text-slate-600 space-y-1">
              <li>• 150+ learning centers established</li>
              <li>• 800+ teachers trained</li>
              <li>• 15,000+ students enrolled</li>
            </ul>
          </Card>

          {/* Healthcare Program */}
          <Card
            className="p-6 shadow-lg border border-green-200/50 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(19, 136, 8, 0.04) 0%, transparent 100%)",
            }}
          >
            <div className="bg-gradient-to-br from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md hover:scale-110 transition-transform duration-300">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Healthcare Access
            </h3>
            <p className="text-slate-700 mb-4 text-sm lg:text-base">
              Mobile clinics, medical camps, and healthcare awareness programs
              bringing essential medical services to underserved communities
              across Bihar.
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• 25+ mobile health clinics</li>
              <li>• 200+ medical camps conducted</li>
              <li>• 50,000+ patients treated</li>
            </ul>
          </Card>

          {/* Skill Development Program */}
          <Card
            className="p-6 shadow-lg border border-slate-200/50 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 md:col-span-2 lg:col-span-1"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(100, 100, 100, 0.02) 0%, transparent 100%)",
            }}
          >
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md hover:scale-110 transition-transform duration-300">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Skill Development
            </h3>
            <p className="text-slate-700 mb-4 text-sm lg:text-base">
              Vocational training programs, entrepreneurship support, and job
              placement assistance creating sustainable employment opportunities
              for Bihar's youth.
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• 50+ training centers operational</li>
              <li>• 8,000+ youth trained</li>
              <li>• 3,500+ jobs facilitated</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OurPrograms;
