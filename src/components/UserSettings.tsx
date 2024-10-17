import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';

const UserSettings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data: any) => {
    try {
      const response = await api.put('/user', data);
      if (response.data.success) {
        setMessage('Información actualizada correctamente');
      } else {
        setMessage('Error al actualizar la información');
      }
    } catch (error) {
      setMessage('Error al actualizar la información');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración de Usuario</h3>
        {message && <p className="text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('email')}
            type="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Nuevo correo electrónico"
          />
          <input
            {...register('password')}
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Nueva contraseña"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Actualizar
          </button>
        </form>
        <button onClick={onClose} className="mt-4 w-full bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default UserSettings;