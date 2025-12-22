'use client';

import React from 'react';
import { PlatformType, Message, Participant, ReplicationMode, Post } from '@/lib/types';
import { SidebarConfiguration } from './sidebar-sections/sidebar-configuration';
import { SidebarParticipants } from './sidebar-sections/sidebar-participants';
import { SidebarTimeline } from './sidebar-sections/sidebar-timeline';
import { Download, SlidersHorizontal, History } from 'lucide-react';
import { Button } from '@/components/ui/design-system';
import { SidebarEngagements } from './sidebar-sections/sidebar-engagements';

interface RightSidebarProps {
  currentPlatform: PlatformType;
  onPlatformChange: (p: PlatformType) => void;
  participants: Participant[];
  onAddParticipant: (p: Participant) => void;
  onUpdateParticipant: (p: Participant) => void;
  onRemoveParticipant: (id: string) => void;
  messages: Message[];
  onRemoveMessage: (id: string) => void;
  onReorderMessages: (newOrder: Message[]) => void;
  onExport: () => void;
  mode: ReplicationMode;
  post: Post;
  onUpdatePost: (post: Post) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  currentPlatform,
  onPlatformChange,
  participants,
  onAddParticipant,
  onUpdateParticipant,
  onRemoveParticipant,
  messages,
  onRemoveMessage,
  onReorderMessages,
  onExport,
  mode,
  post,
  onUpdatePost
}) => {
  const [activeTab, setActiveTab] = React.useState<'config' | 'history'>('config');

  return (
    <div className="w-80 h-screen flex flex-col bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 z-40 relative shadow-xl">
       <div className="p-4 border-b border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
          <span className="font-semibold text-sm">Settings</span>
          <div className="flex bg-neutral-100 dark:bg-neutral-900 rounded-lg p-0.5">
             <button 
               onClick={() => setActiveTab('config')}
               className={`p-1.5 rounded-md transition-all ${activeTab === 'config' ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'}`}
             >
                <SlidersHorizontal className="w-4 h-4" />
             </button>
             <button 
               onClick={() => setActiveTab('history')}
               className={`p-1.5 rounded-md transition-all ${activeTab === 'history' ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'}`}
             >
                <History className="w-4 h-4" />
             </button>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
          {activeTab === 'config' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <SidebarConfiguration 
                  currentPlatform={currentPlatform}
                  onPlatformChange={onPlatformChange}
                  mode={mode}
               />

               {mode === 'post' && (
                 <SidebarEngagements 
                   post={post}
                   onUpdatePost={onUpdatePost}
                 />
               )}

               <SidebarParticipants 
                  participants={participants}
                  onAddParticipant={onAddParticipant}
                  onUpdateParticipant={onUpdateParticipant}
                  onRemoveParticipant={onRemoveParticipant}
               />
               
               <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900">
                  <Button onClick={onExport} className="w-full">
                     <Download className="w-4 h-4 mr-2" /> Export Image
                  </Button>
               </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="h-full flex flex-col animate-in fade-in duration-300">
               {mode === 'chat' ? (
                 <SidebarTimeline 
                    messages={messages}
                    participants={participants}
                    onRemoveMessage={onRemoveMessage}
                    onReorderMessages={onReorderMessages}
                 />
               ) : (
                 <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-50 p-8">
                    <History className="w-8 h-8 text-neutral-300" />
                    <p className="text-sm font-medium">No History for Posts</p>
                    <p className="text-xs">Post replication is currently single-instance.</p>
                 </div>
               )}
            </div>
          )}
       </div>
    </div>
  );
};
