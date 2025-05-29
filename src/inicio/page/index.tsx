import React, { useEffect, useState } from "react";
import { getEventos, Evento } from "../services/eventosService";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Spiner from "../../shared/components/Spiner";

const user = {
  name: "Invitado",
  email: "invitado@myevents.com"
};

const InicioPage = () => {
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loadingEvents, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEventos(10, 0)
      .then(setEventos)
      .catch(() => setError("No se pudieron cargar los eventos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-8 py-6 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">myEvents</h1>
        <div className="text-right">
            {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-800">{user.name}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
                </div>
            ) : (
            <a href="/login" className="mr-4 px-5 py-2 bg-gray-900 text-white rounded-md no-underline font-semibold transition hover:bg-gray-800">
              Iniciar sesión
            </a>
            )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Próximos eventos</h2>
          <div>
            <a href="/events" className="px-5 py-2 bg-gray-100 text-gray-900 rounded-md no-underline font-semibold border border-gray-200 transition hover:bg-gray-200">
              Ver todos los eventos
            </a>
          </div>
        </div>
        {loadingEvents ? (
          <Spiner className="h-16 w-16 mx-auto" />
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {eventos.map(evento => (
              <div key={evento.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                {/* Imagen de ejemplo, ya que la API no la retorna */}
                <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-5xl text-gray-400">
                  <span role="img" aria-label="calendar">📅</span>
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
        )}
      </main>
    </div>
  );
};

export default InicioPage;
