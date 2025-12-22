'use client';

import React from 'react';
import { Post, Participant, PlatformConfig } from '@/lib/types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InstagramPostProps {
  post: Post;
  author: Participant;
  config: PlatformConfig;
}

export const InstagramPost: React.FC<InstagramPostProps> = ({ post, author, config }) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-black text-black dark:text-white font-sans text-[14px]">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
            <div className="w-full h-full rounded-full border-2 border-white dark:border-black overflow-hidden bg-neutral-200">
              <img src={author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.name}`} alt={author.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[13px] leading-tight">{author.username || author.name.toLowerCase()}</span>
            {post.music && (
              <div className="flex items-center gap-1 mt-0.5">
                <Music className="w-2.5 h-2.5 text-neutral-900 dark:text-neutral-100" />
                <span className="text-[11px] font-medium leading-none">
                  {post.music.artist} • {post.music.name}
                </span>
              </div>
            )}
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 flex-shrink-0" />
      </div>

      <div className="w-full bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-100 dark:border-neutral-800 flex items-center justify-center overflow-hidden min-h-[200px]">
        {post.images && post.images.length > 0 ? (
          <img src={post.images[0]} alt="Post content" className="w-full h-auto max-h-[580px] object-contain" />
        ) : (
          <div className="text-neutral-400 text-center p-8">
             <Heart className="w-12 h-12 mx-auto mb-2 opacity-5" />
             <p className="text-[13px] font-medium opacity-20">No image attached</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-3">
          <Heart 
            className={cn(
              "size-5 transition-colors cursor-pointer",
              post.isLiked ? "fill-red-500 text-red-500" : "hover:text-neutral-500"
            )} 
          />
          <MessageCircle className="size-5 hover:text-neutral-500 transition-colors cursor-pointer -scale-x-100" />
          <Send className="size-5 hover:text-neutral-500 transition-colors cursor-pointer -rotate-12" />
        </div>
        <Bookmark className="size-5 hover:text-neutral-500 transition-colors cursor-pointer" />
      </div>

      {/* Content */}
      <div className="px-3 pb-4 space-y-1.5">
        <div className="font-bold text-[14px] leading-tight mb-1">{formatNumber(post.engagements.likes)} likes</div>
        <div className="leading-[1.4]">
          <span className="font-bold text-[14px] mr-2">{author.username || author.name.toLowerCase()}</span>
          <span className="whitespace-pre-wrap text-[14px]">{post.content}</span>
        </div>
        {post.engagements.comments > 0 && (
          <div className="text-neutral-500 text-[14px] pt-1 cursor-pointer">View all {formatNumber(post.engagements.comments)} comments</div>
        )}
        <div className="text-neutral-400 text-[10px] uppercase mt-2 tracking-tight">
          posted {post.timestamp} ago
        </div>
      </div>
    </div>
  );
};
