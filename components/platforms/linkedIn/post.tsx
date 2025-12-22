'use client';

import React from 'react';
import { Post, Participant, PlatformConfig } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ThumbsUp, MessageSquare, Repeat2, Send, MoreHorizontal, Globe, Heart } from 'lucide-react';

interface LinkedInPostProps {
  post: Post;
  author: Participant;
  config: PlatformConfig;
}

export const LinkedInPost: React.FC<LinkedInPostProps> = ({ post, author, config }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#1d2226] text-black dark:text-white font-sans text-[14px] shadow-sm">
      {/* Header */}
      <div className="flex p-3 gap-2">
        <div className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0">
          <img src={author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.name}`} alt={author.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm hover:text-blue-600 hover:underline cursor-pointer truncate">{author.name}</span>
            <MoreHorizontal className="w-5 h-5 text-neutral-500" />
          </div>
          <span className="text-[12px] text-neutral-500 truncate">Software Engineer @ OpenSource</span>
          <div className="flex items-center gap-1 text-[12px] text-neutral-500">
            <span>{post.timestamp}</span>
            <span>•</span>
            <Globe className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 pb-3 pt-1 whitespace-pre-wrap break-words leading-normal">
        {post.content}
      </div>

      {/* Metrics */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 text-[12px] text-neutral-500">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white dark:border-[#1d2226]">
              <ThumbsUp className="w-2.5 h-2.5 text-white fill-current" />
            </div>
            <div className="w-4 h-4 rounded-full bg-red-400 flex items-center justify-center border border-white dark:border-[#1d2226]">
              <Heart className="w-2.5 h-2.5 text-white fill-current" />
            </div>
          </div>
          <span>{formatNumber(post.engagements.likes)}</span>
        </div>
        <div className="flex gap-2">
          {post.engagements.comments > 0 && <span>{formatNumber(post.engagements.comments)} comments</span>}
          {post.engagements.reposts && post.engagements.reposts > 0 && <span>{formatNumber(post.engagements.reposts)} reposts</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-around items-center py-1 px-2">
        <button className={cn(
          "flex items-center gap-1.5 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors font-semibold text-sm",
          post.isLiked ? "text-blue-600 dark:text-blue-400" : "text-neutral-500"
        )}>
          <ThumbsUp className={cn("w-5 h-5", post.isLiked && "fill-current")} />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-1.5 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors text-neutral-500 font-semibold text-sm">
          <MessageSquare className="w-5 h-5" />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-1.5 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors text-neutral-500 font-semibold text-sm">
          <Repeat2 className="w-5 h-5" />
          <span>Repost</span>
        </button>
        <button className="flex items-center gap-1.5 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors text-neutral-500 font-semibold text-sm">
          <Send className="w-5 h-5" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
