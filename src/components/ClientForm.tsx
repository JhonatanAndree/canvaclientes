import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface ClientFormProps {
  client?: any;
  onClose: () => void;
  onRefresh: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onClose, onRefresh }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: client || {}
  });

  const onSubmit = async (data: any) => {
    try {
      if (client) {
        await axios.put(`/api/clients/${client.id}`, data);
      } else {
        await axios.post('/api/clients', data);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error al guardar el cliente:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {client ? 'Editar Cliente' : 'Agregar Cliente'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <input
              {...register('nombres', { required: true })}
              className="mt-2 p-2 w-full border rounded"
              placeholder="Nombres"
            />
            {errors.nombres && <span className="text-red-500">Este campo es requerido</span>}

            <input
              {...register('apellidos', { required: true })}
              className="mt-2 p-2 w-full border rounded"
              placeholder="Apellidos"
            />
            {errors.apellidos && <span className="text-red-500">Este campo es requerido</span>}

            <input
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              className="mt-2 p-2 w-full border rounded"
              placeholder="Correo electrónico"
            />
            {errors.email && <span className="text-red-500">Email inválido</span>}

            <div className="mt-2 flex">
              <select
                {...register('codigoPais', { required: true })}
                className="p-2 border rounded"
                defaultValue="+51"
              >
                <option value="+51">+51</option>
                {/* Agregar más códigos de país según sea necesario */}
              </select>
              <input
                {...register('celular', { required: true, pattern: /^[0-9]{9}$/ })}
                className="p-2 w-full border rounded ml-2"
                placeholder="Número de celular"
              />
            </div>
            {errors.celular && <span className="text-red-500">Número de celular inválido</span>}

            <select
              {...register('periodoContrato', { required: true })}
              className="mt-2 p-2 w-full border rounded"
            >
              <option value="">Seleccione el periodo</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'mes' : 'meses'}</option>
              ))}
            </select>
            {errors.periodoContrato && <span className="text-red-500">Este campo es requerido</span>}

            <input
              {...register('etiquetas')}
              className="mt-2 p-2 w-full border rounded"
              placeholder="Etiquetas (separadas por coma)"
            />

            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {client ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
          <button
            onClick={onClose}
            className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;