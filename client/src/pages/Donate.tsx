import {
  Heart,
  Mail,
  Phone,
  Construction,
  ArrowRight,
  Clock,
  Target,
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
  Users,
  BookOpen,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { SectionHeader, UnifiedCTASection } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DonatePage = () => {
  const impactCards = [
    {
      amount: "₹500",
      title: "Educational Foundation",
      description:
        "Provides learning materials and resources for 5 students for one month",
      icon: BookOpen,
      color: "saffron" as const,
      highlight: "5 Students",
    },
    {
      amount: "₹2,000",
      title: "Skill Development",
      description:
        "Sponsors complete skill training program for one participant",
      icon: Lightbulb,
      color: "green" as const,
      highlight: "1 Participant",
    },
    {
      amount: "₹5,000",
      title: "Community Impact",
      description: "Supports community outreach programs reaching 50+ families",
      icon: Users,
      color: "saffron" as const,
      highlight: "50+ Families",
    },
    {
      amount: "₹10,000",
      title: "Leadership Program",
      description:
        "Funds comprehensive leadership development workshop for 20 youth",
      icon: TrendingUp,
      color: "green" as const,
      highlight: "20 Youth Leaders",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "Advanced encryption and security protocols to protect your donations and personal information.",
      color: "saffron" as const,
    },
    {
      icon: Target,
      title: "Impact Tracking",
      description:
        "Real-time updates on how your contribution is making a difference in communities.",
      color: "green" as const,
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description:
        "Quick and seamless donation processing with instant receipts and confirmations.",
      color: "saffron" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-saffron-50 via-white to-india-green-50">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0">
          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 153, 51, 0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(19, 136, 8, 0.06) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,153,51,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(19,136,8,0.12),transparent)]" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-saffron-300/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-india-green-300/20 rounded-full filter blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-saffron-200/30 rounded-full filter blur-2xl" />

        {/* Floating decorative shapes */}
        <div className="absolute top-32 right-20 w-4 h-4 bg-saffron-400 rounded-full opacity-60 animate-float" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-india-green-400 rounded-full opacity-60 animate-float animation-delay-300" />
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-saffron-500 rounded-full opacity-50 animate-float animation-delay-500" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-saffron-500 to-india-green-600 rounded-3xl shadow-2xl mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-slate-700 border border-saffron-200/50 shadow-sm mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-saffron-500" />
            Empowering Communities Across Bihar
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 leading-tight animate-fade-in animation-delay-100">
            Your Generosity
            <br />
            <span className="bg-gradient-to-r from-saffron-600 via-slate-700 to-india-green-600 bg-clip-text text-transparent">
              Transforms Lives
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in animation-delay-200">
            Join{" "}
            <strong className="text-slate-800">Azad Youth Organisation</strong>{" "}
            in creating lasting change through youth empowerment and community
            development.
          </p>

          {/* Tricolor accent bar */}
          <div className="flex justify-center gap-2 mb-10 animate-fade-in animation-delay-300">
            <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-saffron-400 to-saffron-500" />
            <div className="h-1.5 w-6 rounded-full bg-slate-300" />
            <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-india-green-400 to-india-green-500" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-400">
            <Button
              variant="saffron"
              size="lg"
              className="rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5 mr-2" />
              Donate Now
            </Button>
            <Link to="/contact">
              <Button
                variant="warmOutline"
                size="lg"
                className="rounded-full px-10 py-6 text-lg"
              >
                Get In Touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Impact Cards Section */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Your Contribution"
            title="Make Every Rupee Count"
            subtitle="See the direct impact of your generosity on the lives of youth and communities across Bihar."
            titleColor="gradient"
          />

          {/* Impact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16">
            {impactCards.map((impact, index) => {
              const Icon = impact.icon;
              const isGreen = impact.color === "green";

              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Top gradient bar */}
                  <div
                    className={`h-2 ${isGreen ? "bg-gradient-to-r from-india-green-400 to-india-green-600" : "bg-gradient-to-r from-saffron-400 to-saffron-600"}`}
                  />

                  {/* Card content */}
                  <div className="p-6 sm:p-8">
                    {/* Icon and Amount */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isGreen ? "bg-india-green-100" : "bg-saffron-100"} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon
                          className={`w-7 h-7 ${isGreen ? "text-india-green-600" : "text-saffron-600"}`}
                        />
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full ${isGreen ? "bg-india-green-50" : "bg-saffron-50"}`}
                      >
                        <span
                          className={`text-2xl font-bold ${isGreen ? "text-india-green-600" : "text-saffron-600"}`}
                        >
                          {impact.amount}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {impact.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-5">
                      {impact.description}
                    </p>

                    {/* Highlight badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${isGreen ? "bg-india-green-50 text-india-green-700" : "bg-saffron-50 text-saffron-700"}`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {impact.highlight}
                    </div>
                  </div>

                  {/* Hover decoration */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isGreen ? "bg-india-green-500" : "bg-saffron-500"}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon / Features Section */}
      <section className="py-20 sm:py-24 lg:py-28 relative overflow-hidden">
        {/* Background with pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(255, 153, 51, 0.03) 25%, transparent 25%),
                linear-gradient(225deg, rgba(19, 136, 8, 0.03) 25%, transparent 25%),
                linear-gradient(315deg, rgba(255, 153, 51, 0.03) 25%, transparent 25%),
                linear-gradient(45deg, rgba(19, 136, 8, 0.03) 25%, transparent 25%)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Coming Soon Badge */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-saffron-100 to-india-green-100 rounded-full text-sm font-semibold mb-8 border border-saffron-200/50">
              <Construction className="w-5 h-5 text-saffron-600" />
              <span className="bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                Online Donations Coming Soon
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              A Better Way to
              <span className="bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                {" "}
                Give{" "}
              </span>
              is Coming
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're building a seamless, secure donation experience that makes
              supporting our mission effortless.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const isGreen = feature.color === "green";

              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                >
                  {/* Background decoration */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 ${isGreen ? "bg-india-green-50" : "bg-saffron-50"} rounded-bl-[100px] opacity-50`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${isGreen ? "bg-gradient-to-br from-india-green-400 to-india-green-600" : "bg-gradient-to-br from-saffron-400 to-saffron-600"}`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Launch Timeline Card */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-r from-saffron-500 via-saffron-600 to-india-green-600 rounded-3xl p-1 shadow-2xl">
              <div className="bg-gradient-to-r from-saffron-500 via-saffron-600 to-india-green-600 rounded-[22px] p-8 sm:p-12 text-center text-white">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Clock className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    Expected Launch: October 2025
                  </h3>
                </div>
                <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                  Our team is putting the finishing touches on a world-class
                  donation platform that will revolutionize how you support our
                  mission.
                </p>

                {/* Progress indicators */}
                <div className="flex justify-center gap-8 mt-8">
                  {["Design", "Development", "Testing"].map((stage, idx) => (
                    <div key={stage} className="text-center">
                      <div
                        className={`w-4 h-4 rounded-full mx-auto mb-2 ${idx < 2 ? "bg-white" : "bg-white/40"}`}
                      />
                      <span className="text-sm text-white/80">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-saffron-100/40 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-india-green-100/40 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Get In Touch"
            title="Ready to Make an Impact?"
            subtitle="Connect with our team today and discover how your contribution can transform lives and communities."
            titleColor="gradient"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {/* Email Contact Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-saffron-100 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Email Us
                    </h3>
                    <p className="text-slate-500">Get personalized guidance</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Personalized donation consultation",
                    "Multiple secure payment options",
                    "Instant tax-deductible receipts",
                    "Detailed impact tracking reports",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-india-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-india-green-600" />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="mailto:ayoindia1@gmail.com"
                  className="inline-flex items-center gap-3 w-full justify-center px-6 py-4 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  ayoindia1@gmail.com
                </a>
              </div>
            </div>

            {/* Phone Contact Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-india-green-400 to-india-green-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-india-green-100 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-india-green-400 to-india-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Call Us
                    </h3>
                    <p className="text-slate-500">Speak with our team</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Direct expert consultation",
                    "Program-specific donations",
                    "Corporate partnership opportunities",
                    "Legacy and planned giving options",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-india-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-india-green-600" />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="tel:+919942495941"
                  className="inline-flex items-center gap-3 w-full justify-center px-6 py-4 bg-gradient-to-r from-india-green-500 to-india-green-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  +91 9942495941
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <UnifiedCTASection
        title="Start Making a Difference Today"
        subtitle="Connect with our team to explore how your contribution can create lasting positive change in Bihar's communities."
        primaryAction={{
          label: "Contact Our Team",
          href: "/contact",
          icon: Mail,
        }}
        secondaryAction={{
          label: "Learn About Our Programs",
          href: "/programs",
          icon: BookOpen,
        }}
      />
    </div>
  );
};

export default DonatePage;
