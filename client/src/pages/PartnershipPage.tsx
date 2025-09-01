import React from "react";
import {
  Handshake,
  Users,
  Building2,
  GraduationCap,
  Heart,
  Target,
  Star,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  Globe,
  Lightbulb,
  Award,
} from "lucide-react";

const PartnershipPage = () => {
  const partnershipStats = [
    { number: "500+", label: "Active Partners", icon: Handshake },
    { number: "50+", label: "Cities Reached", icon: Globe },
    { number: "10,000+", label: "Lives Impacted", icon: Heart },
    { number: "25+", label: "Years Experience", icon: Award },
  ];

  const partnershipTypes = [
    {
      title: "Corporate Partnership",
      description:
        "Join hands with us to create meaningful CSR programs that drive real social impact.",
      benefits: [
        "Brand visibility",
        "Employee engagement",
        "Tax benefits",
        "CSR compliance",
      ],
      color: "orange",
      icon: Building2,
    },
    {
      title: "Educational Partnership",
      description:
        "Collaborate with educational institutions to enhance youth development programs.",
      benefits: [
        "Student internships",
        "Research collaboration",
        "Skill development",
        "Academic support",
      ],
      color: "green",
      icon: GraduationCap,
    },
    {
      title: "Government Partnership",
      description:
        "Work together with government bodies to scale our impact across communities.",
      benefits: [
        "Policy influence",
        "Resource sharing",
        "Program scaling",
        "Community reach",
      ],
      color: "orange",
      icon: Users,
    },
    {
      title: "Individual Partnership",
      description:
        "Become a champion of change through personal involvement and support.",
      benefits: [
        "Mentoring opportunities",
        "Skill sharing",
        "Networking",
        "Personal fulfillment",
      ],
      color: "green",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-orange-300 to-green-500 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="p-3 sm:p-4 bg-white rounded-full shadow-xl">
              <Handshake className="w-12 h-12 sm:w-16 sm:h-16 text-orange-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 break-words">
            Partner With Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
            Join{" "}
            <strong className="text-orange-700">Azad Youth Organisation</strong>{" "}
            in empowering youth and transforming communities across India.
            Together, we can create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Become a Partner
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white hover:text-orange-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 sm:py-16 bg-white overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {partnershipStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-orange-100 to-green-100 rounded-full group-hover:from-orange-200 group-hover:to-green-200 transition-all duration-300">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 break-words">
                  {stat.number}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium break-words">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Partner With Us Section */}
      <div className="py-12 sm:py-16 bg-gradient-to-r from-green-50 to-orange-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 break-words">
              Why Partner With AYO?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto break-words">
              We believe in the power of collaboration to create sustainable
              impact and meaningful change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500 w-full">
              <div className="flex justify-center mb-4 sm:mb-6">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center break-words">
                Proven Impact
              </h3>
              <p className="text-gray-600 text-center leading-relaxed break-words">
                25+ years of experience in youth development with measurable
                outcomes and transparent reporting.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500 w-full">
              <div className="flex justify-center mb-4 sm:mb-6">
                <Lightbulb className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center break-words">
                Innovation
              </h3>
              <p className="text-gray-600 text-center leading-relaxed break-words">
                Cutting-edge programs and creative solutions to address complex
                social challenges.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500 w-full">
              <div className="flex justify-center mb-4 sm:mb-6">
                <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center break-words">
                Nationwide Reach
              </h3>
              <p className="text-gray-600 text-center leading-relaxed break-words">
                Extensive network across 50+ cities, ensuring your partnership
                creates widespread impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Types */}
      <div className="py-12 sm:py-16 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 break-words">
              Partnership Opportunities
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto break-words">
              Discover how your organization can make a difference through
              various partnership models.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 w-full ${
                  type.color === "orange"
                    ? "border-orange-500"
                    : "border-green-500"
                }`}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div
                      className={`p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 ${
                        type.color === "orange"
                          ? "bg-orange-100"
                          : "bg-green-100"
                      }`}
                    >
                      <type.icon
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${
                          type.color === "orange"
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-lg sm:text-xl lg:text-2xl font-bold break-words ${
                        type.color === "orange"
                          ? "text-orange-700"
                          : "text-green-700"
                      }`}
                    >
                      {type.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed break-words">
                    {type.description}
                  </p>

                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="font-semibold text-gray-800 break-words">
                      Key Benefits:
                    </h4>
                    {type.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <CheckCircle
                          className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${
                            type.color === "orange"
                              ? "text-orange-500"
                              : "text-green-500"
                          }`}
                        />
                        <span className="text-gray-600 text-sm sm:text-base break-words">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`mt-4 sm:mt-6 w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      type.color === "orange"
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Story Section */}
      <div className="py-12 sm:py-16 bg-gradient-to-r from-orange-50 via-white to-green-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 break-words">
              Partnership Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 break-words">
              Real impact through meaningful collaborations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-l-4 border-orange-500 w-full">
              <div className="flex items-center mb-4 sm:mb-6">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
                  Tech Corp Partnership
                </h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed break-words text-sm sm:text-base">
                "Our 3-year partnership with AYO has trained over 2,000 youth in
                digital skills, with 85% securing employment within 6 months.
                It's been transformational for both our CSR goals and the
                communities we serve."
              </p>
              <p className="text-orange-600 font-semibold text-sm sm:text-base break-words">
                - Sarah Johnson, CSR Director
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-l-4 border-green-500 w-full">
              <div className="flex items-center mb-4 sm:mb-6">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
                  University Collaboration
                </h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed break-words text-sm sm:text-base">
                "The research partnership with AYO has produced groundbreaking
                insights into youth development while providing our students
                invaluable field experience. Together, we've impacted 5,000+
                young lives."
              </p>
              <p className="text-green-600 font-semibold text-sm sm:text-base break-words">
                - Dr. Raj Patel, Dean of Social Sciences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Partner Section */}
      <div className="py-12 sm:py-16 bg-white overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 break-words">
              How to Become a Partner
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 break-words">
              Simple steps to start making a difference together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-2xl font-bold text-orange-600">
                  1
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 break-words">
                Connect
              </h3>
              <p className="text-gray-600 break-words text-sm sm:text-base">
                Reach out to our partnership team to discuss your goals and
                interests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-2xl font-bold text-green-600">
                  2
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 break-words">
                Collaborate
              </h3>
              <p className="text-gray-600 break-words text-sm sm:text-base">
                Work together to design a partnership that aligns with both our
                missions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-2xl font-bold text-orange-600">
                  3
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 break-words">
                Create Impact
              </h3>
              <p className="text-gray-600 break-words text-sm sm:text-base">
                Launch programs and initiatives that create measurable social
                change.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-16 bg-gradient-to-r from-orange-500 via-orange-400 to-green-500 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 break-words">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed break-words">
            Join us in creating a brighter future for India's youth. Let's build
            something amazing together.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl w-full">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 break-words">
                Email Partnership Team
              </h3>
              <p className="text-gray-600 mb-3 sm:mb-4 break-words text-sm sm:text-base">
                Get detailed information about partnership opportunities
              </p>
              <a
                href="mailto:partnerships@azadyouthorg.org"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base break-all"
              >
                partnerships@azadyouthorg.org
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl w-full">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 break-words">
                Call Our Team
              </h3>
              <p className="text-gray-600 mb-3 sm:mb-4 break-words text-sm sm:text-base">
                Speak directly with our partnership specialists
              </p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base"
              >
                +91 98765 43210
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="py-6 sm:py-8 bg-gray-50 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-600 break-words text-sm sm:text-base">
            <strong className="text-orange-600">Azad Youth Organisation</strong>{" "}
            is committed to building long-term, mutually beneficial partnerships
            that create sustainable social impact. All partnerships are subject
            to our organizational values and impact criteria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnershipPage;
