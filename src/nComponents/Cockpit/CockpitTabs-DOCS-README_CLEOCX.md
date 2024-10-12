# neucleos Cockpit Documentation

## Overview

The neucleos Cockpit is a flexible, tab-based interface that combines a left-side control panel (LeftControls) with a main content area (CockpitMainPanel). This document explains how app icons work, how apps are launched, and how tabs are managed within the application.

## App Structure and Navigation

### Components

1. **LeftControls2** (`LeftControls2.tsx`):
   - Renders the main sidebar on the left side of the application.
   - Contains navigation icons, search functionality, and user avatar.

2. **LeftControls** (`LeftControls.tsx`):
   - Implements the reusable sidebar component used by LeftControls2.
   - Handles rendering of sidebar items, including nested items and sections.

3. **LeftControls-items** (`LeftControls-items.tsx`):
   - Defines the data structure for sidebar items.
   - Contains arrays of items used to populate the sidebar.

4. **SidebarComponent** (used in `LeftControls2.tsx`):
   - A wrapper around the NextUI `Listbox` component.
   - Customized to render the sidebar with optional compact mode and nesting.

5. **Icon** (from `@iconify/react`):
   - Currently Used throughout to render various icons in the sidebar. ** NEEDS updated to import from supabase

6. **NextUI Components**:
   - Utilizes various NextUI components like `Avatar`, `Button`, `ScrollShadow`, `Spacer`, `Tooltip`.
   - These components are used to build the sidebar interface.

7. **Styling**:
   - Uses Tailwind CSS classes for styling components.
   - Implements responsive design for different screen sizes.

8. **Interactivity**:
   - Handles selection of sidebar items.
   - Implements tooltips for compact mode.

9. **Accessibility**:
   - Includes ARIA labels and roles for better accessibility.

10. **Customization**:
    - Allows customization of icons, item rendering, and overall sidebar appearance through props and class names.

This summary provides an overview of the key components and features involved in rendering the left sidebar of the application.

## App Icons

App icons need to be updated to import from supabase and rendored in place of the current iconify icons:

1. **Fetching Apps**: 
   - Each app has properties like `AppName`, `ComponentName`, `MultiInstance`, and `IconSVG`.

2. **Grouping Apps**: 
   - Apps are grouped by their `Category` for organized display.
   - Categories like 'core', 'controls', etc., determine the sorting and presentation.

3. **Parsing SVG Icons**:
   - SVG strings are parsed and processed for consistent rendering.


4. **Rendering Icons**:
   - Processed SVGs are embedded using 
   - Tooltips display app name on hover.

## Launching Apps

When an app icon is clicked:

1. The tbd handler in tbd triggers the rendoring of the tab
2. tbd checks if multiple instances are allowed (`MultiInstance` property).
3. If multiple instances are not allowed and the tab exists, it activates the existing tab.
4. Otherwise, it creates a new tab with a unique `id`, storing `ComponentName`, `AppName`, and `IconSVG`.

## Tab Management

Tabs are managed using the `CockpitTabsContext`:

1. **State Management**:
   - Maintains a list of open tabs and the currently active tab.
   - renderer/contexts/CockPitTabsContextV2.tsx


2. **Tab Controls**:


3. **Tab Content**:
   -  displays the active tab's content.

4. **Dynamic Loading**:
   - Components are imported from `@/app/protected/nApps/${componentName}/${componentName}`.
   - Allows for lazy loading, improving performance.

5. **Closing Tabs**:


## Flow Summary

1. **Display Icons**:  fetches and displays grouped app icons.
2. **Launch Apps**: Clicking an icon opens or activates a tab 
3. **Manage Tabs**: 
4. **Render Content**: 



#.  CURRENT IMPLEMENTATION THAT WE ARE UPDATING - 

# Understanding the `LeftControls` Components

The `LeftControls` components are based on NextUI templates and components. They are designed to work together to render a sidebar with icons and additional functionality in a React application.

## Files Overview

- [`LeftControls2.tsx`](#leftcontrols2tsx): The main component that renders the sidebar.
- [`LeftControls.tsx`](#leftcontrolstsx): A reusable sidebar component that wraps around NextUI's `Listbox` component.
- [`LeftControls-items.tsx`](#leftcontrols-itemstsx): Contains the data structure defining the sidebar items.

---

## `LeftControls2.tsx`

```typescript:CleoCX/renderer/app/protected/Cockpit/components/LeftControls2.tsx
"use client";

import React from "react";
import { Avatar, Button, ScrollShadow, Spacer, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import SidebarComponent from "./LeftControls";
import { sectionItemsWithTeams } from "./LeftControls-items";

export default function LeftControls2() {
  return (
    <div className="h-dvh bg-transparent">
      <div className="relative flex h-full w-16 flex-1 flex-col items-center px-2 py-8 bg-transparent">
        <Spacer y={0} />

        <ScrollShadow className="-mr-2 h-full max-h-full py-6 pr-2">
          <div className="flex flex-col items-center gap-4">
            <Tooltip content="Search" placement="right">
              <Button isIconOnly aria-label="search" className="my-2" radius="lg" variant="light">
                <Icon className="text-default-500" icon="solar:magnifer-linear" width={20} />
              </Button>
            </Tooltip>
          </div>

          <SidebarComponent
            isCompact
            defaultSelectedKey="home"
            items={sectionItemsWithTeams}
          />

          <Spacer y={8} />

          <div className="mt-auto flex flex-col items-center">
            <Tooltip content="Help & Feedback" placement="right">
              <Button isIconOnly className="data-[hover=true]:text-foreground" variant="light">
                <Icon
                  className="text-default-500 "
                  icon="solar:info-circle-line-duotone"
                  width={24}
                />
              </Button>
            </Tooltip>
            <Tooltip content="Log Out" placement="right">
              <Button isIconOnly className="data-[hover=true]:text-foreground" variant="light">
                <Icon
                  className="rotate-180 text-default-500"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              </Button>
            </Tooltip>
          </div>
        </ScrollShadow>

        {/* Avatar positioned at the bottom */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <Avatar isBordered size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </div>
      </div>
    </div>
  );
}
```

### Explanation

- **Imports:**
  - `Avatar`, `Button`, `ScrollShadow`, `Spacer`, `Tooltip` from `@nextui-org/react`.
  - `Icon` from `@iconify/react`.
  - `SidebarComponent` from `LeftControls.tsx`.
  - `sectionItemsWithTeams` from `LeftControls-items.tsx`.

- **Component Structure:**
  - A main `div` wrapping the sidebar with height set to the viewport height (`h-dvh`).
  - Inside, there's a `relative` container to position elements absolutely if needed.
  - Uses `ScrollShadow` from NextUI to provide a scrollable area with shadow effects.
  - Renders a search button at the top with an icon.
  - Incorporates the `SidebarComponent`, passing in props like `isCompact`, `defaultSelectedKey`, and `items`.
  - Renders additional buttons like "Help & Feedback" and "Log Out" with corresponding icons.
  - Positions an `Avatar` at the bottom center.

### Key Components and Props

- **ScrollShadow:** Provides a scrollable area with a shadow indicating more content.
- **Tooltip:** Wraps buttons to provide contextual information on hover.
- **Button:** Rendered with `isIconOnly` to display only icons.
- **Icon:** Uses `@iconify/react` to render various icons.

---

## `LeftControls.tsx`

```typescript:CleoCX/renderer/app/protected/Cockpit/components/LeftControls.tsx
"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  ListboxProps,
  ListboxSectionProps,
  Selection,
  Listbox,
  ListboxItem,
  ListboxSection,
  Tooltip,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";

export enum SidebarItemType {
  Nest = "nest",
}

export type SidebarItem = {
  key: string;
  title: string;
  icon?: string;
  href?: string;
  type?: SidebarItemType.Nest;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
};

export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
  items: SidebarItem[];
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps["classNames"];
  classNames?: ListboxProps["classNames"];
  defaultSelectedKey: string;
  onSelect?: (key: string) => void;
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      isCompact,
      defaultSelectedKey,
      onSelect,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      itemClasses: itemClassesProp = {},
      iconClassName,
      classNames,
      className,
      ...props
    },
    ref,
  ) => {
    const [selected, setSelected] = React.useState<React.Key>(defaultSelectedKey);

    // ... functions to render items

    return (
      <Listbox
        // ... props
      >
        {(item) => {
          // ... rendering logic
        }}
      </Listbox>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
```

### Explanation

- **Purpose:** `LeftControls.tsx` defines the `Sidebar` component, which is a wrapper around NextUI's `Listbox` component, customized to render a sidebar with optional nesting.

- **Key Types and Enums:**
  - `SidebarItemType`: Enum to define types of sidebar items (e.g., nested items).
  - `SidebarItem`: Type defining the shape of a sidebar item, including optional nesting.

- **Props:**
  - `items`: Array of `SidebarItem`, defining the sidebar's content.
  - `isCompact`: Determines if the sidebar should display in compact mode (icons only).
  - `defaultSelectedKey`: The initially selected item's key.
  - `onSelect`: Callback when an item is selected.

- **Rendering Logic:**
  - Uses `Listbox` to render the main list of items.
  - `renderItem`: Function to render individual items, handling compact mode and nesting.
  - If an item is of type `Nest` and has child items, it uses `Accordion` and `AccordionItem` from NextUI to render nested items.

- **Class Names and Styling:**
  - Uses `cn` from NextUI to conditionally apply class names based on props.
  - Customizes the appearance of items when in compact mode or when nested.

### Interaction with `LeftControls2.tsx`

The `SidebarComponent` imported in `LeftControls2.tsx` utilizes this `Sidebar` component, passing in the necessary props to render the sidebar items.

---

## `LeftControls-items.tsx`

```typescript:CleoCX/renderer/app/protected/Cockpit/components/LeftControls-items.tsx
import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { SidebarItem, SidebarItemType } from "./LeftControls";
import TeamAvatar from "./group-avatar";

/**
 * Sidebar items data.
 */

export const sectionItemsWithTeams: SidebarItem[] = [
  {
    key: "overview",
    title: "Overview",
    items: [
      {
        key: "home",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      // ... other items
    ],
  },
  // ... other sections
];
```

### Explanation

- **Purpose:** Defines the data structure for the sidebar items used by the `Sidebar` component.

- **Key Components:**
  - Uses `SidebarItem` type to ensure items have the correct shape.
  - Includes nested items and sections.

- **Sample Items:**
  - `overview` section containing items like `home`, `projects`, `tasks`, etc.
  - Some items include an `endContent`, such as a `Chip` or an `Icon`.
  - The `your-teams` section demonstrates nested items with custom `startContent`, like `TeamAvatar`.

### Interaction with `LeftControls2.tsx`

- The `sectionItemsWithTeams` array is imported into `LeftControls2.tsx` and passed to the `SidebarComponent` as the `items` prop.
- This data defines what items appear in the sidebar and how they are structured, including any nested items.

---

## How the Components Work Together to Render Icons

1. **Data Definition (`LeftControls-items.tsx`):**
   - Sidebar items, including icons, titles, and any additional content, are defined in `LeftControls-items.tsx`.
   - Icons are specified using icon identifiers compatible with `@iconify/react`.

2. **Sidebar Component (`LeftControls.tsx`):**
   - `Sidebar` component receives the items and renders them using NextUI's `Listbox`, `ListboxItem`, and `ListboxSection`.
   - Handles different display modes (compact vs. full) and supports nesting through the use of `Accordion`.
   - Renders icons using the `Icon` component from `@iconify/react`, utilizing the `icon` property from each `SidebarItem`.

3. **Main Component (`LeftControls2.tsx`):**
   - Imports `SidebarComponent` (the `Sidebar` from `LeftControls.tsx`) and passes in the `items` from `LeftControls-items.tsx`.
   - Renders additional UI elements like search, help, logout buttons, each with their own icons.
   - Positions the components within a scrollable area (`ScrollShadow`) and includes an `Avatar`.

4. **Rendering Icons:**
   - The `Icon` component is used throughout to render icons based on the identifiers from `@iconify/react`.
   - When the `Sidebar` component renders items, it checks if the item has an `icon` property and renders it accordingly.
   - Icons are styled and sized using class names and direct properties like `width`.

---

## References to NextUI Documentation

- **Listbox Component:**
  - Used as the base for the sidebar menu.
  - [NextUI Listbox Documentation](https://nextui.org/docs/components/listbox)

- **Accordion Component:**
  - Utilized for nested sidebar items.
  - [NextUI Accordion Documentation](https://nextui.org/docs/components/accordion)

- **Tooltip Component:**
  - Wrapping icons to provide hover information.
  - [NextUI Tooltip Documentation](https://nextui.org/docs/components/tooltip)

- **ScrollShadow Component:**
  - Provides a scrollable container with shadow effects at the scroll boundaries.
  - [NextUI ScrollShadow Documentation](https://nextui.org/docs/components/scroll-shadow)

- **Avatar Component:**
  - Used to display the user's avatar at the bottom of the sidebar.
  - [NextUI Avatar Documentation](https://nextui.org/docs/components/avatar)

---

## Summary

The `LeftControls` components leverage NextUI's rich set of components to build a customizable and interactive sidebar:

- **Customization & Theming:**
  - Uses Tailwind CSS classes and the `cn` function to conditionally apply styles.
  - Follows NextUI's design principles of modularity and flexibility.

- **Icon Rendering:**
  - Integrates `@iconify/react` for a vast selection of icons, easily rendered using the `Icon` component.
  - Icons are dynamically rendered based on the data provided in `LeftControls-items.tsx`.

- **Component Composition:**
  - Breaks down the sidebar into reusable components and data structures.
  - Facilitates easy updates and scalability for adding new sidebar items or modifying existing ones.

By understanding how these components interact and how they utilize NextUI's components, developers can effectively customize and extend the sidebar to fit their application's needs.