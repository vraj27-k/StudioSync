import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Discover from './pages/Discover';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from "./pages/Booking";
import PhotographerDetails from "./pages/PhotographerDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

// ✅ COMPONENT TO HANDLE CONDITIONAL HEADER/FOOTER RENDERING
function AppContent() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("photographerToken")
  );

  // ✅ ROUTES WHERE HEADER AND FOOTER SHOULD BE HIDDEN
  const noHeaderFooterRoutes = ['/dashboard', '/admin', '/login', '/signup', '/forgot-password'];
  
  // ✅ CHECK IF CURRENT ROUTE SHOULD HIDE HEADER/FOOTER
  const hideHeaderFooter = noHeaderFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <>
      {/* ✅ CONDITIONALLY RENDER HEADER - HIDDEN ON DASHBOARD, LOGIN, SIGNUP, FORGOT-PASSWORD */}
      {!hideHeaderFooter && (
        <Header 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated} 
        />
      )}
      
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route 
            path="/signup" 
            element={<Signup setIsAuthenticated={setIsAuthenticated}/>}
          />
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated}/>}
          />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:uid/:token" element={<ResetPassword/>}/>
          
          {/* ✅ DASHBOARD ROUTE - NO HEADER/FOOTER */}
          <Route path="/dashboard" element={<Dashboard/>}/>
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photographer/:id" element={<PhotographerDetails/>}/>
          <Route path="/booking" element={<Booking/>}/>
        </Routes>
      </main>
      
      {/* ✅ CONDITIONALLY RENDER FOOTER - HIDDEN ON DASHBOARD, LOGIN, SIGNUP, FORGOT-PASSWORD */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

// ✅ MAIN APP COMPONENT
export default function App() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}
