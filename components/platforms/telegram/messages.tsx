import { PlatformMessageProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const TelegramMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst, isLast }) => {
  const isMe = sender.isMe;

  return (
    <div className={cn(
      "flex w-full px-2 mb-1",
      isMe ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
         "relative max-w-[85%] px-3 py-1.5 shadow-sm min-w-[80px]",
         isMe ? "bg-[#effdde] rounded-[18px] rounded-br-none" : "bg-white rounded-[18px] rounded-bl-none",
      )}>
         <div className="flex flex-col gap-0.5">
            {message.type === 'image' && message.attachmentUrl && (
              <div className="mb-1.5 -mx-3 -mt-1.5 rounded-t-[18px] overflow-hidden">
                 <img src={message.attachmentUrl} alt="Telegram attachment" className="w-full h-auto object-contain max-h-[400px]" />
              </div>
            )}
            {message.type === 'video' && message.attachmentUrl && (
              <div className="mb-1.5 -mx-3 -mt-1.5 rounded-t-[18px] overflow-hidden bg-black/5 flex items-center justify-center">
                 <video src={message.attachmentUrl} controls className="w-full h-auto max-h-[400px]" />
              </div>
            )}
            <p className="text-[15px] leading-[1.35] text-neutral-900 whitespace-pre-wrap break-words font-normal">{message.text}</p>
            <div className="flex items-center justify-end gap-1 -mt-0.5 h-4 self-end">
               <span className="text-[10px] text-[#7195ba] font-medium">{message.timestamp.split(' ').pop()}</span>
               {isMe && (
                  <div className="text-[#64b5ef]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                       <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};
