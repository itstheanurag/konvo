'use client';

import React from 'react';
import { PlatformConfig } from '@/lib/types';

interface PlatformThemeProps {
  config: PlatformConfig;
  children: React.ReactNode;
}

export const PlatformTheme: React.FC<PlatformThemeProps> = ({ config, children }) => {
  return (
    <div
      style={{
        '--platform-bg': config.bgColor,
        '--platform-header': config.headerColor,
        '--platform-bubble-recipient': config.bubbleColorRecipient,
        '--platform-bubble-sender': config.bubbleColorSender,
        '--platform-text-recipient': config.textColorRecipient,
        '--platform-text-sender': config.textColorSender,
        '--platform-font': config.fontFamily,
      } as React.CSSProperties}
      className="w-full h-full font-[family-name:var(--platform-font)]"
    >
      {children}
    </div>
  );
};
