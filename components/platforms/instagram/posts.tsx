'use client';

import React from 'react';
import { Post, Participant, PlatformConfig } from '@/lib/types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

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
          <span className="font-semibold text-[13px]">{author.username || author.name.toLowerCase()}</span>
        </div>
        <MoreHorizontal className="w-5 h-5" />
      </div>

      {/* Main Image (Placeholder/Post Image) */}
      <div className="aspect-square bg-neutral-100 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800 flex items-center justify-center overflow-hidden">
        {post.images && post.images.length > 0 ? (
          <img src={post.images[0]} alt="Post content" className="w-full h-full object-cover" />
        ) : (
          <div className="text-neutral-400 text-center p-4">
             <Heart className="w-12 h-12 mx-auto mb-2 opacity-10" />
             <p className="text-xs">No image attached</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <Heart className="w-6 h-6 hover:text-red-500 transition-colors cursor-pointer" />
          <MessageCircle className="w-6 h-6 hover:opacity-50 transition-opacity cursor-pointer" />
          <Send className="w-6 h-6 hover:opacity-50 transition-opacity cursor-pointer" />
        </div>
        <Bookmark className="w-6 h-6 hover:opacity-50 transition-opacity cursor-pointer" />
      </div>

      {/* Content */}
      <div className="px-3 pb-3 space-y-1">
        <div className="font-semibold">{formatNumber(post.engagements.likes)} likes</div>
        <div>
          <span className="font-semibold mr-2">{author.username || author.name.toLowerCase()}</span>
          <span className="whitespace-pre-wrap">{post.content}</span>
        </div>
        {post.engagements.comments > 0 && (
          <div className="text-neutral-500 cursor-pointer">View all {formatNumber(post.engagements.comments)} comments</div>
        )}
        <div className="text-neutral-400 text-[10px] uppercase mt-1 tracking-tight">
          {post.timestamp} ago
        </div>
      </div>
    </div>
  );
};
