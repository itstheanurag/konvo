import React from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
  Camera,
  Plus,
} from "lucide-react";
import { PlatformLayoutProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const RedditHeader: React.FC<PlatformLayoutProps> = ({
  config,
  participants,
}) => {
  const otherUser = participants.find((p) => !p.isMe) || participants[0];
  return (
    <div className="px-4 py-2 flex items-center justify-between bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <ArrowLeft className="w-6 h-6 text-gray-500" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
            {otherUser.avatar ? (
              <img
                src={otherUser.avatar}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-orange-500" /> // Snoo placeholder color
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-black">
              {otherUser.username ? `u/${otherUser.username}` : otherUser.name}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-gray-500">
        <MoreHorizontal className="w-6 h-6" />
      </div>
    </div>
  );
};

export const RedditFooter: React.FC<PlatformLayoutProps> = ({ config }) => {
  return (
    <div className="px-3 py-3 bg-white flex items-center gap-2 border-t border-gray-100">
      <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
        <Plus className="w-6 h-6 text-gray-500" />
      </div>
      <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
        <Camera className="w-6 h-6 text-gray-500" />
      </div>
      <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
        <ImageIcon className="w-6 h-6 text-gray-500" />
      </div>

      <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
        <span className="text-gray-400 text-sm">Message</span>
      </div>

      <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
        <Smile className="w-6 h-6 text-gray-500" />
      </div>
    </div>
  );
};
