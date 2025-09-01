import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ScrollProgress } from "./components/magicui/scroll-progress";
import StayInLoop from "./components/sections/StayInLoop";
import LoginPage from "./pages/Login";
import GoogleAuthCallback from "./components/auth/GoogleAuthCallaback";
import AdminDashboard from "./pages/AdminDashboard";
import SharedMemberProfile from "./pages/sharedMemberProfile";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPage from "./pages/Register";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPassword from "./pages/ResetPassword";
import ScrollToTop from "./components/misc/scrollToTop";
import PrivacyPolicyPage from "./pages/footer/PrivacyPolicy";
import PartnershipPage from "./pages/PartnershipPage";
import DonatePage from "./pages/Donate";
import TeamPage from "./pages/OurTeam";
import ProgramsPage from "./pages/Programs";
import Gallery from "./pages/Gallery";

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserRole(user.role);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserRole(null);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollProgress className="h-0.5 bg-black" />
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<GoogleAuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <SharedMemberProfile isAdmin={false} />
            )
          }
        />

        <Route
          path="/admin/member/:memberId"
          element={<SharedMemberProfile isAdmin={true} />}
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/our-team" element={<TeamPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        {/*Footer pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
      </Routes>
      <StayInLoop />
      <Footer />
    </div>
  );
}

export default App;
