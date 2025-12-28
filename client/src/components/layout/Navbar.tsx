import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Users,
  Phone,
  Home,
  Menu,
  ImageIcon,
  Award,
  Handshake,
  Heart,
  X,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { DonateBtn, VolunteerBtn } from "../misc/Buttons";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfilePic, setUserProfilePic] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState(false);
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
    if (path === "/" || path === "") {
      return "home";
    }
    if (path === "/about") {
      return "about";
    }
    if (path === "/contact") {
      return "contact";
    }
    if (path === "/gallery") {
      return "gallery";
    }
    if (path === "/programs") {
      return "programs";
    }
    if (path === "/partnership") {
      return "partnership";
    }
    if (path === "/our-team") {
      return "our-team";
    }
    return "home";
  };

  const currentPage = getCurrentPage();

  // Navigation handlers for buttons
  const handleDonateClick = () => {
    navigate("/donate");
    setSheetOpen(false);
  };

  const handleMemberClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
    setSheetOpen(false);
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
      {/* Skip Navigation Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-[110] focus:px-4 focus:py-2 focus:bg-saffron-600 focus:text-white focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Main Navigation Bar */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="bg-white/90 backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-[100] overflow-x-hidden"
      >
        {/* Thin tricolor top strip */}
        <div
          className="h-0.5 bg-gradient-to-r from-saffron-500 via-white to-india-green-600"
          aria-hidden="true"
        />
        <div className="container mx-auto px-3 sm:px-4 max-w-full">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 lg:grid lg:grid-cols-3">
            {/* Left Section - Hamburger + Logo */}
            <div className="flex items-center min-w-0 flex-1 lg:flex-initial">
              {/* Sheet Component for Mobile Drawer */}
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Open navigation menu"
                    className="mr-2 sm:mr-3 flex-shrink-0 text-saffron-600 hover:text-saffron-700 hover:bg-saffron-50 p-1.5 sm:p-2 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2"
                  >
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-80 p-0 border-r-0 overflow-hidden flex flex-col [&>button]:hidden"
                >
                  {/* Sheet Header - Compact with Tricolor Gradient */}
                  <SheetHeader className="relative overflow-hidden p-0 flex-shrink-0">
                    {/* Subtle tricolor gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-saffron-50 via-white to-india-green-50" />

                    {/* Thin tricolor accent line at top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-400 via-white to-india-green-500" />

                    {/* Content */}
                    <div className="relative z-10 px-5 py-3 flex items-center justify-between">
                      <SheetTitle className="text-base font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                        Azad Youth Organisation
                      </SheetTitle>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="Close navigation menu"
                          className="text-slate-600 hover:bg-black/5 p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 transition-all duration-200"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </SheetClose>
                    </div>
                    <SheetDescription className="sr-only">
                      Navigation menu
                    </SheetDescription>
                  </SheetHeader>

                  {/* Navigation Links - Scrollable */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-2">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                      Navigation
                    </h3>
                    <nav aria-label="Mobile navigation">
                      <ul className="space-y-2" role="list">
                        {navItems.map((item) => {
                          const IconComponent = item.icon;
                          const active = currentPage === item.id;
                          return (
                            <li key={item.id}>
                              <SheetClose asChild>
                                <Link
                                  to={`/${item.id === "home" ? "" : item.id}`}
                                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                                    active
                                      ? "bg-gradient-to-r from-saffron-50 to-india-green-50 text-saffron-700 shadow-sm border border-saffron-100"
                                      : "text-slate-800 hover:bg-gradient-to-r hover:from-saffron-50 hover:to-india-green-50 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2"
                                  }`}
                                  aria-current={active ? "page" : undefined}
                                >
                                  <div
                                    className={`p-2 rounded-lg transition-all duration-200 ${
                                      active
                                        ? "bg-gradient-to-br from-saffron-500 to-india-green-600"
                                        : "bg-slate-100"
                                    }`}
                                  >
                                    <IconComponent
                                      className={`h-5 w-5 transition-colors duration-200 ${
                                        active
                                          ? "text-white"
                                          : "text-saffron-600"
                                      }`}
                                    />
                                  </div>
                                  <span
                                    className={`font-medium transition-all duration-200 ${
                                      active
                                        ? "bg-gradient-to-r from-saffron-700 to-india-green-700 bg-clip-text text-transparent"
                                        : ""
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                  {active && (
                                    <span
                                      className="ml-auto h-6 w-1 rounded-full bg-gradient-to-b from-saffron-500 to-india-green-600"
                                      aria-hidden="true"
                                    />
                                  )}
                                </Link>
                              </SheetClose>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>

                  {/* Action Buttons - Fixed at bottom */}
                  <SheetFooter className="flex-shrink-0 p-6 bg-white border-t border-slate-100 flex-col gap-2">
                    <div
                      className="h-px w-full bg-gradient-to-r from-saffron-200 via-slate-200 to-india-green-200 mb-3"
                      aria-hidden="true"
                    />
                    <SheetClose asChild>
                      <div className="w-full">
                        <VolunteerBtn
                          classStyle="w-full justify-center"
                          onClick={handleMemberClick}
                          isLoggedIn={isLoggedIn}
                          userName={userName}
                          profilePic={userProfilePic}
                        />
                      </div>
                    </SheetClose>
                    <SheetClose asChild>
                      <div className="w-full">
                        <DonateBtn
                          classStyle="w-full justify-center"
                          onClick={handleDonateClick}
                        />
                      </div>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              {/* Logo Section */}
              <Link
                to="/"
                className="flex items-center max-w-[calc(100vw-200px)] sm:max-w-none lg:max-w-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 rounded-lg"
                aria-label="Azad Youth Organisation - Go to homepage"
              >
                <div className="min-w-0">
                  {/* Small screens - shorter text */}
                  <span className="block sm:hidden text-[11px] font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent truncate">
                    Azad Youth Org.
                  </span>

                  {/* Medium screens */}
                  <span className="hidden sm:block md:hidden text-sm font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                    Azad Youth Organisation
                  </span>

                  {/* Large screens and up */}
                  <span className="hidden md:block text-base lg:text-xl font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                    Azad Youth Organisation
                  </span>

                  <p className="text-[8px] sm:text-[10px] md:text-xs text-slate-600 -mt-0.5 leading-tight truncate">
                    Building Better Tomorrow
                  </p>
                </div>
              </Link>
            </div>

            {/* Center Section - Desktop Navigation Links */}
            <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
              {[
                { id: "home", label: "Home", path: "/" },
                { id: "about", label: "About", path: "/about" },
                { id: "contact", label: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative text-sm xl:text-base font-medium transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 rounded-sm ${
                    currentPage === item.id
                      ? "text-saffron-600"
                      : "text-slate-600 hover:text-saffron-600"
                  }`}
                  aria-current={currentPage === item.id ? "page" : undefined}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-saffron-500"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Volunteer/Member Button - Always visible */}
              <VolunteerBtn
                classStyle="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 h-8 sm:h-9 lg:text-sm lg:px-4 lg:py-2 lg:h-10"
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
    </>
  );
}
