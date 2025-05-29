import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../services/eventosDashboardService";

interface EditEventProps {
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

const EditEvent: React.FC<EditEventProps> = ({ onSave, onCancel }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    setError("");
    getEventById(Number(eventId))
      .then(data => setForm(data))
      .catch(() => setError("No se pudo cargar el evento"))
      .finally(() => setLoading(false));
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: name === "capacity" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await updateEvent(Number(eventId), form);
      setSuccess("Evento actualizado exitosamente");
      if (onSave) onSave(form);
    } catch (err) {
      setError("Error al actualizar el evento");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-gray-500 py-8">Cargando evento...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!form) return null;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Editar evento</h2>
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
          <input type="date" name="event_date" value={form.event_date} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
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
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
          <button type="button" onClick={onCancel} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition">
            Cancelar
          </button>
        </div>
        {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
        {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
      </form>
    </div>
  );
};

export default EditEvent;
