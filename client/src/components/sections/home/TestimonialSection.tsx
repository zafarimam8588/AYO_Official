import { Card } from "@/components/ui/card";
import { useRef, useEffect } from "react";

const TestimonialSection = () => {
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      name: "Sunita Devi",
      role: "Mother, Patna District",
      quote:
        "My daughter can now study in the learning center just 2 kilometers from our village. AYO has given us hope that she will have a better future than we could ever imagine.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      color: "orange",
    },
    {
      name: "Priya Kumari",
      role: "Entrepreneur, Muzaffarpur",
      quote:
        "The skill development program helped me start my own tailoring business. Now I can support my family and even employ other women from my village.",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      color: "green",
    },
    {
      name: "Ramesh Singh",
      role: "Village Head, Gaya",
      quote:
        "The mobile health clinic visits our village every month. For the first time, we have access to quality healthcare without traveling to the city.",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      color: "slate",
    },
    {
      name: "Anita Sharma",
      role: "Teacher, Bhojpur District",
      quote:
        "After the teacher training program, I feel more confident in my classroom. The new teaching methods have made learning so much more engaging for my students.",
      image:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      color: "orange",
    },
    {
      name: "Vikash Kumar",
      role: "Young Farmer, Nalanda",
      quote:
        "The agricultural training helped me adopt modern farming techniques. My crop yield has increased by 40% and my family's income has doubled.",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
      color: "green",
    },
    {
      name: "Meera Devi",
      role: "Self-Help Group Leader, Vaishali",
      quote:
        "Through the women empowerment program, our self-help group now runs a successful food processing unit. We've become financially independent.",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      color: "slate",
    },
    {
      name: "Rajesh Yadav",
      role: "Youth Leader, Begusarai",
      quote:
        "The leadership development program transformed me from a shy village boy to someone who can speak confidently and organize community events.",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      color: "orange",
    },
    {
      name: "Kavita Singh",
      role: "Healthcare Worker, Saran",
      quote:
        "The healthcare training equipped me with skills to serve my community better. Now I can provide basic medical care to families in remote areas.",
      image:
        "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg",
      color: "green",
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
    if (!scrollContainer) return;

    let scrollSpeed = 1; // pixels per frame
    let animationId: number;

    const scroll = () => {
      const container = scrollContainer as HTMLElement; // Type assertion
      if (container) {
        container.scrollLeft += scrollSpeed;

        // Reset scroll position when we've scrolled through one full set
        const maxScroll = container.scrollWidth / 3;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        }

        animationId = requestAnimationFrame(scroll);
      }
    };

    // Start auto-scroll
    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    (scrollContainer as HTMLElement).addEventListener(
      "mouseenter",
      handleMouseEnter
    );
    (scrollContainer as HTMLElement).addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      const container = scrollContainer as HTMLElement; // Type assertion
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "orange":
        return {
          border: "border-orange-200/50",
          gradient:
            "linear-gradient(135deg, rgba(255, 153, 51, 0.03) 0%, transparent 100%)",
          borderColor: "border-orange-300",
        };
      case "green":
        return {
          border: "border-green-200/50",
          gradient:
            "linear-gradient(135deg, rgba(19, 136, 8, 0.03) 0%, transparent 100%)",
          borderColor: "border-green-300",
        };
      default:
        return {
          border: "border-slate-200/50",
          gradient:
            "linear-gradient(135deg, rgba(100, 100, 100, 0.02) 0%, transparent 100%)",
          borderColor: "border-slate-300",
        };
    }
  };

  return (
    <div
      className=" bg-white relative"
      style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(255, 153, 51, 0.01) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(19, 136, 8, 0.01) 1px, transparent 1px),
          linear-gradient(0deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px),
          linear-gradient(90deg, rgba(19, 136, 8, 0.008) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px, 60px 60px, 40px 40px, 40px 40px",
      }}
    >
      <div id="success-stories" className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-1 bg-orange-500 rounded"></div>
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-semibold uppercase tracking-wide">
              Community Voices
            </span>
            <div className="w-12 h-1 bg-green-500 rounded"></div>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Stories of Hope from Bihar
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Hear from the families and communities whose lives have been
            transformed through our programs across Bihar.
          </p>
        </div>

        {/* Auto-Scrolling Testimonials Container */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {infiniteTestimonials.map((testimonial, index) => {
              const colorClasses = getColorClasses(testimonial.color);
              return (
                <Card
                  key={`${testimonial.name}-${index}`}
                  className={`flex-shrink-0 w-80 p-6 shadow-lg ${colorClasses.border} bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  style={{
                    backgroundImage: colorClasses.gradient,
                  }}
                >
                  <p className="text-slate-800 text-lg mb-6 leading-relaxed italic min-h-[120px]">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name} from ${testimonial.role}`}
                        className={`w-12 h-12 rounded-full border-2 ${colorClasses.borderColor} shadow-sm object-cover`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-slate-900 text-base truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-600 truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Gradient Fade Effects */}
          <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSection;
