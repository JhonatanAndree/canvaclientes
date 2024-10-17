import React from 'react';
import { Edit, Trash2, ExternalLink } from 'lucide-react';

interface ClientListProps {
  clients: any[];
  onEdit: (client: any) => void;
  onRefresh: () => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onRefresh }) => {
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      try {
        await fetch(`/api/clients/${id}`, { method: 'DELETE' });
        onRefresh();
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    return `+51 ${phoneNumber}`;
  };

  const openWhatsApp = (phoneNumber: string) => {
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedNumber}`, '_blank');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Nombres</th>
            <th className="py-2 px-4 border-b">Apellidos</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Celular</th>
            <th className="py-2 px-4 border-b">Periodo</th>
            <th className="py-2 px-4 border-b">Etiquetas</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="py-2 px-4 border-b">{client.nombres}</td>
              <td className="py-2 px-4 border-b">{client.apellidos}</td>
              <td className="py-2 px-4 border-b">{client.email}</td>
              <td className="py-2 px-4 border-b">
                <span className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => openWhatsApp(client.celular)}>
                  {formatPhoneNumber(client.celular)}
                  <ExternalLink className="inline ml-1" size={16} />
                </span>
              </td>
              <td className="py-2 px-4 border-b">{client.periodoContrato} {client.periodoContrato === 1 ? 'mes' : 'meses'}</td>
              <td className="py-2 px-4 border-b">
                {client.etiquetas.split(',').map((tag: string, index: number) => (
                  <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {tag.trim()}
                  </span>
                ))}
              </td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => onEdit(client)} className="text-blue-600 hover:text-blue-900 mr-2">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;