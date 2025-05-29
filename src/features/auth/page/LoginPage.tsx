// src/features/auth/pages/LoginPage.tsx
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../slices/authSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { Navigate } from "react-router-dom";
import Spiner from "../../../shared/components/Spiner";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);
    dispatch(login({ username: email!, password: form.get("password")! }));
  };

  if (loading) return <Spiner className="h-16 w-16 mx-auto" />;
  if (isAuthenticated) {
    return <Navigate to="/events" replace />;
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
        <input
          className="w-full mb-3 p-2 border rounded"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  );
}
