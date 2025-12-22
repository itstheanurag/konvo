'use client';

import React from 'react';
import { Layout, Image as ImageIcon, Upload, Heart, Music, Calendar } from 'lucide-react';
import { Label, Select, Input, SectionHeader, Button } from '@/components/ui/design-system';
import { Participant, Post } from '@/lib/types';
import { cn } from '@/lib/utils';

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
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdatePost({ ...post, images: [reader.result as string] });
      };
      reader.readAsDataURL(file);
    }
  };
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

  const handleLikedChange = (isLiked: boolean) => {
    onUpdatePost({ ...post, isLiked });
  };

  const handleMusicChange = (name: string, artist: string) => {
    onUpdatePost({ 
      ...post, 
      music: (name || artist) ? { name, artist } : undefined 
    });
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
          <Label>Post Timing</Label>
          <div className="relative">
            <Input 
              value={post.timestamp}
              onChange={(e) => handleTimestampChange(e.target.value)}
              placeholder="e.g. 2h, Oct 24, 10:30 AM"
              className="pl-8"
            />
            <Calendar className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          </div>
        </div>

        <div>
          <Label>Image URL (Optional)</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input 
                value={post.images?.[0] || ''}
                onChange={(e) => handleImageChange(e.target.value)}
                placeholder="https://example.com/image.png"
                className="pl-8"
              />
              <ImageIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            </div>
            <Button 
                variant="secondary" 
                className="px-3" 
                onClick={() => fileInputRef.current?.click()}
                title="Upload local image"
            >
                <Upload className="w-4 h-4" />
            </Button>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Heart className={cn("w-4 h-4", post.isLiked ? "fill-red-500 text-red-500" : "text-neutral-400")} />
            <span className="text-sm font-medium">Post is Liked</span>
          </div>
          <input 
            type="checkbox" 
            checked={post.isLiked || false}
            onChange={(e) => handleLikedChange(e.target.checked)}
            className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
          />
        </div>

        <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-1">
            <Music className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Instagram Music</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div>
               <Label>Music Name</Label>
               <Input 
                 value={post.music?.name || ''}
                 onChange={(e) => handleMusicChange(e.target.value, post.music?.artist || '')}
                 placeholder="Song title"
                 className="text-[11px]"
               />
             </div>
             <div>
               <Label>Artist</Label>
               <Input 
                 value={post.music?.artist || ''}
                 onChange={(e) => handleMusicChange(post.music?.name || '', e.target.value)}
                 placeholder="Artist name"
                 className="text-[11px]"
               />
             </div>
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
