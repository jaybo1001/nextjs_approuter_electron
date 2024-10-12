"use client";

import React, { useState } from "react";
import GlowCard from "@/GlowUI/GlowCard";
import GlowButton from "@/GlowUI/GlowButton";
import SwitchCell from "./switch-cell";

export default function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    // Implement the logic to save notification settings
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Notification settings saved successfully');
  };

  return (
    <GlowCard
      id="notification-settings-card"
      name="notification-settings"
      className="p-6"
      BackgroundColor="rgba(28, 28, 28, 0.9)"
      fullWidth={true}
      fullHeight={true}
      marginLeft="4"
      marginRight="4"
      borderRadius="xl"
      paddingX={40}
      paddingY={20}
      backgroundTransparency={0.95}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-start px-4 pb-6 pt-4">
          <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
          <p className="text-sm text-gray-400">Manage your notification preferences</p>
        </div>
        <div className="flex-grow overflow-y-auto">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <SwitchCell description="Temporarily pause all notifications" label="Pause all" />
            <SwitchCell
              defaultSelected
              description="Get notified when someone follows you"
              label="Followers"
            />
            <SwitchCell
              defaultSelected
              description="Get notified when someone likes your post"
              label="Likes"
            />
            <SwitchCell
              description="Get notified when someone comments on your post"
              label="Comments"
            />
            <SwitchCell
              defaultSelected
              description="Get notified when someone mentions you in a post"
              label="Mentions"
            />
            <SwitchCell
              defaultSelected
              description="Get notified when someone sends you a message"
              label="Messages"
            />
            <SwitchCell
              description="Get notified when someone sends you a friend request"
              label="Friend Requests"
            />
          </form>
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <GlowButton
            id="reset-button"
            name="reset"
            label="Reset to Default"
            onClick={() => {/* Implement reset logic */}}
            backgroundColor="rgba(75, 75, 75, 0.7)"
          />
          <GlowButton
            id="save-button"
            name="save"
            label="Save Changes"
            onClick={handleSaveChanges}
            disabled={isLoading}
            backgroundColor="rgba(33, 124, 175, 0.7)"
          />
        </div>
      </div>
    </GlowCard>
  );
}