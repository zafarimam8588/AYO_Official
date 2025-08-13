import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";
import { CiTwitter, CiLinkedin, CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-white overflow-hidden">
      {/* Wave SVG Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a8e6cf" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#56ab91" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b2f7ef" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3ddc84" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#76c893" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1e5631" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <path
            d="M0,400 C320,300 420,500 800,400 C1120,300 1200,500 1440,400 L1440,800 L0,800 Z"
            fill="url(#wave1)"
          />
          <path
            d="M0,500 C360,400 480,600 840,500 C1200,400 1320,600 1440,500 L1440,800 L0,800 Z"
            fill="url(#wave2)"
          />
          <path
            d="M0,600 C400,500 520,700 880,600 C1240,500 1360,700 1440,600 L1440,800 L0,800 Z"
            fill="url(#wave3)"
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-6">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mb-12 border border-blue-100">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Stay in the loop
            </h3>
            <p className="text-gray-600 mb-6">
              Get the latest updates, tips, and exclusive content delivered to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <Button className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="font-bold text-xl text-gray-800 mb-4">
                Hope Foundation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Empowering professionals to create stunning portfolios and
                accelerate their career growth.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>hello@landingfolio.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-green-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 text-lg">Platform</h4>
            <nav className="flex flex-col space-y-3">
              {[
                "Help Center",
                "Volunteer FAQ",
                "Blog",
                "Community Stories",
                "Get Involved",
              ].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 text-lg">Resources</h4>
            <nav className="flex flex-col space-y-3">
              {[
                "About Us",
                "Our Mission",
                "Our Impact",
                "Our Team",
                "Contact Us",
              ].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 text-lg">Legal</h4>
            <nav className="flex flex-col space-y-3">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "GDPR",
                "Licenses",
              ].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-200">
          <div className="text-gray-600">
            <p>&copy; 2024 NGO. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Follow us:</span>
            <div className="flex gap-2">
              {[
                {
                  icon: CiTwitter,
                  color: "hover:bg-blue-500",
                  name: "Twitter",
                },
                {
                  icon: FaFacebookF,
                  color: "hover:bg-blue-600",
                  name: "Facebook",
                },
                {
                  icon: FaInstagram,
                  color: "hover:bg-pink-500",
                  name: "Instagram",
                },
                {
                  icon: CiLinkedin,
                  color: "hover:bg-blue-700",
                  name: "LinkedIn",
                },
                {
                  icon: CiYoutube,
                  color: "hover:bg-red-500",
                  name: "YouTube",
                },
              ].map(({ icon: Icon, color, name }) => (
                <Link
                  key={name}
                  to="#"
                  className={`p-3 rounded-full bg-gray-100 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 ${color}`}
                  aria-label={name}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
