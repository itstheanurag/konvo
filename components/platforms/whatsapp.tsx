import React from 'react';
import { ArrowLeft, Video, Phone, MoreVertical, Smile, Image as ImageIcon, Camera, Mic } from 'lucide-react';
import { PlatformLayoutProps } from '@/lib/types';

export const WhatsAppHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-2 py-2 flex items-center gap-1 bg-[#075e54] text-white shadow-sm">
       <div className="flex items-center">
         <ArrowLeft className="w-5 h-5 mr-1" />
         <div className="w-8 h-8 rounded-full bg-neutral-300 overflow-hidden mr-2 border border-white/20">
            {otherUser.avatar && <img src={otherUser.avatar} className="w-full h-full object-cover" />}
         </div>
       </div>
       <div className="flex-1 min-w-0 flex flex-col justify-center">
         <span className="font-medium text-[14px] leading-tight truncate">{otherUser.name}</span>
         <span className="text-[10px] opacity-90 truncate">online</span>
       </div>
       <div className="flex items-center gap-3 mr-1">
          <Video className="w-5 h-5" />
          <Phone className="w-4 h-4" />
          <MoreVertical className="w-4 h-4" />
       </div>
    </div>
  );
};

export const WhatsAppFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
  return (
     <div className="px-2 py-2 flex items-end gap-2 bg-[#f0f2f5] dark:bg-[#202c33]">
       <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-3xl flex items-center px-3 py-1.5 min-h-[40px] gap-2 shadow-sm">
         <Smile className="w-5 h-5 text-neutral-400 dark:text-neutral-500 cursor-pointer" />
         <span className="text-neutral-400 dark:text-neutral-500 text-[13px] flex-1">Message</span>
         <div className="flex items-center gap-3 mr-1">
           <ImageIcon className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
           <Camera className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
         </div>
       </div>
       <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center shadow-sm flex-shrink-0">
         <Mic className="w-4 h-4 text-white" />
       </div>
     </div>
   );
};
