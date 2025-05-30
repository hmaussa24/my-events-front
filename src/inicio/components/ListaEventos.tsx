import React from "react";
import { Evento } from "../services/eventosService";
import Spiner from "../../shared/components/Spiner";

interface ListaEventosProps {
  eventos: Evento[];
  loading: boolean;
  error: string | null;
}

const ListaEventos: React.FC<ListaEventosProps> = ({ eventos, loading, error }) => {
  if (loading) return <div className="text-center py-8"><Spiner /></div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!eventos.length) return <div className="text-center text-gray-500 py-8">No se encontraron eventos.</div>;

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {eventos.map(evento => (
        <div key={evento.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
          <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-5xl text-gray-400">
            {evento.image_url ? (
              <img src={`http://localhost:8000/${evento.image_url}`} alt={evento.name} className="w-full h-full object-cover" />
            ) : (
              <span role="img" aria-label="calendar">📅</span>
            )}
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="m-0 text-lg font-bold text-gray-900">{evento.name}</h3>
            <div className="text-gray-500 text-sm my-2">
              <span role="img" aria-label="calendar">📅</span> {evento.event_date} &nbsp; | &nbsp;
              <span role="img" aria-label="location">📍</span> {evento.location}
            </div>
            <p className="text-gray-700 text-base mt-2 flex-1">{evento.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaEventos;
