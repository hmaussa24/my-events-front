import React from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

interface LayoutProps {
  user: {
    name: string;
    email: string;
  };
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-900 text-white flex flex-col justify-between py-8 px-4 min-h-screen">
        <div>
          <nav>
            <ul className="space-y-6">
              <li>
                <Link to="/" className="block text-white no-underline hover:text-gray-300 transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="block text-white no-underline hover:text-gray-300 transition">
                  Eventos
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Opción de cerrar sesión al fondo del menú */}
        <div className="mt-8">
          <div className="flex items-center cursor-pointer hover:text-red-400 transition">
            <span className="text-xl mr-2">⏻</span>
            <LogoutButton />
          </div>
        </div>
      </aside>
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6 bg-gray-50 border-b border-gray-200">
          <h1 className="m-0 font-bold text-2xl text-gray-900">myEvents</h1>
          <div className="text-right">
            <div className="font-semibold text-gray-800">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </header>
        {/* Contenido */}
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default Layout;