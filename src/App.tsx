// src/App.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/auth/slices/authSlice";
import { RootState, AppDispatch } from "./app/store";
import LoginPage from "./features/auth/page/LoginPage";
import AppRoutes from "./app/routes";
import { BrowserRouter } from "react-router-dom";

function App() {
 /* const dispatch = useDispatch<AppDispatch>();
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <div>Cargando...</div>;

  if (!isAuthenticated) {
    return <LoginPage />;
  }*/

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
