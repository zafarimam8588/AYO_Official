import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
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
import UploadPicture from "./pages/UploadPicture";
import AdminMessagesPage from "./pages/AdminMessages";
import MessageDetail from "./pages/MessageDetail";
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
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "#fff",
            color: "#333",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            fontSize: "14px",
            fontWeight: "500",
          },
          success: {
            duration: 3000,
            style: {
              background: "#f0fdf4",
              color: "#15803d",
              border: "1px solid #bbf7d0",
            },
            iconTheme: {
              primary: "#15803d",
              secondary: "#f0fdf4",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#fef2f2",
              color: "#dc2626",
              border: "1px solid #fecaca",
            },
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fef2f2",
            },
          },
        }}
      />
      <main className="pt-[57px] sm:pt-[65px]">
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

          {/* Admin Picture Upload Route */}
          <Route
            path="/admin/upload-pic"
            element={
              userRole === "admin" ? (
                <UploadPicture />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Admin Messages Route */}
          <Route
            path="/admin/messages"
            element={
              userRole === "admin" ? (
                <AdminMessagesPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Message Detail Route */}
          <Route
            path="/admin/messages/:id"
            element={
              userRole === "admin" ? (
                <MessageDetail />
              ) : (
                <Navigate to="/login" replace />
              )
            }
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
      </main>
      <StayInLoop />
      <Footer />
    </div>
  );
}

export default App;
