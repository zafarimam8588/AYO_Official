import React from "react";
import {
  Heart,
  Mail,
  Phone,
  Construction,
  ArrowLeft,
  Clock,
  Users,
  Target,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-orange-300 to-green-500 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="p-4 bg-white rounded-full shadow-xl">
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 break-words">
            Support Our Mission
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Help{" "}
            <strong className="text-orange-700">Azad Youth Organisation</strong>{" "}
            empower the next generation and create lasting change in communities
            across India.
          </p>
        </div>
      </div>

      {/* Under Construction Section */}
      <div className="py-16 sm:py-20">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl border-l-8 border-orange-500 p-8 sm:p-12 text-center">
            {/* Construction Icon */}
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gradient-to-br from-orange-100 to-green-100 rounded-full">
                <Construction className="w-16 h-16 sm:w-20 sm:h-20 text-orange-600" />
              </div>
            </div>

            {/* Main Message */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 break-words">
              Page Under Development
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed break-words">
              We're working hard to build a seamless donation experience for
              you. Our secure donation portal will be available soon!
            </p>

            {/* Features Coming Soon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                <Target className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Secure Payments
                </h3>
                <p className="text-sm text-gray-600">
                  Multiple payment options with bank-level security
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Impact Tracking
                </h3>
                <p className="text-sm text-gray-600">
                  See exactly how your donation creates change
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                <CheckCircle className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Community Impact
                </h3>
                <p className="text-sm text-gray-600">
                  Driving positive change through local partnerships
                </p>
              </div>
            </div>

            {/* Expected Launch */}
            <div className="bg-gradient-to-r from-orange-100 via-white to-green-100 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  Expected Launch
                </h3>
              </div>
              <p className="text-lg text-gray-700 font-medium">
                Coming Soon - October 2025
              </p>
              <p className="text-gray-600 mt-2">
                We're putting the finishing touches on our donation platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Ways to Donate */}
      <div className="py-16 bg-gradient-to-r from-green-50 to-orange-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 break-words">
              Want to Donate Now?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 break-words">
              We'd love to hear from you! Here are ways to support us right
              away:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-orange-100 rounded-full mr-4">
                  <Mail className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-orange-700">
                  Email Our Team
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Send us your donation inquiry and we'll guide you through the
                process personally. Our team responds within 24 hours.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Personalized donation guidance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Multiple payment options
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Instant tax receipt</span>
                </div>
              </div>
              <a
                href="mailto:donate@azadyouthorg.org"
                className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-300"
              >
                donate@azadyouthorg.org
              </a>
            </div>

            {/* Contact Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-700">
                  Call Us Directly
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Speak with our donation specialists who can help you choose the
                best way to support our programs and maximize your impact.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Direct consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Program-specific donations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Corporate partnership options
                  </span>
                </div>
              </div>
              <a
                href="tel:+919876543210"
                className="inline-block mt-6 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors duration-300"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Preview */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 break-words">
            Your Impact Matters
          </h2>
          <p className="text-lg text-gray-600 mb-12 break-words">
            Every donation helps us create meaningful change in young lives
            across India
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">₹500</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Provides</h3>
              <p className="text-gray-600 text-sm">
                Educational materials for 5 students
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">₹2K</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Sponsors</h3>
              <p className="text-gray-600 text-sm">
                One month of skill training program
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">₹10K</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Funds</h3>
              <p className="text-gray-600 text-sm">
                Complete leadership development workshop
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
