import AboutSection from "@/components/sections/home/AboutSection";
import HeroSection from "@/components/sections/home/HeroSection";
import HeroTitleSection from "@/components/sections/home/HeroTitleSection";
import OurProgramSection from "@/components/sections/home/OurProgramSection";
import ReadyToMakeDifference from "@/components/sections/ReadyToMakeDifference";
import TestimonialSection from "@/components/sections/home/TestimonialSection";

const Home = () => {
  return (
    <>
      {/* Hero Title Section */}
      <HeroTitleSection />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Programs Section */}
        <OurProgramSection />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* Call to Action Section */}

        <ReadyToMakeDifference />
      </div>
    </>
  );
};

export default Home;
