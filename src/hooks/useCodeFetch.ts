import { useState, useEffect } from 'react';

export function useCodeFetch(filePath: string) {
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCode() {
      console.log(`Fetching code for file: ${filePath}`);
      try {
        setLoading(true);
        const result = await window.electronAPI.getFileCode(filePath);
        console.log('Result from getFileCode:', result);
        if (result.status === 'success') {
          setCode(result.code);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error('Error in useCodeFetch:', err);
        setError('Failed to fetch file contents');
      } finally {
        setLoading(false);
      }
    }

    fetchCode();
  }, [filePath]);

  return { code, error, loading };
}
