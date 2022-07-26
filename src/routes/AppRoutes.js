import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import MainChat from "../pages/MainChat";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<MainChat />} />
        <Route path="/admin/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};
