const ImpactStastisticSection = () => {
  return (
    <div
      className="py-12 lg:py-16 relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 153, 51, 0.05) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(19, 136, 8, 0.05) 100%)",
        backgroundImage: `
            linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255, 153, 51, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(19, 136, 8, 0.01) 1px, transparent 1px)
          `,
        backgroundSize: "30px 30px, 30px 30px, 60px 60px, 60px 60px",
      }}
    >
      <div id="our-impact" className="container mx-auto px-4">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Our Impact
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Creating lasting change through dedicated programs and initiatives
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="text-center p-6 lg:p-8 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-orange-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <p className="text-slate-800 font-semibold text-base lg:text-lg leading-relaxed">
              Extensive Community Reach
            </p>
          </div>

          <div className="text-center p-6 lg:p-8 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-green-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-slate-800 font-semibold text-base lg:text-lg leading-relaxed">
              Wide Geographic Coverage
            </p>
          </div>

          <div className="text-center p-6 lg:p-8 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-orange-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="text-slate-800 font-semibold text-base lg:text-lg leading-relaxed">
              Dedicated Volunteer Network
            </p>
          </div>

          <div className="text-center p-6 lg:p-8 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-green-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-orange-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <p className="text-slate-800 font-semibold text-base lg:text-lg leading-relaxed">
              Ongoing Active Programs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStastisticSection;
