import { Route, Routes } from "react-router-dom";
import DashboardPage from "../features/dashboard/page/dashboard";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../features/auth/page/LoginPage";
import InicioPage from "../inicio/page";
import CreateEventsPage from "../features/dashboard/page/CreateEvents";
import EditEventsPage from "../features/dashboard/page/EditEvent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InicioPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/events" element={<DashboardPage />} />
        <Route path="/create-events" element={<CreateEventsPage />} />
        <Route path="/:eventId/edit-events" element={<EditEventsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;