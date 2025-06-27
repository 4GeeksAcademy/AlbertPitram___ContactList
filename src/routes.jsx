import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

const AppRoutes = () => (
  <Routes>
    <Route path="/contact" element={<Home />} />
    <Route path="/add-contact" element={<AddContact />} />
    <Route path="*" element={<Navigate to="/contact" />} />
  </Routes>
);

export default AppRoutes;