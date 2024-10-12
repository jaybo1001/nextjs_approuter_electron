import React, { useState, useEffect } from 'react';
import CortexForm from '@/components/CortexForm';
import CortexList from '@/components/CortexList';
import { Cortex } from '@/types/Cortex';
import { Network } from '@/types/Network';

const CortexPage: React.FC = () => {
  const [cortices, setCortices] = useState<Cortex[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);

  useEffect(() => {
    fetchCortices();
    fetchNetworks();
  }, []);

  const fetchCortices = async () => {
    try {
      const response = await fetch('/api/cortices');
      if (response.ok) {
        const data = await response.json();
        setCortices(data);
      } else {
        console.error('Failed to fetch cortices');
      }
    } catch (error) {
      console.error('Error fetching cortices:', error);
    }
  };

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

  const handleCreateCortex = async (cortex: Omit<Cortex, '_id'>) => {
    try {
      const response = await fetch('/api/cortices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cortex),
      });

      if (response.ok) {
        fetchCortices();
      } else {
        console.error('Failed to create cortex');
      }
    } catch (error) {
      console.error('Error creating cortex:', error);
    }
  };

  const handleDeleteCortex = async (id: string) => {
    try {
      const response = await fetch(`/api/cortices/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCortices();
      } else {
        console.error('Failed to delete cortex');
      }
    } catch (error) {
      console.error('Error deleting cortex:', error);
    }
  };

  const handleUpdateCortex = async (id: string, updatedCortex: Partial<Cortex>) => {
    try {
      const response = await fetch(`/api/cortices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCortex),
      });

      if (response.ok) {
        fetchCortices();
      } else {
        console.error('Failed to update cortex');
      }
    } catch (error) {
      console.error('Error updating cortex:', error);
    }
  };

  return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Cortex Management</h1>


        <CortexForm onSubmit={handleCreateCortex} networks={networks} />
        <CortexList cortices={cortices} onDelete={handleDeleteCortex} onUpdate={handleUpdateCortex} />
      </div>
  );
};

export default CortexPage;