export enum AppState {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE',
  ActiveLoading = 'ACTIVE_LOADING',
  ActiveError = 'ACTIVE_ERROR',
  InactiveError = 'INACTIVE_ERROR',
  WaitingForInput = 'WAITING_FOR_INPUT',
  Initializing = 'INITIALIZING',
  Suspended = 'SUSPENDED',
  Crashed = 'CRASHED',
  Recovering = 'RECOVERING',
  IdleActive = 'IDLE_ACTIVE',
  BackgroundProcessing = 'BACKGROUND_PROCESSING',
}

export interface AppStateInfo {
  state: AppState;
  timestamp: number;
  details?: string;
}

export interface AppStateHistory {
  currentState: AppStateInfo;
  previousStates: AppStateInfo[];
}

export interface AppStateManager {
  getState: () => AppState;
  setState: (newState: AppState, details?: string) => void;
  getStateHistory: () => AppStateHistory;
}
