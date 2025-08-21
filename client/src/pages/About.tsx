import ScrollingImageSection from "@/components/sections/ScrollingImageSection";
import Team from "@/components/sections/Team";
import HeroSection from "@/components/sections/about/HeroSection";
import ImpactStastisticSection from "@/components/sections/about/ImpactStastisticSection";
import OurPrinciple from "@/components/sections/about/OurPrinciple";
import OurStorySection from "@/components/sections/about/OurStorySection";
import JoinOurMission from "@/components/sections/home/JoinOurMission";
import OurProgramSection from "@/components/sections/home/OurProgramSection";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-x-hidden">
      {/* ===================
          FIXED FULL SCREEN HERO POSTER SECTION
          =================== */}
      <HeroSection />
      {/* ===================
          OUR STORY SECTION (REDUCED SPACING)
          =================== */}
      <OurStorySection />

      {/* ===================
          MISSION, VISION, VALUES SECTION (REDUCED SPACING)
          =================== */}
      <OurPrinciple />

      {/* ===================
          IMPACT STATISTICS SECTION (REDUCED SPACING)
          =================== */}
      <ImpactStastisticSection />

      {/* ===================
          SMOOTH AUTO-SCROLLING IMAGES GALLERY SECTION
          =================== */}
      <ScrollingImageSection />

      {/* ===================
          NEW: TEAM & BOARD SECTION WITH TABS
          =================== */}
      <Team />

      {/* ===================
          PROGRAMS SECTION (REDUCED SPACING)
          =================== */}
      <OurProgramSection />

      {/* ===================
          CALL TO ACTION SECTION
          =================== */}
      <JoinOurMission />
    </div>
  );
}
