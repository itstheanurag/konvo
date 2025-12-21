import { PlatformMessageProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const XMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst, isLast }) => {
  const isMe = sender.isMe;
  
  return (
    <div className={cn(
      "flex w-full px-4 mb-1",
      isMe ? "justify-end" : "justify-start"
    )}>
       {!isMe && isLast && (
         <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden shrink-0 self-end mr-2">
            {sender.avatar && <img src={sender.avatar} className="w-full h-full object-cover" />}
         </div>
       )}
       {!isMe && !isLast && <div className="w-10" />}
       
       <div className={cn(
          "max-w-[70%] flex flex-col gap-1",
          isMe ? "items-end" : "items-start"
       )}>
          <div className={cn(
             "px-4 py-2.5 rounded-2xl text-[15px] leading-normal shadow-sm",
             isMe ? "bg-[#1d9bef] text-white rounded-br-sm" : "bg-[#2f3336] text-white rounded-bl-sm"
          )}>
             {message.type === 'image' && message.attachmentUrl && (
               <div className="mb-2 -mx-2 -mt-1 rounded-xl overflow-hidden border border-white/10">
                  <img src={message.attachmentUrl} alt="Attachment" className="w-full h-auto max-h-[300px] object-contain" />
               </div>
             )}
             <p className="whitespace-pre-wrap break-words">{message.text}</p>
          </div>
          {isLast && (
            <span className="text-[11px] text-neutral-500 mt-1 px-1">
               {message.timestamp}
            </span>
          )}
       </div>
    </div>
  );
};
