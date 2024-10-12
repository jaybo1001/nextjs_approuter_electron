import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WorkingState {
  nAbilitiesWorking: boolean;
  nImageToTextWorking: boolean;
  nImageClassificationWorking: boolean;
  nObjectDetectionWorking: boolean;
  nTextToImageWorking: boolean;
  nTextToSpeechWorking: boolean;
  nTextToVideoWorking: boolean;
  nSpeechToTextWorking: boolean;
  nLanguageTranslationWorking: boolean;
  nSentimentAnalysisWorking: boolean;
  nSummarizationWorking: boolean;
  nQuestionAnsweringWorking: boolean;
  nCodeGenerationWorking: boolean;
  nImageEditingWorking: boolean;
  n3DModelGenerationWorking: boolean;
  nTimeSeriesForecastingWorking: boolean;
  nAnomalyDetectionWorking: boolean;
  nStyleTransferWorking: boolean;
  nNamedEntityRecognitionWorking: boolean;
  nSemanticSegmentationWorking: boolean;
}

interface WorkingStateContextType {
  workingState: WorkingState;
  setWorkingState: React.Dispatch<React.SetStateAction<WorkingState>>;
}

const WorkingStateContext = createContext<WorkingStateContextType | undefined>(undefined);

export const WorkingStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workingState, setWorkingState] = useState<WorkingState>({
    nAbilitiesWorking: false,
    nImageToTextWorking: false,
    nImageClassificationWorking: false,
    nObjectDetectionWorking: false,
    nTextToImageWorking: false,
    nTextToSpeechWorking: false,
    nTextToVideoWorking: false,
    nSpeechToTextWorking: false,
    nLanguageTranslationWorking: false,
    nSentimentAnalysisWorking: false,
    nSummarizationWorking: false,
    nQuestionAnsweringWorking: false,
    nCodeGenerationWorking: false,
    nImageEditingWorking: false,
    n3DModelGenerationWorking: false,
    nTimeSeriesForecastingWorking: false,
    nAnomalyDetectionWorking: false,
    nStyleTransferWorking: false,
    nNamedEntityRecognitionWorking: false,
    nSemanticSegmentationWorking: false,
  });

  return (
    <WorkingStateContext.Provider value={{ workingState, setWorkingState }}>
      {children}
    </WorkingStateContext.Provider>
  );
};

export const useWorkingState = (): WorkingStateContextType => {
  const context = useContext(WorkingStateContext);
  if (!context) {
    throw new Error('useWorkingState must be used within a WorkingStateProvider');
  }
  return context;
};