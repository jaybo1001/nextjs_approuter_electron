"use client";

import type { CardProps } from "@nextui-org/react";

import React from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { ThemeSwitcher } from '../../n-theme-switcher';
import SwitchCell from "./switch-cell";

export default function ThemeSettings(props: CardProps) {
  return (
    <Card className="w-full max-w-lg p-2" {...props}>
      <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
        <p className="text-large">Theme Settings</p>
        <p className="text-small text-default-500">Customize your app's appearance</p>
      </CardHeader>
      <CardBody className="space-y-2">
        <SwitchCell
          defaultSelected
          description="Use system preference for light or dark mode"
          label="Auto Theme"
        />
        <div className="flex items-center justify-between">
          <div>
            <p>Theme Switcher</p>
            <p className="text-small text-default-500">
              Choose between light and dark mode
            </p>
          </div>
          <ThemeSwitcher />
        </div>
        <SwitchCell
          description="Enable high contrast mode for better visibility"
          label="High Contrast"
        />
        <SwitchCell
          description="Reduce motion in animations"
          label="Reduce Motion"
        />
        <div className="flex w-full justify-end gap-2 pt-4">
          <Button variant="bordered">Reset to Default</Button>
          <Button color="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
