'use client';

import React from 'react';
import { Message, Participant, PlatformConfig } from '@/lib/types';
import { PlatformHeader, PlatformFooter, PlatformMessage } from './platform-layouts';
import { ChatContainer } from './chat-container';
import { PlatformTheme } from './platform-theme';

interface ChatDisplayProps {
  messages: Message[];
  participants: Participant[];
  platformConfig: PlatformConfig;
  view: 'phone' | 'desktop';
}

export const ChatDisplay: React.FC<ChatDisplayProps> = ({ 
  messages, 
  participants, 
  platformConfig, 
  view 
}) => {
  const getSender = (id: string) => participants.find(p => p.id === id) || participants[0];

  return (
    <PlatformTheme config={platformConfig}>
      <ChatContainer view={view}>
        <div 
          className="flex flex-col h-full bg-[var(--platform-bg)]"
          style={{ backgroundColor: 'var(--platform-bg)' }}
        >
          {/* Authentic Header */}
          <div className="flex-shrink-0">
             <PlatformHeader 
               platform={platformConfig.id} 
               config={platformConfig}
               participants={participants}
             />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600">
            <div className="flex flex-col">
              {messages.map((msg, index) => {
                const prevMsg = messages[index - 1];
                const nextMsg = messages[index + 1];
                const isFirst = !prevMsg || prevMsg.senderId !== msg.senderId;
                const isLast = !nextMsg || nextMsg.senderId !== msg.senderId;
                
                return (
                  <PlatformMessage 
                    key={msg.id} 
                    message={msg} 
                    sender={getSender(msg.senderId)} 
                    platform={platformConfig.id}
                    config={platformConfig}
                    isFirst={isFirst}
                    isLast={isLast}
                  />
                );
              })}
            </div>
          </div>

          {/* Authentic Footer */}
          <div className="flex-shrink-0">
             <PlatformFooter 
               platform={platformConfig.id} 
               config={platformConfig}
               participants={participants}
             />
          </div>
        </div>
      </ChatContainer>
    </PlatformTheme>
  );
};
