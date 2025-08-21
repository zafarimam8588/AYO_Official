const HeroTitleSection = () => {
  return (
    <main
      className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-orange-50/30 via-white to-green-50/30 relative"
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
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-orange-600 via-slate-800 to-green-600 bg-clip-text text-transparent">
            Building Bihar's
          </span>
          <br />
          <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
            Future
          </span>
        </h1>

        <p className="text-xl text-slate-600 mb-8">
          Empowering communities through education, healthcare, and sustainable
          development
        </p>
      </div>
    </main>
  );
};

export default HeroTitleSection;
