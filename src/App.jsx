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
//import Register from "./components/Register";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/Register" element={<Register />} /> */}

          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/HomePage" element={<HomePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
