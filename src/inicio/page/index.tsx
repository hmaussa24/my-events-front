import React, { useEffect, useState } from "react";
import { getEventos, Evento } from "../services/eventosService";
import { buscarEventos } from "../services/buscarEventosService";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Spiner from "../../shared/components/Spiner";
import { Link } from "react-router-dom";
import BuscadorEventos from "../components/BuscadorEventos";
import ListaEventos from "../components/ListaEventos";

const user = {
  name: "Invitado",
  email: "invitado@myevents.com"
};

const InicioPage = () => {
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loadingEvents, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const fetchEventos = async (nombre?: string) => {
    setLoading(true);
    setError(null);
    try {
      if (nombre && nombre.trim() !== "") {
        const data = await buscarEventos(nombre);
        setEventos(data);
      } else {
        const data = await getEventos(10, 0);
        setEventos(data);
      }
    } catch {
      setError("No se pudieron cargar los eventos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleBuscar = (valor: string) => {
    setBusqueda(valor);
    fetchEventos(valor);
  };

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
        <BuscadorEventos onBuscar={handleBuscar} defaultValue={busqueda} />
        {isAuthenticated && <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Próximos eventos</h2>
          <div>
            <Link to="/events" className="px-5 py-2 bg-gray-100 text-gray-900 rounded-md no-underline font-semibold border border-gray-200 transition hover:bg-gray-200">
              Mis eventos
            </Link>
          </div>
        </div>}
        <ListaEventos eventos={eventos} loading={loadingEvents} error={error} />
      </main>
    </div>
  );
};

export default InicioPage;
