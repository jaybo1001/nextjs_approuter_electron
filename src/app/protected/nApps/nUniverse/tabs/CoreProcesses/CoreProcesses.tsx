import React, { useState } from 'react';
import Head from 'next/head';
import '@/app/globals.css';
import UniverseHierarchy from '@/components/UniverseHierarchy';
import Universe from './components/universe';
import Ecosystem from './components/ecosystem';
import Network from './components/network';
import Cortex from './components/cortex';
import Synapse from './components/synapse';
import Neuron from './components/neuron';

const CoreProcesses: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('Home');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Universe':
        return <Universe />;
      case 'Ecosystem':
        return <Ecosystem />;
      case 'Network':
        return <Network />;
      case 'Cortex':
        return <Cortex />;
      case 'Synapse':
        return <Synapse />;
      case 'Neuron':
        return <Neuron />;
      default:
        return (
          <>
            <h1 className="text-3xl font-bold mb-4">Welcome to n-universe</h1>
            <p className="text-lg">
              Explore and manage your multi-agent system hierarchy.
            </p>
            <UniverseHierarchy />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>n-universe</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-black">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">n-universe</h1>
          <nav className="mt-4">
            <ul className="flex space-x-4">
              {['Home', 'Universe', 'Ecosystem', 'Network', 'Cortex', 'Synapse', 'Neuron'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActiveComponent(item)}
                    className={`text-blue-600 hover:text-blue-800 ${activeComponent === item ? 'font-bold' : ''}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-black">
        {renderComponent()}
      </main>
      <footer className="bg-black mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 bg-black">
          <p className="text-center text-gray-500 bg-black">© 2023 n-universe</p>
        </div>
      </footer>
    </div>
  );
};

export default CoreProcesses;