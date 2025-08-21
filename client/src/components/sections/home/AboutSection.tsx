import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const images = [
    {
      src: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg",
      alt: "Healthcare program in Bihar villages",
      border: "border-orange-200/50",
    },
    {
      src: "https://images.pexels.com/photos/8923034/pexels-photo-8923034.jpeg",
      alt: "Skill development training",
      border: "border-green-200/50",
    },
    {
      src: "https://images.pexels.com/photos/8422085/pexels-photo-8422085.jpeg",
      alt: "Children education program",
      border: "border-orange-200/50",
    },
    {
      src: "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg",
      alt: "Community development activities",
      border: "border-green-200/50",
    },
  ];

  return (
    <div
      className="py-16 bg-white relative"
      style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(255, 153, 51, 0.015) 1px, transparent 1px),
          linear-gradient(0deg, rgba(19, 136, 8, 0.015) 1px, transparent 1px),
          linear-gradient(45deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(19, 136, 8, 0.008) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px, 80px 80px, 120px 120px, 120px 120px",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images Section */}
          <div className="relative">
            {/* Large Screen: 2x2 Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`rounded-2xl shadow-lg w-full h-48 object-cover border ${image.border} transition-all duration-300 group-hover:shadow-xl group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Small Screen: Horizontal Scroll */}
            <div className="sm:hidden relative">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((image, index) => (
                  <div key={index} className="flex-shrink-0 relative group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`rounded-2xl shadow-lg w-64 h-40 object-cover border ${image.border} transition-all duration-300`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                ))}
              </div>

              {/* Gradient fade effects for mobile scroll */}
              <div className="absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
              <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-orange-200/50 hidden sm:block">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  10+
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  Years of Impact
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-green-500 rounded"></div>
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-semibold uppercase tracking-wide">
                About Us
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              <span className="text-slate-800">
                Empowering Bihar's Youth for
              </span>
              <span className="block bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Over a Decade
              </span>
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              Azad Youth Organisation was founded with a vision to transform
              Bihar through youth empowerment. From humble beginnings in rural
              villages, we've grown into a movement that spans across districts,
              creating opportunities and building hope in communities that need
              it most.
            </p>

            {/* Stats Row for Mobile */}
            <div className="sm:hidden bg-gradient-to-r from-orange-50 to-green-50 p-4 rounded-2xl border border-orange-200/30">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                    25K+
                  </div>
                  <div className="text-xs text-slate-600">Lives Changed</div>
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-xs text-slate-600">Villages</div>
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    10+
                  </div>
                  <div className="text-xs text-slate-600">Years</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3 group">
                <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                    Community-Centered Approach
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Programs designed with local communities for maximum impact
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors duration-300">
                    Sustainable Development
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Long-term solutions creating lasting positive change
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                    Transparent Operations
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Open reporting on all activities and fund utilization
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors duration-300">
                    Youth-Led Initiatives
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Empowering young leaders to drive community change
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-4">
              <div className="bg-gradient-to-r from-orange-500/10 to-green-500/10 p-4 rounded-2xl border border-orange-200/30">
                <p className="text-slate-700 text-sm italic text-center">
                  "Every small step towards empowerment creates ripples of
                  change across Bihar's communities."
                </p>
              </div>
            </div>
          </div>
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

export default AboutSection;
