import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { PlatformLayoutProps } from '@/lib/types';

export const XHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-2 flex items-center justify-between bg-black/90 backdrop-blur border-b border-neutral-800 sticky top-0 z-20">
       <div className="flex items-center gap-4">
          <ArrowLeft className="w-4 h-4 text-white" />
          <div className="flex flex-col">
             <span className="font-bold text-white text-[13px]">{otherUser.name}</span>
             <span className="text-[11px] text-neutral-500">@{otherUser.username || otherUser.name.toLowerCase()}</span>
          </div>
       </div>
       <Info className="w-4 h-4 text-blue-400" />
    </div>
  );
};

export const XFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
  // Twitter relies on generic for now/custom logic in main layout if strictly needed, 
  // but let's provide a specific one if different.
  // Using Generic like fallback for now or mirroring functionality.
  return null; 
};
