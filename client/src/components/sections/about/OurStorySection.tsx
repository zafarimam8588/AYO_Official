import { useState, useEffect, useRef } from "react";
import { SectionHeader } from "@/components/common";
import {
  Calendar,
  Award,
  Users,
  MapPin,
  GraduationCap,
  HeartPulse,
  Leaf,
  Scale,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

const OurStorySection = () => {
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

  const focusAreas = [
    {
      icon: GraduationCap,
      label: "Education",
      description: "Scholarships & learning programs",
      color: "saffron" as const,
    },
    {
      icon: HeartPulse,
      label: "Healthcare",
      description: "Community health initiatives",
      color: "green" as const,
    },
    {
      icon: Leaf,
      label: "Environment",
      description: "Tree plantation & awareness",
      color: "green" as const,
    },
    {
      icon: Scale,
      label: "Social Justice",
      description: "Rights & civic awareness",
      color: "saffron" as const,
    },
  ];

  const timelineEvents = [
    {
      year: "2014",
      title: "Foundation",
      description: "Started with a vision to empower Bihar's youth",
      icon: Calendar,
      color: "saffron" as const,
    },
    {
      year: "2017",
      title: "First 100 Villages",
      description: "Expanded reach to rural communities",
      icon: MapPin,
      color: "green" as const,
    },
    {
      year: "2020",
      title: "10,000 Lives",
      description: "Touched the lives of 10,000 community members",
      icon: Users,
      color: "saffron" as const,
    },
    {
      year: "2024",
      title: "Recognized Impact",
      description: "Award-winning programs across Bihar",
      icon: Award,
      color: "green" as const,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-white"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Our Journey"
          title="The Story Behind AYO"
          subtitle="From a small group of passionate youth to a movement transforming Bihar's communities"
          titleColor="gradient"
        />

        {/* Main Story Content - Centered and Symmetrical */}
        <div className="max-w-4xl mx-auto mt-12">
          {/* Opening Story */}
          <div
            className={cn(
              "text-center mb-12",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
          >
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed">
              <span className="font-semibold text-saffron-600">
                Azad Youth Organization
              </span>{" "}
              is a non-profit dedicated to empowering youth and bringing
              positive change in society across Bihar. We believe that youth are
              the future of the nation.
            </p>
          </div>

          {/* Quote - Centered */}
          <div
            className={cn(
              "relative bg-gradient-to-br from-india-green-50 to-saffron-50 rounded-3xl p-6 sm:p-8 mb-12",
              "border border-slate-200 shadow-lg",
              isVisible ? "animate-fade-in animation-delay-100" : "opacity-0"
            )}
          >
            <Quote className="absolute top-4 left-4 w-8 h-8 text-saffron-300 opacity-50" />
            <blockquote className="text-center text-slate-700 text-lg lg:text-xl italic leading-relaxed px-6">
              "We believe youth are the future of the nation. Through
              comprehensive programs, we empower young people to create positive
              changes in their communities."
            </blockquote>
            <Quote className="absolute bottom-4 right-4 w-8 h-8 text-india-green-300 opacity-50 rotate-180" />
          </div>

          {/* Focus Areas - 2x2 Grid, Perfectly Symmetrical */}
          <div
            className={cn(
              "mb-16",
              isVisible ? "animate-fade-in animation-delay-200" : "opacity-0"
            )}
          >
            <h3 className="text-center text-lg font-semibold text-slate-800 mb-6">
              Our Focus Areas
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {focusAreas.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "group flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl",
                      "transition-all duration-300",
                      "hover:shadow-xl hover:-translate-y-1",
                      "border bg-white",
                      item.color === "saffron"
                        ? "border-saffron-200 hover:border-saffron-300"
                        : "border-india-green-200 hover:border-india-green-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-4",
                        "transition-transform duration-300 group-hover:scale-110",
                        item.color === "saffron"
                          ? "bg-gradient-to-br from-saffron-400 to-saffron-600"
                          : "bg-gradient-to-br from-india-green-400 to-india-green-600"
                      )}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h4
                      className={cn(
                        "font-bold text-base mb-1",
                        item.color === "saffron"
                          ? "text-saffron-700"
                          : "text-india-green-700"
                      )}
                    >
                      {item.label}
                    </h4>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline - Horizontal on all screens */}
          <div
            className={cn(
              "pt-8 border-t border-slate-200",
              isVisible ? "animate-fade-in animation-delay-300" : "opacity-0"
            )}
          >
            <h3 className="text-center text-lg font-semibold text-slate-800 mb-10">
              Our Journey Timeline
            </h3>

            {/* Timeline with connecting line */}
            <div className="relative">
              {/* Horizontal gradient line */}
              <div className="absolute top-8 left-4 right-4 sm:left-8 sm:right-8 h-0.5 bg-gradient-to-r from-saffron-400 via-slate-300 to-india-green-400" />

              <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                {timelineEvents.map((event, index) => {
                  const IconComponent = event.icon;
                  const colorClasses =
                    event.color === "saffron"
                      ? {
                          iconBg:
                            "bg-gradient-to-br from-saffron-400 to-saffron-600",
                          text: "text-saffron-600",
                          dot: "bg-saffron-500",
                          ring: "ring-saffron-200",
                        }
                      : {
                          iconBg:
                            "bg-gradient-to-br from-india-green-400 to-india-green-600",
                          text: "text-india-green-600",
                          dot: "bg-india-green-500",
                          ring: "ring-india-green-200",
                        };

                  return (
                    <div
                      key={index}
                      className={cn(
                        "relative flex flex-col items-center text-center",
                        isVisible ? "animate-fade-in" : "opacity-0"
                      )}
                      style={{ animationDelay: `${index * 100 + 400}ms` }}
                    >
                      {/* Timeline dot with icon */}
                      <div
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                          "bg-white shadow-lg ring-4",
                          colorClasses.ring
                        )}
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center",
                            colorClasses.iconBg
                          )}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Year */}
                      <div
                        className={cn(
                          "text-lg sm:text-2xl font-bold mb-1",
                          colorClasses.text
                        )}
                      >
                        {event.year}
                      </div>

                      {/* Title */}
                      <div className="text-xs sm:text-sm font-semibold text-slate-800 mb-1">
                        {event.title}
                      </div>

                      {/* Description - hidden on mobile */}
                      <div className="hidden sm:block text-xs text-slate-500 leading-relaxed px-1">
                        {event.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div
            className={cn(
              "text-center mt-12 pt-8 border-t border-slate-200",
              isVisible ? "animate-fade-in animation-delay-500" : "opacity-0"
            )}
          >
            <p className="text-slate-600">
              From Gandhi Jayanti celebrations to education awareness programs,
              we organize initiatives that develop leadership skills and promote
              sustainable development.
            </p>
            <div className="flex justify-center gap-1.5 mt-6">
              <div className="h-1 w-8 rounded-full bg-saffron-500" />
              <div className="h-1 w-4 rounded-full bg-slate-300" />
              <div className="h-1 w-8 rounded-full bg-india-green-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
