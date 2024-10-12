import React, { useState, useEffect } from 'react';
import EcosystemForm from '@/components/EcosystemForm';
import EcosystemList from '@/components/EcosystemList';
import { Ecosystem } from '@/types/Ecosystem';

const EcosystemPage: React.FC = () => {
  const [ecosystems, setEcosystems] = useState<Ecosystem[]>([]);

  useEffect(() => {
    fetchEcosystems();
  }, []);

  useEffect(() => {
    console.log('Ecosystems state before rendering:', ecosystems); // Corrected placement of the log
  }, [ecosystems]); // Dependency array to ensure log is updated with state

  const fetchEcosystems = async () => {
    const response = await fetch('/api/ecosystems');
    const data = await response.json();
    console.log('Fetched ecosystems data:', data); // Add this log
    setEcosystems(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ecosystem?')) {
      try {
        const response = await fetch(`/api/ecosystems/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setEcosystems(ecosystems.filter(eco => eco._id !== id));
        } else {
          console.error('Failed to delete ecosystem');
        }
      } catch (error) {
        console.error('Error deleting ecosystem:', error);
      }
    }
  };

  const handleUpdate = async (id: string, updatedEcosystem: Partial<Ecosystem>) => {
    try {
      const response = await fetch(`/api/ecosystems/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEcosystem),
      });

      if (response.ok) {
        fetchEcosystems();
      } else {
        console.error('Failed to update ecosystem');
      }
    } catch (error) {
      console.error('Error updating ecosystem:', error);
    }
  };

  const handleSubmit = async (ecosystem: Omit<Ecosystem, '_id'>) => {
    const response = await fetch('/api/ecosystems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ecosystem),
    });

    if (response.ok) {
      fetchEcosystems();
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Ecosystem Management</h1>
      <EcosystemForm onSubmit={handleSubmit} />
      <EcosystemList ecosystems={ecosystems} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default EcosystemPage;