import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { AdminProvider } from "./context/AdminContext";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Auth routes where Footer and StayInLoop should be hidden
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/auth/callback",
];

// Dashboard routes where Footer and StayInLoop should be hidden (but Navbar stays)
const DASHBOARD_ROUTES = [
  "/dashboard",
  "/admin/member",
  "/admin/messages",
  "/admin/user",
  "/admin/upload-pic",
];

function App() {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if current route is an auth route
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );

  // Check if current route is a dashboard route
  const isDashboardRoute = DASHBOARD_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    const updateUserRole = () => {
      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          const user = JSON.parse(userString);
          setUserRole(user.role);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    };

    // Initial check
    updateUserRole();
    setLoading(false);

    // Listen for auth changes (login/logout)
    window.addEventListener("authChange", updateUserRole);

    return () => {
      window.removeEventListener("authChange", updateUserRole);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AdminProvider>
        <div className="flex flex-col min-h-screen">
          {!isAuthRoute && <Navbar />}
          {!isAuthRoute && <ScrollProgress className="h-0.5 bg-black" />}
          <ScrollToTop />
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}
            containerStyle={{
              top: 20,
              right: 20,
            }}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#fff",
                color: "#334155",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
                fontWeight: "500",
                padding: "12px 16px",
                maxWidth: "400px",
              },
              success: {
                duration: 3000,
                style: {
                  background: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                },
                iconTheme: {
                  primary: "#16a34a",
                  secondary: "#f0fdf4",
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                },
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#fef2f2",
                },
              },
              loading: {
                style: {
                  background: "#f8fafc",
                  color: "#475569",
                  border: "1px solid #e2e8f0",
                },
              },
            }}
          />
          <main className={isAuthRoute ? "" : "pt-[57px] sm:pt-[65px]"}>
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
                  userRole === "admin" || userRole === "viewer" ? (
                    <AdminDashboard />
                  ) : (
                    <SharedMemberProfile isAdmin={false} />
                  )
                }
              />

              <Route
                path="/admin/member/:memberId"
                element={
                  userRole === "admin" || userRole === "viewer" ? (
                    <SharedMemberProfile isAdmin={true} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              {/* Admin Picture Upload Route */}
              <Route
                path="/admin/upload-pic"
                element={
                  userRole === "admin" || userRole === "viewer" ? (
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
                  userRole === "admin" || userRole === "viewer" ? (
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
                  userRole === "admin" || userRole === "viewer" ? (
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
              {/* Footer pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/partnership" element={<PartnershipPage />} />
            </Routes>
          </main>
          {!isAuthRoute && !isDashboardRoute && <StayInLoop />}
          {!isAuthRoute && !isDashboardRoute && <Footer />}
        </div>
      </AdminProvider>
    </ErrorBoundary>
  );
}

export default App;
