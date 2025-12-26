import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Phone,
  Home,
  Menu,
  X,
  ImageIcon,
  Award,
  Handshake,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { DonateBtn, VolunteerBtn } from "../misc/Buttons";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfilePic, setUserProfilePic] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setIsLoggedIn(true);
        setUserName(user.fullName || user.firstName || "User");
        setUserProfilePic(user.profilePic || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  // Function to get current page from URL pathname
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/" || path === "") return "home";
    if (path === "/about") return "about";
    if (path === "/contact") return "contact";
    if (path === "/gallery") return "gallery";
    if (path === "/programs") return "programs";
    if (path === "/partnership") return "partnership";
    if (path === "/our-team") return "our-team";
    return "home";
  };

  const currentPage = getCurrentPage();

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handlePageChange = (page: string) => {
    setIsDrawerOpen(false);
    navigate(`/${page === "home" ? "" : page}`);
  };

  // Navigation handlers for buttons
  const handleDonateClick = () => {
    navigate("/donate");
    setIsDrawerOpen(false);
  };

  const handleMemberClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
    setIsDrawerOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About Us", icon: Users },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "our-team", label: "Our Team", icon: Heart },
    { id: "programs", label: "Programs", icon: Award },
    { id: "partnership", label: "Partnership", icon: Handshake },
    { id: "contact", label: "Contact Us", icon: Phone },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-md fixed top-0 left-0 right-0 z-[100] overflow-x-hidden">
        {/* Thin tricolor top strip */}
        <div className="h-0.5 bg-gradient-to-r from-orange-500 via-white to-green-600" />
        <div className="container mx-auto px-3 sm:px-4 max-w-full">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 lg:grid lg:grid-cols-3">
            {/* Left Section - Hamburger + Logo */}
            <div className="flex items-center min-w-0 flex-1 lg:flex-initial">
              {/* Hamburger Menu */}
              <div className="mr-2 sm:mr-3 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDrawer}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-1.5 sm:p-2 rounded-lg"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>

              {/* Logo Section */}
              <div
                className="flex items-center gap-2 sm:gap-3 max-w-[calc(100vw-200px)] sm:max-w-none lg:max-w-none"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                <div className="bg-gradient-to-br from-orange-500 to-green-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-sm flex-shrink-0">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  {/* Small screens - shorter text */}
                  <span className="block sm:hidden text-[11px] font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent truncate">
                    Azad Youth Org.
                  </span>

                  {/* Medium screens */}
                  <span className="hidden sm:block md:hidden text-sm font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    Azad Youth Organisation
                  </span>

                  {/* Large screens and up */}
                  <span className="hidden md:block text-base lg:text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    Azad Youth Organisation
                  </span>

                  <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 -mt-0.5 leading-tight truncate">
                    Building Better Tomorrow
                  </p>
                </div>
              </div>
            </div>

            {/* Center Section - Desktop Navigation Links */}
            <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-6">
              <Link
                to="/"
                className={`relative text-base xl:text-lg font-medium py-2 transition-colors whitespace-nowrap ${
                  currentPage === "home"
                    ? "text-orange-600"
                    : "text-gray-800 hover:text-orange-600"
                }`}
              >
                Home
                {currentPage === "home" && (
                  <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600"></span>
                )}
              </Link>

              <Link
                to="/about"
                className={`relative text-base xl:text-lg font-medium py-2 transition-colors whitespace-nowrap ${
                  currentPage === "about"
                    ? "text-orange-600"
                    : "text-gray-800 hover:text-orange-600"
                }`}
              >
                About
                {currentPage === "about" && (
                  <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600"></span>
                )}
              </Link>

              <Link
                to="/contact"
                className={`relative text-base xl:text-lg font-medium py-2 transition-colors whitespace-nowrap ${
                  currentPage === "contact"
                    ? "text-orange-600"
                    : "text-gray-800 hover:text-orange-600"
                }`}
              >
                Contact
                {currentPage === "contact" && (
                  <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600"></span>
                )}
              </Link>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Volunteer/Member Button - Always visible */}
              <VolunteerBtn
                classStyle="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 h-7 sm:h-8 lg:text-sm lg:px-4 lg:py-2 lg:h-auto whitespace-nowrap"
                onClick={handleMemberClick}
                isLoggedIn={isLoggedIn}
                userName={userName}
                profilePic={userProfilePic}
              />

              {/* Donate Button - Hidden on mobile (< 640px) */}
              <div className="hidden sm:block">
                <DonateBtn
                  classStyle="text-xs px-3 py-1.5 h-8 lg:text-sm lg:px-4 lg:py-2 lg:h-auto whitespace-nowrap"
                  onClick={handleDonateClick}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-[90] transition-opacity duration-200"
          onClick={() => toggleDrawer()}
        />
      )}

      {/* Sliding Drawer */}
      {isDrawerOpen && (
        <div
          className={`
            fixed top-0 left-0 h-full w-80 bg-white backdrop-blur supports-[backdrop-filter]:backdrop-blur
            shadow-2xl z-[95] border-r-4 ${
              currentPage ? "border-r-orange-500" : "border-r-gray-100"
            }
            transition-transform duration-500 ease-in-out 
            transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
            flex flex-col
          `}
        >
          {/* Drawer Header - Fixed */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-green-600 p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/90 p-3 rounded-xl shadow">
                  <Heart className="h-8 w-8 text-transparent bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Azad Youth Organisation
                  </h2>
                  <p className="text-orange-100 text-sm">
                    Building Better Tomorrow
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDrawer}
                className="text-white hover:bg-white/20 p-2 rounded-lg"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Navigation Links - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Navigation
            </h3>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-orange-50 to-green-50 text-orange-700 shadow-sm border border-orange-100"
                      : "text-gray-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-br from-orange-500 to-green-600"
                        : "bg-gray-100 group-hover:bg-orange-100"
                    }`}
                  >
                    <IconComponent
                      className={`h-5 w-5 transition-colors duration-200 ${
                        active ? "text-white" : "text-orange-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-orange-700 to-green-700 bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <span className="ml-auto h-6 w-1 rounded-full bg-gradient-to-b from-orange-500 to-green-600"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="flex-shrink-0 p-6 bg-white border-t border-gray-100">
            <div className="h-px bg-gradient-to-r from-orange-200 via-gray-200 to-green-200 mb-3"></div>
            <VolunteerBtn
              classStyle="my-2 w-full justify-center"
              onClick={handleMemberClick}
              isLoggedIn={isLoggedIn}
              userName={userName}
              profilePic={userProfilePic}
            />
            <DonateBtn
              classStyle="my-2 w-full justify-center"
              onClick={handleDonateClick}
            />
          </div>
        </div>
      )}
    </>
  );
}
