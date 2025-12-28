import { SectionHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import {
  Target,
  Eye,
  Handshake,
  Heart,
  Shield,
  Leaf,
  Users,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const OurPrinciple = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const missionPoints = [
    "Civic awareness and patriotism",
    "Leadership development",
    "Education empowerment",
    "Sustainable development",
  ];

  const visionPoints = [
    "Youth aware of rights & responsibilities",
    "Equipped with leadership skills",
    "Inclusive society celebrating diversity",
    "Active democratic participation",
  ];

  const valuesPoints = [
    "Integrity & transparency",
    "Scientific thinking",
    "Women's empowerment",
    "Environmental protection",
  ];

  const coreValues = [
    { icon: Heart, label: "Integrity", color: "saffron" as const },
    { icon: Shield, label: "Patriotism", color: "green" as const },
    { icon: Sparkles, label: "Innovation", color: "saffron" as const },
    { icon: Users, label: "Unity", color: "green" as const },
    { icon: Leaf, label: "Sustainability", color: "saffron" as const },
  ];

  return (
    <section
      ref={sectionRef}
      id="our-principle"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-saffron-50/50 via-white to-india-green-50/50"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
            linear-gradient(-135deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Decorative orbs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-saffron-200/30 rounded-full filter blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-india-green-200/30 rounded-full filter blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Our Foundation"
          title="Mission, Vision & Values"
          subtitle="The principles that guide everything we do in Bihar"
          titleColor="gradient"
        />

        <div
          className={cn(
            "grid gap-6 lg:gap-8 mt-12",
            "md:grid-cols-2 lg:grid-cols-3",
            isVisible ? "stagger-animation" : "opacity-0"
          )}
        >
          {/* Mission Card */}
          <Card className="p-6 lg:p-8 shadow-lg border border-saffron-200/50 bg-white/90 backdrop-blur-sm rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-saffron-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <div className="bg-gradient-to-br from-saffron-400 to-saffron-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                  Our Mission
                </h3>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                To empower youth and inspire positive social change through:
              </p>
              <div className="space-y-2.5">
                {missionPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-saffron-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Vision Card */}
          <Card className="p-6 lg:p-8 shadow-lg border border-india-green-200/50 bg-white/90 backdrop-blur-sm rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-india-green-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <div className="bg-gradient-to-br from-india-green-400 to-india-green-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                  Our Vision
                </h3>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                A mature democracy with:
              </p>
              <div className="space-y-2.5">
                {visionPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-india-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Values Card */}
          <Card className="p-6 lg:p-8 shadow-lg border border-slate-200/50 bg-white/90 backdrop-blur-sm rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 md:col-span-2 lg:col-span-1 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <div className="bg-gradient-to-br from-saffron-500 to-india-green-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Handshake className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                  Our Values
                </h3>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Principles that guide our work:
              </p>
              <div className="space-y-2.5">
                {valuesPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-saffron-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Core Values Pills */}
        <div
          className={cn(
            "mt-14 pt-8 border-t border-slate-200",
            isVisible ? "animate-fade-in animation-delay-400" : "opacity-0"
          )}
        >
          <h4 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
            Our Core Values
          </h4>

          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "group flex items-center gap-2.5 px-5 py-3 rounded-2xl",
                    "border shadow-sm transition-all duration-300",
                    "hover:shadow-md hover:-translate-y-0.5",
                    value.color === "saffron"
                      ? "bg-gradient-to-r from-saffron-50 to-saffron-100 border-saffron-200 hover:border-saffron-300"
                      : "bg-gradient-to-r from-india-green-50 to-india-green-100 border-india-green-200 hover:border-india-green-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
                      value.color === "saffron"
                        ? "bg-saffron-200"
                        : "bg-india-green-200"
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "w-4 h-4",
                        value.color === "saffron"
                          ? "text-saffron-700"
                          : "text-india-green-700"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "font-semibold text-sm",
                      value.color === "saffron"
                        ? "text-saffron-700"
                        : "text-india-green-700"
                    )}
                  >
                    {value.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPrinciple;
