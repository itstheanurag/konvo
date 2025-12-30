import React from "react";
import { PlatformMessageProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const RedditMessage: React.FC<PlatformMessageProps> = ({
  message,
  sender,
  isFirst,
  isLast,
}) => {
  const isMe = sender.isMe;

  return (
    <div
      className={cn(
        "flex w-full px-4 mb-2", // Reddit generic spacing
        isMe ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar for recipient */}
      {!isMe && (
        <div
          className={cn(
            "w-8 h-8 flex-shrink-0 self-end mr-2",
            !isLast && "invisible"
          )}
        >
          {sender.avatar ? (
            <img
              src={sender.avatar}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-200" />
          )}
        </div>
      )}

      <div className="max-w-[70%] flex flex-col">
        {/* Username if needed, but usually strictly inside chat it isn't shown for every message */}

        <div
          className={cn(
            "px-4 py-2 text-[14px] leading-relaxed break-words relative",
            isMe
              ? "bg-[#0079d3] text-white rounded-2xl rounded-br-sm"
              : "bg-[#f6f7f8] text-[#1c1c1c] rounded-2xl rounded-bl-sm"
            // Additional shaping if we wanted grouping, but Reddit chat is a bit standard
          )}
        >
          {message.type === "image" && message.attachmentUrl && (
            <div className="mb-2 rounded-lg overflow-hidden">
              <img
                src={message.attachmentUrl}
                alt="Reddit Attachment"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          {message.type === "video" && message.attachmentUrl && (
            <div className="mb-2 rounded-lg overflow-hidden">
              <video
                src={message.attachmentUrl}
                controls
                className="w-full h-auto"
              />
            </div>
          )}
          <p>{message.text}</p>
        </div>

        {/* Timestamp usually on hover or below, but we can rely on generic or valid placement */}
      </div>

      {/* Placeholder for right side if needed */}
    </div>
  );
};
