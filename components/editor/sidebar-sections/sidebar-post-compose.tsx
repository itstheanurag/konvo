'use client';

import React from 'react';
import { Layout, Image as ImageIcon } from 'lucide-react';
import { Label, Select, Input, SectionHeader } from '@/components/ui/design-system';
import { Participant, Post } from '@/lib/types';

interface SidebarPostComposeProps {
  participants: Participant[];
  post: Post;
  onUpdatePost: (post: Post) => void;
}

export const SidebarPostCompose: React.FC<SidebarPostComposeProps> = ({
  participants,
  post,
  onUpdatePost,
}) => {
  const handleContentChange = (content: string) => {
    onUpdatePost({ ...post, content });
  };

  const handleAuthorChange = (authorId: string) => {
    onUpdatePost({ ...post, authorId });
  };

  const handleTimestampChange = (timestamp: string) => {
    onUpdatePost({ ...post, timestamp });
  };

  const handleImageChange = (url: string) => {
    onUpdatePost({ ...post, images: url ? [url] : [] });
  };

  return (
    <section>
      <SectionHeader icon={Layout} title="Post Content" />
      <div className="space-y-4">
        <div>
          <Label>Author</Label>
          <Select 
            value={post.authorId}
            onChange={handleAuthorChange}
            options={participants.map(p => ({ label: p.name, value: p.id }))}
          />
        </div>

        <div>
          <Label>Timestamp (e.g. 2h, Oct 24)</Label>
          <Input 
            value={post.timestamp}
            onChange={(e) => handleTimestampChange(e.target.value)}
            placeholder="2h"
          />
        </div>

        <div>
          <Label>Image URL (Optional)</Label>
          <div className="relative">
            <Input 
              value={post.images?.[0] || ''}
              onChange={(e) => handleImageChange(e.target.value)}
              placeholder="https://example.com/image.png"
              className="pl-8"
            />
            <ImageIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          </div>
        </div>

        <div>
          <Label>Content</Label>
          <textarea 
            value={post.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full flex min-h-[120px] rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:bg-neutral-900/50 resize-y"
            placeholder="What's happening?"
          />
        </div>
      </div>
    </section>
  );
};
