'use client';

import React from 'react';
import { Participant, Message, ReplicationMode, Post } from '@/lib/types';
import { SidebarHeader } from './sidebar-sections/sidebar-header';
import { SidebarCompose } from './sidebar-sections/sidebar-compose';
import { SidebarPostCompose } from './sidebar-sections/sidebar-post-compose';

interface SidebarProps {
  participants: Participant[];
  messages: Message[];
  onAddMessage: (text: string, senderId: string, timestamp?: string) => void;
  mode: ReplicationMode;
  onModeChange: (mode: ReplicationMode) => void;
  post: Post;
  onUpdatePost: (post: Post) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  participants,
  messages,
  onAddMessage,
  mode,
  onModeChange,
  post,
  onUpdatePost
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
      
      <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-900">
        <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-2 block">Replication Mode</label>
        <div className="flex bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1">
          {(['chat', 'post'] as const).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                mode === m 
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm' 
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {mode === 'chat' ? (
          <SidebarCompose 
            participants={participants}
            onAddMessage={onAddMessage}
            selectedSender={selectedSender}
            setSelectedSender={setSelectedSender}
          />
        ) : (
          <SidebarPostCompose 
            participants={participants}
            post={post}
            onUpdatePost={onUpdatePost}
          />
        )}
        
        <div className="mt-8 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
           <p className="font-semibold mb-1 text-neutral-700 dark:text-neutral-300">💡 Pro Tip</p>
           {mode === 'chat' 
            ? "Use the Right Sidebar to manage users, settings, and reorder messages!"
            : "Use the Right Sidebar to edit engagement metrics like likes and views!"}
        </div>
      </div>
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-900 text-[10px] text-neutral-400 text-center">
        Press ⌘+Enter to send
      </div>
    </div>
  );
};


