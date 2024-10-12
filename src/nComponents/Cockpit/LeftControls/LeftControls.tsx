"use client";
import { cn } from "@/utils/tailwind-merge";
import React, { useState, createContext, useContext, useEffect, useMemo } from "react";
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useApps } from "@/hooks/useApps";
import { useCockpitTabs } from "@/contexts/CockpitTabsContext";
import { SvgSpinners6DotsRotate } from '@/nComponents/icons/spinner1';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/nComponents/ui/tooltip";

// Define the App interface
interface App {
  id: number;
  created_at: string;
  AppName: string;
  ComponentName: string;
  MultiInstance: boolean;
  IconSVG: string;
  tags: Json | null;
  Category: string;
  SubCategory: string | null;
  CleoCoutour: boolean;

}

// You might need to define the Json type if it's not already imported
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// Color definitions
const Color1 = "#217CAF";
const Color2 = "#12B656";
const Color3 = "#ECA902";
const Color4 = "#8E154A";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface LeftControlsContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  position: "left" | "right";
}

const LeftControlsContext = createContext<LeftControlsContextProps | undefined>(
  undefined
);

export const useLeftControls = () => {
  const context = useContext(LeftControlsContext);
  if (!context) {
    throw new Error("useLeftControls must be used within a LeftControlsProvider");
  }
  return context;
};

export const LeftControlsProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
  position = "left",
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  position?: "left" | "right";
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <LeftControlsContext.Provider value={{ open, setOpen, animate, position }}>
      {children}
    </LeftControlsContext.Provider>
  );
};

interface LeftControlsProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  position?: "left" | "right";
}

export const LeftControls: React.FC<LeftControlsProps> = ({
  children,
  open,
  setOpen,
  animate = true,
  position = "left",
}) => {
  return (
    <LeftControlsProvider open={open} setOpen={setOpen} animate={animate} position={position}>
      {children}
    </LeftControlsProvider>
  );
};

export const LeftControlsBody = (props: React.ComponentProps<typeof motion.div>) => {
  return <DesktopLeftControls {...props} />;
};

export const DesktopLeftControls = ({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { apps, loading, error } = useApps();
  const { openTab } = useCockpitTabs();
  const [timeoutError, setTimeoutError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setTimeoutError("Loading timed out after 10 seconds");
        console.error("Apps loading timed out");
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (error) {
      console.error("Error loading apps:", error);
    }
  }, [error]);

  if (loading) return (
    <div className="flex items-center justify-center h-full ">
      <SvgSpinners6DotsRotate className="w-8 h-8" />
    </div>
  );
  if (error) return <div>Error: {error}</div>;
  if (timeoutError) return <div>Error: {timeoutError}</div>;
  if (!apps || apps.length === 0) return <div>No apps available.</div>;

  console.log("Apps loaded:", apps);

  interface GroupedApps {
    [key: string]: App[];
  }

  const groupedApps = apps.reduce<GroupedApps>((acc, app) => {
    const key = app.Category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(app);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedApps).sort((a, b) => {
    if (a === 'core') return -1;
    if (b === 'core') return 1;
    if (a === 'controls') return 1;
    if (b === 'controls') return -1;
    return a.localeCompare(b);
  });

  return (
    <motion.div
      className={cn(
        "h-full py-1 flex flex-col bg-neutral-100 dark:bg-transparent flex-shrink-0 w-200",
        className
      )}
      {...props}
    >
      <div className="flex-grow pl-1 pr-2">
        {sortedCategories.filter(category => category !== 'controls').map((category, index) => (
          <div key={category}>
            {index > 0 && <hr className="my-2 border-neutral-300 dark:border-neutral-600" />}
            {groupedApps[category].map((app) => (
              <LeftControlsLink
                key={app.id}
                app={app}
                onClick={() => openTab(app.ComponentName, app.AppName, app.MultiInstance, app.IconSVG)}
              />
            ))}
          </div>
        ))}
      </div>
      {groupedApps['controls'] && (
        <div className="mt-auto pl-1 pr-2 pb-10">
          <hr className="my-2 border-neutral-300 dark:border-neutral-600" />
          {groupedApps['controls'].map((app) => (
            <LeftControlsLink
              key={app.id}
              app={app}
              onClick={() => openTab(app.ComponentName, app.AppName, app.MultiInstance, app.IconSVG)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export const LeftControlsLink = ({
  app,
  className,
  ...props
}: {
  app: App;
  className?: string;
  onClick: () => void;
}) => {
  const scaledSvg = useMemo(() => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(app.IconSVG, 'image/svg+xml');
    const svgElement = svgDoc.documentElement;

    svgElement.removeAttribute('width');
    svgElement.removeAttribute('height');

    if (!svgElement.getAttribute('viewBox')) {
      const width = svgElement.getAttribute('width') || '24';
      const height = svgElement.getAttribute('height') || '24';
      svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }

    svgElement.setAttribute('class', 'w-6 h-6');

    return svgElement.outerHTML;
  }, [app.IconSVG]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "flex items-center justify-center w-full relative",
              className
            )}
            {...props}
          >
            <div className="relative w-9 h-9">
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: Color2,
                  borderLeftWidth: 0,
                  borderTopRightRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                }}
              ></div>
              <div 
                className="relative z-10 w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: scaledSvg }} 
              />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex flex-col items-start justify-center bg-black text-white shadow-xl">
          <div className="absolute inset-y-10 z-30 h-[20%] -left-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent w-px" />
          <div className="absolute top-10 h-[40%] z-30 -left-px bg-gradient-to-b from-transparent via-sky-500 to-transparent w-px" />
          <div className="font-bold relative z-30 text-base">
            {app.AppName}
          </div>
          <div className="text-xs">{app.Category}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};