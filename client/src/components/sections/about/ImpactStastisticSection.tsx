import { SectionHeader, StatCard } from "@/components/common";
import { useRef, useState, useEffect } from "react";
import {
  Users,
  MapPin,
  Heart,
  Award,
  GraduationCap,
  Building,
  TreePine,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ImpactStastisticSection = () => {
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

  const impactStats = [
    {
      icon: Users,
      value: 25000,
      suffix: "+",
      label: "Lives Transformed",
      description: "Community members impacted through our programs",
      color: "saffron" as const,
    },
    {
      icon: MapPin,
      value: 500,
      suffix: "+",
      label: "Villages Reached",
      description: "Rural communities across Bihar",
      color: "green" as const,
    },
    {
      icon: Heart,
      value: 1200,
      suffix: "+",
      label: "Active Volunteers",
      description: "Dedicated youth driving change",
      color: "saffron" as const,
    },
    {
      icon: Award,
      value: 150,
      suffix: "+",
      label: "Programs Completed",
      description: "Successful initiatives across Bihar",
      color: "green" as const,
    },
  ];

  const achievements = [
    {
      icon: GraduationCap,
      title: "Education",
      description: "5,000+ students supported with scholarships and learning",
      color: "saffron",
    },
    {
      icon: Building,
      title: "Infrastructure",
      description: "50+ learning centers established in rural areas",
      color: "green",
    },
    {
      icon: TreePine,
      title: "Environment",
      description: "10,000+ trees planted across Bihar",
      color: "saffron",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "200+ community events organized annually",
      color: "green",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="our-impact"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Tricolor top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 via-white/50 to-india-green-500" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255, 153, 51, 0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(19, 136, 8, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-saffron-500/10 rounded-full filter blur-3xl animate-pulse-glow-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-india-green-500/10 rounded-full filter blur-3xl animate-pulse-glow-slow animation-delay-300" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Our Impact"
          title="Creating Lasting Change"
          subtitle="Dedicated programs and initiatives transforming communities across Bihar"
          titleColor="white"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-12">
          {impactStats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              color={stat.color}
              animate={isVisible}
            />
          ))}
        </div>

        {/* Section divider with heading */}
        <div className="flex items-center justify-center gap-4 mt-16 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-saffron-400/50" />
          <h3 className="text-xl lg:text-2xl font-bold text-white">
            Key Achievements
          </h3>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-india-green-400/50" />
        </div>

        {/* Achievements Grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
            isVisible ? "stagger-animation" : "opacity-0"
          )}
        >
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            const colorClasses =
              achievement.color === "saffron"
                ? {
                    iconBg:
                      "bg-gradient-to-br from-saffron-400/20 to-saffron-500/20 border border-saffron-400/30",
                    iconText: "text-saffron-400",
                    accent: "bg-gradient-to-r from-saffron-400 to-saffron-500",
                    border: "border-saffron-500/20",
                    hover: "hover:border-saffron-400/40",
                  }
                : {
                    iconBg:
                      "bg-gradient-to-br from-india-green-400/20 to-india-green-500/20 border border-india-green-400/30",
                    iconText: "text-india-green-400",
                    accent:
                      "bg-gradient-to-r from-india-green-400 to-india-green-500",
                    border: "border-india-green-500/20",
                    hover: "hover:border-india-green-400/40",
                  };

            return (
              <div
                key={index}
                className={cn(
                  "group relative p-6 rounded-2xl overflow-hidden",
                  "bg-gradient-to-br from-white/5 to-white/[0.02]",
                  "border hover:-translate-y-1",
                  "transition-all duration-300",
                  colorClasses.border,
                  colorClasses.hover
                )}
              >
                {/* Top accent line */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-0.5",
                    colorClasses.accent
                  )}
                />

                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    "transition-transform duration-300 group-hover:scale-110",
                    colorClasses.iconBg
                  )}
                >
                  <IconComponent
                    className={cn("w-6 h-6", colorClasses.iconText)}
                  />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center ${isVisible ? "animate-fade-in animation-delay-600" : "opacity-0"}`}
        >
          <p className="text-slate-400 text-sm lg:text-base">
            Together, we're building a brighter future for Bihar's youth
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="h-1 w-8 rounded-full bg-saffron-500" />
            <div className="h-1 w-4 rounded-full bg-white/50" />
            <div className="h-1 w-8 rounded-full bg-india-green-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStastisticSection;
