import { ReactNode } from 'react'

// Define the possible states for a panel
export type PanelState = 'complete' | 'active' | 'waiting'

// Define the structure for a single slot
export interface SlotData {
  title: string
  content: string
}

// Define the structure for a panel
export interface PanelData {
  title: string
  content: string
  slots: SlotData[]
}

// Define the structure for open slots
export interface OpenSlots {
  [panelIndex: number]: number
}

// Define the structure for process variables
export interface ProcessVariables {
  [key: string]: any
}

// Define the main state structure
export interface AccordionState {
  currentStep: number
  expandedPanel: number | null
  openSlots: OpenSlots
  panelStates: PanelState[]
  isStarted: boolean
  isCompleted: boolean
  processVariables: ProcessVariables
}

// Define props for the StatusBar component
export interface StatusBarProps {
  panelStates: PanelState[]
  isStarted: boolean
  isCompleted: boolean
}

// Define props for the Slot component
export interface SlotProps {
  panelIndex: number
  slotIndex: number
  data: SlotData
}

// Define props for the Panel component
export interface PanelProps {
  index: number
  data: PanelData
}

// Define the context type
export interface SimulatedContextType extends AccordionState {
  setState: React.Dispatch<React.SetStateAction<AccordionState>>
}

// Define props for the main Component
export interface ComponentProps {
  children?: ReactNode
}