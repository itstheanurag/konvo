'use client';

import React from 'react';
import { BarChart3, ThumbsUp, MessageSquare, Repeat2, Eye } from 'lucide-react';
import { Label, Input, SectionHeader } from '@/components/ui/design-system';
import { Post } from '@/lib/types';

interface SidebarEngagementsProps {
  post: Post;
  onUpdatePost: (post: Post) => void;
}

export const SidebarEngagements: React.FC<SidebarEngagementsProps> = ({
  post,
  onUpdatePost,
}) => {
  const handleEngagementChange = (key: keyof Post['engagements'], value: string) => {
    const numValue = parseInt(value) || 0;
    onUpdatePost({
      ...post,
      engagements: {
        ...post.engagements,
        [key]: numValue,
      },
    });
  };

  return (
    <section>
      <SectionHeader icon={BarChart3} title="Engagements" />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="flex items-center gap-1.5">
            <ThumbsUp className="w-3 h-3" /> Likes
          </Label>
          <Input 
            type="number"
            value={post.engagements.likes}
            onChange={(e) => handleEngagementChange('likes', e.target.value)}
          />
        </div>
        <div>
          <Label className="flex items-center gap-1.5">
            <MessageSquare className="w-3 h-3" /> Comments
          </Label>
          <Input 
            type="number"
            value={post.engagements.comments}
            onChange={(e) => handleEngagementChange('comments', e.target.value)}
          />
        </div>
        <div>
          <Label className="flex items-center gap-1.5">
            <Repeat2 className="w-3 h-3" /> Reposts
          </Label>
          <Input 
            type="number"
            value={post.engagements.reposts || 0}
            onChange={(e) => handleEngagementChange('reposts', e.target.value)}
          />
        </div>
        <div>
          <Label className="flex items-center gap-1.5">
            <Eye className="w-3 h-3" /> Views
          </Label>
          <Input 
            type="number"
            value={post.engagements.views || 0}
            onChange={(e) => handleEngagementChange('views', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
