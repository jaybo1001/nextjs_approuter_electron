import { useState, useCallback, useEffect } from 'react';

interface UseClipboardOptions {
  successDuration?: number;
}

export function useClipboard(initialText: string = '', options: UseClipboardOptions = {}) {
  const [isCopied, setIsCopied] = useState(false);
  const { successDuration = 1500 } = options;

  const copyToClipboard = useCallback((text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => setIsCopied(true))
        .catch((err) => console.error('Failed to copy text: ', err));
    } else {
      console.warn('Clipboard API not supported');
    }
  }, []);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), successDuration);
      return () => clearTimeout(timer);
    }
  }, [isCopied, successDuration]);

  return { isCopied, copyToClipboard };
}