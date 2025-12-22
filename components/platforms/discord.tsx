import React from 'react';
import { PhoneCall, Video as VideoIcon, Search, Plus, Gift, Sticker, Smile, Image } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

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

export const DiscordMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst }) => {
   return (
     <div className={cn(
       "flex w-full px-4 gap-3 group hover:bg-neutral-800/20",
       isFirst ? "mt-4" : "mt-0.5"
     )}>
        <div className="w-10 h-10 flex-shrink-0">
           {isFirst ? (
              <div className="w-full h-full rounded-full bg-neutral-300 overflow-hidden">
                 {sender.avatar && <img src={sender.avatar} className="w-full h-full object-cover" />}
              </div>
           ) : (
              <div className="w-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-[10px] text-neutral-400 mt-2">
                 {message.timestamp.split(':')[0]}
              </div>
           )}
        </div>
        <div className="flex-1 flex flex-col -mt-0.5 min-w-0">
           {isFirst && (
              <div className="flex items-baseline gap-2">
                 <span className="font-medium text-[16px] text-white hover:underline cursor-pointer leading-none">{sender.name}</span>
                 <span className="text-[12px] text-neutral-400 leading-none">{message.timestamp}</span>
              </div>
           )}
           <div className="text-[16px] text-[#dbdee1] leading-[1.375rem] font-normal">
               {message.type === 'image' && message.attachmentUrl && (
                 <div className="my-2 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 max-w-[85%]">
                    <img src={message.attachmentUrl} alt="Discord Attachment" className="w-full h-auto max-h-[500px] object-contain" />
                 </div>
               )}
               {message.type === 'video' && message.attachmentUrl && (
                 <div className="my-2 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 max-w-[85%] flex items-center justify-center">
                    <video src={message.attachmentUrl} controls className="w-full h-auto max-h-[500px]" />
                 </div>
               )}
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
           </div>
        </div>
     </div>
   );
};
