import React from 'react';
import { Plus, Camera, Mic } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const GenericHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="px-3 py-2 flex items-center gap-3 backdrop-blur-md border-b border-white/10"
         style={{ backgroundColor: config.headerColor, color: config.textColorRecipient }}>
      <div className="w-7 h-7 rounded-full bg-neutral-300 overflow-hidden">
         {otherUser.avatar && <img src={otherUser.avatar} alt="Avatar" className="w-full h-full object-cover" />}
      </div>
      <div>
        <p className="text-[13px] font-bold">{otherUser.name}</p>
        <p className="text-[10px] opacity-80">Online</p>
      </div>
    </div>
  );
};

export const GenericFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
  return (
    <div className="px-3 py-2 bg-white/50 backdrop-blur border-t border-black/5 flex items-center gap-2">
       <Plus className="w-5 h-5 opacity-30" />
       <div className="flex-1 h-8 bg-black/5 rounded-full" />
       <Camera className="w-5 h-5 opacity-30" />
       <Mic className="w-5 h-5 opacity-30" />
    </div>
  );
};

export const GenericMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst, isLast, config }) => {
  const isMe = sender.isMe;

  return (
    <div className={cn(
      "flex w-full px-3 mb-1",
      isMe ? "justify-end" : "justify-start"
    )}>
      <div 
        className={cn(
          "max-w-[75%] px-3 py-2 rounded-2xl shadow-sm",
          isMe ? "rounded-br-none" : "rounded-bl-none"
        )}
        style={{ 
          backgroundColor: isMe ? config.bubbleColorSender : config.bubbleColorRecipient,
          color: isMe ? config.textColorSender : config.textColorRecipient
        }}
      >
        {message.type === 'image' && message.attachmentUrl && (
          <div className="mb-2 rounded-lg overflow-hidden border border-black/5">
             <img src={message.attachmentUrl} alt="Attached" className="max-w-full h-auto" />
          </div>
        )}
        <p className="text-[14px] whitespace-pre-wrap break-words leading-tight">{message.text}</p>
        <div className="mt-1 flex justify-end">
           <span className="text-[9px] opacity-70">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
};
