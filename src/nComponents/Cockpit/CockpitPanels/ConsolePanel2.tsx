"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
  Spacer,
} from "@nextui-org/react";
import { Cleo } from "./Cleo";
import ConsoleInner from "./Console2";
import { useCleoPanel } from "@/contexts/CleoPanelContext";
import CleoAvatar from "@/nComponents/Cleo/components/CleoAvatar1";

export default function ConsolePanel2() {
  const { isOpen, setIsOpen } = useCleoPanel();
  const sidebarWidth = 288;
  const consoleRef = useRef<HTMLDivElement>(null);
  const [sidebarPosition, setSidebarPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (consoleRef.current) {
      const rect = consoleRef.current.getBoundingClientRect();
      setSidebarPosition({
        top: rect.top,
        left: rect.left,
      });
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div ref={consoleRef} className="flex h-dvh w-full relative bg-transparent">
      <Modal
        classNames={{
          base: "!absolute p-0 h-dvh max-h-full bg-transparent w-[var(--sidebar-width)]",
          wrapper: "!w-[var(--sidebar-width)] !absolute",
          body: "p-0",
          // Add this line to hide the close button
          closeButton: "hidden",
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
              x: -sidebarWidth,
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
          "--sidebar-width": `${sidebarWidth}px`,
          top: `${sidebarPosition.top}px`,
          left: `${sidebarPosition.left}px`,
        }}
        onOpenChange={setIsOpen}
      >
        <ModalContent>
          <ModalBody> {/* this is the sidebar inside the sidebar */}
            <div className="relative flex h-full w-100 flex-1 flex-col p-0">

              <Spacer y={6} />

              <ScrollShadow className="mr-2 ml-2 h-full max-h-full py-2 pr-0 pb-0">
                <Cleo />
              </ScrollShadow>

              <Spacer y={8} />
              <div className="mt-auto flex flex-col"></div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="w-full flex-1 flex-col p-0 pt-0">
        <main className="mt-4 h-full w-full overflow-visible z-100">
          <div className="flex h-[95%] w-full flex-col gap-4 rounded-medium border-small border-divider relative">
            <Button
              isIconOnly 
              size="sm" 
              variant="light" 
              onPress={handleOpen}
              className="absolute -top-4 left-3 z-10"
            >
              <CleoAvatar size={40} />
            </Button>
            <ConsoleInner />
          </div>
        </main>
      </div>
    </div>
  );
}