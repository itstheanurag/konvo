import { PlatformMessageProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const WhatsAppMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst, isLast }) => {
  const isMe = sender.isMe;
  
  return (
    <div className={cn(
      "flex w-full px-3 mb-1",
      isMe ? "justify-end" : "justify-start",
      isFirst && "mt-2"
    )}>
      <div className={cn(
        "relative max-w-[85%] px-2 py-1.5 shadow-sm min-w-[60px]",
        isMe ? "bg-[#dcf8c6] rounded-l-lg rounded-tr-lg" : "bg-white rounded-r-lg rounded-tl-lg",
        isLast && (isMe ? "rounded-br-none" : "rounded-bl-none")
      )}>
        {/* Simplified Tail */}
        {isLast && (
          <div className={cn(
            "absolute bottom-0 w-2 h-2",
            isMe ? "-right-1 bg-[#dcf8c6] [clip-path:polygon(0_0,0%_100%,100%_100%)]" : "-left-1 bg-white [clip-path:polygon(100%_0,0%_100%,100%_100%)]"
          )} />
        )}

        <div className="flex flex-col gap-0.5">
          {message.type === 'image' && message.attachmentUrl && (
            <div className="mb-1 -mx-1 -mt-1 rounded-t-lg overflow-hidden border-b border-black/5">
               <img src={message.attachmentUrl} alt="Attachment" className="max-w-full h-auto object-contain max-h-[400px]" />
            </div>
          )}
          <p className="text-[14.2px] leading-[1.3] text-neutral-900 whitespace-pre-wrap break-words font-normal">{message.text}</p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="text-[10px] text-neutral-500">{message.timestamp}</span>
            {isMe && (
               <div className="flex text-[#34b7f1]">
                 <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 9.5L1 6L2 5L4.5 7.5L10.5 1.5L11.5 2.5L4.5 9.5Z" fill="currentColor"/>
                    <path d="M9 9.5L5.5 6L6.5 5L9 7.5L15 1.5L16 2.5L9 9.5Z" fill="currentColor"/>
                 </svg>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
