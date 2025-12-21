import { PlatformMessageProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const PeerlistMessage: React.FC<PlatformMessageProps> = ({ message, sender, isFirst }) => {
   return (
     <div className={cn(
       "flex w-full px-4 gap-2.5 group hover:bg-neutral-50",
       isFirst ? "mt-4" : "mt-1"
     )}>
        <div className="size-8 flex-shrink-0">
           {isFirst && (
              <div className="w-full h-full rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden">
                 {sender.avatar && <img src={sender.avatar} className="w-full h-full object-cover" />}
              </div>
           )}
        </div>
        <div className="flex-1 min-w-0">
           {isFirst && (
              <div className="flex items-baseline gap-2">
                 <span className="font-bold text-[14px] text-neutral-900">{sender.name}</span>
                 <span className="text-[11px] text-neutral-400">{message.timestamp}</span>
              </div>
           )}
           <div className="text-[14.5px] leading-[1.5] text-neutral-800 tracking-tight font-normal">
              {message.type === 'image' && message.attachmentUrl && (
                 <div className="my-2 rounded-xl border border-neutral-200 overflow-hidden max-w-[85%] shadow-sm">
                    <img src={message.attachmentUrl} alt="Peerlist attachment" className="w-full h-auto max-h-[400px] object-contain" />
                 </div>
              )}
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
           </div>
        </div>
     </div>
   );
};
