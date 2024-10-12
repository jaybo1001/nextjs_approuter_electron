'use client';

import React from 'react';
import GlowCard from '@/components/GlowUI/GlowCard';
import TableComponent from '@/components/GlowUI/table-with-filters/Table';

const CodebaseManager: React.FC = () => {
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
        <TableComponent />
        </div>

  );
};

export default CodebaseManager;
