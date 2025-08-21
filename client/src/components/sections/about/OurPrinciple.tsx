import { Card } from "@/components/ui/card";
import { Target, Eye, Handshake } from "lucide-react";

const OurPrinciple = () => {
  return (
    <div
      className="py-12 lg:py-16 relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 153, 51, 0.03) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(19, 136, 8, 0.03) 100%)",
        backgroundImage: `
            linear-gradient(135deg, rgba(255, 153, 51, 0.015) 1px, transparent 1px),
            linear-gradient(-135deg, rgba(19, 136, 8, 0.015) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px)
          `,
        backgroundSize: "50px 50px, 50px 50px, 100px 100px",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Our Foundation
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            The principles that guide everything we do in Bihar
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8 md:grid-cols-3">
          {/* Mission Card */}
          <Card
            className="p-6 lg:p-8 text-center shadow-lg border border-orange-200/50 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            style={{
              backgroundImage: `
                  linear-gradient(135deg, rgba(255, 153, 51, 0.05) 0%, transparent 100%),
                  linear-gradient(180deg, rgba(255, 153, 51, 0.02) 0%, transparent 100%)
                `,
            }}
          >
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-14 lg:w-16 h-14 lg:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-md hover:scale-110 transition-transform duration-300">
              <Target className="h-7 lg:h-8 w-7 lg:w-8 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 lg:mb-4">
              Our Mission
            </h3>
            <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
              To empower Bihar's youth through sustainable programs in
              education, healthcare, and skill development, creating lasting
              positive change that breaks the cycle of poverty in rural
              communities.
            </p>
          </Card>

          {/* Vision Card */}
          <Card
            className="p-6 lg:p-8 text-center shadow-lg border border-green-200/50 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            style={{
              backgroundImage: `
                  linear-gradient(135deg, rgba(19, 136, 8, 0.05) 0%, transparent 100%),
                  linear-gradient(180deg, rgba(19, 136, 8, 0.02) 0%, transparent 100%)
                `,
            }}
          >
            <div className="bg-gradient-to-br from-green-500 to-green-600 w-14 lg:w-16 h-14 lg:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-md hover:scale-110 transition-transform duration-300">
              <Eye className="h-7 lg:h-8 w-7 lg:w-8 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 lg:mb-4">
              Our Vision
            </h3>
            <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
              A Bihar where every young person has equal access to
              opportunities, quality education, and healthcare needed to build a
              dignified and prosperous life for themselves and their families.
            </p>
          </Card>

          {/* Values Card */}
          <Card
            className="p-6 lg:p-8 text-center shadow-lg border border-slate-200/50 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 md:col-span-3 lg:col-span-1"
            style={{
              backgroundImage: `
                  linear-gradient(135deg, rgba(100, 100, 100, 0.03) 0%, transparent 100%),
                  linear-gradient(180deg, rgba(100, 100, 100, 0.02) 0%, transparent 100%)
                `,
            }}
          >
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 w-14 lg:w-16 h-14 lg:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-md hover:scale-110 transition-transform duration-300">
              <Handshake className="h-7 lg:h-8 w-7 lg:w-8 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 lg:mb-4">
              Our Values
            </h3>
            <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
              Integrity, compassion, sustainability, and community partnership
              guide our work. We believe in transparency, cultural respect, and
              empowering local leadership in Bihar.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OurPrinciple;
