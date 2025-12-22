'use client';

import React from 'react';
import { Post, Participant, PlatformConfig } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ThumbsUp, MessageSquare, Megaphone, Bookmark, MoreHorizontal } from 'lucide-react';

interface PeerlistPostProps {
  post: Post;
  author: Participant;
  config: PlatformConfig;
}

export const PeerlistPost: React.FC<PeerlistPostProps> = ({ post, author, config }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#0d1117] text-black dark:text-gray-200 font-sans text-[14px] border-b border-neutral-100 dark:border-gray-800">
      {/* Header */}
      <div className="flex p-4 gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-100 dark:border-gray-800 bg-neutral-100 dark:bg-gray-800">
            <img src={author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.name}`} alt={author.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00aa45] border-2 border-white dark:border-[#0d1117] rounded-full"></div>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-[14px] leading-tight hover:text-[#00aa45] cursor-pointer">{author.name}</span>
              <span className="text-[12px] text-neutral-500 dark:text-gray-400 font-medium leading-tight">Software Engineer • @{author.username || author.name.toLowerCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-neutral-400">{post.timestamp}</span>
              <MoreHorizontal className="w-5 h-5 text-neutral-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3 whitespace-pre-wrap break-words leading-[1.6] text-[15px] dark:text-gray-300">
        {post.content}
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="px-4 pb-4">
          <div className="rounded-xl overflow-hidden border border-neutral-100 dark:border-gray-800">
            {post.images.map((img, i) => (
              <img key={i} src={img} alt="Post content" className="w-full h-auto max-h-[500px] object-contain bg-neutral-50 dark:bg-gray-900" />
            ))}
          </div>
        </div>
      )}

      {/* Metrics & Actions */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-neutral-50 dark:border-gray-800/50">
        <div className="flex items-center gap-6">
          <button className={cn(
            "flex items-center gap-1.5 transition-colors group",
            post.isLiked ? "text-[#00aa45]" : "text-neutral-600 dark:text-gray-400 hover:text-[#00aa45]"
          )}>
            <div className={cn(
              "p-1.5 rounded-full",
              post.isLiked ? "bg-[#00aa45]/10" : "group-hover:bg-[#00aa45]/10"
            )}>
              <ThumbsUp className={cn("w-4 h-4", post.isLiked && "fill-current")} />
            </div>
            <span className="text-[13px] font-medium">{formatNumber(post.engagements.likes)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-neutral-600 dark:text-gray-400 hover:text-[#00aa45] transition-colors group">
            <div className="p-1.5 rounded-full group-hover:bg-[#00aa45]/10">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-medium">{formatNumber(post.engagements.comments)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-neutral-600 dark:text-gray-400 hover:text-[#00aa45] transition-colors group">
            <div className="p-1.5 rounded-full group-hover:bg-[#00aa45]/10">
              <Megaphone className="w-4 h-4" />
            </div>
          </button>
        </div>
        <button className="p-1.5 rounded-full text-neutral-400 hover:text-[#00aa45] hover:bg-[#00aa45]/10 transition-all">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
