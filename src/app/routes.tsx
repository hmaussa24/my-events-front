import { Route, Routes } from "react-router-dom";
import DashboardPage from "../features/dashboard/page/dashboard";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../features/auth/page/LoginPage";
import InicioPage from "../inicio/page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InicioPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;