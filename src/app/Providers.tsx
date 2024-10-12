'use client'

import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { NCommandProvider } from '@/contexts/nCommandContext'
import { CockpitTabsProvider } from '@/contexts/CockpitTabsContext'
import { ColorProvider } from '@/contexts/ColorContext'
import { LoadingProvider } from '@/contexts/LoadingContext'
import { WorkingStateProvider } from '@/contexts/WorkingStateContext'
import { DndProvider } from '@/nComponents/Providers/DndProvider'
import { AppStateProvider } from '@/contexts/AppStateContext'
import { RightPanelProvider } from '@/contexts/RightPanelContext'
import { CodebaseProvider } from '@/contexts/CodebaseContext'
import { AppTabsProvider } from '@/contexts/AppTabsContext'
import { CleoPanelProvider } from '@/contexts/CleoPanelContext'
import { useRouter } from 'next/navigation'
import { FileCodeProvider } from '../contexts/FileCodeDetailsContext';
import { FileSystemSyncProvider } from '@/contexts/FilesToDBContext'; // Import the new provider
import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <AuthProvider>

            <LoadingProvider>
              <FileCodeProvider>
                <CockpitTabsProvider>
                  <ColorProvider>
                    <NCommandProvider>
                      <WorkingStateProvider>
                        <DndProvider>
                          <AppStateProvider>
                            <RightPanelProvider>
                              <CodebaseProvider>
                                <FileSystemSyncProvider>
                                  <AppTabsProvider>
                                    <CleoPanelProvider>
                                      {children}
                                    </CleoPanelProvider>
                                  </AppTabsProvider>
                                </FileSystemSyncProvider>
                              </CodebaseProvider>
                            </RightPanelProvider>
                          </AppStateProvider>
                        </DndProvider>
                      </WorkingStateProvider>
                    </NCommandProvider>
                  </ColorProvider>
                </CockpitTabsProvider>
              </FileCodeProvider>
            </LoadingProvider>
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
