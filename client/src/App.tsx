import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ScrollProgress } from "./components/magicui/scroll-progress";
import StayInLoop from "./components/sections/StayInLoop";
import LoginPage from "./components/auth/Login";
import GoogleAuthCallback from "./components/auth/GoogleAuthCallaback";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPage from "./components/auth/Register";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollProgress className="h-0.5 bg-black" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        // need to check
        <Route path="/auth/callback" element={<GoogleAuthCallback />} />
        // need to check
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <StayInLoop />
      <Footer />
    </div>
  );
}

export default App;
