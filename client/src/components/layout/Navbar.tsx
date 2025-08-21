import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Users, Phone, Home, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DonateBtn, VolunteerBtn } from "../misc/Buttons";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsDrawerOpen(false);
    navigate(`/${page === "home" ? "" : page}`);
  };
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About Us", icon: Users },
    { id: "contact", label: "Contact Us", icon: Phone },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-md sticky top-0 z-50">
        {/* Thin tricolor top strip */}
        <div className="h-0.5 bg-gradient-to-r from-orange-500 via-white to-green-600" />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              {/*------------------------ Hamburger Menu -------------------------*/}
              <div className="md:mr-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDrawer}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-2 rounded-lg"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
              {/* --------------------------Logo Section---------------------- */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-gradient-to-br from-orange-500 to-green-600 p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-sm">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <span className="text-xs md:hidden font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    Azad Youth Organisation
                  </span>

                  {/* Show full text on medium screens and larger */}
                  <span className="hidden md:inline text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    Azad Youth Organisation
                  </span>

                  <p className="text-[10px] md:text-xs text-gray-600 -mt-0.5 md:-mt-1 leading-tight">
                    Building Better Tomorrow
                  </p>
                </div>
              </div>
            </div>
            {/* --------------------Desktop Navigation Links------------------ */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                onClick={() => setCurrentPage("home")}
                className={`relative text-lg font-medium py-2 transition-colors ${
                  currentPage === "home"
                    ? "text-orange-600"
                    : "text-gray-800 hover:text-orange-600"
                }`}
              >
                Home
                {currentPage === "home" && (
                  <span className="pointer-events-none absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600"></span>
                )}
              </Link>

              <Link
                to="/about"
                onClick={() => setCurrentPage("about")}
                className={`relative text-lg font-medium py-2 transition-colors ${
                  currentPage === "about"
                    ? "text-orange-600"
                    : "text-gray-800 hover:text-orange-600"
                }`}
              >
                About
                {currentPage === "about" && (
                  <span className="pointer-events-none absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600"></span>
                )}
              </Link>

              <Link
                to="/contact"
                onClick={() => setCurrentPage("contact")}
                className={`relative text-lg font-medium py-2 transition-colors ${
                  currentPage === "contact"
                    ? "text-orange-600"
                    : "text-gray-800 hover:text-orange-600"
                }`}
              >
                Contact
                {currentPage === "contact" && (
                  <span className="pointer-events-none absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600"></span>
                )}
              </Link>
            </div>
            {/* ------------Action Buttons  for top navbar---------------*/}
            <div className="flex">
              {/* VolunteerBtn for smaller screens only - smaller size */}
              <VolunteerBtn classStyle="lg:hidden text-xs px-2 py-1 h-8" />

              {/* VolunteerBtn for larger screens only */}
              <VolunteerBtn classStyle="hidden lg:flex mr-4" />
              <DonateBtn classStyle="hidden sm:flex mr-4" />
            </div>
          </div>
        </div>
      </nav>

      {/* ------------------------------Overlay--------------------------------- */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 transition-opacity duration-200"
          onClick={() => toggleDrawer()}
        />
      )}

      {/* Sliding Drawer */}
      {isDrawerOpen && (
        <div
          className={`
            fixed top-0 left-0 h-full w-80 bg-white backdrop-blur supports-[backdrop-filter]:backdrop-blur
            shadow-2xl z-50 border-r border-gray-100
            transition-transform duration-500 ease-in-out 
            transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
  `}
        >
          {/* Drawer Header */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-green-600 p-6">
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

          {/* Navigation Links */}
          <div className="p-6 space-y-2">
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
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-orange-50 to-green-50 text-orange-700 shadow-sm border border-orange-100"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      active
                        ? "bg-gradient-to-br from-orange-500 to-green-600"
                        : "bg-gray-100"
                    }`}
                  >
                    <IconComponent
                      className={`h-5 w-5 ${
                        active ? "text-white" : "text-orange-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium ${
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

          {/* --------------------------Action Buttons -----------------------------*/}
          <div className="fixed bottom-2 left-6 right-6 flex flex-col bg-white">
            <div className="h-px bg-gradient-to-r from-orange-200 via-gray-200 to-green-200 mb-3"></div>
            <VolunteerBtn classStyle="my-2 w-full justify-center" />
            <DonateBtn classStyle="my-2 w-full justify-center" />
          </div>
        </div>
      )}
    </>
  );
}
