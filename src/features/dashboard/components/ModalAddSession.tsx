import React, { useState } from "react";
import { createSession, CreateSessionParams } from "../services/eventosDashboardService";

interface ModalAddSessionProps {
  open: boolean;
  onClose: () => void;
  onSessionCreated: (session: { id: string; title: string; start: string; end: string; allDay: boolean }) => void;
  start_time: Date;
  end_time: Date;
  eventId: number;
}

const ModalAddSession: React.FC<ModalAddSessionProps> = ({ open, onClose, onSessionCreated, start_time, end_time, eventId }) => {
  const [form, setForm] = useState<CreateSessionParams>({
    name: "",
    description: "",
    start_time: start_time,
    end_time: end_time,
    capacity: 0,
    event_id: eventId,
    speaker_id: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "capacity" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const session = await createSession({...form, start_time: start_time, end_time: end_time});
      onSessionCreated({
        id: String(session.id),
        title: session.name,
        start: session.start_time,
        end: session.end_time,
        allDay: false
      });
      onClose();
    } catch {
      setError("Error al crear la sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
        <h2 className="text-xl font-bold mb-4">Agregar una sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Descripción</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Capacidad</label>
            <input type="number" name="capacity" value={form.capacity} onChange={handleChange} min={0} required className="w-full border rounded px-3 py-2" />
          </div>
          {/* Puedes agregar select para speaker_id si tienes lista de speakers */}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
            {loading ? "Creando..." : "Crear sesión"}
          </button>
          {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ModalAddSession;
