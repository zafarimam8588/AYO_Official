import AboutSection from "@/components/sections/home/AboutSection";
import HeroSection from "@/components/sections/home/HeroSection";
import HeroTitleSection from "@/components/sections/home/HeroTitleSection";
import OurProgramSection from "@/components/sections/home/OurProgramSection";
import KeyActivitiesSection from "@/components/sections/home/KeyActivitiesSection";
import FounderMessageSection from "@/components/sections/home/FounderMessageSection";
import { UnifiedCTASection } from "@/components/common";
import TestimonialSection from "@/components/sections/home/TestimonialSection";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all sections with animation class
    const sections = document.querySelectorAll(".section-animate");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Title Section */}
      <HeroTitleSection />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Founder's Message Section */}
        <FounderMessageSection />

        {/* Key Activities Section */}
        <KeyActivitiesSection />

        {/* Programs Section */}
        <OurProgramSection />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* Call to Action Section */}
        <UnifiedCTASection />
      </div>
    </>
  );
};

export default Home;
