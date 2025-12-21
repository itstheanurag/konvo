'use client';

import React from 'react';
import { Participant, Message } from '@/lib/types';
import { SidebarHeader } from './sidebar-sections/sidebar-header';
import { SidebarCompose } from './sidebar-sections/sidebar-compose';

interface SidebarProps {
  participants: Participant[];
  messages: Message[];
  onAddMessage: (text: string, senderId: string, timestamp?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  participants,
  messages,
  onAddMessage,
}) => {
  const [selectedSender, setSelectedSender] = React.useState(participants[0]?.id);

  // Reset selected sender if they are removed
  React.useEffect(() => {
    if (!participants.find(p => p.id === selectedSender)) {
       setSelectedSender(participants[0]?.id);
    }
  }, [participants, selectedSender]);

  return (
    <div className="w-80 h-screen flex flex-col bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 z-40 relative shadow-xl">
      <SidebarHeader />
      <div className="flex-1 p-4">
        <SidebarCompose 
          participants={participants}
          onAddMessage={onAddMessage}
          selectedSender={selectedSender}
          setSelectedSender={setSelectedSender}
        />
        
        <div className="mt-8 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
           <p className="font-semibold mb-1 text-neutral-700 dark:text-neutral-300">💡 Pro Tip</p>
           Use the Right Sidebar to manage users, settings, and reorder messages!
        </div>
      </div>
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-900 text-[10px] text-neutral-400 text-center">
        Press ⌘+Enter to send
      </div>
    </div>
  );
};


