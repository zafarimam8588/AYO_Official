import ScrollingImageSection from "@/components/sections/ScrollingImageSection";
import Team from "@/components/sections/Team";
import HeroSection from "@/components/sections/about/HeroSection";
import ImpactStastisticSection from "@/components/sections/about/ImpactStastisticSection";
import OurPrinciple from "@/components/sections/about/OurPrinciple";
import OurStorySection from "@/components/sections/about/OurStorySection";
import { UnifiedCTASection } from "@/components/common";
import { Users, Heart } from "lucide-react";
import OurProgramSection from "@/components/sections/home/OurProgramSection";

// Gradient divider component for smooth section transitions
const SectionDivider = ({
  variant = "default",
}: {
  variant?:
    | "saffron-to-white"
    | "white-to-green"
    | "green-to-dark"
    | "dark-to-light"
    | "default";
}) => {
  const gradients = {
    "saffron-to-white": "from-saffron-50/40 via-white to-white",
    "white-to-green": "from-white via-india-green-50/20 to-india-green-50/40",
    "green-to-dark": "from-india-green-50/30 via-slate-200 to-slate-800",
    "dark-to-light": "from-slate-800 via-slate-200 to-white",
    default: "from-transparent via-saffron-50/20 to-transparent",
  };

  return (
    <div
      className={`h-16 lg:h-20 bg-gradient-to-b ${gradients[variant]}`}
      aria-hidden="true"
    />
  );
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Hero Section with full-screen slider */}
      <HeroSection />

      {/* Gradient transition from hero */}
      <SectionDivider variant="saffron-to-white" />

      {/* Our Story */}
      <OurStorySection />

      {/* Mission, Vision, Values */}
      <OurPrinciple />

      {/* Gradient to dark section */}
      <SectionDivider variant="green-to-dark" />

      {/* Impact Statistics */}
      <ImpactStastisticSection />

      {/* Gradient from dark to light */}
      <SectionDivider variant="dark-to-light" />

      {/* Image Gallery */}
      <ScrollingImageSection />

      {/* Team Section */}
      <Team />

      {/* Programs Section */}
      <OurProgramSection />

      {/* CTA Section */}
      <UnifiedCTASection
        title={
          <>
            Ready to <span className="text-saffron-400">Make</span> a{" "}
            <span className="text-india-green-400">Difference</span>?
          </>
        }
        subtitle="Join thousands of volunteers and donors who are transforming Bihar's future through education, healthcare, and sustainable development."
        primaryAction={{
          label: "Become a Volunteer",
          href: "/register",
          icon: Users,
        }}
        secondaryAction={{
          label: "Support Our Cause",
          href: "/donate",
          icon: Heart,
        }}
      />
    </div>
  );
}
