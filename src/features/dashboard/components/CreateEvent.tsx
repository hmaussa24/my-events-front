import React, { useState } from "react";
import { createEvent } from "../services/eventosDashboardService";

const initialState = {
  name: "",
  description: "",
  event_date: "",
  location: "",
  capacity: 0,
  status: "draft"
};

const CreateEvent: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "capacity" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await createEvent(form);
      setSuccess("Evento creado exitosamente");
      setForm(initialState);
    } catch (err) {
      setError("Error al crear el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Crear nuevo evento</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Nombre</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Fecha</label>
          <input type="date" name="event_date" value={form.event_date} onChange={handleChange} required className="w-full border rounded px-3 py-2" min="2025-05-29" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Lugar</label>
          <input name="location" value={form.location} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Capacidad</label>
          <input type="number" name="capacity" value={form.capacity} onChange={handleChange} min={0} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Estado</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
          {loading ? "Creando..." : "Crear evento"}
        </button>
        {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
        {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
      </form>
    </div>
  );
};

export default CreateEvent;
