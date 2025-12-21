import React from 'react';
import { ArrowLeft, Video, Phone, MoreVertical, Smile, Image as ImageIcon, Camera, Mic, Heart, Send } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

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
          <MoreVertical className="size-4" />
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
           <Smile className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
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

export const InstagramMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst, isLast }) => {
  const isMe = sender.isMe;

  return (
    <div className={cn(
      "flex w-full px-3 mb-0.5",
      isMe ? "justify-end" : "justify-start"
    )}>
      {!isMe && (
        <div className="w-7 h-7 flex-shrink-0 self-end mr-2">
           {isLast && sender.avatar && <img src={sender.avatar} className="w-full h-full rounded-full object-cover" />}
        </div>
      )}
      <div className={cn(
         "max-w-[75%] px-3.5 py-2 rounded-[22px] text-[14.5px] leading-[1.4] tracking-tight",
         isMe ? "bg-[#3797f0] text-white" : "bg-[#efefef] text-black",
         isMe ? (isLast ? "rounded-br-sm" : "") : (isLast ? "rounded-bl-sm" : "")
      )}>
         {message.type === 'image' && message.attachmentUrl && (
           <div className="mb-1.5 -mx-3.5 -mt-2 rounded-t-[22px] overflow-hidden border-b border-black/5 bg-neutral-100 dark:bg-neutral-800">
              <img src={message.attachmentUrl} alt="Instagram attachment" className="w-full h-auto max-h-[400px] object-contain" />
           </div>
         )}
         <p className="whitespace-pre-wrap break-words font-normal">{message.text}</p>
      </div>
    </div>
  );
};
