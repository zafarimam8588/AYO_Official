const HeroTitleSection = () => {
  return (
    <main
      className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-br from-orange-50/30 via-white to-green-50/30 relative overflow-hidden"
      style={{
        backgroundImage: `
      repeating-linear-gradient(
        45deg,
        rgba(255, 153, 51, 0.02),
        rgba(255, 153, 51, 0.02) 2px,
        transparent 2px,
        transparent 30px
      ),
      repeating-linear-gradient(
        -45deg,
        rgba(19, 136, 8, 0.02),
        rgba(19, 136, 8, 0.02) 2px,
        transparent 2px,
        transparent 30px
      )
    `,
      }}
    >
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl opacity-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300 rounded-full filter blur-3xl opacity-10" />

      <div className="text-center relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-orange-600 via-slate-800 to-green-600 bg-clip-text text-transparent inline-block">
            Building Bihar's
          </span>
          <br />
          <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent inline-block">
            Future
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Empowering communities through education, healthcare, and sustainable
          development
        </p>

        {/* Scroll indicator */}
        <div className="flex justify-center">
          <div className="text-orange-500 animate-bounce">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroTitleSection;
