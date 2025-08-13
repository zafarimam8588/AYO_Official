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
      <nav className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              {/*------------------------ Hamburger Menu -------------------------*/}
              <div className="md:mr-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDrawer}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 p-2"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
              {/* --------------------------Logo Section---------------------- */}
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-green-800">
                    Hope Foundation
                  </span>
                  <p className="text-xs text-green-600 -mt-1">
                    Building Better Tomorrow
                  </p>
                </div>
              </div>
            </div>
            {/* --------------------Desktop Navigation Links------------------ */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/"
                onClick={() => setCurrentPage("home")}
                className={`relative  text-xl ${
                  currentPage === "home"
                    ? "text-green-700"
                    : "text-green-600 hover:text-green-700"
                }`}
              >
                Home
                {currentPage === "home" && (
                  <div className="absolute -bottom-1 left-0.5 transform -translate-x-1/2 h-0.5 bg-green-500 rounded-full w-13"></div>
                )}
              </Link>

              <Link
                to="/about"
                onClick={() => setCurrentPage("about")}
                className={`relative text-xl ${
                  currentPage === "about"
                    ? "text-green-700"
                    : "text-green-600 hover:text-green-700"
                }`}
              >
                About
                {currentPage === "about" && (
                  <div className="absolute -bottom-1 left-0.5 transform -translate-x-1/2 h-0.5 bg-green-500 rounded-full w-13"></div>
                )}
              </Link>

              <Link
                to="/contact"
                onClick={() => setCurrentPage("contact")}
                className={`relative text-xl ${
                  currentPage === "contact"
                    ? "text-green-700"
                    : "text-green-600 hover:text-green-700"
                }`}
              >
                Contact
                {currentPage === "contact" && (
                  <div className="absolute -bottom-1 left-0.5 transform -translate-x-1/2 h-0.5 bg-green-500 rounded-full w-16"></div>
                )}
              </Link>
            </div>
            {/* ------------Action Buttons  for tob navbar---------------*/}
            <div className="flex">
              <VolunteerBtn classStyle=" hidden lg:flex mr-4" />

              <DonateBtn classStyle=" hidden sm:flex mr-4 " />
            </div>
          </div>
        </div>
      </nav>

      {/* ------------------------------Overlay--------------------------------- */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => toggleDrawer()}
        />
      )}

      {/* Sliding Drawer */}

      {isDrawerOpen && (
        <div
          className={`
            fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 
            transition-transform duration-500 ease-in-out 
            transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
  `}
        >
          {/* Drawer Header */}
          <div className="bg-green-500 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">www</h2>
                  <p className="text-green-100 text-sm">
                    Building Better Tomorrow
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDrawer}
                className="text-white hover:bg-white/10 p-2"
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
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                    currentPage === item.id
                      ? "bg-green-100 text-green-700 shadow-sm border border-green-200"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      currentPage === item.id ? "bg-green-200" : "bg-green-100"
                    }`}
                  >
                    <IconComponent
                      className={`h-5 w-5 ${
                        currentPage === item.id
                          ? "text-green-700"
                          : "text-green-600"
                      }`}
                    />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* --------------------------Action Buttons -----------------------------*/}
          <div className="fixed bottom-2 left-6 flex flex-col">
            <VolunteerBtn classStyle="my-2 w-68" />
            <DonateBtn classStyle="my-2 w-68" />
          </div>
        </div>
      )}
    </>
  );
}
