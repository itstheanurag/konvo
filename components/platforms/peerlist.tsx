import React from 'react';
import { ChevronLeft, Info, Send, Image as ImageIcon, Briefcase, Globe, MoreHorizontal } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const PeerlistHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-4 py-3 flex items-center justify-between bg-white border-b border-neutral-100 z-20">
       <div className="flex items-center gap-3">
          <div className="relative">
             <div className="w-9 h-9 rounded-full bg-neutral-100 overflow-hidden border border-neutral-200">
                {otherUser.avatar && <img src={otherUser.avatar} className="w-full h-full object-cover" />}
             </div>
             <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00aa45] border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col">
             <div className="flex items-center gap-1">
                <span className="font-bold text-[14px] text-neutral-900 leading-tight">{otherUser.name}</span>
             </div>
             <span className="text-[11px] text-neutral-500 leading-tight">Software Engineer • @{otherUser.username}</span>
          </div>
       </div>
       <Info className="w-5 h-5 text-neutral-400" />
    </div>
  );
};

export const PeerlistFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
    return (
      <div className="px-4 py-3 bg-white border-t border-neutral-100 flex items-center gap-3">
         <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Write a message..." 
              className="bg-transparent flex-1 text-sm outline-none placeholder:text-neutral-400 text-neutral-900" 
              disabled
            />
            <ImageIcon className="w-4 h-4 text-neutral-400 cursor-pointer hover:text-neutral-600" />
         </div>
         <button className="p-2 bg-[#00aa45] text-white rounded-lg shadow-sm hover:bg-[#00993e] transition-colors">
            <Send className="w-4 h-4" />
         </button>
      </div>
    );
};

export const PeerlistMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst }) => {
   return (
     <div className={cn(
       "flex w-full px-4 gap-2.5 group hover:bg-neutral-50",
       isFirst ? "mt-4" : "mt-1"
     )}>
        <div className="size-8 flex-shrink-0">
           {isFirst && (
              <div className="w-full h-full rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden">
                 {sender.avatar && <img src={sender.avatar} className="w-full h-full object-cover" />}
              </div>
           )}
        </div>
        <div className="flex-1 min-w-0">
           {isFirst && (
              <div className="flex items-baseline gap-2">
                 <span className="font-bold text-[14px] text-neutral-900">{sender.name}</span>
                 <span className="text-[11px] text-neutral-400">{message.timestamp}</span>
              </div>
           )}
           <div className="text-[14.5px] leading-[1.5] text-neutral-800 tracking-tight font-normal">
              {message.type === 'image' && message.attachmentUrl && (
                 <div className="my-2 rounded-xl border border-neutral-200 overflow-hidden max-w-[85%] shadow-sm">
                    <img src={message.attachmentUrl} alt="Peerlist attachment" className="w-full h-auto max-h-[400px] object-contain" />
                 </div>
              )}
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
           </div>
        </div>
     </div>
   );
};
