import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const StayInLoop = () => {
  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-white to-green-50 rounded-3xl p-8 mb-12 border border-orange-200/50 shadow-xl overflow-hidden mt-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-2xl" />

        {/* Subtle dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #FF9933 2px, transparent 2px), radial-gradient(circle at 80% 50%, #138808 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Title with decorative underlines */}
        <div className="relative inline-block mb-4">
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-slate-800 to-green-600 bg-clip-text text-transparent leading-tight">
            Stay in the Loop
          </h3>

          {/* Triple underline decoration */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            <div className="w-8 h-1 bg-orange-500 rounded-full animate-pulse" />
            <div
              className="w-12 h-1 bg-slate-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="w-8 h-1 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>

        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          Get the latest updates on our{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-semibold">
              community initiatives
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </span>{" "}
          and exclusive content delivered directly to your inbox.
        </p>

        {/* Simplified Form */}
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-3 shadow-lg ">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-transparent border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-slate-700 placeholder-slate-400"
            />

            {/* Subscribe Button */}
            <Button className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white px-6 py-3 mt-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Trust indicator */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span>Join 10,000+ Bihar changemakers</span>
            <div
              className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayInLoop;
