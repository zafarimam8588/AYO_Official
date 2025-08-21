import { Link } from "react-router-dom";
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
            {/* Soft tricolor gradients with light opacity */}
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />{" "}
              {/* saffron */}
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.22" />{" "}
              {/* green */}
            </linearGradient>

            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.18" />{" "}
              {/* light saffron */}
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0.26" />{" "}
              {/* light green */}
            </linearGradient>

            <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.22" />
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
                <Mail className="w-5 h-5 text-orange-500" />
                <span>hello@landingfolio.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-green-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-orange-400" />
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
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 hover:translate-x-1 transform"
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
                  className="text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 transform"
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
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 hover:translate-x-1 transform"
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
                  color: "hover:bg-orange-500",
                  name: "Twitter",
                },
                {
                  icon: FaFacebookF,
                  color: "hover:bg-orange-600",
                  name: "Facebook",
                },
                {
                  icon: FaInstagram,
                  color: "hover:bg-green-500",
                  name: "Instagram",
                },
                {
                  icon: CiLinkedin,
                  color: "hover:bg-green-600",
                  name: "LinkedIn",
                },
                {
                  icon: CiYoutube,
                  color: "hover:bg-orange-500",
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

        {/* Subtle tricolor separator at very bottom */}
        <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-orange-200 via-gray-100 to-green-200 rounded-full" />
      </div>
    </footer>
  );
};

export default Footer;
