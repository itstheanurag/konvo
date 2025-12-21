'use client';

import React from 'react';
import { Layers, Trash2, GripVertical } from 'lucide-react';
import { SectionHeader } from '@/components/ui/design-system';
import { Message, Participant } from '@/lib/types';
import { Reorder, AnimatePresence } from 'framer-motion';

interface SidebarTimelineProps {
  messages: Message[];
  participants: Participant[];
  onRemoveMessage: (id: string) => void;
  onReorderMessages: (newOrder: Message[]) => void;
}

export const SidebarTimeline: React.FC<SidebarTimelineProps> = ({
  messages,
  participants,
  onRemoveMessage,
  onReorderMessages,
}) => {
  return (
    <section className="flex-1 flex flex-col min-h-0">
      <SectionHeader icon={Layers} title="Timeline" />
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
         <Reorder.Group axis="y" values={messages} onReorder={onReorderMessages} className="space-y-2">
           {messages.map((m) => {
             const sender = participants.find(p => p.id === m.senderId);
             return (
               <Reorder.Item 
                 key={m.id}
                 value={m}
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="group flex items-center gap-2 p-2 rounded-lg bg-neutral-50/50 dark:bg-neutral-900/30 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all select-none"
               >
                 <div className="cursor-move text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400 p-1">
                   <GripVertical className="w-3.5 h-3.5" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2 mb-0.5">
                     <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300">{sender?.name}</span>
                     <span className="text-[10px] text-neutral-400">{m.timestamp}</span>
                   </div>
                   <p className="text-xs text-neutral-500 truncate">{m.text}</p>
                 </div>
                 <button 
                   onClick={() => onRemoveMessage(m.id)}
                   className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 hover:text-red-500 rounded transition-all"
                 >
                   <Trash2 className="w-3.5 h-3.5" />
                 </button>
               </Reorder.Item>
             );
           })}
         </Reorder.Group>
         {messages.length === 0 && (
           <div className="text-center py-8 text-xs text-neutral-400 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg">
             No messages yet.
           </div>
         )}
      </div>
    </section>
  );
};
