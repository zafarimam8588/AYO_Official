import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Copy } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";
import { CiTwitter, CiLinkedin, CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "info@azadyouthorg.org";

  const handleCopy = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Fixed scroll function with proper element parameter handling
  const scrollWithOffset = (el: any) => {
    setTimeout(() => {
      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = -80;
      window.scrollTo({
        top: yCoordinate + yOffset,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <footer className="relative bg-white overflow-hidden">
      {/* Wave SVG Background - Same as before */}
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
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0.26" />
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {/* Company Info - Same as before */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div>
              <Link
                to="/"
                className="hover:text-orange-600 transition-colors duration-200"
              >
                <h3 className="font-bold text-xl text-gray-800 mb-4">
                  Azad Youth Organisation
                </h3>
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="break-all text-sm hover:text-orange-600 transition-colors duration-200"
                >
                  {email}
                </a>
                <button
                  onClick={() => handleCopy(email)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  aria-label="Copy email"
                >
                  <Copy className="w-4 h-4 text-gray-500 hover:text-orange-600" />
                </button>
                {copied && (
                  <span className="text-xs text-green-600 animate-pulse">
                    Copied!
                  </span>
                )}
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+919876543210"
                  className="whitespace-nowrap text-sm hover:text-green-600 transition-colors duration-200"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps?q=New+Delhi,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-orange-600 transition-colors duration-200"
                >
                  New Delhi, India
                </a>
              </div>
            </div>
          </div>

          {/* About AYO */}
          <div className="col-span-1 space-y-4">
            <h4 className="font-semibold text-gray-800 text-lg">About AYO</h4>
            <nav className="flex flex-col space-y-3">
              {[
                { name: "Our Mission", path: "/about/#our-principle" },
                { name: "Our Impact", path: "/about/#our-impact" },
                { name: "Success Stories", path: "/#success-stories" },
                { name: "Gallery", path: "/gallery" },
                { name: "Get Involved", path: "/dashboard" },
              ].map((item) => (
                <HashLink
                  key={item.name}
                  to={item.path}
                  scroll={(el) => scrollWithOffset(el)}
                  className="text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 transform text-sm"
                >
                  {item.name}
                </HashLink>
              ))}
            </nav>
          </div>

          {/* Programs & Initiatives - CORRECTED */}
          <div className="col-span-1 space-y-4">
            <h4 className="font-semibold text-gray-800 text-lg">Programs</h4>
            <nav className="flex flex-col space-y-3">
              {[
                {
                  name: "Education Support",
                  path: "/programs#education-support",
                },
                {
                  name: "Community Development",
                  path: "/programs#community-development",
                },
                {
                  name: "Youth Leadership",
                  path: "/programs#youth-leadership",
                },
                {
                  name: "Environmental Action",
                  path: "/programs#environmental-action",
                },
                {
                  name: "Volunteer Programs",
                  path: "/programs#volunteer-programs",
                },
              ].map((item) => (
                <HashLink
                  key={item.name}
                  to={item.path}
                  scroll={(el) => scrollWithOffset(el)}
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 hover:translate-x-1 transform text-sm"
                >
                  {item.name}
                </HashLink>
              ))}
            </nav>
          </div>

          {/* Support & Legal */}
          <div className="col-span-1 space-y-4">
            <h4 className="font-semibold text-gray-800 text-lg">Support</h4>
            <nav className="flex flex-col space-y-3">
              {[
                { name: "Donate Now", path: "/donate" },
                { name: "Partnership", path: "/partnership" },
                { name: "Our Team", path: "/our-team" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 hover:translate-x-1 transform text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Section - Same as before */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-200">
          <div className="text-gray-600">
            <p>&copy; 2024 Azad Youth Organisation. All rights reserved.</p>
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
                <button
                  key={name}
                  type="button"
                  onClick={() =>
                    toast(`${name} link coming soon!`, {
                      icon: "🔗",
                      style: {
                        background: "#3b82f6",
                        color: "white",
                      },
                    })
                  }
                  className={`p-3 rounded-full bg-gray-100 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 ${color}`}
                  aria-label={name}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-orange-200 via-gray-100 to-green-200 rounded-full" />
      </div>
    </footer>
  );
};

export default Footer;
