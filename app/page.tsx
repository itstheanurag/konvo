'use client';

import React from 'react';
import { PLATFORMS, PlatformType, Message, Participant, ReplicationMode, Post } from '@/lib/types';
import { Sidebar } from '@/components/editor/sidebar';
import { RightSidebar } from '@/components/editor/right-sidebar';
import { ChatDisplay } from '@/components/chat/chat-display';
import { toPng } from 'html-to-image';
import { PostDisplay } from '@/components/chat/post-display';

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
  const [mode, setMode] = React.useState<ReplicationMode>('chat');
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);
  const [participants, setParticipants] = React.useState<Participant[]>(INITIAL_PARTICIPANTS);

  // Auto-switch platform if it's incompatible with the current mode
  React.useEffect(() => {
    const currentPlatformConfig = PLATFORMS[platform];
    const isCompatible = mode === 'post' ? currentPlatformConfig.supportsPosts : currentPlatformConfig.supportsChat;
    
    if (!isCompatible) {
      // Find the first compatible platform
      const firstCompatible = Object.values(PLATFORMS).find(p => mode === 'post' ? p.supportsPosts : p.supportsChat);
      if (firstCompatible) {
        setPlatform(firstCompatible.id);
      }
    }
  }, [mode, platform]);
  const [post, setPost] = React.useState<Post>({
    id: 'p1',
    authorId: '1',
    content: 'Just launched Konvo! Replicate any chat or post with ease. #buildinpublic #saas',
    timestamp: '2h',
    engagements: {
      likes: 124,
      comments: 12,
      reposts: 5,
      views: 1200,
    }
  });

  const chatRef = React.useRef<HTMLDivElement>(null);

  const handleAddMessage = (text: string, senderId: string, timestamp?: string, type: "text" | "image" | "video" = 'text', attachmentUrl?: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId,
      text,
      timestamp: timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      attachmentUrl,
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

  const handleUpdatePost = (updatedPost: Post) => {
    setPost(updatedPost);
  };

  const handleExport = async () => {
    if (chatRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(chatRef.current, {
        cacheBust: true,
        backgroundColor: 'transparent',
      });
      const link = document.createElement('a');
      link.download = `konvo-${platform}-${mode}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
      alert('Failed to export image. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-black overflow-hidden font-sans text-neutral-900 dark:text-neutral-100">
      
      {/* LEFT SIDEBAR: Composition */}
      <Sidebar 
        participants={participants}
        messages={messages}
        onAddMessage={handleAddMessage}
        mode={mode}
        onModeChange={setMode}
        post={post}
        onUpdatePost={handleUpdatePost}
      />
      
      {/* CENTER: Canvas */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-8 bg-neutral-50 dark:bg-[#09090b] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
        <div ref={chatRef} className="relative z-10 animate-in fade-in zoom-in duration-500">
          {mode === 'chat' ? (
             <ChatDisplay 
               messages={messages}
               participants={participants}
               platformConfig={PLATFORMS[platform]}
               view="phone"
             />
          ) : (
            <PostDisplay 
              post={post}
              participants={participants}
              platformConfig={PLATFORMS[platform]}
              view="phone"
            />
          )}
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
        mode={mode}
        post={post}
        onUpdatePost={handleUpdatePost}
      />

    </div>
  );
}
