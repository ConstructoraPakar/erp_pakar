import { useState, useEffect } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: '', email: '', password: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener usuarios
  async function fetchUsers() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }

  // Función para abrir el modal de verificación de contraseña
  function openPasswordModal(userId) {
    setSelectedUserId(userId);
    setPassword('');
    setIsPasswordModalOpen(true);
  }

  // Función para abrir el modal de edición
  function openEditModal(user) {
    setEditedUser({ ...user });
    setIsEditModalOpen(true);
  }

  // Función para abrir el modal de creación
  function openCreateModal() {
    setNewUser({ name: '', email: '', password: '' });
    setIsCreateModalOpen(true);
  }

  // Función para verificar la contraseña y eliminar el usuario
  async function verifyPasswordAndDelete() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      if (response.ok && result.isValid) {
        deleteUser(selectedUserId);
        setIsPasswordModalOpen(false);
      } else {
        alert('Contraseña incorrecta. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
    }
  }

  // Función para eliminar el usuario
  async function deleteUser(userId) {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.error('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }

  // Función para actualizar el usuario
  async function updateUser() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${editedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        fetchUsers();
        setIsEditModalOpen(false);
      } else {
        console.error('Error al actualizar usuario');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  }

  // Función para crear un nuevo usuario
  async function createUser() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        fetchUsers();
        setIsCreateModalOpen(false);
      } else {
        console.error('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h1>
      <button onClick={openCreateModal} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        Crear Usuario
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">
                {user.email !== 'administracion@pakarspa.com' && (
                  <>
                    <button onClick={() => openEditModal(user)} className="text-blue-500 mr-2">
                      Editar
                    </button>
                    <button onClick={() => openPasswordModal(user.id)} className="text-red-500">
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para verificación de contraseña */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Confirma tu Contraseña</h2>
            <input
              type="password"
              className="border p-2 w-full mb-4"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <button onClick={() => setIsPasswordModalOpen(false)} className="mr-4">
                Cancelar
              </button>
              <button onClick={verifyPasswordAndDelete} className="bg-blue-500 text-white px-4 py-2 rounded">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para edición */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Editar Usuario</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Nombre"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            />
            <input
              type="email"
              className="border p-2 w-full mb-4"
              placeholder="Correo Electrónico"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            />
            <input
              type="password"
              className="border p-2 w-full mb-4"
              placeholder="Nueva Contraseña (Opcional)"
              value={editedUser.password}
              onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
            />
            <div className="flex justify-end">
              <button onClick={() => setIsEditModalOpen(false)} className="mr-4">
                Cancelar
              </button>
              <button onClick={updateUser} className="bg-blue-500 text-white px-4 py-2 rounded">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para creación */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Crear Usuario</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Nombre"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              className="border p-2 w-full mb-4"
              placeholder="Correo Electrónico"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="password"
              className="border p-2 w-full mb-4"
              placeholder="Contraseña"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <div className="flex justify-end">
              <button onClick={() => setIsCreateModalOpen(false)} className="mr-4">
                Cancelar
              </button>
              <button onClick={createUser} className="bg-blue-500 text-white px-4 py-2 rounded">
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
