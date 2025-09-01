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
            Our Impact in Bihar
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Real numbers, real change, real lives transformed across Bihar
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="text-center p-4 lg:p-6 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-orange-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2">
              25K+
            </div>
            <p className="text-slate-700 font-medium text-sm lg:text-base">
              Lives Impacted
            </p>
          </div>

          <div className="text-center p-4 lg:p-6 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-green-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
              500+
            </div>
            <p className="text-slate-700 font-medium text-sm lg:text-base">
              Villages Served
            </p>
          </div>

          <div className="text-center p-4 lg:p-6 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-orange-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-2">
              1,200+
            </div>
            <p className="text-slate-700 font-medium text-sm lg:text-base">
              Active Volunteers
            </p>
          </div>

          <div className="text-center p-4 lg:p-6 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-green-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent mb-2">
              150+
            </div>
            <p className="text-slate-700 font-medium text-sm lg:text-base">
              Active Projects
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStastisticSection;
