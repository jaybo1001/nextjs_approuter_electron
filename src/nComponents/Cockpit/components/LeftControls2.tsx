"use client";

import React, { useMemo, useState } from "react";
import { Avatar, Button, ScrollShadow, Spacer, Tooltip } from "@nextui-org/react";
import { SvgSpinners6DotsRotate } from "@/nComponents/icons/spinner1";
import { useCockpitTabs } from "@/contexts/CockpitTabsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react";

import SidebarComponent from "./LeftControls";

// Fallback icon
const FallbackIcon = () => <Icon icon="mdi:application" className="w-8 h-8" />;

// Function to scale and normalize SVG
const scaleSvg = (svgString: string, size: number = 32): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.documentElement;

  // Remove width and height attributes
  svg.removeAttribute("width");
  svg.removeAttribute("height");

  // Set viewBox if it doesn't exist
  if (!svg.getAttribute("viewBox")) {
    const width = parseFloat(svg.getAttribute("width") || "24");
    const height = parseFloat(svg.getAttribute("height") || "24");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  // Set new width and height
  svg.setAttribute("width", `${size}px`);
  svg.setAttribute("height", `${size}px`);

  return new XMLSerializer().serializeToString(svg);
};

export default function LeftControls2() {
  const { user, apps, loading, error } = useAuth();
  const { openTab } = useCockpitTabs();
  const [timeoutError, setTimeoutError] = useState<string | null>(null);

  // Memoized version of scaleSvg
  const scaledSvgMemo = useMemo(() => {
    const cache = new Map<string, string>();
    return (app: App) => {
      if (!app.IconSVG) return null;
      if (!cache.has(app.IconSVG)) {
        cache.set(app.IconSVG, scaleSvg(app.IconSVG));
      }
      return cache.get(app.IconSVG);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <SvgSpinners6DotsRotate className="w-8 h-8" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Please log in to access apps.</div>;
  if (!apps || apps.length === 0) return <div>No apps available.</div>;

  // Group apps by category
  const groupedApps = apps.reduce((acc: { [key: string]: App[] }, app) => {
    const key = app.Category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(app);
    return acc;
  }, {});

  // Sort categories
  const sortedCategories = Object.keys(groupedApps).sort((a, b) => {
    if (a === "core") return -1;
    if (b === "core") return 1;
    if (a === "controls") return 1;
    if (b === "controls") return -1;
    return a.localeCompare(b);
  });

  // Convert groupedApps to sidebar items
  const sidebarItems = sortedCategories.map((category) => ({
    key: category,
    title: category.charAt(0).toUpperCase() + category.slice(1),
    items: groupedApps[category].map((app) => ({
      key: app.id.toString(),
      title: app.AppName,
      app: app,
      startContent: app.IconSVG ? (
        <div
          className="w-8 h-8 flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: scaledSvgMemo(app) || '' }}
        />
      ) : (
        <FallbackIcon />
      ),
    })),
  }));

  return (
    <div className="h-dvh bg-transparent">
      <div className="relative flex h-full w-16 flex-1 flex-col items-center px-2 py-8 bg-transparent">
        <Spacer y={20} />

        <ScrollShadow className="-mr-2 h-full min-h-full pr-2">
          <div className="flex flex-col items-center gap-6">
            <Tooltip content="Search" placement="right">
              <Button
                isIconOnly
                aria-label="search"
                className="my-2"
                radius="lg"
                variant="light"
              >
                <Icon icon="mdi:magnify" className="w-8 h-8" />
              </Button>
            </Tooltip>
          </div>

          <SidebarComponent
            isCompact
            defaultSelectedKey="home"
            items={sidebarItems}
            onSelect={(key) => {
              const selectedApp = apps.find((app) => app.id.toString() === key);
              if (selectedApp) {
                openTab(
                  selectedApp.ComponentName,
                  selectedApp.AppName,
                  selectedApp.MultiInstance,
                  selectedApp.IconSVG
                );
              }
            }}
          />

          <Spacer y={2} />

          <div className="mt-auto flex flex-col items-center">
            <Tooltip content="Help & Feedback" placement="right">
              <Button
                isIconOnly
                className="data-[hover=true]:text-foreground"
                variant="light"
              >
                <Icon icon="mdi:help-circle-outline" className="w-8 h-8" />
              </Button>
            </Tooltip>
            <Tooltip content="Log Out" placement="right">
              <Button
                isIconOnly
                className="data-[hover=true]:text-foreground"
                variant="light"
              >
                <Icon icon="mdi:logout" className="w-8 h-8" />
              </Button>
            </Tooltip>
          </div>
        </ScrollShadow>

        {/* Avatar positioned at the bottom */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <Avatar
            isBordered
            size="sm"
            src={user?.avatar_url || "https://i.pravatar.cc/150?u=a04258114e29026708c"}
            alt={user?.user_metadata?.full_name || "User"}
          />
        </div>
      </div>
    </div>
  );
}
