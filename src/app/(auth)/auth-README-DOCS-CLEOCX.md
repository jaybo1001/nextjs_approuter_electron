

# neucleos - Supabase Authentication Setup for Next.js with Electron Support

## Overview

This documentation outlines the setup for Supabase authentication in a Next.js application that can run both as an Electron app and a standalone web application. We use the latest Supabase auth helpers and SSR packages to ensure compatibility and best practices.

## Environment Setup

`.env.local` 

nextjs_approuter_electron/.env.local

```env:.env.local
includes:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```


## Package Installation
Installed packages:

## File Structure

```
nextjs_approuter_electron/
├── src/
│   ├── utils/
│   │   └── supabase/
│   │       ├── server.ts
│   │       └── client.ts
│   ├── app/
│   │   └── (auth)/
│   │       ├── login/
│   │       │   └── page.tsx
│   │       └── signup/
│   │           └── page.tsx
├── electron/
│   └── src/
│       └── main.ts
└── ...
```

## Supabase Client Setup

### Server-Side Client

File: `src/utils/supabase/server.ts`

```typescript:nextjs_approuter_electron/src/utils/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export function createClient() {
  return createServerComponentClient({ cookies });
}
```

### Client-Side Client

File: `src/utils/supabase/client.ts`

```typescript:nextjs_approuter_electron/src/utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

## Usage in Next.js Components

### Server Component Example

```tsx
import { createClient } from '@/utils/supabase/server';

export default async function ServerComponent() {
  const supabase = createClient();
  const { data, error } = await supabase.from('your_table').select('*');
  // Handle data and error
}
```

### Client Component Example

```tsx
'use client';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Rest of your component logic
}
```

## Electron Integration

Electron main process file (`electron/src/main.ts`)

After reviewing the `main.ts` file for your Electron application, I can confirm that it's set up correctly to load your Next.js app in both development and production environments. Here's a breakdown of the key aspects:

1. **Development Mode**:
   ```typescript
   if (is.dev) {
     mainWindow.loadURL("http://localhost:3000");
   }
   ```
   This correctly loads the Next.js development server when in dev mode.

2. **Production Mode**:
   ```typescript
   const port = await startNextJSServer();
   mainWindow.loadURL(`http://localhost:${port}`);
   ```
   In production, it starts a Next.js server and loads the app from there.

3. **Next.js Server Configuration**:
   ```typescript
   const startNextJSServer = async () => {
     // ... configuration ...
     await startServer({
       dir: webDir,
       isDev: false,
       hostname: "localhost",
       port: nextJSPort,
       customServer: true,
       allowRetry: false,
       keepAliveTimeout: 5000,
       minimalMode: true,
     });
     // ...
   };
   ```
   This configuration for running Next.js in an Electron environment.

4. **Window Configuration**:
   ```typescript
   const mainWindow = new BrowserWindow({
     width: 900,
     height: 670,
     webPreferences: {
       preload: join(__dirname, "preload.js"),
       nodeIntegration: true,
     },
   });
   ```
   The window is set up correctly, including the preload script.

5. **App Lifecycle Handling**:
   The app's lifecycle events (ready, activate, window-all-closed) are handled appropriately.

6. **Secure Restorable State**:
   ```typescript
   app.on('applicationSupportsSecureRestorableState', () => {
     return true;
   });
   ```

1. **Node Integration**: 
   ```typescript
   nodeIntegration: true,
   ```
   Enabling `nodeIntegration` can pose security risks. Consider using `contextIsolation: true` and a preload script for better security.

2. **Error Handling**: While there is error logging, it needs to be improved. 






## Authentication Flow

1. **Sign Up**: Need to update sign-up form to calls `supabase.auth.signUp()` with email and password.
2. **Sign In**: Update sign-in form to uses `supabase.auth.signInWithPassword()`.
3. **Sign Out**: Implement a sign-out button that calls `supabase.auth.signOut()`.
4. **Session Management**: Use `supabase.auth.getSession()` to check the current session state.  Create hook or whatever best practice is. 

## Middleware for Session Handling

 `middleware.ts` in project root:
nextjs_approuter_electron/middleware.ts

```typescript:nextjs_approuter_electron/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}
```

This middleware ensures that the auth session is refreshed on each request.

## Protected Routes

For protected routes, you can create a higher-order component or a custom hook to check authentication status:

```typescript:nextjs_approuter_electron/src/utils/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export function withAuth(WrappedComponent: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          router.push('/login');
        }
      });
    }, []);

    return <WrappedComponent {...props} />;
  };
}
```

Use this HOC to wrap components that require authentication:

```tsx
import { withAuth } from '@/utils/withAuth';

function ProtectedComponent() {
  // Component logic
}

export default withAuth(ProtectedComponent);
```



## References

- [Supabase Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Electron Documentation](https://www.electronjs.org/docs/latest/)

