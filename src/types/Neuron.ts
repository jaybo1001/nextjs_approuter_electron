export interface Neuron {
  _id: string;
  name: string;
  description: string;
  universeId: string;
  ecosystemId: string;
  networkId: string;
  cortexId: string;
  synapseId: string;
  role: string;
  knowledgeDomains: string[];
  tools: string[];
  instructions: {
    persona: string;
    rules: string[];
  };
}

export interface Neuron {
  _id: string;
  name: string;
  description: string;
  universeId: string;
  ecosystemId: string;
  networkId: string;
  cortexId: string;
  synapseId: string;
  role: string;
  knowledgeDomains: string[];
  tools: string[];
  instructions: {
    persona: string;
    rules: string[];
  };
}