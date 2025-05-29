import React, { useEffect, useState } from "react";
import { getEventos, Evento } from "../../../inicio/services/eventosService";
import { Link, useNavigate } from "react-router-dom";
import ViewEvent from "./ViewEvent";
import { deleteEvent } from "../services/eventosDashboardService";

const PAGE_SIZE = 10;

const TableEventos: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Evento | null>(null);
  const [deleteMsg, setDeleteMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getEventos(PAGE_SIZE, page * PAGE_SIZE)
      .then(data => {
        setEventos(data);
      })
      .catch(() => setError("No se pudieron cargar los eventos"))
      .finally(() => setLoading(false));
  }, [page]);

  if (selected) {
    const handleDelete = async () => {
      try {
        await deleteEvent(selected.id);
        setDeleteMsg("Evento eliminado exitosamente");
        setTimeout(() => {
          setDeleteMsg(null);
          setSelected(null);
          navigate("/events");
        }, 1500);
      } catch {
        setDeleteMsg("Error al eliminar el evento");
        setTimeout(() => setDeleteMsg(null), 2000);
      }
    };
    return (
      <>
        {deleteMsg && (
          <div className={`text-center py-4 font-semibold ${deleteMsg.includes("exitosamente") ? "text-green-600" : "text-red-600"}`}>{deleteMsg}</div>
        )}
        <ViewEvent
          event={{
            ...selected,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            organizer_id: 1,
            capacity: 0,
            status: "DRAFT"
          }}
          onBack={() => setSelected(null)}
          onEdit={() => navigate(`/${selected.id}/edit-events`)}
          onDelete={handleDelete}
        />
      </>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Eventos</h2>
        <Link to="/create-events" className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
          Crear evento
        </Link>
      </div>
      <div className="min-w-[600px]">
        <div className="grid grid-cols-5 gap-4 font-semibold text-gray-700 border-b pb-2 text-sm">
          <div>Nombre</div>
          <div>Fecha</div>
          <div>Lugar</div>
          <div>Descripción</div>
          <div className="text-right">Acciones</div>
        </div>
        {loading ? (
          <div className="py-8 text-center text-gray-500">Cargando eventos...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">{error}</div>
        ) : eventos.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No hay eventos para mostrar.</div>
        ) : (
          eventos.map(evento => (
            <div key={evento.id} className="grid grid-cols-5 gap-4 py-3 border-b last:border-b-0 text-sm items-center">
              <div className="truncate" title={evento.name}>{evento.name}</div>
              <div>{evento.event_date}</div>
              <div className="truncate" title={evento.location}>{evento.location}</div>
              <div className="truncate" title={evento.description}>{evento.description}</div>
              <div className="flex justify-end">
                <button onClick={() => setSelected(evento)} className="text-blue-600 hover:underline">Ver</button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Paginación */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0 || loading}
        >
          Anterior
        </button>
        <span className="px-2 py-1 text-gray-700">Página {page + 1}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          onClick={() => setPage(p => p + 1)}
          disabled={loading || (eventos.length < PAGE_SIZE)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TableEventos;
