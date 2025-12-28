import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Target,
  Leaf,
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
} from "lucide-react";
import { SectionHeader, UnifiedCTASection } from "@/components/common";
import { cn } from "@/lib/utils";

// Section divider component for smooth visual transitions
const SectionDivider = ({
  variant = "default",
}: {
  variant?: "saffron" | "green" | "default";
}) => {
  const gradients = {
    saffron: "from-transparent via-saffron-200/30 to-transparent",
    green: "from-transparent via-india-green-200/30 to-transparent",
    default: "from-saffron-200/20 via-slate-200/40 to-india-green-200/20",
  };

  return (
    <div className="relative py-4 sm:py-6 lg:py-8" aria-hidden="true">
      <div className={`h-px bg-gradient-to-r ${gradients[variant]}`} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-saffron-400/60" />
          <div className="w-2 h-2 rounded-full bg-slate-300/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-india-green-400/60" />
        </div>
      </div>
    </div>
  );
};

// Animated counter component for stats
const AnimatedStat = ({
  number,
  label,
  color,
}: {
  number: string;
  label: string;
  color: "saffron" | "green";
}) => {
  const colors = {
    saffron: {
      text: "text-saffron-700",
      bg: "bg-gradient-to-br from-saffron-50 to-saffron-100/80",
      border: "border-saffron-200/60",
      icon: "text-saffron-500",
    },
    green: {
      text: "text-india-green-700",
      bg: "bg-gradient-to-br from-india-green-50 to-india-green-100/80",
      border: "border-india-green-200/60",
      icon: "text-india-green-500",
    },
  };

  const colorSet = colors[color];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl",
        "border backdrop-blur-sm shadow-sm",
        "transition-all duration-300 hover:shadow-md hover:scale-[1.02]",
        colorSet.bg,
        colorSet.border
      )}
    >
      <div className={cn("p-2 rounded-xl bg-white/60", colorSet.border)}>
        <Star className={cn("w-5 h-5", colorSet.icon)} />
      </div>
      <div>
        <div className={cn("text-2xl sm:text-3xl font-bold", colorSet.text)}>
          {number}
        </div>
        <div className="text-slate-600 text-xs sm:text-sm font-medium">
          {label}
        </div>
      </div>
    </div>
  );
};

// Program visual card with enhanced styling
const ProgramVisualCard = ({
  title,
  icon: Icon,
  stats,
  color,
  index,
}: {
  title: string;
  icon: React.ElementType;
  stats: { number: string; label: string };
  color: "saffron" | "green";
  index: number;
}) => {
  const colors = {
    saffron: {
      gradient: "from-saffron-400 via-saffron-500 to-saffron-600",
      ring: "ring-saffron-200/50",
      button:
        "bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700",
      glow: "group-hover:shadow-saffron-200/50",
      stat: "text-saffron-700",
      bgAccent: "bg-saffron-50",
    },
    green: {
      gradient: "from-india-green-400 via-india-green-500 to-india-green-600",
      ring: "ring-india-green-200/50",
      button:
        "bg-gradient-to-r from-india-green-500 to-india-green-600 hover:from-india-green-600 hover:to-india-green-700",
      glow: "group-hover:shadow-india-green-200/50",
      stat: "text-india-green-700",
      bgAccent: "bg-india-green-50",
    },
  };

  const colorSet = colors[color];

  return (
    <div
      className={cn(
        "group relative bg-white/95 backdrop-blur-sm border border-slate-200/80",
        "rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:-translate-y-2",
        colorSet.glow,
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Decorative corner accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] opacity-30",
          colorSet.bgAccent
        )}
      />

      <div className="relative text-center">
        {/* Icon container with animated ring */}
        <div className="relative inline-block mb-6">
          <div
            className={cn(
              "w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl",
              "flex items-center justify-center",
              "bg-gradient-to-br shadow-lg",
              "transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
              colorSet.gradient
            )}
          >
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          {/* Animated ring */}
          <div
            className={cn(
              "absolute -inset-2 rounded-2xl ring-2 opacity-0",
              "transition-all duration-500 group-hover:opacity-100 group-hover:-inset-3",
              colorSet.ring
            )}
          />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
          {title}
        </h3>

        {/* Stats with animation */}
        <div className="mb-6">
          <div
            className={cn(
              "text-3xl sm:text-4xl font-bold mb-1 transition-transform duration-300 group-hover:scale-110",
              colorSet.stat
            )}
          >
            {stats.number}
          </div>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            {stats.label}
          </p>
        </div>

        {/* CTA Button */}
        <Link
          to="/contact"
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "px-6 py-3 rounded-xl font-semibold text-white",
            "shadow-md transition-all duration-300",
            "hover:shadow-lg hover:gap-3 active:scale-95",
            "w-full sm:w-auto",
            colorSet.button
          )}
        >
          Learn More
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const ProgramsPage = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const programs = [
    {
      id: "education-support",
      title: "Education Support",
      description:
        "Empowering underprivileged youth through scholarships, educational resources, and academic mentorship programs that unlock their potential and create pathways to success.",
      icon: BookOpen,
      color: "saffron" as const,
      features: [
        "Free educational materials and books",
        "Scholarship programs for deserving students",
        "Academic tutoring and mentorship",
        "Career guidance and counseling",
      ],
      stats: { number: "2000+", label: "Students Supported" },
    },
    {
      id: "community-development",
      title: "Community Development",
      description:
        "Building sustainable communities through collaborative projects, infrastructure development, and local empowerment initiatives that create lasting positive change.",
      icon: Users,
      color: "green" as const,
      features: [
        "Infrastructure development projects",
        "Community health programs",
        "Skill development workshops",
        "Local business support initiatives",
      ],
      stats: { number: "50+", label: "Communities Transformed" },
    },
    {
      id: "youth-leadership",
      title: "Youth Leadership",
      description:
        "Developing the next generation of leaders through comprehensive training programs, hands-on workshops, and real-world leadership opportunities.",
      icon: Target,
      color: "saffron" as const,
      features: [
        "Leadership training workshops",
        "Public speaking and communication skills",
        "Project management training",
        "Youth parliament initiatives",
      ],
      stats: { number: "1500+", label: "Young Leaders Trained" },
    },
    {
      id: "environmental-action",
      title: "Environmental Action",
      description:
        "Promoting environmental consciousness and sustainable practices through education, tree plantation drives, and clean energy initiatives for a greener future.",
      icon: Leaf,
      color: "green" as const,
      features: [
        "Tree plantation drives",
        "Waste management programs",
        "Renewable energy projects",
        "Environmental awareness campaigns",
      ],
      stats: { number: "10,000+", label: "Trees Planted" },
    },
    {
      id: "volunteer-programs",
      title: "Volunteer Programs",
      description:
        "Creating meaningful volunteer opportunities that allow individuals to contribute to society while developing personal growth and making a real difference.",
      icon: Heart,
      color: "saffron" as const,
      features: [
        "Community service projects",
        "Disaster relief volunteering",
        "Educational support volunteering",
        "Healthcare assistance programs",
      ],
      stats: { number: "800+", label: "Active Volunteers" },
    },
  ];

  const getColorClasses = (color: "saffron" | "green") => {
    return color === "saffron"
      ? {
          iconBg:
            "bg-gradient-to-br from-saffron-100 to-saffron-200 border-saffron-200",
          iconColor: "text-saffron-600",
          titleColor: "text-saffron-700",
          featureIcon: "text-saffron-500",
          accentLine: "bg-gradient-to-r from-saffron-400 to-saffron-500",
        }
      : {
          iconBg:
            "bg-gradient-to-br from-india-green-100 to-india-green-200 border-india-green-200",
          iconColor: "text-india-green-600",
          titleColor: "text-india-green-700",
          featureIcon: "text-india-green-500",
          accentLine:
            "bg-gradient-to-r from-india-green-400 to-india-green-500",
        };
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-saffron-50/40 via-white to-india-green-50/40 overflow-x-hidden">
      {/* Enhanced background pattern */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255, 153, 51, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(19, 136, 8, 0.08) 0%, transparent 40%),
            linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 50px 50px, 50px 50px",
        }}
      />

      {/* Animated decorative orbs */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-saffron-200/15 rounded-full filter blur-[100px] animate-float-slow pointer-events-none" />
      <div className="fixed bottom-20 left-0 w-[500px] h-[500px] bg-india-green-200/15 rounded-full filter blur-[100px] animate-float-slow animation-delay-500 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Small floating decorative elements */}
      <div className="fixed top-32 left-[15%] w-2 h-2 bg-saffron-400/40 rounded-full animate-float pointer-events-none" />
      <div className="fixed top-48 right-[20%] w-1.5 h-1.5 bg-india-green-400/40 rounded-full animate-float animation-delay-200 pointer-events-none" />
      <div className="fixed bottom-[30%] left-[10%] w-1 h-1 bg-saffron-500/30 rounded-full animate-float animation-delay-400 pointer-events-none" />
      <div className="fixed bottom-40 right-[25%] w-2 h-2 bg-india-green-500/40 rounded-full animate-float animation-delay-600 pointer-events-none" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
          {/* Hero background accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent" />

          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            {/* Sparkle icon */}
            <div className="flex justify-center mb-6 animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-saffron-100 to-india-green-100 border border-slate-200/50 shadow-sm">
                <Sparkles className="w-6 h-6 text-saffron-600" />
              </div>
            </div>

            <SectionHeader
              badge="What We Do"
              title="Our Programs"
              subtitle="Comprehensive initiatives designed to empower youth and transform communities across Bihar through education, leadership, and sustainable development."
              titleColor="gradient"
            />

            {/* Quick stats row */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-10 animate-fade-in animation-delay-300">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm">
                <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                <span className="text-sm font-medium text-slate-700">
                  5 Active Programs
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm">
                <div className="w-2 h-2 bg-india-green-500 rounded-full" />
                <span className="text-sm font-medium text-slate-700">
                  14,000+ Lives Impacted
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm">
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
                <span className="text-sm font-medium text-slate-700">
                  Multiple Districts
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-8 sm:py-12 lg:py-16 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16 sm:space-y-24 lg:space-y-32">
              {programs.map((program, index) => {
                const colors = getColorClasses(program.color);
                const isEven = index % 2 === 0;

                return (
                  <article
                    key={program.id}
                    id={program.id}
                    ref={(el) => {
                      sectionRefs.current[index] = el;
                    }}
                    className="scroll-mt-24 section-reveal"
                  >
                    {/* Section number indicator */}
                    <div className="flex items-center justify-center mb-8 lg:hidden">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold",
                          program.color === "saffron"
                            ? "bg-saffron-100 text-saffron-700"
                            : "bg-india-green-100 text-india-green-700"
                        )}
                      >
                        <span className="w-5 h-5 rounded-full bg-white/60 flex items-center justify-center">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        Program
                      </div>
                    </div>

                    <div
                      className={cn(
                        "flex flex-col items-center gap-10 sm:gap-12 lg:gap-20",
                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      )}
                    >
                      {/* Content Side */}
                      <div className="flex-1 w-full">
                        <div
                          className={cn(
                            "max-w-2xl mx-auto lg:mx-0",
                            isEven ? "lg:pr-8" : "lg:pl-8"
                          )}
                        >
                          {/* Section number - desktop only */}
                          <div className="hidden lg:flex items-center gap-3 mb-6">
                            <span
                              className={cn(
                                "text-5xl font-bold opacity-20",
                                colors.titleColor
                              )}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div
                              className={cn(
                                "h-px flex-1 max-w-16",
                                colors.accentLine
                              )}
                            />
                          </div>

                          {/* Icon and Title */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                            <div
                              className={cn(
                                "p-3.5 rounded-2xl flex-shrink-0 border shadow-sm",
                                "transition-all duration-300 hover:scale-110 hover:shadow-md",
                                colors.iconBg
                              )}
                            >
                              <program.icon
                                className={cn(
                                  "w-7 h-7 sm:w-8 sm:h-8",
                                  colors.iconColor
                                )}
                              />
                            </div>
                            <h2
                              className={cn(
                                "text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight",
                                colors.titleColor
                              )}
                            >
                              {program.title}
                            </h2>
                          </div>

                          {/* Description */}
                          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
                            {program.description}
                          </p>

                          {/* Features with enhanced styling */}
                          <div className="grid gap-3 sm:gap-4 mb-8">
                            {program.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className={cn(
                                  "flex items-start gap-3 p-3 sm:p-4 rounded-xl",
                                  "bg-white/60 backdrop-blur-sm border border-slate-100",
                                  "transition-all duration-300 hover:bg-white hover:shadow-sm hover:border-slate-200",
                                  "group"
                                )}
                              >
                                <div
                                  className={cn(
                                    "flex-shrink-0 p-1 rounded-lg transition-colors",
                                    program.color === "saffron"
                                      ? "bg-saffron-100/80 group-hover:bg-saffron-200"
                                      : "bg-india-green-100/80 group-hover:bg-india-green-200"
                                  )}
                                >
                                  <CheckCircle
                                    className={cn(
                                      "w-4 h-4 sm:w-5 sm:h-5",
                                      colors.featureIcon
                                    )}
                                  />
                                </div>
                                <span className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Stats Badge */}
                          <AnimatedStat
                            number={program.stats.number}
                            label={program.stats.label}
                            color={program.color}
                          />
                        </div>
                      </div>

                      {/* Visual Card Side */}
                      <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg">
                        <ProgramVisualCard
                          title={program.title}
                          icon={program.icon}
                          stats={program.stats}
                          color={program.color}
                          index={index}
                        />
                      </div>
                    </div>

                    {/* Section Divider */}
                    {index < programs.length - 1 && (
                      <div className="mt-16 sm:mt-24 lg:mt-32">
                        <SectionDivider
                          variant={
                            program.color === "saffron" ? "green" : "saffron"
                          }
                        />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Programs Overview Summary */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                Creating Lasting Impact Together
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                Our programs work in harmony to address the interconnected
                challenges facing communities in Bihar. Through education,
                leadership development, and environmental stewardship, we're
                building a foundation for sustainable growth and empowerment.
              </p>

              {/* Summary stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { number: "5", label: "Programs", color: "saffron" as const },
                  {
                    number: "50+",
                    label: "Communities",
                    color: "green" as const,
                  },
                  {
                    number: "800+",
                    label: "Volunteers",
                    color: "saffron" as const,
                  },
                  {
                    number: "14K+",
                    label: "Lives Changed",
                    color: "green" as const,
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border",
                      "transition-all duration-300 hover:shadow-md hover:-translate-y-1",
                      stat.color === "saffron"
                        ? "border-saffron-200/50 hover:border-saffron-300"
                        : "border-india-green-200/50 hover:border-india-green-300"
                    )}
                  >
                    <div
                      className={cn(
                        "text-2xl sm:text-3xl lg:text-4xl font-bold mb-1",
                        stat.color === "saffron"
                          ? "text-saffron-600"
                          : "text-india-green-600"
                      )}
                    >
                      {stat.number}
                    </div>
                    <div className="text-slate-600 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <UnifiedCTASection
          title="Join Our Programs Today"
          subtitle="Be part of our mission to empower youth and transform communities. Every contribution makes a lasting difference in someone's life."
          primaryAction={{
            label: "Get Involved",
            href: "/contact",
            icon: Users,
          }}
          secondaryAction={{
            label: "Learn More",
            href: "/about",
            icon: BookOpen,
          }}
        />
      </div>
    </div>
  );
};

export default ProgramsPage;
