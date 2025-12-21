import React from 'react';
import { Phone, Video, Info, ArrowLeft, Camera, Mic, Image as ImageIcon, Heart } from 'lucide-react';
import { PlatformLayoutProps } from '@/lib/types';

export const InstagramHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-2 flex items-center justify-between bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-800">
       <div className="flex items-center gap-3">
          <ArrowLeft className="w-6 h-6 text-black dark:text-white" />
          <div className="flex items-center gap-2">
             <div className="w-7 h-7 rounded-full bg-neutral-300 overflow-hidden">
                {otherUser.avatar && <img src={otherUser.avatar} className="w-full h-full object-cover" />}
             </div>
             <div className="flex flex-col">
                <span className="font-semibold text-[13px] text-black dark:text-white flex items-center gap-1">
                   {otherUser.username || otherUser.name}
                </span>
             </div>
          </div>
       </div>
       <div className="flex items-center gap-2 text-black dark:text-white">
          <Phone className="size-4" />
          <Video className="size-4" />
          <Info className="size-4" />
       </div>
    </div>
  );
};

export const InstagramFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
   return (
     <div className="px-3 py-2 bg-white dark:bg-black flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
           <Camera className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-3xl px-4 py-2 flex items-center gap-2">
           <span className="text-neutral-400 dark:text-neutral-500 text-[13px]">Message...</span>
           <div className="ml-auto flex items-center gap-3">
              <Mic className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
              <ImageIcon className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
              <Heart className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
           </div>
        </div>
     </div>
   );
};
