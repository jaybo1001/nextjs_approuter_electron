"use client";

import React from "react";
import {ScrollShadow, Spacer} from "@nextui-org/react";

import {AcmeIcon} from "./acme";
import {sectionItemsWithTeams} from "./RightControls-items";

import SidebarComponent from "./RightControls";

export default function RightControls2() {
  return (
    <div className="h-dvh bg-transparent">
      <div className="relative flex h-full w-16 flex-1 flex-col items-center border-r-small border-divider px-2 py-8 bg-transparent">


        <Spacer y={0} />

        <ScrollShadow className="-mr-2 h-full max-h-full py-6 pr-2">
          <SidebarComponent isCompact defaultSelectedKey="home" items={sectionItemsWithTeams} />
        </ScrollShadow>
      </div>
    </div>
  );
}
