import React, { useState, useEffect } from "react";
import { Evento } from "../services/eventosService";
import Spiner from "../../shared/components/Spiner";
import { registerForEvent } from "../services/registerForEventService";
import { getUserEventRegistrations } from "../services/getUserEventRegistrationsService";

interface ListaEventosProps {
  eventos: Evento[];
  loading: boolean;
  error: string | null;
  isAuthenticated?: boolean;
  onRegister?: (eventName: string) => void;
}

const ListaEventos: React.FC<ListaEventosProps> = ({ eventos, loading, error, isAuthenticated }) => {
  const [registeringId, setRegisteringId] = useState<number | null>(null);
  const [successId, setSuccessId] = useState<number | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [registeredEventIds, setRegisteredEventIds] = useState<number[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      getUserEventRegistrations().then(registrations => {
        setRegisteredEventIds(registrations.map(r => r.event_id));
      }).catch(() => setRegisteredEventIds([]));
    } else {
      setRegisteredEventIds([]);
    }
  }, [isAuthenticated]);

  const handleRegister = async (eventId: number) => {
    setRegisteringId(eventId);
    setSuccessId(null);
    setErrorId(null);
    setErrorMsg("");
    try {
      await registerForEvent(eventId);
      setSuccessId(eventId);
    } catch (e) {
      setErrorId(eventId);
      if (typeof e === "object" && e !== null && "response" in e) {
        // @ts-ignore
        setErrorMsg("Error al registrarse: " + ((e as any).response?.data?.detail || "Error desconocido"));
      } else {
        setErrorMsg("No se pudo registrar correctamente");
      }
    } finally {
      setRegisteringId(null);
    }
  };

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
            {isAuthenticated && (
              <div className="mt-4">
                {!registeredEventIds.includes(evento.id) ? (
                  <>
                    <button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-60"
                      disabled={registeringId === evento.id}
                      onClick={() => handleRegister(evento.id)}
                    >
                      {registeringId === evento.id ? "Registrando..." : "Registrarse al evento"}
                    </button>
                    {successId === evento.id && (
                      <div className="text-green-600 text-center font-semibold mt-2">¡Te registraste exitosamente!</div>
                    )}
                    {errorId === evento.id && errorMsg && (
                      <div className="text-red-600 text-center font-semibold mt-2">{errorMsg}</div>
                    )}
                  </>
                ) : (
                  <div className="text-green-700 text-center font-semibold mt-2">Ya estás registrado en este evento</div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaEventos;
