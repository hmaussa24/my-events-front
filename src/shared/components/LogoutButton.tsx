import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/slices/authSlice";
import { AppDispatch } from "../../app/store";

export default function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };
    return (
      <span
        onClick={handleLogout}
        className="block text-white no-underline hover:text-red-400 transition cursor-pointer select-none"
      >
        Cerrar sesión
      </span>
    );
  }