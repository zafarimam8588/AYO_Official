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
import { SectionHeader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PartnershipPage = () => {
  const partnershipStats = [
    { number: "500+", label: "Active Partners", icon: Handshake },
    { number: "50+", label: "Cities Reached", icon: Globe },
    { number: "10K+", label: "Lives Impacted", icon: Heart },
    { number: "1+", label: "Year Experience", icon: Award },
  ];

  const whyPartner = [
    {
      icon: Target,
      title: "Proven Impact",
      desc: "Measurable outcomes and transparent reporting in youth development since 2024.",
      color: "saffron" as const,
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "Cutting-edge programs and creative solutions for complex social challenges.",
      color: "green" as const,
    },
    {
      icon: Globe,
      title: "Nationwide Reach",
      desc: "Extensive network across 50+ cities ensuring widespread impact.",
      color: "saffron" as const,
    },
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
      color: "saffron" as const,
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
      color: "green" as const,
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
      color: "saffron" as const,
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
      color: "green" as const,
      icon: Heart,
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: "Connect",
      desc: "Reach out to our partnership team to discuss your goals",
      color: "saffron" as const,
    },
    {
      num: "02",
      title: "Collaborate",
      desc: "Design a partnership that aligns with both our missions",
      color: "green" as const,
    },
    {
      num: "03",
      title: "Create Impact",
      desc: "Launch programs that create measurable social change",
      color: "saffron" as const,
    },
  ];

  const getColorClasses = (color: "saffron" | "green") => {
    const colorMap = {
      saffron: {
        bg: "bg-saffron-50",
        icon: "text-saffron-500",
        check: "text-saffron-500",
        button: "bg-saffron-500 hover:bg-saffron-600",
        step: "bg-saffron-500",
        border: "border-saffron-200",
      },
      green: {
        bg: "bg-india-green-50",
        icon: "text-india-green-500",
        check: "text-india-green-500",
        button: "bg-india-green-500 hover:bg-india-green-600",
        step: "bg-india-green-500",
        border: "border-india-green-200",
      },
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 sm:pt-20 sm:pb-32 md:pt-24 md:pb-36 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-saffron-200/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-india-green-200/20 rounded-full filter blur-3xl" />

        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-saffron-500 to-india-green-500 rounded-full blur-xl opacity-20" />
              <div className="relative bg-white border border-saffron-100 p-6 rounded-full shadow-lg">
                <Handshake className="w-12 h-12 text-saffron-500" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-slate-800">Partner With</span>
            <br />
            <span className="bg-gradient-to-r from-saffron-500 via-saffron-400 to-india-green-500 bg-clip-text text-transparent">
              Azad Youth Organisation
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            Join us in empowering youth and transforming communities. Together,
            we create lasting change.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button
                variant="gradientPrimary"
                size="lg"
                className="rounded-full px-8 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Become a Partner
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="greenOutline"
                size="lg"
                className="rounded-full px-8 hover:-translate-y-0.5 transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-warm-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {partnershipStats.map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="inline-flex items-center justify-center mb-4">
                  <div
                    className={`p-3 bg-white rounded-2xl shadow-md group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 border ${
                      index % 2 === 0
                        ? "border-saffron-100"
                        : "border-india-green-100"
                    }`}
                  >
                    <stat.icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 ${
                        index % 2 === 0
                          ? "text-saffron-500"
                          : "text-india-green-500"
                      }`}
                    />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Why Choose Us"
            title="Why Partner With AYO?"
            subtitle="We believe in collaboration that creates sustainable impact and meaningful change."
            titleColor="gradient"
          />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
            {whyPartner.map((item, index) => {
              const colors = getColorClasses(item.color);
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-warm-50 to-white rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                  <div
                    className={`relative p-6 sm:p-8 border ${colors.border} rounded-2xl bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                  >
                    <div
                      className={`inline-flex p-3 rounded-xl mb-5 sm:mb-6 ${colors.bg}`}
                    >
                      <item.icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`}
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-warm-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Partnership Models"
            title="Partnership Opportunities"
            subtitle="Discover how your organization can make a difference through various models."
            titleColor="gradient"
          />

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-12">
            {partnershipTypes.map((type, index) => {
              const colors = getColorClasses(type.color);
              return (
                <div
                  key={index}
                  className={`group bg-white rounded-2xl p-6 sm:p-8 border ${colors.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div
                      className={`flex-shrink-0 p-2.5 sm:p-3 rounded-xl ${colors.bg}`}
                    >
                      <type.icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1.5 sm:mb-2">
                        {type.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                    {type.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 sm:gap-3"
                      >
                        <CheckCircle
                          className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${colors.check}`}
                        />
                        <span className="text-slate-700 text-xs sm:text-sm">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link to="/contact">
                    <Button
                      variant={type.color === "saffron" ? "saffron" : "green"}
                      className="w-full rounded-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Explore Partnership
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Simple Process"
            title="How to Become a Partner"
            subtitle="Three simple steps to start making a difference together"
            titleColor="gradient"
          />

          <div className="relative mt-10 sm:mt-12">
            {/* Connection line */}
            <div className="hidden md:block absolute top-[2rem] sm:top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron-500 via-white to-india-green-500" />

            <div className="grid sm:grid-cols-3 gap-8 sm:gap-6 md:gap-8 relative">
              {processSteps.map((step, index) => {
                const colors = getColorClasses(step.color);
                return (
                  <div key={index} className="text-center relative group">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-lg mb-4 sm:mb-6 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 ${colors.step}`}
                    >
                      <span className="text-lg sm:text-xl font-bold text-white">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-saffron-500 to-india-green-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center p-2.5 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full mb-5 sm:mb-6">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
            Join us in creating a brighter future for India's youth. Let's build
            something amazing together.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-left shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="inline-flex p-2.5 sm:p-3 bg-saffron-50 rounded-xl mb-3 sm:mb-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-saffron-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1.5 sm:mb-2">
                Email Us
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Get detailed information about opportunities
              </p>
              <a
                href="mailto:ayoindia1@gmail.com"
                className="inline-flex items-center gap-2 text-saffron-500 font-semibold hover:text-saffron-600 transition-colors group text-sm sm:text-base"
              >
                ayoindia1@gmail.com
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-left shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="inline-flex p-2.5 sm:p-3 bg-india-green-50 rounded-xl mb-3 sm:mb-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-india-green-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1.5 sm:mb-2">
                Call Us
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Speak with our partnership specialists
              </p>
              <a
                href="tel:+919942495941"
                className="inline-flex items-center gap-2 text-india-green-500 font-semibold hover:text-india-green-600 transition-colors group text-sm sm:text-base"
              >
                +91 9942495941
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-6 sm:py-8 bg-warm-50 border-t border-saffron-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800">
              Azad Youth Organisation
            </span>{" "}
            is committed to building long-term, mutually beneficial partnerships
            that create sustainable social impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnershipPage;
