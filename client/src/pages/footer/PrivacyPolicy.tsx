import { Shield, Eye, Lock, Users, Phone, Mail } from "lucide-react";

const PrivacyPolicyPage = () => {
  const lastUpdated = "December 2024";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-white to-green-600 py-16">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-full shadow-lg">
              <Shield className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your privacy is fundamental to our mission. Learn how Azad Youth
            Organisation protects and respects your personal information.
          </p>
          <div className="mt-6 inline-block bg-white px-4 py-2 rounded-full shadow-md">
            <p className="text-sm text-gray-600">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border-l-8 border-orange-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <Eye className="w-6 h-6 text-orange-600" />
            Our Commitment to Privacy
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At{" "}
            <strong className="text-orange-600">
              Azad Youth Organisation (AYO)
            </strong>
            , we are deeply committed to protecting your privacy and ensuring
            that your personal information is handled with the utmost care,
            transparency, and responsibility. This Privacy Policy outlines how
            we collect, use, store, and protect your information when you
            interact with our services, website, or participate in our programs.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6" />
              Information We Collect
            </h3>
            <div className="space-y-4 text-gray-700">
              <div className="pl-6 border-l-2 border-green-200">
                <h4 className="font-semibold text-green-600 mb-2">
                  Personal Information
                </h4>
                <p>
                  Name, email address, phone number, postal address, date of
                  birth, and other contact details you provide when registering,
                  donating, or contacting us.
                </p>
              </div>
              <div className="pl-6 border-l-2 border-green-200">
                <h4 className="font-semibold text-green-600 mb-2">
                  Program Participation Data
                </h4>
                <p>
                  Information related to your participation in our youth
                  programs, volunteering activities, and community initiatives.
                </p>
              </div>
              <div className="pl-6 border-l-2 border-green-200">
                <h4 className="font-semibold text-green-600 mb-2">
                  Technical Information
                </h4>
                <p>
                  Website usage data, IP addresses, browser information, and
                  cookies to improve your experience on our platform.
                </p>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-orange-700 mb-6">
              How We Use Your Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Deliver and improve our youth empowerment programs</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Process donations and provide tax receipts</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Send updates about our impact and initiatives</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Facilitate community engagement and networking</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Ensure compliance with legal and regulatory requirements
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Analyze and improve our website and services</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-600 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6" />
              Data Security & Protection
            </h3>
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <p className="text-green-800 font-medium mb-3">
                We implement robust security measures including:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-green-700">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Lock className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-medium">SSL Encryption</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-medium">Secure Servers</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-medium">Regular Audits</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              We regularly review and update our security practices to ensure
              your data remains protected against unauthorized access,
              disclosure, alteration, or destruction.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-600 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-orange-700 mb-6">
              Your Privacy Rights
            </h3>
            <div className="bg-orange-50 rounded-lg p-6">
              <p className="text-orange-800 font-medium mb-4">
                You have the right to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-orange-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-700 font-bold text-sm">1</span>
                  </div>
                  <p>Access your personal information</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-700 font-bold text-sm">2</span>
                  </div>
                  <p>Correct inaccurate information</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-700 font-bold text-sm">3</span>
                  </div>
                  <p>Request deletion of your data</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-700 font-bold text-sm">4</span>
                  </div>
                  <p>Opt-out of communications</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sharing Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-700 mb-6">
              Information Sharing
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800 font-semibold mb-3">🛡️ We Never:</p>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Sell your personal information to third parties
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Rent or lease your data for commercial purposes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Share sensitive information without consent
                </li>
              </ul>
            </div>
            <p className="text-gray-700 mt-4">
              We may share anonymized, aggregated data for research purposes or
              with trusted partners who help us deliver our programs, always
              with appropriate safeguards in place.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Questions About Privacy?
            </h3>
            <p className="text-gray-700 text-lg">
              We're here to help and ensure your privacy concerns are addressed
              promptly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-orange-600" />
                <h4 className="font-semibold text-gray-800">Email Us</h4>
              </div>
              <p className="text-gray-600 mb-3">
                For privacy-related questions:
              </p>
              <a
                href="mailto:privacy@azadyouthorg.org"
                className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
              >
                privacy@azadyouthorg.org
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-green-600" />
                <h4 className="font-semibold text-gray-800">Call Us</h4>
              </div>
              <p className="text-gray-600 mb-3">Privacy helpline:</p>
              <a
                href="tel:+919876543210"
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center p-6 bg-gray-50 rounded-xl">
          <p className="text-gray-600 text-sm">
            This Privacy Policy is effective as of {lastUpdated} and may be
            updated periodically. We will notify you of any significant changes
            via email or website notice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
