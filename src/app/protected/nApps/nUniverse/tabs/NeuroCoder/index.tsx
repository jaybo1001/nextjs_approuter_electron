"use client";

import React from "react";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import GlowCard from '@/components/GlowUI/GlowCard';
import Sidebar from "@/nComponents/nSidebar1/sidebar";
import {sectionItemsWithTeams} from "@/nComponents/nSidebar1/sidebar-items";
import NeuroCoderActiveTabContent from '@/nApps/nUniverse/tabs/NeuroCoder/components/NeuroCoderActiveTabContent';

const NeuroCoderTab: React.FC = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const sidebarWidth = 288;

  return (
    <div className="flex h-[calc(100vh-300px)] w-full">
      <GlowCard
        id="neurocoder-main"
        name="NeuroCoder"
        description="AI-assisted neural network creation and management"
        usage="Create, edit, and manage neurons in the nUniverse"
        componentName="NeuroCoder"
        componentPath="/protected/nApps/nUniverse/tabs/NeuroCoder"
        application="nUniverse"
        colorGroup={4}
        borderRadius="lg"
        heading="NeuroCoder"
        draggable={false}
      >
        <div className="flex w-full">
          <Modal
            classNames={{
              base: "justify-start sm:m-0 p-0 h-full max-h-full w-[var(--sidebar-width)]",
              wrapper: "items-start justify-start !w-[var(--sidebar-width)]",
              body: "p-0",
              closeButton: "z-50",
            }}
            isOpen={isOpen}
            motionProps={{
              variants: {
                enter: {
                  x: 0,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
                exit: {
                  x: -288,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut",
                  },
                },
              },
            }}
            radius="none"
            scrollBehavior="inside"
            style={{
              // @ts-ignore
              "--sidebar-width": `${sidebarWidth}px`,
            }}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              <ModalBody>
                <div className="relative flex h-full w-72 flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                      <Icon icon="solar:neuron-bold" className="text-background" />
                    </div>
                    <span className="text-small font-bold uppercase text-foreground">NeuroCoder</span>
                  </div>
                  <Spacer y={8} />
                  <div className="flex items-center gap-3 px-3">
                    <Avatar
                      isBordered
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                    />
                    <div className="flex flex-col">
                      <p className="text-small font-medium text-default-600">John Doe</p>
                      <p className="text-tiny text-default-400">AI Developer</p>
                    </div>
                  </div>

                  <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
                    <Sidebar defaultSelectedKey="home" items={sectionItemsWithTeams} />
                  </ScrollShadow>

                  <Spacer y={8} />
                  
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
          
          <div className="w-full flex-1 flex-col p-4">
            <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
              <Button isIconOnly size="sm" variant="light" onPress={onOpen}>
                <Icon
                  className="text-default-500"
                  height={24}
                  icon="solar:hamburger-menu-outline"
                  width={24}
                />
              </Button>
              <h2 className="text-medium font-medium text-default-700">NeuroCoder</h2>
            </header>
            <main className="mt-4 h-full w-full overflow-visible">
              <NeuroCoderActiveTabContent />
            </main>
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

export default NeuroCoderTab;