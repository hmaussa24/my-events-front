import React, { useState } from "react";

interface BuscadorEventosProps {
  onBuscar: (valor: string) => void;
  defaultValue?: string;
}

const BuscadorEventos: React.FC<BuscadorEventosProps> = ({ onBuscar, defaultValue = "" }) => {
  const [valor, setValor] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBuscar(valor.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Buscar eventos por nombre..."
        value={valor}
        onChange={e => setValor(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">
        Buscar
      </button>
    </form>
  );
};

export default BuscadorEventos;
