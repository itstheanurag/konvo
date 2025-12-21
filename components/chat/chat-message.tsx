'use client';

import React from 'react';
import { Message, Participant, PlatformType, PLATFORMS } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  sender: Participant;
  platform: PlatformType;
  isFirst: boolean;
  isLast: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, platform, isFirst, isLast }) => {
  const isMe = sender.isMe;
  const config = PLATFORMS[platform];
  const showUsername = config.showUsernames;
  
  // Logic for avatars: varying by platform
  // Instagram/Messenger: usually show avatar at bottom of group
  // WhatsApp: usually show avatar at top? No, WhatsApp doesn't show avatars in individual chats usually, but let's assume we follow config.
  // Let's stick to: If Avatars enabled, show on LAST message of group (bottom).
  const shouldShowAvatar = !isMe && sender.avatar && config.showAvatars && isLast;

  return (
    <div className={cn(
      "flex w-full px-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
      isMe ? "justify-end" : "justify-start",
      isLast ? "mb-1.5" : "mb-0.5" // Tighter spacing within group
    )}>
      {/* Avatar Slot - Always reserve space if platform uses avatars? Or just conditionally render? */}
      {/* For layout stability, maybe just render invisible if not last? */}
      {!isMe && config.showAvatars && (
        <div className={cn("w-8 h-8 mr-2 flex-shrink-0 self-end", !shouldShowAvatar && "invisible")}>
           {sender.avatar && <img src={sender.avatar} alt={sender.name} className="w-full h-full object-cover rounded-full" />}
        </div>
      )}
      
      <div className={cn(
         "flex flex-col max-w-[75%]",
         isMe ? "items-end" : "items-start",
         platform === 'discord' && "max-w-full w-full items-start"
      )}>
         
         {/* Username: Show only on FIRST message of group */}
         {!isMe && showUsername && platform !== 'discord' && isFirst && (
            <span className="text-[10px] text-neutral-500 mb-1 ml-1">{sender.username ? `@${sender.username}` : sender.name}</span>
         )}

         <div className={cn(
            "px-3 py-2 text-[13px] shadow-sm",
            // Base rounded corners
            "rounded-2xl",
            
            // SENDER (Right side)
            isMe && [
               "bg-[var(--platform-bubble-sender)] text-[var(--platform-text-sender)]",
               // Corner Logic
               // If it's NOT the last message, flatten bottom-right (connect to next)
               !isLast && "rounded-br-sm",
               // If it's NOT the first message, flatten top-right (connect to prev)
               !isFirst && "rounded-tr-sm",
               // If it IS the last, give it the 'tail' feel (sharp corner or specialized shape)
               isLast && "rounded-br-none" 
            ],

            // RECIPIENT (Left side)
            !isMe && [
               "bg-[var(--platform-bubble-recipient)] text-[var(--platform-text-recipient)]",
               // Corner Logic
               !isLast && "rounded-bl-sm",
               !isFirst && "rounded-tl-sm",
               isLast && "rounded-bl-none"
            ],
            
            platform === 'discord' && "rounded-none bg-transparent shadow-none px-0 py-0.5 max-w-full w-full",
         )}>
            {platform === 'discord' && (
               <div className="flex flex-col">
                  {/* Only show header on FIRST message of group */}
                  {isFirst && (
                    <div className="flex items-baseline gap-2 mt-1">
                       <span className="font-bold text-[#f2f3f5] text-[13px] clickable hover:underline">{sender.username || sender.name}</span>
                       <span className="text-[10px] text-neutral-400">{message.timestamp}</span>
                    </div>
                  )}
                  {/* If not first, we should render simpler without header. Maybe show hidden timestamp on hover? */}
                  <span className={cn("text-[#dbdee1] text-[13px] leading-[1.25rem]", !isFirst && "ml-0")}>{message.text}</span>
               </div>
            )}
            
            {platform !== 'discord' && (
            <div className="flex flex-col gap-1">
               <p className="whitespace-pre-wrap break-words">{message.text}</p>
               <span className={cn(
                  "text-[9px] self-end opacity-70",
                  isMe ? "text-[var(--platform-text-sender)]" : "text-[var(--platform-text-recipient)]"
               )}>
                  {message.timestamp}
               </span>
            </div>
            )}
         </div>
      </div>
    </div>
  );
};
