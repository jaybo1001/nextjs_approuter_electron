"use client";

import type {CardProps} from "@nextui-org/react";

import React from "react";
import {Card, Tabs, Tab} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import AccountDetails from "./account-details";
import SecuritySettings from "./security-settings";
import NColorSettings from "./nColorSettings";
import ColorSettings from "./color-settings";
import NAISettings from "./nAI_Settings";

export default function SettingsModule(props: CardProps) {
  return (
    <Card {...props} className="bg-transparent">
      <Tabs
        classNames={{
          tabList: "mx-4 mt-6 text-medium",
          tabContent: "text-small",
        }}
        size="lg"
      >
        <Tab
          key="account-settings"
          textValue="Account Settings"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:user-id-bold" width={20} />
              <p>Account</p>
            </div>
          }
        >
          <AccountDetails className="p-2  shadow-none" />
        </Tab>
        <Tab
          key="neucleosAI-settings"
          textValue="neucleosAI Settings"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:atom-bold" width={20} />
              <p>neucleosAI</p>
            </div>
          }
        >
          <NAISettings className="p-2  shadow-none" />
        </Tab>
        <Tab
          key="security-settings"
          textValue="Security Settings"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:shield-keyhole-bold" width={20} />
              <p>Security</p>
            </div>
          }
        >
          <SecuritySettings className="p-2  shadow-none" />
        </Tab>
        <Tab
          key="ncolor-settings"
          textValue="nColor Settings"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:palette-bold" width={20} />
              <p>nColors</p>
            </div>
          }
        >
          <NColorSettings />
        </Tab>
        <Tab
          key="color-settings"
          textValue="Color Settings"
          title={
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:palette-bold" width={20} />
              <p>Colors</p>
            </div>
          }
        >
          <ColorSettings />
        </Tab>
      </Tabs>
    </Card>
  );
}