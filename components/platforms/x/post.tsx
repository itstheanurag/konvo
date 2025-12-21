'use client';

import React from 'react';
import { Post, Participant, PlatformConfig } from '@/lib/types';
import { MessageCircle, Heart, Repeat2, Share, MoreHorizontal, BarChart2 } from 'lucide-react';

interface XPostProps {
  post: Post;
  author: Participant;
  config: PlatformConfig;
}

export const XPost: React.FC<XPostProps> = ({ post, author, config }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="w-full flex flex-col bg-black text-white p-4 font-sans text-[15px]">
      {/* Header */}
      <div className="flex gap-3 mb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img src={author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.name}`} alt={author.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold leading-tight">{author.name}</span>
              <span className="text-neutral-500 leading-tight">@{author.username || author.name.toLowerCase()}</span>
            </div>
            <MoreHorizontal className="w-5 h-5 text-neutral-500" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3 whitespace-pre-wrap break-words leading-normal">
        {post.content}
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-3 rounded-2xl overflow-hidden border border-neutral-800">
           {post.images.map((img, i) => (
             <img key={i} src={img} alt="Post content" className="w-full h-auto" />
           ))}
        </div>
      )}

      {/* Timestamp & Metrics */}
      <div className="py-3 border-b border-neutral-800 text-neutral-500 text-[14px]">
        {post.timestamp} · <span className="text-white font-bold">{formatNumber(post.engagements.views || 0)}</span> Views
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center py-1 mt-1 text-neutral-500">
        <div className="flex items-center gap-1 group cursor-pointer hover:text-sky-500 transition-colors">
          <div className="p-2 rounded-full group-hover:bg-sky-500/10">
            <MessageCircle className="w-[18px] h-[18px]" />
          </div>
          <span className="text-[13px]">{formatNumber(post.engagements.comments)}</span>
        </div>
        <div className="flex items-center gap-1 group cursor-pointer hover:text-green-500 transition-colors">
          <div className="p-2 rounded-full group-hover:bg-green-500/10">
            <Repeat2 className="w-[18px] h-[18px]" />
          </div>
          <span className="text-[13px]">{formatNumber(post.engagements.reposts || 0)}</span>
        </div>
        <div className="flex items-center gap-1 group cursor-pointer hover:text-pink-500 transition-colors">
          <div className="p-2 rounded-full group-hover:bg-pink-500/10">
            <Heart className="w-[18px] h-[18px]" />
          </div>
          <span className="text-[13px]">{formatNumber(post.engagements.likes)}</span>
        </div>
        <div className="flex items-center gap-1 group cursor-pointer hover:text-sky-500 transition-colors">
          <div className="p-2 rounded-full group-hover:bg-sky-500/10">
            <Share className="w-[18px] h-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
