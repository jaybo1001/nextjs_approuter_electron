import React from 'react';
import type { SVGProps } from 'react';

interface PanelCloseIconProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
  isOpen: boolean;
  color?: string;
}

const PanelCloseIcon: React.FC<PanelCloseIconProps> = ({ isOpen, color = 'currentColor', ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d={isOpen 
          ? "M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19" 
          : "M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"
        }
      >
        <animate
          fill="freeze"
          attributeName="d"
          dur="0.4s"
          values={isOpen
            ? "M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19;M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"
            : "M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19;M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"
          }
        />
      </path>
    </svg>
  );
};

export default PanelCloseIcon;

// import PanelCloseIcon from '@/nComponents/icons/panelClose';

// // Usage
// <PanelCloseIcon isOpen={true} />