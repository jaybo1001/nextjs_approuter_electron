"use client"

import React, { createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, RefreshCw, ChevronDown, ChevronUp, Play } from "lucide-react"
import { SimulatedContextType, StatusBarProps, SlotProps, PanelProps } from './types-NFlowHorizontal'
import { useProcessExecution } from './test'

interface Slot {
  id: number;
  status: 'inactive' | 'active' | 'complete';
}

interface Panel {
  id: number;
  status: 'inactive' | 'active' | 'complete';
  slots: Slot[];
}

interface ProcessState {
  panels: Panel[];
  currentPanelIndex: number;
  currentSlotIndex: number;
}

function initializeProcess(numPanels: number): ProcessState {
  return {
    panels: Array.from({ length: numPanels }, (_, i) => ({
      id: i,
      status: 'inactive',
      slots: Array.from({ length: 3 }, (_, j) => ({ id: j, status: 'inactive' }))
    })),
    currentPanelIndex: -1,
    currentSlotIndex: -1
  };
}

function stepForward(state: ProcessState): ProcessState {
  const newState = { ...state };
  const { currentPanelIndex, currentSlotIndex } = state;

  if (currentPanelIndex === -1) {
    // Start the process
    newState.currentPanelIndex = 0;
    newState.panels[0].status = 'active';
  } else if (currentSlotIndex === -1) {
    // Activate first slot of current panel
    newState.currentSlotIndex = 0;
    newState.panels[currentPanelIndex].slots[0].status = 'active';
  } else if (currentSlotIndex < 2) {
    // Move to next slot
    newState.panels[currentPanelIndex].slots[currentSlotIndex].status = 'complete';
    newState.currentSlotIndex++;
    newState.panels[currentPanelIndex].slots[newState.currentSlotIndex].status = 'active';
  } else {
    // Complete current panel and move to next
    newState.panels[currentPanelIndex].slots[2].status = 'complete';
    newState.panels[currentPanelIndex].status = 'complete';
    
    if (currentPanelIndex < newState.panels.length - 1) {
      newState.currentPanelIndex++;
      newState.currentSlotIndex = -1;
      newState.panels[newState.currentPanelIndex].status = 'active';
    } else {
      // Process complete
      newState.currentPanelIndex = -1;
      newState.currentSlotIndex = -1;
    }
  }

  return newState;
}

const SimulatedContext = createContext<SimulatedContextType | undefined>(undefined)

const StatusBar: React.FC<StatusBarProps> = ({ panelStates, isStarted, isCompleted }) => {
  const totalPanels = panelStates.length
  const segmentWidth = 100 / totalPanels

  if (!isStarted) {
    return <div className="w-full h-full bg-gray-700 rounded-full mb-4" />
  }

  if (isCompleted) {
    return <div className="w-full h-full bg-blue-500 rounded-full mb-4" />
  }

  return (
    <div className="w-full h-full bg-gray-700 rounded-full overflow-hidden mb-4 flex">
      {panelStates.map((state, index) => {
        let color
        switch (state) {
          case "complete":
            color = "bg-blue-500"
            break
          case "active":
            color = "bg-green-500"
            break
          case "waiting":
            color = "bg-gray-700"
            break
        }
        return <div key={index} className={`h-full ${color}`} style={{ width: `${segmentWidth}%` }} />
      })}
    </div>
  )
}

const Slot: React.FC<SlotProps> = ({ panelIndex, slotIndex, data }) => {
  const context = useContext(SimulatedContext)
  if (!context) throw new Error("Slot must be used within a SimulatedContext.Provider")
  const { openSlots } = context
  const isOpen = openSlots[panelIndex] === slotIndex

  return (
    <div className="mb-2">
      <div
        className="w-full h-full flex justify-between items-center p-2 bg-green-600 text-white rounded-md"
      >
        <span>{data.title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div 
              className="p-2 bg-green-700 text-white rounded-b-md"
            >
              {data.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Panel: React.FC<PanelProps> = ({ index, data }) => {
  const context = useContext(SimulatedContext)
  if (!context) throw new Error("Panel must be used within a SimulatedContext.Provider")
  const { expandedPanel, panelStates } = context
  const isExpanded = expandedPanel === index
  const state = panelStates[index]

  const getStateColor = (state: "complete" | "active" | "waiting") => {
    switch (state) {
      case "complete": return "bg-blue-500"
      case "active": return "bg-green-500"
      case "waiting": return "bg-gray-700"
    }
  }

  return (
    <motion.div
      layout
      className={`h-full rounded-lg shadow-md overflow-hidden ${
        isExpanded ? "w-[400px]" : "w-[80px]"
      } ${state === "active" ? "border-2 border-green-500" : ""}`}
      initial={false}
      animate={{ width: isExpanded ? 400 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={`h-full ${getStateColor(state)} flex`}>
        <div className="w-[80px] flex items-start justify-center pt-4">
          <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-white text-3xl font-bold">
            {state === "complete" ? <Check size={24} /> : index + 1}
          </div>
        </div>
        {isExpanded && (
          <div className="flex-1 p-4 flex flex-col overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-2">{data.title}</h2>
            <p className="text-white mb-4">{data.content}</p>
            <div className="flex-1">
              {data.slots.map((slot, idx) => (
                <Slot
                  key={idx}
                  panelIndex={index}
                  slotIndex={idx}
                  data={slot}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Component() {
  const items = [
    {
      title: "Step 1",
      content: "Complete this step to move to step 2.",
      slots: [
        { title: "Slot 1", content: "Content for Slot 1" },
        { title: "Slot 2", content: "Content for Slot 2" },
        { title: "Slot 3", content: "Content for Slot 3" },
      ]
    },
    {
      title: "Step 2",
      content: "Complete this step to move to step 3.",
      slots: [
        { title: "Slot 1", content: "Content for Slot 1" },
        { title: "Slot 2", content: "Content for Slot 2" },
        { title: "Slot 3", content: "Content for Slot 3" },
      ]
    },
    {
      title: "Step 3",
      content: "Complete this step to finish the process.",
      slots: [
        { title: "Slot 1", content: "Content for Slot 1" },
        { title: "Slot 2", content: "Content for Slot 2" },
        { title: "Slot 3", content: "Content for Slot 3" },
      ]
    },
  ]

  const { state, setState, resetToDefault, executeProcess } = useProcessExecution(items)

  return (
    <SimulatedContext.Provider value={{ ...state, setState }}>
      <div className="flex justify-center items-center h-full bg-gray-900 p-4">
        <div className="flex flex-col items-center w-full max-w-7xl">
          <div className="w-full mb-4 flex justify-end space-x-2">
            <button
              onClick={resetToDefault}
              className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Reset to default"
            >
              <RefreshCw size={24} />
            </button>
            <button
              onClick={executeProcess}
              className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 h-full"
              aria-label="Execute process"
            >
              <Play size={24} />
            </button>
          </div>
          <div className="w-full h-full border border-gray-700 rounded-lg p-4" style={{ height: "h-full" }}>
            <StatusBar panelStates={state.panelStates} isStarted={state.isStarted} isCompleted={state.isCompleted} />
            <div className="flex justify-center space-x-2 h-full">
              {items.map((item, index) => (
                <Panel
                  key={index}
                  index={index}
                  data={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SimulatedContext.Provider>
  )
}