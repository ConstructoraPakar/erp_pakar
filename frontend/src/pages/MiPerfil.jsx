// src/pages/MiPerfil.jsx
import { useEffect, useState } from 'react';

export default function MiPerfil() {
  const [userData, setUserData] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [cantidad, setCantidad] = useState(5);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, { // Asegúrate de que la URL sea correcta
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUserData(data.user);
        setHistorial(data.historial.slice(0, cantidad));
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }

    fetchProfileData();
  }, [cantidad]);

  if (!userData) {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
      <div className="space-y-2 mb-6">
        <p><strong className="font-medium">Nombre:</strong> {userData.name}</p>
        <p><strong className="font-medium">Correo:</strong> {userData.email}</p>
        <p><strong className="font-medium">Fecha de Creación:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Historial de Conexiones</h2>
      <ul className="space-y-2">
        {historial.map((conn, index) => (
          <li key={index} className="p-2 bg-gray-50 rounded">
            {conn.fecha} - {conn.hora}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <label className="flex items-center gap-2">
          Mostrar:
          <select
            className="border rounded p-2"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          >
            {[5, 10, 20, 50, 100, 300, 1000].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}