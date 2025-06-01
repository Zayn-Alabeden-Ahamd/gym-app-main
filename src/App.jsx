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
//import Register from "./components/Register";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* إعادة توجيه المستخدمين غير المسجلين إلى صفحة تسجيل الدخول إذا حاولوا الوصول إلى المسار الجذر */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* المسارات المحمية - يمكن الوصول إليها فقط بعد المصادقة (تسجيل الدخول) */}
          <Route element={<PrivateRoutes />}>
            <Route path="/Landing" element={<Landing />} />
            <Route path="/HomePage" element={<HomePage />} />
            {/* **الخطأ كان هنا، وتم تصحيحه الآن:** */}
            {/* المسار الصحيح لمكون GymEquipment */}
            <Route path="/GymEquipment" element={<GymEquipment />} />
            {/* المسار الصحيح لمكون DietSection */}

            <Route path="/DietSection" element={<DietSection />} />
            {/* يمكنك إضافة أي مسارات محمية أخرى هنا */}
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
