import React from 'react';
import { ArrowLeft, Camera, Mic, ChevronLeft, Plus } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const MessagesHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-3 flex items-end justify-between bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-20">
       <div className="flex items-center text-blue-500 relative z-30">
          <ChevronLeft className="w-6 h-6 -ml-2" />
          <span className="text-[15px]">Back</span>
       </div>
       <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 pointer-events-none">
          <div className="w-7 h-7 rounded-full bg-neutral-300 overflow-hidden mb-1">
             {otherUser.avatar && <img src={otherUser.avatar} className="w-full h-full object-cover" />}
          </div>
          <span className="text-[11px] font-medium text-black dark:text-white flex items-center">
             {otherUser.name} <ChevronLeft className="w-3 h-3 rotate-180 opacity-30 ml-0.5" />
          </span>
       </div>
       <div className="w-10" /> {/* Spacer */}
    </div>
  );
};

export const MessagesFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
    return (
      <div className="px-3 py-2 bg-white dark:bg-black border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
         <Plus className="w-5 h-5 text-neutral-400" />
         <div className="flex items-center flex-1">
            <div className="flex-1 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-full px-3 py-1.5 flex items-center justify-between min-h-[32px]">
               <span className="text-neutral-400 text-[13px]">iMessage</span>
               <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <ArrowLeft className="w-2.5 h-2.5 text-white rotate-90" />
               </div>
            </div>
         </div>
         <Camera className="w-5 h-5 text-neutral-400" />
         <Mic className="w-5 h-5 text-neutral-400" />
      </div>
    );
};

export const MessagesMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst, isLast }) => {
  const isMe = sender.isMe;

  return (
    <div className={cn(
      "flex w-full px-3 mb-0.5",
      isMe ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
         "max-w-[70%] px-3.5 py-2.5 rounded-[20px] text-[16px] leading-[1.3] tracking-tight",
         isMe ? "bg-[#007aff] text-white" : "bg-[#e9e9eb] text-black",
         isLast && (isMe ? "rounded-br-[4px]" : "rounded-bl-[4px]")
      )}>
         {message.type === 'image' && message.attachmentUrl && (
            <div className="mb-1.5 -mx-3.5 -mt-2.5 rounded-t-[20px] overflow-hidden border-b border-black/5">
               <img src={message.attachmentUrl} alt="iMessage attachment" className="w-full h-auto max-h-[400px] object-contain" />
            </div>
         )}
         <p className="whitespace-pre-wrap break-words font-normal">{message.text}</p>
      </div>
    </div>
  );
};
