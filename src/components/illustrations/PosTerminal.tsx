import React from 'react';
import { icons } from '../../assets';

export function PosTerminalIllustration() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center h-full relative">
      <div className="absolute inset-0 bg-[#1fc18833]" />
      <div className="relative">
        <icons.emptyState className="w-[448px] h-[422px]" />
      </div>
    </div>
  );
}