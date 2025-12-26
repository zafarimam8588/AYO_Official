import {
  Heart,
  Mail,
  Phone,
  Construction,
  ArrowLeft,
  Clock,
  Target,
  CheckCircle,
  Sparkles,
  Shield,
  Award,
  Zap,
} from "lucide-react";

const DonatePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section with Fancy Background Pattern */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          {/* Geometric Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 25% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
              `,
            }}
          />

          {/* Floating Dots Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0)
              `,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Diagonal Lines */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-60 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-40 blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-50 blur-xl animate-pulse delay-500"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
              <Heart className="w-10 h-10 text-indigo-600" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Empowering Communities
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Support Our
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Mission
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            Join{" "}
            <strong className="font-semibold text-gray-800">
              Azad Youth Organisation
            </strong>{" "}
            in creating lasting change through youth empowerment and community
            development across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <Heart className="w-5 h-5" />
              Start Donating
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-semibold border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
              Learn More
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-sm font-medium text-indigo-600 mb-6">
              <Construction className="w-4 h-4" />
              Coming Soon
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Donation Platform
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                In Development
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're crafting a seamless, secure donation experience that will
              make supporting our mission effortless and impactful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Bank-Grade Security
              </h3>
              <p className="text-gray-600">
                Advanced encryption and security protocols to protect your
                donations and personal information.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Impact Tracking
              </h3>
              <p className="text-gray-600">
                Real-time updates on how your contribution is making a
                difference in communities.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant Processing
              </h3>
              <p className="text-gray-600">
                Quick and seamless donation processing with instant receipts and
                confirmations.
              </p>
            </div>
          </div>

          {/* Launch Timeline */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Clock className="w-8 h-8" />
              <h3 className="text-2xl sm:text-3xl font-bold">
                Expected Launch
              </h3>
            </div>
            <p className="text-xl sm:text-2xl font-light mb-4">October 2025</p>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
              Our team is putting the finishing touches on a world-class
              donation platform that will revolutionize how you support our
              mission.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ready to Make an
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Impact?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with our team today and discover how your contribution can
              transform lives and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Email Contact */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Email Our Team
                  </h3>
                </div>

                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Get personalized guidance on donation options, impact reports,
                  and how your contribution creates meaningful change.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Personalized donation consultation",
                    "Multiple secure payment options",
                    "Instant tax-deductible receipts",
                    "Detailed impact tracking reports",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="mailto:donate@azadyouthorg.org"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  donate@azadyouthorg.org
                </a>
              </div>
            </div>

            {/* Phone Contact */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Call Directly
                  </h3>
                </div>

                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Speak with our donation specialists who understand our
                  programs and can help maximize your charitable impact.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Direct expert consultation",
                    "Program-specific donations",
                    "Corporate partnership opportunities",
                    "Legacy and planned giving options",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Impact Preview */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Your Impact
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Amplified
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every contribution creates ripple effects of positive change
              across communities and generations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                amount: "₹500",
                title: "Educational Foundation",
                description:
                  "Provides learning materials and resources for 5 students for one month",
                color: "from-indigo-500 to-blue-500",
                bgColor: "from-indigo-50 to-blue-50",
              },
              {
                amount: "₹2,000",
                title: "Skill Development",
                description:
                  "Sponsors complete skill training program for one participant",
                color: "from-purple-500 to-indigo-500",
                bgColor: "from-purple-50 to-indigo-50",
              },
              {
                amount: "₹10,000",
                title: "Leadership Program",
                description:
                  "Funds comprehensive leadership development workshop for 20 youth",
                color: "from-blue-500 to-purple-500",
                bgColor: "from-blue-50 to-purple-50",
              },
            ].map((impact, index) => (
              <div key={index} className="group text-center">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${impact.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span
                    className={`text-2xl font-bold bg-gradient-to-r ${impact.color} bg-clip-text text-transparent`}
                  >
                    {impact.amount}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {impact.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full text-sm font-medium text-indigo-600 mb-6">
              <Award className="w-4 h-4" />
              Join the Movement
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Lives?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Your support today becomes tomorrow's success stories. Connect
              with us to start your impact journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:donate@azadyouthorg.org"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Start Conversation
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
