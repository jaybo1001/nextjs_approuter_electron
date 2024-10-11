'use client'
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import App from "./ChatPage1/App";

export default function Home() {
  return (
    <React.StrictMode>
      <NextUIProvider>
        <div className="w-screen h-screen p-8 flex items-start justify-center">
          <App />
        </div>
      </NextUIProvider>
    </React.StrictMode>
  );
}
