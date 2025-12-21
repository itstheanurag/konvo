import React from 'react';
import { ChevronLeft, MoreHorizontal, Video, ShieldCheck, Heart } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const HingeHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-3 flex items-center justify-between bg-white border-b border-neutral-100 z-20">
       <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-6 h-6 text-neutral-900" />
       </button>
       <span className="font-serif font-bold text-lg text-neutral-800">{otherUser.name}</span>
       <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors">
          <ShieldCheck className="w-5 h-5 text-neutral-400" />
       </button>
    </div>
  );
};

export const HingeFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
    return (
      <div className="px-3 py-3 bg-white border-t border-neutral-100 flex items-center gap-2">
         <div className="flex-1 bg-neutral-100 rounded-full px-4 py-2.5 flex items-center">
            <span className="text-neutral-400 text-sm font-serif">Send a message...</span>
         </div>
         <div className="p-2 text-neutral-400 hover:text-neutral-600 cursor-pointer">
            <span className="text-xs font-bold font-serif opacity-50">Send</span>
         </div>
      </div>
    );
};

export const HingeMessage: React.FC<PlatformMessageProps> = ({ message, sender }) => {
   const isMe = sender.isMe;

   return (
     <div className={cn(
       "flex w-full px-4 mb-2",
       isMe ? "justify-end" : "justify-start"
     )}>
        <div className={cn(
           "relative max-w-[80%] px-4 py-3 rounded-[20px] font-serif text-[16px] leading-[1.3] shadow-sm",
           isMe ? "bg-[#333] text-white" : "bg-white border border-neutral-200 text-neutral-900"
        )}>
           {message.type === 'image' && message.attachmentUrl && (
             <div className="mb-2.5 -mx-4 -mt-3 rounded-t-[20px] overflow-hidden">
                <img src={message.attachmentUrl} alt="Hinge attachment" className="w-full h-auto max-h-[400px] object-contain" />
             </div>
           )}
           <p className="whitespace-pre-wrap break-words font-medium">{message.text}</p>
           {isMe && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-neutral-100">
                 <Heart className="w-2.5 h-2.5 text-[#ff3b5c] fill-[#ff3b5c]" />
              </div>
           )}
        </div>
     </div>
   );
};
