import { PlatformMessageProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const InstagramMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst, isLast }) => {
  const isMe = sender.isMe;

  return (
    <div className={cn(
      "flex w-full px-3 mb-0.5",
      isMe ? "justify-end" : "justify-start"
    )}>
      {!isMe && (
        <div className="w-7 h-7 flex-shrink-0 self-end mr-2">
           {isLast && sender.avatar && <img src={sender.avatar} className="w-full h-full rounded-full object-cover" />}
        </div>
      )}
      <div className={cn(
         "max-w-[75%] px-3.5 py-2 rounded-[22px] text-[14.5px] leading-[1.4] tracking-tight",
         isMe ? "bg-[#3797f0] text-white" : "bg-[#efefef] text-black",
         isMe ? (isLast ? "rounded-br-sm" : "") : (isLast ? "rounded-bl-sm" : "")
      )}>
         {message.type === 'image' && message.attachmentUrl && (
           <div className="mb-1.5 -mx-3.5 -mt-2 rounded-t-[22px] overflow-hidden border-b border-black/5 bg-neutral-100 dark:bg-neutral-800">
              <img src={message.attachmentUrl} alt="Instagram attachment" className="w-full h-auto max-h-[400px] object-contain" />
           </div>
         )}
         <p className="whitespace-pre-wrap break-words font-normal">{message.text}</p>
      </div>
    </div>
  );
};
