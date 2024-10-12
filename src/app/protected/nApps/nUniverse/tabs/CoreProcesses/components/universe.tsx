import { useState, useEffect } from 'react';
import UniverseForm from '@/components/UniverseForm';
import UniverseList from '@/components/UniverseList';
import UniverseEditForm from '@/components/UniverseEditForm';
import UniverseHierarchy from '@/components/UniverseHierarchy';

interface Universe {
  _id: string;
  name: string;
  description: string;
}

export default function Universe() {
  const [message, setMessage] = useState('');
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [editingUniverse, setEditingUniverse] = useState<Universe | null>(null);

  useEffect(() => {
    fetchUniverses();
  }, []);

  const fetchUniverses = async () => {
    try {
      const response = await fetch('/api/universes');
      if (response.ok) {
        const data = await response.json();
        setUniverses(data.universes);
      } else {
        setMessage('Failed to fetch universes.');
      }
    } catch (error) {
      console.error('Error fetching universes:', error);
      setMessage('An error occurred while fetching universes.');
    }
  };

  const handleCreateUniverse = async (name: string, description: string) => {
    try {
      const response = await fetch('/api/universes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        setMessage('Universe created successfully!');
        fetchUniverses();
      } else {
        setMessage('Failed to create universe.');
      }
    } catch (error) {
      console.error('Error creating universe:', error);
      setMessage('An error occurred while creating the universe.');
    }
  };

  const handleEditUniverse = (universe: Universe) => {
    setEditingUniverse(universe);
  };

  const handleUpdateUniverse = async (id: string, name: string, description: string) => {
    try {
      const response = await fetch(`/api/universes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        setMessage('Universe updated successfully!');
        setEditingUniverse(null);
        fetchUniverses();
      } else {
        setMessage('Failed to update universe.');
      }
    } catch (error) {
      console.error('Error updating universe:', error);
      setMessage('An error occurred while updating the universe.');
    }
  };

  const handleDeleteUniverse = async (id: string) => {
    try {
      const response = await fetch(`/api/universes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Universe deleted successfully!');
        fetchUniverses();
      } else {
        setMessage('Failed to delete universe.');
      }
    } catch (error) {
      console.error('Error deleting universe:', error);
      setMessage('An error occurred while deleting the universe.');
    }
  };

  const handleCancelEdit = () => {
    setEditingUniverse(null);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Universe Management</h2>
      {editingUniverse ? (
        <UniverseEditForm
          universe={editingUniverse}
          onSubmit={handleUpdateUniverse}
          onCancel={handleCancelEdit}
        />
      ) : (
        <UniverseForm onSubmit={handleCreateUniverse} />
      )}
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/2">
          <UniverseList
            universes={universes}
            onEdit={handleEditUniverse}
            onDelete={handleDeleteUniverse}
          />
        </div>
        <div className="md:w-1/2">
          <UniverseHierarchy universes={universes} />
        </div>
      </div>
    </>
  );
}