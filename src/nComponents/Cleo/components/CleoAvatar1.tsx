"use client";

import React from "react";
import Image from 'next/image';
import cleoAvatarSrc from './CleoAvatar1.svg';

interface CleoAvatarProps {
  size?: number;
}

export default function CleoAvatar({ size = 40 }: CleoAvatarProps) {
  return (
    <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
      <Image
        src={cleoAvatarSrc}
        alt="Cleo Avatar"
        width={size}
        height={size}
        className="absolute top-0 left-0 z-150"
      />
    </div>
  );
}