import React from "react";

interface ViewEventProps {
  event: {
    id: number;
    name: string;
    description: string;
    event_date: string;
    location: string;
    capacity: number;
    status: string;
    created_at: string;
    updated_at: string;
    organizer_id: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
}

const statusColors: Record<string, string> = {
  DRAFT: "bg-yellow-100 text-yellow-800",
  PUBLISHED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800"
};

const ViewEvent: React.FC<ViewEventProps> = ({ event, onEdit, onDelete, onBack }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{event.name}</h2>
        <span className={`px-3 py-1 rounded text-xs font-semibold uppercase ${statusColors[event.status] || "bg-gray-100 text-gray-700"}`}>
          {event.status}
        </span>
      </div>
      <div className="mb-4 text-gray-700">
        <span className="font-semibold">Fecha:</span> {event.event_date}
      </div>
      <div className="mb-4 text-gray-700">
        <span className="font-semibold">Lugar:</span> {event.location}
      </div>
      <div className="mb-4 text-gray-700">
        <span className="font-semibold">Capacidad:</span> {event.capacity}
      </div>
      <div className="mb-4 text-gray-700">
        <span className="font-semibold">Descripción:</span>
        <div className="mt-1 whitespace-pre-line">{event.description}</div>
      </div>
      <div className="mb-4 text-gray-500 text-xs">
        <span>Creado: {new Date(event.created_at).toLocaleString()}</span> <br />
        <span>Actualizado: {new Date(event.updated_at).toLocaleString()}</span>
      </div>
      <div className="flex justify-between mt-8 gap-2">
        <button onClick={onBack} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Atrás</button>
        <div className="flex gap-2">
          <button onClick={onEdit} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Editar</button>
          <button onClick={onDelete} className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
