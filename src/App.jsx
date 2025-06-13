import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import GymEquipment from "./components/GymEquipment";
import DietSection from "./components/DietSection";
import Contact from "./components/Contact";

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  useEffect(() => {
    const accessToken = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")).access
      : null;

    if (!accessToken) {
      // لا يوجد توكن، لا تفعل شيئًا
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);

      if (decodedToken.exp < Date.now() / 1000) {
        console.log("Token is expired, Logging out.");

        localStorage.removeItem("authTokens");

        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Token is invalid , Logging out.", error);
      localStorage.removeItem("authTokens");
      window.location.href = "/login";
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/Landing" element={<Landing />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/GymEquipment" element={<GymEquipment />} />
            <Route path="/DietSection" element={<DietSection />} />
            <Route path="/Contact" element={<Contact />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
