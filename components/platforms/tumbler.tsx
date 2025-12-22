import React from 'react';
import { Search, Home, Mail, Compass, User, Pencil, Heart, Repeat, Send, MoreHorizontal, Share } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

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

export const TumblrMessage: React.FC<PlatformMessageProps> = ({ message, sender }) => {
  return (
    <div className="px-3 py-2 border-b border-[#ffffff1a] bg-[#001935] text-white">
       <div className="flex gap-3 mb-2">
          <div className="w-8 h-8 rounded-sm bg-neutral-300 overflow-hidden">
             {sender.avatar && <img src={sender.avatar} className="w-full h-full object-cover" />}
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-[13px]">{sender.username || sender.name}</span>
             <span className="text-[11px] opacity-60">Reblogged from user</span>
          </div>
       </div>
       <div className="text-[14.5px] leading-[1.4] font-normal">
           {message.type === 'image' && message.attachmentUrl && (
             <div className="mb-3 -mx-3 -mt-2 border-b border-[#ffffff1a] overflow-hidden">
                <img src={message.attachmentUrl} alt="Tumblr Attachment" className="w-full h-auto max-h-[500px] object-contain" />
             </div>
           )}
           {message.type === 'video' && message.attachmentUrl && (
             <div className="mb-3 -mx-3 -mt-2 border-b border-[#ffffff1a] overflow-hidden bg-black/20 flex items-center justify-center">
                <video src={message.attachmentUrl} controls className="w-full h-auto max-h-[500px]" />
             </div>
           )}
          <div className="px-1">
             <p className="whitespace-pre-wrap break-words">{message.text}</p>
          </div>
       </div>
       <div className="flex items-center justify-between mt-3 text-white/50">
          <Share className="w-4.5 h-4.5" />
          <div className="flex items-center gap-4">
             <Repeat className="w-4.5 h-4.5" />
             <Heart className="w-4.5 h-4.5 hover:text-red-500 transition-colors" />
          </div>
       </div>
    </div>
  );
};
