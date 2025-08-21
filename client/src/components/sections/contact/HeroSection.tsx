import { Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <div
      className="pt-10 sm:py-20 relative overflow-hidden"
      style={{
        backgroundImage: `
                        linear-gradient(135deg, rgba(255, 153, 51, 0.04) 0%, transparent 25%, rgba(19, 136, 8, 0.04) 100%),
                        linear-gradient(45deg, rgba(255, 153, 51, 0.015) 1px, transparent 1px),
                        linear-gradient(-45deg, rgba(19, 136, 8, 0.015) 1px, transparent 1px)
                    `,
        backgroundSize: "100% 100%, 80px 80px, 80px 80px",
      }}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-green-500 p-3 rounded-2xl shadow-lg animate-pulse">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-slate-800 to-green-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Connect with Azad Youth Organisation. We're here to answer your
          questions and help you get involved in transforming Bihar's
          communities.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
