import {
  BookOpen,
  Users,
  Target,
  Leaf,
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";

const ProgramsPage = () => {
  const programs = [
    {
      id: "education-support",
      title: "Education Support",
      description:
        "Empowering underprivileged youth through scholarships, educational resources, and academic mentorship programs that unlock their potential.",
      icon: BookOpen,
      color: "orange",
      features: [
        "Free educational materials and books",
        "Scholarship programs for deserving students",
        "Academic tutoring and mentorship",
        "Career guidance and counseling",
      ],
      stats: { number: "2000+", label: "Students Supported" },
    },
    {
      id: "community-development",
      title: "Community Development",
      description:
        "Building sustainable communities through collaborative projects, infrastructure development, and local empowerment initiatives.",
      icon: Users,
      color: "green",
      features: [
        "Infrastructure development projects",
        "Community health programs",
        "Skill development workshops",
        "Local business support initiatives",
      ],
      stats: { number: "50+", label: "Communities Transformed" },
    },
    {
      id: "youth-leadership",
      title: "Youth Leadership",
      description:
        "Developing the next generation of leaders through training programs, workshops, and real-world leadership opportunities.",
      icon: Target,
      color: "orange",
      features: [
        "Leadership training workshops",
        "Public speaking and communication skills",
        "Project management training",
        "Youth parliament initiatives",
      ],
      stats: { number: "1500+", label: "Young Leaders Trained" },
    },
    {
      id: "environmental-action",
      title: "Environmental Action",
      description:
        "Promoting environmental consciousness and sustainable practices through education, tree plantation, and clean energy initiatives.",
      icon: Leaf,
      color: "green",
      features: [
        "Tree plantation drives",
        "Waste management programs",
        "Renewable energy projects",
        "Environmental awareness campaigns",
      ],
      stats: { number: "10,000+", label: "Trees Planted" },
    },
    {
      id: "volunteer-programs",
      title: "Volunteer Programs",
      description:
        "Creating meaningful volunteer opportunities that allow individuals to contribute to society while developing personal growth.",
      icon: Heart,
      color: "orange",
      features: [
        "Community service projects",
        "Disaster relief volunteering",
        "Educational support volunteering",
        "Healthcare assistance programs",
      ],
      stats: { number: "800+", label: "Active Volunteers" },
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-x-hidden">
      {/* Light grid pattern background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-100/40 via-orange-50/20 to-green-100/40 py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-white/30"></div>
          <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-orange-200/30">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-orange-600" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 mb-4 sm:mb-6 break-words leading-tight">
              Our Programs
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              Comprehensive initiatives designed to empower youth and transform
              communities across India
            </p>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {programs.map((program, index) => (
                <section
                  key={program.id}
                  id={program.id}
                  className="scroll-mt-20"
                >
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20`}
                  >
                    {/* Content */}
                    <div className="flex-1 w-full">
                      <div className="max-w-2xl mx-auto lg:mx-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
                          <div
                            className={`p-3 rounded-full flex-shrink-0 ${
                              program.color === "orange"
                                ? "bg-orange-100/80 border border-orange-200/50"
                                : "bg-green-100/80 border border-green-200/50"
                            }`}
                          >
                            <program.icon
                              className={`w-7 h-7 sm:w-8 sm:h-8 ${
                                program.color === "orange"
                                  ? "text-orange-600"
                                  : "text-green-600"
                              }`}
                            />
                          </div>
                          <h2
                            className={`text-2xl sm:text-3xl lg:text-4xl font-bold break-words leading-tight ${
                              program.color === "orange"
                                ? "text-orange-700"
                                : "text-green-700"
                            }`}
                          >
                            {program.title}
                          </h2>
                        </div>

                        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed break-words">
                          {program.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-3 mb-6 sm:mb-8">
                          {program.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle
                                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                  program.color === "orange"
                                    ? "text-orange-500"
                                    : "text-green-500"
                                }`}
                              />
                              <span className="text-sm sm:text-base text-gray-600 break-words leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Stats */}
                        <div
                          className={`inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl ${
                            program.color === "orange"
                              ? "bg-orange-100/80 border border-orange-200/50"
                              : "bg-green-100/80 border border-green-200/50"
                          }`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              program.color === "orange"
                                ? "text-orange-600"
                                : "text-green-600"
                            }`}
                          />
                          <div>
                            <span
                              className={`text-xl sm:text-2xl font-bold ${
                                program.color === "orange"
                                  ? "text-orange-700"
                                  : "text-green-700"
                              }`}
                            >
                              {program.stats.number}
                            </span>
                            <span className="text-gray-600 text-xs sm:text-sm ml-2">
                              {program.stats.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visual Card */}
                    <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
                      <div
                        className={`bg-white/70 backdrop-blur-sm border rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full ${
                          program.color === "orange"
                            ? "border-orange-200/50 hover:border-orange-300/60"
                            : "border-green-200/50 hover:border-green-300/60"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                              program.color === "orange"
                                ? "bg-gradient-to-br from-orange-400 to-orange-500"
                                : "bg-gradient-to-br from-green-400 to-green-500"
                            }`}
                          >
                            <program.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 break-words leading-tight">
                            {program.title}
                          </h3>
                          <div
                            className={`text-2xl sm:text-3xl font-bold mb-2 ${
                              program.color === "orange"
                                ? "text-orange-600"
                                : "text-green-600"
                            }`}
                          >
                            {program.stats.number}
                          </div>
                          <p className="text-gray-600 mb-6 break-words text-sm sm:text-base">
                            {program.stats.label}
                          </p>
                          <button
                            className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base w-full sm:w-auto justify-center ${
                              program.color === "orange"
                                ? "bg-orange-500 hover:bg-orange-600 text-white"
                                : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-12 sm:py-16 bg-gradient-to-r from-orange-100/30 via-orange-50/20 to-green-100/30 overflow-hidden">
          <div className="absolute inset-0 bg-white/20"></div>
          <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 mb-6 break-words leading-tight">
              Join Our Programs Today
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed break-words max-w-3xl mx-auto">
              Be part of our mission to empower youth and transform communities.
              Every contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <button className="bg-orange-500/80 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-orange-600/80 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base cursor-pointer">
                Get Involved
              </button>
              <button className="border-2 border-orange-300/60 bg-white/40 backdrop-blur-sm text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-orange-50/60 hover:text-orange-600 transition-all duration-300 text-sm sm:text-base cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
