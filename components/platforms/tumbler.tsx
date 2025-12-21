import React from 'react';
import { Search, Home, Mail, Compass, User, Pencil, Heart, Repeat, Send, MoreHorizontal } from 'lucide-react';
import { PlatformLayoutProps } from '@/lib/types';

export const TumblrHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-3 flex items-center justify-between bg-[#001935] text-white sticky top-0 z-20 shadow-sm border-b border-[#ffffff1a]">
       <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-white overflow-hidden">
             {otherUser.avatar && <img src={otherUser.avatar} className="w-full h-full object-cover" />}
          </div>
          <span className="font-bold text-[14px]">{otherUser.username || otherUser.name}</span>
       </div>
       <div className="flex items-center gap-4 text-white/80">
          <User className="w-5 h-5" />
          <MoreHorizontal className="w-5 h-5" />
       </div>
    </div>
  );
};

export const TumblrFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
   return (
      <div className="px-3 py-2 bg-[#001935] border-t border-[#ffffff1a] flex justify-between items-center text-white/60">
        <Home className="w-6 h-6 hover:text-white transition-colors" />
        <Search className="w-6 h-6 hover:text-white transition-colors" />
        <div className="w-10 h-10 bg-[#00b8ff] rounded-full flex items-center justify-center -mt-6 border-4 border-[#001935] shadow-lg">
           <Pencil className="w-5 h-5 text-[#001935]" />
        </div>
        <Compass className="w-6 h-6 hover:text-white transition-colors" />
        <User className="w-6 h-6 hover:text-white transition-colors" />
      </div>
   );
};
