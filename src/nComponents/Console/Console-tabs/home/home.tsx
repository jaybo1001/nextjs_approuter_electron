'use client';

import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Cockpit Home</h2>
      <p>This is the home tab of the Cockpit Console. Add your content here.</p>
    </div>
  );
};

export default Home;
