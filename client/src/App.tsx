import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ScrollProgress } from "./components/magicui/scroll-progress";
import StayInLoop from "./components/sections/StayInLoop";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollProgress className="h-0.5 bg-black" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <StayInLoop />
      <Footer />
    </div>
  );
}

export default App;
