'use client';

import React from 'react';
import GlowCard from '@/components/GlowUI/GlowCard';
import { useFileSystem } from '@/hooks/useFileSystem';
import { useCodeFetch } from '@/hooks/useCodeFetch';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Playground: React.FC = () => {
  const { files, isLoading, error, refreshFiles } = useFileSystem();

  const renderFileDetails = (file: any) => {
    return Object.entries(file).map(([key, value]) => {
      if (key === 'children') return null; // Skip rendering children
      let displayValue: string;
      if (value === null) {
        displayValue = 'null';
      } else if (typeof value === 'boolean') {
        displayValue = value ? 'Yes' : 'No';
      } else if (value instanceof Date) {
        displayValue = value.toLocaleString();
      } else if (typeof value === 'object') {
        displayValue = JSON.stringify(value);
      } else {
        displayValue = String(value);
      }
      return (
        <p key={key} style={{ margin: '5px 0', fontSize: '0.9em' }}>
          <strong>{key}:</strong> {displayValue}
        </p>
      );
    });
  };

  const FileContent: React.FC<{ filePath: string }> = ({ filePath }) => {
    const { code, error, loading } = useCodeFetch(filePath);

    if (loading) return <div>Loading file content...</div>;
    if (error) return <div>Error loading file content: {error}</div>;

    return (
      <SyntaxHighlighter 
        language="typescript" 
        style={docco} 
        customStyle={{
          maxHeight: '300px',
          overflow: 'auto',
          fontSize: '0.8em',
          padding: '10px',
          borderRadius: '5px',
          borderWidth: '2px',
          borderColor: '#8e154a', // slate-800
          backgroundColor: '#1e293b', // slate-800
          color: '#e2e8f0',
          

        }}
      >
        {code || ''}
      </SyntaxHighlighter>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log('Files:', files);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'auto',
      padding: '20px',
    }}>
      <h1>Playground - First 4 Files</h1>
      <button onClick={refreshFiles} style={{ marginBottom: '20px', padding: '10px', fontSize: '1em' }}>Refresh Files</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {files.slice(0, 4).map((file: any) => (
          <GlowCard
            key={file.path}
            id={file.path}
            name={file.name}
            description={file.isDirectory ? 'Directory' : 'File'}
            usage=""
            componentName=""
            componentPath={file.path}
            application=""
            width={900}
            height="auto"
          >
            <h3 style={{ marginBottom: '10px' }}>{file.name}</h3>
            <p>Full path: {file.path}</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, maxHeight: '400px', overflowY: 'auto' }}>
                {renderFileDetails(file)}
              </div>
              <div style={{ flex: 2, maxHeight: '400px', overflowY: 'auto' }}>
                {!file.isDirectory && <FileContent filePath={file.path} />}
                {file.isDirectory && <div>Directory: No file content to display</div>}
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
};

export default Playground;