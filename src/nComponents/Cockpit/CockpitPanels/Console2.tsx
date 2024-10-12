import {
  IconLayoutNavbarCollapse
} from "@tabler/icons-react";
import { cn } from '@/utils/tailwind-merge'
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { useRef, useState } from "react";
import { CleoWorkflowIcon } from "../nConsoleIcons/CleoWorkflowIcon";
import { NAbilitiesIcon } from "../nConsoleIcons/nAbilitiesIcon";
import { NKnowledgeIcon } from "../nConsoleIcons/nKnowledgeIcon";
import { NLogicIcon } from "../nConsoleIcons/nLogicIcon";
import { NTermIcon } from "../nConsoleIcons/nTermIcon";
import { NImageToTextIcon } from "../nConsoleIcons/NImageToTextIcon";
import { NImageClassificationIcon } from "../nConsoleIcons/NImageClassificationIcon";
import { NObjectDetectionIcon } from "../nConsoleIcons/NObjectDetectionIcon";
import { NTextToImageIcon } from "../nConsoleIcons/NTextToImageIcon";
import { NTextToSpeechIcon } from "../nConsoleIcons/NTextToSpeechIcon";
import { NTextToVideoIcon } from "../nConsoleIcons/NTextToVideoIcon";
import { NLanguageTranslationIcon } from "../nConsoleIcons/NLanguageTranslationIcon";
import { NSentimentAnalysisIcon } from "../nConsoleIcons/NSentimentAnalysisIcon";
import { NSummarizationIcon } from "../nConsoleIcons/NSummarizationIcon";
import { NQuestionAnsweringIcon } from "../nConsoleIcons/NQuestionAnsweringIcon";
import { NCodeGenerationIcon } from "../nConsoleIcons/NCodeGenerationIcon";
import { NImageEditingIcon } from "../nConsoleIcons/NImageEditingIcon";
import { N3DModelGenerationIcon } from "../nConsoleIcons/N3DModelGenerationIcon";
import { NTimeSeriesForecastingIcon } from "../nConsoleIcons/NTimeSeriesForecastingIcon";
import { NAnomalyDetectionIcon } from "../nConsoleIcons/NAnomalyDetectionIcon";
import { NStyleTransferIcon } from "../nConsoleIcons/NStyleTransferIcon";
import { NNamedEntityRecognitionIcon } from "../nConsoleIcons/NNamedEntityRecognitionIcon";
import { NSemanticSegmentationIcon } from "../nConsoleIcons/NSemanticSegmentationIcon";

import CleoWorkflow from "../CockpitConsoleTabs/CleoWorkflow/CleoWorkflow";
import NAbilities from "../CockpitConsoleTabs/nAbilities/nAbilities";
import NKnowledge from "../CockpitConsoleTabs/nKnowledge/nKnowledge";
import NLogic from "../CockpitConsoleTabs/nLogic/nLogic";
import NTerm from "../CockpitConsoleTabs/nTerm/nTerm";
import Home from "../CockpitConsoleTabs/home/home";
import NImageToText from "../CockpitConsoleTabs/nImageToText/nImageToText";
import NImageClassification from "../CockpitConsoleTabs/nImageClassification/nImageClassification";
import NObjectDetection from "../CockpitConsoleTabs/nObjectDetection/nObjectDetection";
import NTextToImage from "../CockpitConsoleTabs/nTextToImage/nTextToImage";
import NTextToSpeech from "../CockpitConsoleTabs/nTextToSpeech/nTextToSpeech";
import NTextToVideo from "../CockpitConsoleTabs/nTextToVideo/nTextToVideo";
import NLanguageTranslation from "../CockpitConsoleTabs/nLanguageTranslation/nLanguageTranslation";
import NSentimentAnalysis from "../CockpitConsoleTabs/nSentimentAnalysis/nSentimentAnalysis";
import NSummarization from "../CockpitConsoleTabs/nSummarization/nSummarization";
import NQuestionAnswering from "../CockpitConsoleTabs/nQuestionAnswering/nQuestionAnswering";
import NCodeGeneration from "../CockpitConsoleTabs/nCodeGeneration/nCodeGeneration";
import NImageEditing from "../CockpitConsoleTabs/nImageEditing/nImageEditing";
import N3DModelGeneration from "../CockpitConsoleTabs/n3DModelGeneration/n3DModelGeneration";
import NTimeSeriesForecasting from "../CockpitConsoleTabs/nTimeSeriesForecasting/nTimeSeriesForecasting";
import NAnomalyDetection from "../CockpitConsoleTabs/nAnomalyDetection/nAnomalyDetection";
import NStyleTransfer from "../CockpitConsoleTabs/nStyleTransfer/nStyleTransfer";
import NNamedEntityRecognition from "../CockpitConsoleTabs/nNamedEntityRecognition/nNamedEntityRecognition";
import NSemanticSegmentation from "../CockpitConsoleTabs/nSemanticSegmentation/nSemanticSegmentation";

import { useAppState } from '@/contexts/AppStateContext';

export default function ConsoleInner() {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const { appState } = useAppState();

  const links = [
    {
      title: "CleoWorkflow",
      icon: (
        <CleoWorkflowIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "CleoWorkflow",
    },
    {
      title: "nAbilities",
      icon: (
        <NAbilitiesIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nAbilities",
    },
    {
      title: "nKnowledge",
      icon: (
        <NKnowledgeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nKnowledge",
    },
    {
      title: "nLogic",
      icon: (
        <NLogicIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nLogic",
    },
    {
      title: "nTerm",
      icon: (
        <NTermIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nTerm",
    },
    {
      title: "Image to Text",
      icon: (
        <NImageToTextIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nImageToText",
    },
    {
      title: "Image Classification",
      icon: (
        <NImageClassificationIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nImageClassification",
    },
    {
      title: "Object Detection",
      icon: (
        <NObjectDetectionIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nObjectDetection",
    },
    {
      title: "Text to Image",
      icon: (
        <NTextToImageIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nTextToImage",
    },
    {
      title: "Text to Speech",
      icon: (
        <NTextToSpeechIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nTextToSpeech",
    },
    {
      title: "Text to Video",
      icon: (
        <NTextToVideoIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nTextToVideo",
    },
    {
      title: "Language Translation",
      icon: (
        <NLanguageTranslationIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nLanguageTranslation",
    },
    {
      title: "Sentiment Analysis",
      icon: (
        <NSentimentAnalysisIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nSentimentAnalysis",
    },
    {
      title: "Summarization",
      icon: (
        <NSummarizationIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nSummarization",
    },
    {
      title: "Question Answering",
      icon: (
        <NQuestionAnsweringIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nQuestionAnswering",
    },
    {
      title: "Code Generation",
      icon: (
        <NCodeGenerationIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nCodeGeneration",
    },
    {
      title: "Image Editing",
      icon: (
        <NImageEditingIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nImageEditing",
    },
    {
      title: "3D Model Generation",
      icon: (
        <N3DModelGenerationIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "n3DModelGeneration",
    },
    {
      title: "Time Series Forecasting",
      icon: (
        <NTimeSeriesForecastingIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nTimeSeriesForecasting",
    },
    {
      title: "Anomaly Detection",
      icon: (
        <NAnomalyDetectionIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nAnomalyDetection",
    },
    {
      title: "Style Transfer",
      icon: (
        <NStyleTransferIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nStyleTransfer",
    },
    {
      title: "Named Entity Recognition",
      icon: (
        <NNamedEntityRecognitionIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nNamedEntityRecognition",
    },
    {
      title: "Semantic Segmentation",
      icon: (
        <NSemanticSegmentationIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      load: "nSemanticSegmentation",
    },
  ];

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="relative h-full w-full">
      <FloatingDock
        items={links}
        desktopClassName="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        mobileClassName="absolute top-0 right-4 -translate-y-1/2 z-10"
        onTabChange={handleTabChange}
      />
      <div className="console-content h-full w-full bg-black relative overflow-hidden"> {/* Added pt-16 for spacing and top border */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "Home" ? 1 : 0 }}>
          <Home />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "CleoWorkflow" ? 1 : 0 }}>
          <CleoWorkflow />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nAbilities" ? 1 : 0 }}>
          <NAbilities />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nKnowledge" ? 1 : 0 }}>
          <NKnowledge />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nLogic" ? 1 : 0 }}>
          <NLogic />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nTerm" ? 1 : 0 }}>
          <NTerm />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nImageToText" ? 1 : 0 }}>
          <NImageToText />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nImageClassification" ? 1 : 0 }}>
          <NImageClassification />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nObjectDetection" ? 1 : 0 }}>
          <NObjectDetection />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nTextToImage" ? 1 : 0 }}>
          <NTextToImage />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nTextToSpeech" ? 1 : 0 }}>
          <NTextToSpeech />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nTextToVideo" ? 1 : 0 }}>
          <NTextToVideo />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nLanguageTranslation" ? 1 : 0 }}>
          <NLanguageTranslation />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nSentimentAnalysis" ? 1 : 0 }}>
          <NSentimentAnalysis />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nSummarization" ? 1 : 0 }}>
          <NSummarization />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nQuestionAnswering" ? 1 : 0 }}>
          <NQuestionAnswering />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nCodeGeneration" ? 1 : 0 }}>
          <NCodeGeneration />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nImageEditing" ? 1 : 0 }}>
          <NImageEditing />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "n3DModelGeneration" ? 1 : 0 }}>
          <N3DModelGeneration />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nTimeSeriesForecasting" ? 1 : 0 }}>
          <NTimeSeriesForecasting />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nAnomalyDetection" ? 1 : 0 }}>
          <NAnomalyDetection />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nStyleTransfer" ? 1 : 0 }}>
          <NStyleTransfer />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nNamedEntityRecognition" ? 1 : 0 }}>
          <NNamedEntityRecognition />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: activeTab === "nSemanticSegmentation" ? 1 : 0 }}>
          <NSemanticSegmentation />
        </div>
      </div>
    </div>
  );
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  onTabChange,
}: {
  items: { title: string; icon: React.ReactNode; load: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
  onTabChange: (tabName: string) => void;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} onTabChange={onTabChange} />
      <FloatingDockMobile items={items} className={mobileClassName} onTabChange={onTabChange} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  onTabChange,
}: {
  items: { title: string; icon: React.ReactNode; load: string }[];
  className?: string;
  onTabChange: (tabName: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <button
                  onClick={() => {
                    onTabChange(item.load);
                    setOpen(false);
                  }}
                  key={item.title}
                  className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-transparent flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  onTabChange,
}: {
  items: { title: string; icon: React.ReactNode; load: string }[];
  className?: string;
  onTabChange: (tabName: string) => void;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-0 gap-1 items-center rounded-full bg-gray-50 dark:bg-transparent px-1",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer 
          mouseX={mouseX} 
          key={item.title} 
          {...item} 
          onTabChange={onTabChange}
          className="z-40" // Add this line to set a higher z-index for each item
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  load,
  onTabChange,
  className, // Add this line
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  load: string;
  onTabChange: (tabName: string) => void;
  className?: string; // Add this line
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Adjust these values to control the growth and wave effect
  const baseSize = 26; // Adjusted for better fit
  const maxGrowth = 16; // Reduced for less dramatic growth
  const maxDip = 4; // Reduced for subtler effect

  const sizeTransform = useTransform(
    distance,
    [-150, 0, 150],
    [baseSize, baseSize + maxGrowth, baseSize]
  );

  // This will make the icon grow downwards
  const yOffset = useTransform(sizeTransform, (size) => (size - baseSize) / 2);

  // This creates the wave-like dip effect
  const yDip = useTransform(
    distance,
    [-150, -75, 0, 75, 150],
    [0, maxDip / 2, maxDip, maxDip / 2, 0]
  );

  // Combine the downward growth with the dip
  const translateY = useTransform([yOffset, yDip], ([offset, dip]) => offset + dip);

  const width = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const translateYSpring = useSpring(translateY, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Icon size should be slightly smaller than the container
  const iconSizeTransform = useTransform(sizeTransform, (size) => size * 0.8);

  const widthIcon = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const heightIcon = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <button onClick={() => onTabChange(load)} className={className}>
      <motion.div
        ref={ref}
        style={{ 
          width, 
          height, 
          y: translateYSpring,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "aspect-square rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center relative",
          className // Add className here as well
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 top-full mt-2 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </button>
  );
}