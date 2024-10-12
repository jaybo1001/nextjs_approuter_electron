"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/nComponents/sidebar/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/tailwind-merge";
import CleoAvatar from "@/nComponents/Cleo/components/CleoAvatar1";
import PromptContainerWithConversationPage from "./Cleo/prompt-container-with-conversation/prompt-container-with-converstation-Page";
import GlowCardCleo from "@/nComponents/Cleo/components/GlowCardCleo";  

export function Cleo() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
      <GlowCardCleo
      id="cleo-main-container"
      name="Cleo Main Container"
      description="Main container for Cleo interface"
      usage="Wraps the entire Cleo component"
      componentName="Cleo"
      componentPath="CleoCX/renderer/app/protected/Cockpit/CockpitPanels/Cleo.tsx"
      application="CleoCX"
      className="h-full"
      colorGroup={5}
    >
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-transparent w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "h-full"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-start gap-2 pt-0">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-2 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <Dashboard />
      </div>
    </GlowCardCleo>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <CleoAvatar size={24} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        <h1>Cleo</h1>
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <CleoAvatar size={24} />
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <PromptContainerWithConversationPage />
    </div>
  );
};

