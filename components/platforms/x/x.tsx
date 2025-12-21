import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const XHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-2 flex items-center justify-between bg-black text-white border-b border-neutral-800">
       <div className="flex items-center gap-4">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <div className="flex flex-col">
             <span className="font-bold text-[16px] leading-tight">{otherUser.name}</span>
             <span className="text-[12px] text-neutral-500">@{otherUser.username || 'user'}</span>
          </div>
       </div>
       <Info className="w-5 h-5 text-white cursor-pointer" />
    </div>
  );
};

