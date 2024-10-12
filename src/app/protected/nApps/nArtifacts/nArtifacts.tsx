"use client";

import React, { useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';

const TestProd = false; // Set this to true to test production URL in development

export default function E2BArtifacts() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const appUrl = (() => {
    if (process.env.NODE_ENV === 'production' || TestProd) {
      return process.env.NEXT_PUBLIC_E2B_ARTIFACTS_URL || 'https://artifact.neucleos.ai';
    } else {
      return process.env.NEXT_PUBLIC_E2B_ARTIFACTS_URL_LOCAL || 'http://localhost:3004';
    }
  })();

  const supabase = createClient();

  useEffect(() => {
    const setupAuthentication = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const token = session.access_token;
        const encodedToken = encodeURIComponent(token);
        const encodedOrigin = encodeURIComponent(window.location.origin);
        const authUrl = `${appUrl}?arcgis-auth-origin=${encodedOrigin}&arcgis-auth-token=${encodedToken}`;
        
        if (iframeRef.current) {
          iframeRef.current.src = authUrl;
        }

        window.addEventListener('message', handleMessage);
      }
    };

    setupAuthentication();

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [appUrl]);

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== new URL(appUrl).origin) {
      console.error('Received message from untrusted origin');
      return;
    }

    if (event.data.type === 'AUTH_REQUEST') {
      sendAuthToIframe();
    }
  };

  const sendAuthToIframe = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'AUTH_RESPONSE',
        token: session.access_token
      }, appUrl);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}>
      <iframe
        ref={iframeRef}
        style={{
          flexGrow: 1,
          border: 'none',
          width: '100%',
          height: '100%',
        }}
        title="E2B Artifacts"
        allowFullScreen
      />
    </div>
  );
}

