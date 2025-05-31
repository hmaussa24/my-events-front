import React, { useState } from "react";

interface ModalRegistroProps {
  open: boolean;
  onClose: () => void;
  onRegister: (email: string, password: string) => Promise<void>;
}

const ModalRegistro: React.FC<ModalRegistroProps> = ({ open, onClose, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  if (!open) return null;

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validateEmail(email)) {
      setError("Email inválido");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      await onRegister(email, password);
      setSuccess("Registro exitoso");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError("Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 z-50 flex justify-center items-start" style={{ minHeight: '100vh', background: 'rgba(0,0,0,0.15)' }}>
      <div className="mt-32 bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
        <h2 className="text-xl font-bold mb-4 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border rounded px-3 py-2"
              autoComplete="new-password"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
          {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default ModalRegistro;
