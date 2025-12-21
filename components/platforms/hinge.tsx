import React from 'react';
import { ChevronLeft, MoreHorizontal, Video, ShieldCheck } from 'lucide-react';
import { PlatformLayoutProps } from '@/lib/types';

export const HingeHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-3 flex items-center justify-between bg-white border-b border-neutral-100 z-20">
       <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-6 h-6 text-neutral-900" />
       </button>
       <span className="font-serif font-bold text-lg text-neutral-800">{otherUser.name}</span>
       <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors">
          <ShieldCheck className="w-5 h-5 text-neutral-400" />
       </button>
    </div>
  );
};

export const HingeFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
   return (
     <div className="px-3 py-3 bg-white border-t border-neutral-100 flex items-center gap-2">
        <div className="flex-1 bg-neutral-100 rounded-full px-4 py-2.5 flex items-center">
           <span className="text-neutral-400 text-sm font-serif">Send a message...</span>
        </div>
        <div className="p-2 text-neutral-400 hover:text-neutral-600 cursor-pointer">
           <span className="text-xs font-bold font-serif opacity-50">Send</span>
        </div>
     </div>
   );
};
