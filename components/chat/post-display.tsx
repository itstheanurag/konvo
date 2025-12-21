'use client';

import React from 'react';
import { Post, Participant, PlatformConfig } from '@/lib/types';
import { ChatContainer } from './chat-container';
import { PlatformTheme } from './platform-theme';
import { XPost } from '../platforms/x/post';
import { InstagramPost } from '../platforms/instagram/posts';
import { LinkedInPost } from '../platforms/linkedIn/post';


interface PostDisplayProps {
  post: Post;
  participants: Participant[];
  platformConfig: PlatformConfig;
  view: 'phone' | 'desktop';
}

export const PostDisplay: React.FC<PostDisplayProps> = ({ 
  post, 
  participants, 
  platformConfig, 
  view 
}) => {
  const author = participants.find(p => p.id === post.authorId) || participants[0];

  const renderPost = () => {
    switch (platformConfig.id) {
      case 'x':
        return <XPost post={post} author={author} config={platformConfig} />;
      case 'instagram':
        return <InstagramPost post={post} author={author} config={platformConfig} />;
      case 'linkedin':
        return <LinkedInPost post={post} author={author} config={platformConfig} />;
      default:
        return (
          <div className="p-8 text-center text-neutral-500">
            Posts are not supported for {platformConfig.name} yet.
          </div>
        );
    }
  };

  return (
    <PlatformTheme config={platformConfig}>
      <ChatContainer view={view}>
        <div 
          className="flex flex-col h-full bg-[var(--platform-bg)] overflow-y-auto"
          style={{ backgroundColor: 'var(--platform-bg)' }}
        >
          {renderPost()}
        </div>
      </ChatContainer>
    </PlatformTheme>
  );
};
