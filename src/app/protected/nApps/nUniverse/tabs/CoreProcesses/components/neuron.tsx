import React, { useState, useEffect } from 'react';
import NeuronForm from '@/components/NeuronForm';
import NeuronList from '@/components/NeuronList';
import NeuronEditForm from '@/components/NeuronEditForm';
import { Neuron } from '@/types/Neuron';
import { Universe } from '@/types/Universe';
import { Ecosystem } from '@/types/Ecosystem';
import { Network } from '@/types/Network';
import { Cortex } from '@/types/Cortex';
import { Synapse } from '@/types/Synapse';

export default function NeuronPage() {
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [ecosystems, setEcosystems] = useState<Ecosystem[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [cortices, setCortices] = useState<Cortex[]>([]);
  const [synapses, setSynapses] = useState<Synapse[]>([]);
  const [editingNeuron, setEditingNeuron] = useState<Neuron | null>(null);

  useEffect(() => {
    fetchNeurons();
    fetchUniverses();
    fetchEcosystems();
    fetchNetworks();
    fetchCortices();
    fetchSynapses();
  }, []);

  const fetchNeurons = async () => {
    const response = await fetch('/api/neurons');
    const data = await response.json();
    setNeurons(data);
  };

  const fetchUniverses = async () => {
    const response = await fetch('/api/universes');
    const data = await response.json();
    setUniverses(data);
  };

  const fetchEcosystems = async () => {
    const response = await fetch('/api/ecosystems');
    const data = await response.json();
    setEcosystems(data);
  };

  const fetchNetworks = async () => {
    const response = await fetch('/api/networks');
    const data = await response.json();
    setNetworks(data);
  };

  const fetchCortices = async () => {
    const response = await fetch('/api/cortices');
    const data = await response.json();
    setCortices(data);
  };

  const fetchSynapses = async () => {
    const response = await fetch('/api/synapses');
    const data = await response.json();
    setSynapses(data);
  };

  const handleCreateNeuron = async (neuron: Omit<Neuron, '_id'>) => {
    const response = await fetch('/api/neurons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(neuron),
    });
    if (response.ok) {
      fetchNeurons();
    }
  };

  const handleEditNeuron = (neuron: Neuron) => {
    setEditingNeuron(neuron);
  };

  const handleUpdateNeuron = async (updatedNeuron: Neuron) => {
    const response = await fetch(`/api/neurons/${updatedNeuron._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNeuron),
    });
    if (response.ok) {
      fetchNeurons();
      setEditingNeuron(null);
    }
  };

  const handleDeleteNeuron = async (neuronId: string) => {
    const response = await fetch(`/api/neurons/${neuronId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchNeurons();
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Neuron Management</h1>
      {editingNeuron ? (
        <NeuronEditForm
          neuron={editingNeuron}
          onSubmit={handleUpdateNeuron}
          onCancel={() => setEditingNeuron(null)}
          universes={universes}
          ecosystems={ecosystems}
          networks={networks}
          cortices={cortices}
          synapses={synapses}
        />
      ) : (
        <NeuronForm
          onSubmit={handleCreateNeuron}
          universes={universes}
          ecosystems={ecosystems}
          networks={networks}
          cortices={cortices}
          synapses={synapses}
        />
      )}
      <NeuronList
        neurons={neurons}
        onEdit={handleEditNeuron}
        onDelete={handleDeleteNeuron}
      />
    </>
  );
}