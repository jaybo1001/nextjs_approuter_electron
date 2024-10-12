import React, { useState, useEffect } from 'react';
import NetworkForm from '@/components/NetworkForm';
import NetworkList from '@/components/NetworkList';
import { Network } from '@/types/Network';
import { Ecosystem } from '@/types/Ecosystem';

const NetworkPage: React.FC = () => {
  const [networks, setNetworks] = useState<Network[]>([]);
  const [ecosystems, setEcosystems] = useState<Ecosystem[]>([]);

  useEffect(() => {
    fetchNetworks();
    fetchEcosystems();
  }, []);

  const fetchNetworks = async () => {
    try {
      const response = await fetch('/api/networks');
      if (response.ok) {
        const data = await response.json();
        setNetworks(data);
      } else {
        console.error('Failed to fetch networks');
      }
    } catch (error) {
      console.error('Error fetching networks:', error);
    }
  };

  const fetchEcosystems = async () => {
    try {
      const response = await fetch('/api/ecosystems');
      if (response.ok) {
        const data = await response.json();
        setEcosystems(data);
      } else {
        console.error('Failed to fetch ecosystems');
      }
    } catch (error) {
      console.error('Error fetching ecosystems:', error);
    }
  };

  const handleCreateNetwork = async (network: Omit<Network, '_id'>) => {
    try {
      const response = await fetch('/api/networks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(network),
      });

      if (response.ok) {
        fetchNetworks();
      } else {
        console.error('Failed to create network');
      }
    } catch (error) {
      console.error('Error creating network:', error);
    }
  };

  const handleDeleteNetwork = async (id: string) => {
    try {
      const response = await fetch(`/api/networks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchNetworks();
      } else {
        console.error('Failed to delete network');
      }
    } catch (error) {
      console.error('Error deleting network:', error);
    }
  };

  const handleUpdateNetwork = async (id: string, updatedNetwork: Partial<Network>) => {
    try {
      const response = await fetch(`/api/networks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNetwork),
      });

      if (response.ok) {
        fetchNetworks();
      } else {
        console.error('Failed to update network');
      }
    } catch (error) {
      console.error('Error updating network:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Network Management</h1>
      <NetworkForm onSubmit={handleCreateNetwork} ecosystems={ecosystems} />
      <NetworkList networks={networks} onDelete={handleDeleteNetwork} onUpdate={handleUpdateNetwork} />
    </div>
  );
};

export default NetworkPage;