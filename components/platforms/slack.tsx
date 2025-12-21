import React from 'react';
import { HelpCircle, Plus, Bold, Italic, Strikethrough, Code, Link as LinkIcon, List, ListOrdered, ChevronDown, Video, Phone, UserPlus } from 'lucide-react';
import { PlatformLayoutProps, PlatformMessageProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const SlackHeader: React.FC<PlatformLayoutProps> = ({ config, participants }) => {
  const otherUser = participants.find(p => !p.isMe) || participants[0];
  return (
    <div className="flex flex-col border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            {otherUser.avatar && <img src={otherUser.avatar} className="w-full h-full object-cover" />}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-black text-[15px]">{otherUser.name}</span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </div>
            <span className="text-[11px] text-neutral-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Active
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-neutral-500">
           <Video className="w-4 h-4" />
           <Phone className="w-4 h-4" />
           <UserPlus className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export const SlackFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
  return (
    <div className="px-4 py-3 bg-white dark:bg-black">
      <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden flex flex-col">
        <div className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3 text-neutral-500">
           <Bold className="w-4 h-4" />
           <Italic className="w-4 h-4" />
           <Strikethrough className="w-4 h-4" />
           <div className="w-px h-3 bg-neutral-300 dark:bg-neutral-700" />
           <LinkIcon className="w-4 h-4" />
           <div className="w-px h-3 bg-neutral-300 dark:bg-neutral-700" />
           <List className="w-4 h-4" />
           <ListOrdered className="w-4 h-4" />
           <div className="w-px h-3 bg-neutral-300 dark:bg-neutral-700" />
           <Code className="w-4 h-4" />
        </div>
        <div className="px-3 py-2 min-h-[44px] text-[15px] text-neutral-400">
          Jot something down...
        </div>
        <div className="px-2 py-1 flex items-center justify-between text-neutral-500">
           <div className="flex items-center gap-2">
             <Plus className="w-4 h-4" />
             <div className="w-px h-3 bg-neutral-300 dark:bg-neutral-700" />
             <HelpCircle className="w-4 h-4" />
           </div>
           <div className="p-1 px-3 bg-neutral-100 dark:bg-neutral-800 rounded text-[12px] font-bold opacity-50">
             Send
           </div>
        </div>
      </div>
    </div>
  );
};
export const SlackMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst }) => {
   return (
     <div className={cn(
       "flex w-full px-4 gap-3 group hover:bg-neutral-50 dark:hover:bg-neutral-900",
       isFirst ? "mt-4" : "mt-1"
     )}>
       <div className="w-9 h-9 flex-shrink-0 mt-0.5">
         {isFirst ? (
            <div className="w-full h-full rounded-[4px] bg-neutral-200 dark:bg-neutral-800 overflow-hidden shadow-sm">
               {sender.avatar && <img src={sender.avatar} className="w-full h-full object-cover" />}
            </div>
         ) : (
            <div className="w-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-[10px] text-neutral-400">
               {message.timestamp.split(' ').pop()}
            </div>
         )}
       </div>
       <div className="flex-1 flex flex-col gap-0.5 min-w-0">
          {isFirst && (
             <div className="flex items-baseline gap-2">
                <span className="font-black text-[15px] hover:underline cursor-pointer leading-none">{sender.name}</span>
                <span className="text-[12px] text-neutral-500 leading-none">{message.timestamp}</span>
             </div>
          )}
          <div className="text-[15px] text-neutral-800 dark:text-neutral-200 leading-[1.46] tracking-tight">
             {message.type === 'image' && message.attachmentUrl && (
               <div className="my-2 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden max-w-[360px] shadow-sm">
                  <img src={message.attachmentUrl} alt="Slack Attachment" className="w-full h-auto max-h-[500px] object-contain" />
               </div>
             )}
             <p className="whitespace-pre-wrap break-words font-normal">{message.text}</p>
          </div>
       </div>
     </div>
   );
};
