"use client";
import { cn } from '@/utils/tailwind-merge'
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

interface SidebarProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  position?: "left" | "right";
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  open,
  setOpen,
  animate = true,
  position = "left", // Add this line with a default value
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  canCollapse = false,
  ...props
}: React.ComponentProps<typeof motion.div> & { canCollapse?: boolean }) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-transparent flex-shrink-0",
          className
        )}
        animate={{
          width: animate
            ? open
              ? "150px"
              : canCollapse
              ? "0px"
              : "60px"
            : "150px",
          opacity: animate && canCollapse && !open ? 0 : 1,
          visibility: animate && canCollapse && !open ? "hidden" : "visible",
        }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-transparent w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-transparent p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};


// Props
// SidebarProvider Props
// Prop Name	Type	Default	Description
// children	React.ReactNode	-	The content to be rendered inside the provider.
// open	boolean	false	Controls the open state of the sidebar.
// setOpen	React.Dispatch<React.SetStateAction<boolean>>	-	Function to set the open state of the sidebar.
// Sidebar Props
// Prop Name	Type	Default	Description
// children	React.ReactNode	-	The content to be rendered inside the sidebar.
// open	boolean	false	Controls the open state of the sidebar.
// setOpen	React.Dispatch<React.SetStateAction<boolean>>	-	Function to set the open state of the sidebar.
// animate	boolean	true	Controls the animation of the sidebar. Put false if you want to disable animation
// position	"left" | "right"	"left"	Position of the sidebar
// SidebarBody Props
// Prop Name	Type	Default	Description
// props	React.ComponentProps<typeof motion.div>	-	Props to be passed to the motion.div component.
// DesktopSidebar Props
// Prop Name	Type	Default	Description
// className	string	-	Additional class names for styling.
// children	React.ReactNode	-	The content to be rendered inside the desktop sidebar.
// props	React.ComponentProps<typeof motion.div>	-	Props to be passed to the motion.div component.
// MobileSidebar Props
// Prop Name	Type	Default	Description
// className	string	-	Additional class names for styling.
// children	React.ReactNode	-	The content to be rendered inside the mobile sidebar.
// props	React.ComponentProps<"div">	-	Props to be passed to the div component.
// SidebarLink Props
// Prop Name	Type	Default	Description
// link	Links	-	The link object containing label, href, and icon.
// className	string	-	Additional class names for styling.
// props	LinkProps	-	Props to be passed to the Link component.
// Links Interface
// Property	Type	Description
// label	string	The text label for the link.
// href	string	The URL the link points to.
// icon	React.JSX.Element | React.ReactNode	The icon to be displayed alongside the link.
// SidebarContextProps Interface
// Property	Type	Description
// open	boolean	Indicates whether the sidebar is open.
// setOpen	React.Dispatch<React.SetStateAction<boolean>>	Function to set the open state of the sidebar.