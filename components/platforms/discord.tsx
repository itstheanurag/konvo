import React from 'react';
import { PhoneCall, Video as VideoIcon, Search, Plus, Gift, Sticker, Smile } from 'lucide-react';
import { PlatformLayoutProps } from '@/lib/types';

export const DiscordHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-2 flex items-center justify-between bg-[#313338] shadow-sm border-b border-[#1f2023] sticky top-0 z-20">
       <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-neutral-500 flex items-center justify-center text-white text-xs font-bold">@</div>
          <span className="font-bold text-[#f2f3f5] text-[13px]">{otherUser.username || otherUser.name}</span>
          <div className="w-2 h-2 rounded-full bg-green-500" /> {/* Status dot */}
       </div>
       <div className="flex items-center gap-3 text-[#b5bac1]">
          <PhoneCall className="w-4 h-4" />
          <VideoIcon className="w-4 h-4" />
          <Search className="w-4 h-4" />
       </div>
    </div>
  );
};

export const DiscordFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
   return (
      <div className="px-3 py-2 bg-[#313338] border-t border-[#26272d]">
         <div className="bg-[#383a40] rounded-lg px-3 py-2 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-neutral-400/50 flex items-center justify-center text-neutral-300 font-bold text-[10px]"><Plus className="w-3 h-3" /></div>
            <span className="text-[#949ba4] text-[13px] font-medium flex-1">Message @User</span>
            <Gift className="w-4 h-4 text-[#b5bac1]" />
            <Sticker className="w-4 h-4 text-[#b5bac1]" />
            <Smile className="w-4 h-4 text-[#b5bac1]" />
         </div>
      </div>
   );
};
