import React, { useState, useEffect } from 'react';
import SynapseForm from '@/components/SynapseForm';
import SynapseList from '@/components/SynapseList';
import SynapseEditForm from '@/components/SynapseEditForm';
import { Synapse } from '@/types/Synapse';
import { Cortex } from '@/types/Cortex';

export default function SynapsePage() {
  const [synapses, setSynapses] = useState<Synapse[]>([]);
  const [cortices, setCortices] = useState<Cortex[]>([]);
  const [editingSynapse, setEditingSynapse] = useState<Synapse | null>(null);

  useEffect(() => {
    fetchSynapses();
    fetchCortices();
  }, []);

  const fetchSynapses = async () => {
    const response = await fetch('/api/synapses');
    const data = await response.json();
    setSynapses(data);
  };

  const fetchCortices = async () => {
    const response = await fetch('/api/cortices');
    const data = await response.json();
    setCortices(data);
  };

  const handleCreateSynapse = async (synapse: Omit<Synapse, '_id'>) => {
    const response = await fetch('/api/synapses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(synapse),
    });
    if (response.ok) {
      fetchSynapses();
    }
  };

  const handleEditSynapse = (synapse: Synapse) => {
    setEditingSynapse(synapse);
  };

  const handleUpdateSynapse = async (updatedSynapse: Synapse) => {
    const response = await fetch(`/api/synapses/${updatedSynapse._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSynapse),
    });
    if (response.ok) {
      fetchSynapses();
      setEditingSynapse(null);
    }
  };

  const handleDeleteSynapse = async (synapseId: string) => {
    const response = await fetch(`/api/synapses/${synapseId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchSynapses();
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Synapse Management</h1>
      {editingSynapse ? (
        <SynapseEditForm
          synapse={editingSynapse}
          onSubmit={handleUpdateSynapse}
          onCancel={() => setEditingSynapse(null)}
          cortices={cortices}
        />
      ) : (
        <SynapseForm onSubmit={handleCreateSynapse} cortices={cortices} />
      )}
      <SynapseList
        synapses={synapses}
        onEdit={handleEditSynapse}
        onDelete={handleDeleteSynapse}
      />
    </>
  );
}