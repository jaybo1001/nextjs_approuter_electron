'use client'

import React from 'react'
import F1 from './footerCards/f1'
import { useUserEmail } from '@/hooks/fetchUserEmail';

// Define the type for our footer items
type FooterItem = {
  key: string;
  render: (props?: any) => React.ReactNode;
}

// Array of footer items
const footerItems: FooterItem[] = [
  { key: 'f1', render: () => <F1 label="Status" /> },
  { key: 'f2', render: () => <div className="flex justify-center items-center w-full h-full">F2</div> },
  { key: 'f3', render: () => <div className="flex justify-center items-center w-full h-full">F3</div> },
  { key: 'f4', render: () => <div className="flex justify-center items-center w-full h-full">F4</div> },
  { key: 'f5', render: () => <div className="flex justify-center items-center w-full h-full">F5</div> },
  { key: 'f6', render: () => <div className="flex justify-center items-center w-full h-full">F6</div> },
  { key: 'f7', render: () => <div className="flex justify-center items-center w-full h-full">F7</div> },
  { key: 'f8', render: () => <div className="flex justify-center items-center w-full h-full">F8</div> },
  { key: 'f9', render: () => <div className="flex justify-center items-center w-full h-full">F9</div> },
  { key: 'f10', render: () => <div className="flex justify-center items-center w-full h-full">F10</div> },
  { key: 'f11', render: () => <div className="flex justify-center items-center w-full h-full">F11</div> },
  { key: 'f12', render: () => <div className="flex justify-center items-center w-full h-full">F12</div> },
  { key: 'f13', render: () => <div className="flex justify-center items-center w-full h-full">F13</div> },
  { key: 'f14', render: () => <div className="flex justify-center items-center w-full h-full">F14</div> },
  { key: 'f15', render: () => <div className="flex justify-center items-center w-full h-full">F15</div> },
  { key: 'f16', render: () => <div className="flex justify-center items-center w-full h-full">F16</div> },
  { key: 'f17', render: () => <div className="flex justify-center items-center w-full h-full">F17</div> },
  { key: 'f18', render: () => <div className="flex justify-center items-center w-full h-full">F18</div> },
  { key: 'f19', render: () => <div className="flex justify-center items-center w-full h-full">F19</div> },
  { key: 'f20', render: () => <div className="flex justify-center items-center w-full h-full">F20</div> },
];

const Footer: React.FC = () => {
  const userEmail = useUserEmail();

  return (
    <footer className="sticky bottom-0 flex items-center z-35 justify-between h-8 px-4 border-t border-slate-800 shrink-0 rounded-t-lg bg-background">
      <div className="flex-grow flex">
        <div className="flex-shrink-0 flex items-center justify-center px-2 text-sm text-gray-400">
          {userEmail ? userEmail : 'Not logged in'}
        </div>
        {footerItems.map((item) => (
          <div key={item.key} className="flex-grow border-l border-r border-slate-800 text-[8px] text-gray-400 px-1">
            {item.render()}
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
