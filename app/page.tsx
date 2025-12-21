'use client';

import React from 'react';
import { PLATFORMS, PlatformType, Message, Participant } from '@/lib/types';
import { Sidebar } from '@/components/editor/sidebar';
import { RightSidebar } from '@/components/editor/right-sidebar';
import { ChatDisplay } from '@/components/chat/chat-display';

const INITIAL_PARTICIPANTS: Participant[] = [
  { id: '1', name: 'Gaurav', username: 'gaurav', isMe: true },
  { id: '2', name: 'Alex', username: 'alex_codes', isMe: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
];

const INITIAL_MESSAGES: Message[] = [
  { id: 'm1', senderId: '2', text: 'Hey there! How is the project going?', timestamp: '10:00 AM', type: 'text' },
  { id: 'm2', senderId: '1', text: 'It is going great! Just built the dynamic theme engine.', timestamp: '10:01 AM', type: 'text' },
];

export default function Home() {
  const [platform, setPlatform] = React.useState<PlatformType>('whatsapp');
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);
  const [participants, setParticipants] = React.useState<Participant[]>(INITIAL_PARTICIPANTS);

  const handleAddMessage = (text: string, senderId: string, timestamp?: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId,
      text,
      timestamp: timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };
    setMessages([...messages, newMessage]);
  };

  const handleRemoveMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleAddParticipant = (p: Participant) => {
    setParticipants([...participants, p]);
  };

  const handleUpdateParticipant = (updated: Participant) => {
     setParticipants(participants.map(p => p.id === updated.id ? updated : p));
  };

  const handleRemoveParticipant = (id: string) => {
     setParticipants(participants.filter(p => p.id !== id));
  };

  const handleReorderMessages = (newOrder: Message[]) => {
     setMessages(newOrder);
  };

  const handleExport = () => {
    alert('Export functionality coming soon!');
  };

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-black overflow-hidden font-sans text-neutral-900 dark:text-neutral-100">
      
      {/* LEFT SIDEBAR: Composition */}
      <Sidebar 
        participants={participants}
        messages={messages}
        onAddMessage={handleAddMessage}
      />
      
      {/* CENTER: Canvas */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-8 bg-neutral-50 dark:bg-[#09090b] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="relative z-10 animate-in fade-in zoom-in duration-500">
           <ChatDisplay 
             messages={messages}
             participants={participants}
             platformConfig={PLATFORMS[platform]}
             view="phone"
           />
        </div>
        
        <div className="absolute bottom-6 text-center pointer-events-none opacity-50">
           <p className="text-[10px] text-neutral-400">
              Designed for meme creation. All conversations are locally generated.
           </p>
        </div>
      </main>

      {/* RIGHT SIDEBAR: Management */}
      <RightSidebar 
        currentPlatform={platform}
        onPlatformChange={setPlatform}
        participants={participants}
        onAddParticipant={handleAddParticipant}
        onUpdateParticipant={handleUpdateParticipant}
        onRemoveParticipant={handleRemoveParticipant}
        messages={messages}
        onRemoveMessage={handleRemoveMessage}
        onReorderMessages={handleReorderMessages}
        onExport={handleExport}
      />

    </div>
  );
}
