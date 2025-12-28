import { SectionHeader } from "@/components/common";
import { FeatureCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Calendar,
  GraduationCap,
  Landmark,
  TreePine,
  Scale,
  Droplet,
  BookOpen,
  Flag,
  ArrowRight,
} from "lucide-react";

const KeyActivitiesSection = () => {
  const activities = [
    {
      icon: Calendar,
      title: "Gandhi Jayanti Celebration",
      description:
        "Annual programs including cleanliness drives, tree plantation, and cultural events celebrating Mahatma Gandhi's ideals.",
    },
    {
      icon: GraduationCap,
      title: "Scholarship Program",
      description:
        "Financial support for meritorious students to continue their education and achieve their dreams.",
    },
    {
      icon: Landmark,
      title: "Mature Democracy Awareness",
      description:
        "Spreading awareness about the importance of democratic values and citizen participation in governance.",
    },
    {
      icon: TreePine,
      title: "Environmental Protection",
      description:
        "Tree plantation and cleanliness drives working towards protecting and preserving our environment.",
    },
    {
      icon: Scale,
      title: "Social Justice",
      description:
        "Standing up for social justice and raising voices for the rights of marginalized communities.",
    },
    {
      icon: Droplet,
      title: "Blood Donation Camps",
      description:
        "Organizing blood donation camps to support healthcare and emergency medical needs in communities.",
    },
    {
      icon: BookOpen,
      title: "Education Awareness",
      description:
        "Conducting programs to spread awareness about the importance of education and higher learning.",
    },
    {
      icon: Flag,
      title: "Independence Day Celebration",
      description:
        "Annual events featuring flag hoisting, cultural programs, and patriotic songs to celebrate our nation.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-warm-50 to-white">
      {/* Subtle gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 100% 0%, rgba(255, 153, 51, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 0% 100%, rgba(19, 136, 8, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle decorative orbs - reduced opacity */}
      <div className="absolute top-20 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-saffron-200/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-india-green-200/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="What We Do"
          title="Our Key Activities"
          subtitle="From Gandhi Jayanti celebrations to education awareness programs, we organize various initiatives throughout the year to empower youth and serve communities."
          titleColor="gradient"
        />

        {/* Activity cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 stagger-animation">
          {activities.map((activity, index) => (
            <FeatureCard
              key={index}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              color="alternating"
              index={index}
            />
          ))}
        </div>

        {/* Quote */}
        <div className="mt-12 sm:mt-16 text-center">
          <blockquote className="relative max-w-3xl mx-auto">
            <div className="absolute -top-3 sm:-top-4 left-0 text-4xl sm:text-6xl text-saffron-200 font-serif">
              "
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 italic leading-relaxed px-6 sm:px-8">
              We believe that youth are the future of the nation. We are
              committed to empowering them and inspiring them to bring positive
              changes in society.
            </p>
            <div className="absolute -bottom-6 sm:-bottom-8 right-0 text-4xl sm:text-6xl text-india-green-200 font-serif">
              "
            </div>
          </blockquote>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/about">
            <Button
              variant="tricolor"
              size="lg"
              className="h-11 sm:h-12 px-6 sm:px-8 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-saffron-200/50 w-full sm:w-auto"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="greenOutline"
              size="lg"
              className="h-11 sm:h-12 px-6 sm:px-8 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 bg-white/90 w-full sm:w-auto"
            >
              Get Involved
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KeyActivitiesSection;
