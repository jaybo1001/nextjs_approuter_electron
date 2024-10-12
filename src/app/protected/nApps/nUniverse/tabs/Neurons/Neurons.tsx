'use client';

import React from 'react';
import GlowCard from '@/components/GlowUI/GlowCard';
import TableNeurons from './table-with-filters/TableNeurons';

const Neurons: React.FC = () => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}>
        <TableNeurons />
        </div>

  );
};

export default Neurons;