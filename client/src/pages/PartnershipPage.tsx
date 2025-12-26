import {
  Handshake,
  Users,
  Building2,
  GraduationCap,
  Heart,
  Target,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  Globe,
  Lightbulb,
  Award,
  Sparkles,
} from "lucide-react";

const PartnershipPage = () => {
  const partnershipStats = [
    { number: "500+", label: "Active Partners", icon: Handshake },
    { number: "50+", label: "Cities Reached", icon: Globe },
    { number: "10K+", label: "Lives Impacted", icon: Heart },
    { number: "25+", label: "Years Experience", icon: Award },
  ];

  const partnershipTypes = [
    {
      title: "Corporate Partnership",
      description:
        "Create meaningful CSR programs that drive real social impact and brand value.",
      benefits: [
        "Enhanced brand visibility",
        "Employee engagement programs",
        "Tax benefits & CSR compliance",
        "Measurable social impact",
      ],
      color: "orange",
      icon: Building2,
    },
    {
      title: "Educational Partnership",
      description:
        "Collaborate with institutions to enhance youth development and skill programs.",
      benefits: [
        "Student internship opportunities",
        "Research collaboration",
        "Curriculum development support",
        "Academic excellence programs",
      ],
      color: "green",
      icon: GraduationCap,
    },
    {
      title: "Government Partnership",
      description:
        "Work with government bodies to scale impact across communities nationwide.",
      benefits: [
        "Policy influence & advocacy",
        "Resource sharing initiatives",
        "Large-scale program implementation",
        "Sustainable community development",
      ],
      color: "orange",
      icon: Users,
    },
    {
      title: "Individual Partnership",
      description:
        "Become a champion of change through personal involvement and meaningful contribution.",
      benefits: [
        "Direct mentoring opportunities",
        "Skill & expertise sharing",
        "Exclusive networking events",
        "Personal growth & fulfillment",
      ],
      color: "green",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Minimalistic */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        {/* Tri-color accent bars */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-green-500 rounded-full blur-xl opacity-20"></div>
              <div className="relative bg-white border border-gray-100 p-6 rounded-full shadow-lg">
                <Handshake
                  className="w-12 h-12 text-transparent bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gray-900">Partner With</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-green-500 bg-clip-text text-transparent">
              Azad Youth Organisation
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Join us in empowering youth and transforming communities. Together,
            we create lasting change.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                Become a Partner
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:border-orange-500 hover:text-orange-500 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section - Clean & Minimal */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partnershipStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <stat.icon
                      className="w-7 h-7 text-gray-700"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Partner - Minimalistic Cards */}
      <div className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-orange-50 rounded-full mb-4">
              <span className="text-sm font-semibold text-orange-600">
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Partner With AYO?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in collaboration that creates sustainable impact and
              meaningful change.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Proven Impact",
                desc: "25+ years of measurable outcomes and transparent reporting in youth development.",
                color: "orange",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "Cutting-edge programs and creative solutions for complex social challenges.",
                color: "green",
              },
              {
                icon: Globe,
                title: "Nationwide Reach",
                desc: "Extensive network across 50+ cities ensuring widespread impact.",
                color: "orange",
              },
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="relative p-8 border border-gray-100 rounded-2xl bg-white">
                  <div
                    className={`inline-flex p-3 rounded-xl mb-6 ${
                      item.color === "orange" ? "bg-orange-50" : "bg-green-50"
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${
                        item.color === "orange"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Types - Clean Grid */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-50 rounded-full mb-4">
              <span className="text-sm font-semibold text-green-600">
                PARTNERSHIP MODELS
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how your organization can make a difference through
              various models.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`flex-shrink-0 p-3 rounded-xl ${
                      type.color === "orange" ? "bg-orange-50" : "bg-green-50"
                    }`}
                  >
                    <type.icon
                      className={`w-6 h-6 ${
                        type.color === "orange"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {type.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          type.color === "orange"
                            ? "text-orange-500"
                            : "text-green-500"
                        }`}
                        strokeWidth={1.5}
                      />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    type.color === "orange"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  Explore Partnership
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section - Minimalistic Timeline */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-orange-50 rounded-full mb-4">
              <span className="text-sm font-semibold text-orange-600">
                SIMPLE PROCESS
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How to Become a Partner
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to start making a difference together
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                {
                  num: "01",
                  title: "Connect",
                  desc: "Reach out to our partnership team to discuss your goals",
                  color: "orange",
                },
                {
                  num: "02",
                  title: "Collaborate",
                  desc: "Design a partnership that aligns with both our missions",
                  color: "green",
                },
                {
                  num: "03",
                  title: "Create Impact",
                  desc: "Launch programs that create measurable social change",
                  color: "orange",
                },
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-white shadow-lg mb-6 ${
                      step.color === "orange" ? "bg-orange-500" : "bg-green-500"
                    }`}
                  >
                    <span className="text-xl font-bold text-white">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Bold & Clean */}
      <div className="py-24 bg-gradient-to-r from-orange-500 to-green-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join us in creating a brighter future for India's youth. Let's build
            something amazing together.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-left shadow-xl">
              <div className="inline-flex p-3 bg-orange-50 rounded-xl mb-4">
                <Mail className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get detailed information about opportunities
              </p>
              <a
                href="mailto:partnerships@azadyouthorg.org"
                className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors group"
              >
                partnerships@azadyouthorg.org
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 text-left shadow-xl">
              <div className="inline-flex p-3 bg-green-50 rounded-xl mb-4">
                <Phone className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-4">
                Speak with our partnership specialists
              </p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 text-green-500 font-semibold hover:text-green-600 transition-colors group"
              >
                +91 98765 43210
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note - Subtle */}
      <div className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">
              Azad Youth Organisation
            </span>{" "}
            is committed to building long-term, mutually beneficial partnerships
            that create sustainable social impact.
          </p>
        </div>
      </div>

      {/* Tri-color accent bar at bottom */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
    </div>
  );
};

export default PartnershipPage;
