import React from 'react';
import { ArrowLeft, Video, Phone, MoreVertical, Smile, Image as ImageIcon, Camera, Mic } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

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

export const WhatsAppMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst, isLast }) => {
  const isMe = sender.isMe;
  
  return (
    <div className={cn(
      "flex w-full px-3 mb-1",
      isMe ? "justify-end" : "justify-start",
      isFirst && "mt-2"
    )}>
      <div className={cn(
        "relative max-w-[85%] px-2 py-1.5 shadow-sm min-w-[60px]",
        isMe ? "bg-[#dcf8c6] rounded-l-lg rounded-tr-lg" : "bg-white rounded-r-lg rounded-tl-lg",
        isLast && (isMe ? "rounded-br-none" : "rounded-bl-none")
      )}>
        {/* Simplified Tail */}
        {isLast && (
          <div className={cn(
            "absolute bottom-0 w-2 h-2",
            isMe ? "-right-1 bg-[#dcf8c6] [clip-path:polygon(0_0,0%_100%,100%_100%)]" : "-left-1 bg-white [clip-path:polygon(100%_0,0%_100%,100%_100%)]"
          )} />
        )}

        <div className="flex flex-col gap-0.5">
          {message.type === 'image' && message.attachmentUrl && (
            <div className="mb-1 -mx-1 -mt-1 rounded-t-lg overflow-hidden border-b border-black/5">
               <img src={message.attachmentUrl} alt="Attachment" className="max-w-full h-auto object-contain max-h-[400px]" />
            </div>
          )}
          <p className="text-[14.2px] leading-[1.3] text-neutral-900 whitespace-pre-wrap break-words font-normal">{message.text}</p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="text-[10px] text-neutral-500">{message.timestamp}</span>
            {isMe && (
               <div className="flex text-[#34b7f1]">
                 <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 9.5L1 6L2 5L4.5 7.5L10.5 1.5L11.5 2.5L4.5 9.5Z" fill="currentColor"/>
                    <path d="M9 9.5L5.5 6L6.5 5L9 7.5L15 1.5L16 2.5L9 9.5Z" fill="currentColor"/>
                 </svg>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
