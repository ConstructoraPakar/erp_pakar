// src/components/layout/Header.jsx
import { Menu, ChevronDown, Bell } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils'; // Reintroducido por si es necesario

export default function Header({ onMenuClick, onLogout, userName }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="ml-auto flex items-center space-x-6 relative">
        {/* Icono de notificaciones */}
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              {notificationCount}
            </span>
          )}
        </div>

        {/* Menú de usuario */}
        <div>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2"
          >
            <span>Bienvenido, {userName || 'Usuario'}</span>
            <ChevronDown className="h-5 w-5" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mi Perfil</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Configuración</a>
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
