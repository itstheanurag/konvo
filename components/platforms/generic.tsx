import React from 'react';
import { Plus, Camera, Mic } from 'lucide-react';
import { PlatformLayoutProps } from '@/lib/types';

export const GenericHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-2 flex items-center gap-3 backdrop-blur-md border-b border-white/10"
         style={{ backgroundColor: config.headerColor, color: config.textColorRecipient }}>
      <div className="w-7 h-7 rounded-full bg-neutral-300 overflow-hidden">
         {otherUser.avatar && <img src={otherUser.avatar} alt="Avatar" className="w-full h-full object-cover" />}
      </div>
      <div>
        <p className="text-[13px] font-bold">{otherUser.name}</p>
        <p className="text-[10px] opacity-80">Online</p>
      </div>
    </div>
  );
};

export const GenericFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
  return (
    <div className="px-3 py-2 bg-white/50 backdrop-blur border-t border-black/5 flex items-center gap-2">
       <Plus className="w-5 h-5 opacity-30" />
       <div className="flex-1 h-8 bg-black/5 rounded-full" />
       <Camera className="w-5 h-5 opacity-30" />
       <Mic className="w-5 h-5 opacity-30" />
    </div>
  );
};
