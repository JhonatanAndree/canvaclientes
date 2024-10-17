import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ClientForm from './ClientForm';
import ClientList from './ClientList';
import { PlusCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const { data: clientsData, isLoading, error, refetch } = useQuery('clients', async () => {
    const response = await axios.get('/api/clients');
    return response.data;
  });

  const { data: stats } = useQuery('stats', async () => {
    const response = await axios.get('/api/stats');
    return response.data;
  });

  const handleAddClient = () => {
    setEditingClient(null);
    setShowModal(true);
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
    refetch();
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Total de Clientes</h2>
          <p className="text-3xl font-semibold">{stats?.totalClients || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Ingresos Totales</h2>
          <p className="text-3xl font-semibold">S/ {stats?.totalRevenue.toFixed(2) || '0.00'}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Licencias por Vencer</h2>
          <p className="text-3xl font-semibold">{stats?.expiringLicenses || 0}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
        <button
          onClick={handleAddClient}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <PlusCircle className="mr-2" />
          Agregar Cliente
        </button>
      </div>

      <ClientList clients={clientsData} onEdit={handleEditClient} onRefresh={refetch} />

      {showModal && (
        <ClientForm
          client={editingClient}
          onClose={handleCloseModal}
          onRefresh={refetch}
        />
      )}
    </div>
  );
};

export default Dashboard;