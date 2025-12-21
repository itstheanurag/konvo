import React from 'react';
import { ArrowLeft, Phone, MoreVertical, Smile, Paperclip, Mic, Send } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const TelegramHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-2 py-1.5 flex items-center gap-2 bg-[#517da2] text-white">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <ArrowLeft className="w-6 h-6" />
        <div className="w-9 h-9 rounded-full bg-neutral-300 overflow-hidden flex-shrink-0">
          {otherUser.avatar && <img src={otherUser.avatar} className="w-full h-full object-cover" />}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-[16px] leading-tight truncate">{otherUser.name}</span>
          <span className="text-[12px] opacity-80 truncate">online</span>
        </div>
      </div>
      <div className="flex items-center gap-5 mr-2">
        <Phone className="w-5 h-5 fill-white/10" />
        <MoreVertical className="w-5 h-5" />
      </div>
    </div>
  );
};

export const TelegramFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
  return (
    <div className="px-2 py-2 flex items-end gap-2 bg-transparent absolute bottom-0 left-0 right-0">
      <div className="flex-1 bg-white dark:bg-[#1c242f] rounded-xl flex items-center px-3 py-2 min-h-[46px] gap-3 shadow-md">
        <Smile className="w-6 h-6 text-neutral-400 dark:text-neutral-500 cursor-pointer" />
        <span className="text-neutral-400 dark:text-neutral-500 text-[16px] flex-1">Message</span>
        <Paperclip className="w-6 h-6 text-neutral-400 dark:text-neutral-500 -rotate-45" />
      </div>
      <div className="w-12 h-12 rounded-full bg-[#517da2] flex items-center justify-center shadow-md flex-shrink-0 mb-0.5">
        <Mic className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export const TelegramMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst, isLast }) => {
  const isMe = sender.isMe;

  return (
    <div className={cn(
      "flex w-full px-2 mb-1",
      isMe ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
         "relative max-w-[85%] px-3 py-1.5 shadow-sm min-w-[80px]",
         isMe ? "bg-[#effdde] rounded-[18px] rounded-br-none" : "bg-white rounded-[18px] rounded-bl-none",
      )}>
         <div className="flex flex-col gap-0.5">
            {message.type === 'image' && message.attachmentUrl && (
              <div className="mb-1.5 -mx-3 -mt-1.5 rounded-t-[18px] overflow-hidden">
                 <img src={message.attachmentUrl} alt="Telegram attachment" className="w-full h-auto object-contain max-h-[400px]" />
              </div>
            )}
            <p className="text-[15px] leading-[1.35] text-neutral-900 whitespace-pre-wrap break-words font-normal">{message.text}</p>
            <div className="flex items-center justify-end gap-1 -mt-0.5 h-4 self-end">
               <span className="text-[10px] text-[#7195ba] font-medium">{message.timestamp.split(' ').pop()}</span>
               {isMe && (
                  <div className="text-[#64b5ef]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                       <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};
