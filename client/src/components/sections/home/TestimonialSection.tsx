import { SectionHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { useRef, useEffect } from "react";
import { User, Quote } from "lucide-react";

const TestimonialSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sunita Devi",
      role: "Mother, Patna District",
      quote:
        "My daughter can now study in the learning center just 2 kilometers from our village. AYO has given us hope that she will have a better future than we could ever imagine.",
      image: "",
      color: "saffron" as const,
    },
    {
      name: "Priya Kumari",
      role: "Entrepreneur, Muzaffarpur",
      quote:
        "The skill development program helped me start my own tailoring business. Now I can support my family and even employ other women from my village.",
      image: "",
      color: "green" as const,
    },
    {
      name: "Ramesh Singh",
      role: "Village Head, Gaya",
      quote:
        "The mobile health clinic visits our village every month. For the first time, we have access to quality healthcare without traveling to the city.",
      image: "",
      color: "slate" as const,
    },
    {
      name: "Anita Sharma",
      role: "Teacher, Bhojpur District",
      quote:
        "After the teacher training program, I feel more confident in my classroom. The new teaching methods have made learning so much more engaging for my students.",
      image: "",
      color: "saffron" as const,
    },
    {
      name: "Vikash Kumar",
      role: "Young Farmer, Nalanda",
      quote:
        "The agricultural training helped me adopt modern farming techniques. My crop yield has increased by 40% and my family's income has doubled.",
      image: "",
      color: "green" as const,
    },
    {
      name: "Meera Devi",
      role: "Self-Help Group Leader, Vaishali",
      quote:
        "Through the women empowerment program, our self-help group now runs a successful food processing unit. We've become financially independent.",
      image: "",
      color: "slate" as const,
    },
    {
      name: "Rajesh Yadav",
      role: "Youth Leader, Begusarai",
      quote:
        "The leadership development program transformed me from a shy village boy to someone who can speak confidently and organize community events.",
      image: "",
      color: "saffron" as const,
    },
    {
      name: "Kavita Singh",
      role: "Healthcare Worker, Saran",
      quote:
        "The healthcare training equipped me with skills to serve my community better. Now I can provide basic medical care to families in remote areas.",
      image: "",
      color: "green" as const,
    },
  ];

  // Duplicate testimonials for infinite scroll
  const infiniteTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const scrollSpeed = 0.8;
    let animationId: number;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        const maxScroll = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }

        animationId = requestAnimationFrame(scroll);
      }
    };

    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const getColorClasses = (color: "saffron" | "green" | "slate") => {
    const colorMap = {
      saffron: {
        border: "border-saffron-200",
        hoverBorder: "hover:border-saffron-300",
        gradient: "from-saffron-50 to-white",
        iconBg: "bg-saffron-100",
        iconColor: "text-saffron-500",
        avatarBorder: "border-saffron-300",
        avatarBg: "from-saffron-100 to-saffron-200",
      },
      green: {
        border: "border-india-green-200",
        hoverBorder: "hover:border-india-green-300",
        gradient: "from-india-green-50 to-white",
        iconBg: "bg-india-green-100",
        iconColor: "text-india-green-500",
        avatarBorder: "border-india-green-300",
        avatarBg: "from-india-green-100 to-india-green-200",
      },
      slate: {
        border: "border-slate-200",
        hoverBorder: "hover:border-slate-300",
        gradient: "from-slate-50 to-white",
        iconBg: "bg-slate-100",
        iconColor: "text-slate-500",
        avatarBorder: "border-slate-300",
        avatarBg: "from-slate-100 to-slate-200",
      },
    };
    return colorMap[color];
  };

  return (
    <section
      id="success-stories"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden"
    >
      {/* Subtle gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 10% 0%, rgba(255, 153, 51, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 90% 100%, rgba(19, 136, 8, 0.04) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Community Voices"
          title="Stories of Hope from Bihar"
          subtitle="Hear from the families and communities whose lives have been transformed through our programs across Bihar."
          titleColor="gradient"
        />

        {/* Auto-Scrolling Testimonials Container */}
        <div className="relative mt-8 sm:mt-12">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-hidden py-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {infiniteTestimonials.map((testimonial, index) => {
              const colors = getColorClasses(testimonial.color);
              return (
                <Card
                  key={`${testimonial.name}-${index}`}
                  className={`flex-shrink-0 w-[300px] sm:w-[340px] p-4 sm:p-6 ${colors.border} ${colors.hoverBorder} bg-gradient-to-br ${colors.gradient} shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-xl sm:rounded-2xl`}
                >
                  {/* Quote icon */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${colors.iconBg} flex items-center justify-center mb-3 sm:mb-4`}
                  >
                    <Quote
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.iconColor}`}
                    />
                  </div>

                  {/* Quote text */}
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 min-h-[80px] sm:min-h-[100px]">
                    "{testimonial.quote}"
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-slate-100">
                    <div className="flex-shrink-0">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={`${testimonial.name} from ${testimonial.role}`}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${colors.avatarBorder} shadow-sm object-cover`}
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${colors.avatarBorder} bg-gradient-to-br ${colors.avatarBg} flex items-center justify-center shadow-sm`}
                        >
                          <User
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.iconColor}`}
                          />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Gradient Fade Effects */}
          <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* Trust indicator */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-slate-500 text-xs sm:text-sm">
            <span className="font-semibold text-saffron-600">8,000+</span>{" "}
            families across Bihar have shared their success stories with us
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
