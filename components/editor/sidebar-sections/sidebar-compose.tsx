'use client';

import React from 'react';
import { MessageSquare, Plus, Upload, Calendar } from 'lucide-react';
import { Label, Select, Input, Button, SectionHeader } from '@/components/ui/design-system';
import { Participant } from '@/lib/types';

interface SidebarComposeProps {
  participants: Participant[];
  onAddMessage: (text: string, senderId: string, timestamp?: string, type?: "text" | "image" | "video", attachmentUrl?: string) => void;
  selectedSender: string;
  setSelectedSender: (id: string) => void;
}

export const SidebarCompose: React.FC<SidebarComposeProps> = ({
  participants,
  onAddMessage,
  selectedSender,
  setSelectedSender,
}) => {
  const [newMessage, setNewMessage] = React.useState('');
  const [attachmentUrl, setAttachmentUrl] = React.useState('');
  const [customTime, setCustomTime] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachmentUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (newMessage.trim() || attachmentUrl.trim()) {
      let formattedTime = undefined;
      if (customTime) {
         const date = new Date(customTime);
         formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         
         const today = new Date();
         const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
         
         if (!isToday) {
            formattedTime = `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${formattedTime}`;
         }
      }

      let type: "text" | "image" | "video" = "text";
      if (attachmentUrl.trim()) {
        const url = attachmentUrl.trim().toLowerCase();
        if (url.startsWith('data:video/') || url.match(/\.(mp4|webm|ogg|mov)$/)) {
          type = "video";
        } else {
          type = "image";
        }
      }

      onAddMessage(
        newMessage, 
        selectedSender, 
        formattedTime, 
        type, 
        attachmentUrl.trim() || undefined
      );
      setNewMessage('');
      setAttachmentUrl('');
    }
  };

  return (
    <section>
      <SectionHeader icon={MessageSquare} title="Compose" />
      <div className="space-y-3">
          <div className="flex flex-col gap-3">
            <div>
              <Label>Sender</Label>
              <Select 
                value={selectedSender}
                onChange={(val) => setSelectedSender(val)}
                options={participants.map(p => ({ label: p.name, value: p.id }))}
              />
            </div>
            <div>
               <Label className="truncate">Chat Time (Optional)</Label>
               <div className="relative">
                 <Input 
                   type="datetime-local" 
                   value={customTime}
                   onChange={(e) => setCustomTime(e.target.value)}
                   className="pl-8 text-[11px]"
                 />
                 <Calendar className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
               </div>
            </div>
          </div>
          <div>
             <Label>Attachment URL (Optional)</Label>
             <div className="flex gap-2">
                <Input 
                  type="text" 
                  placeholder="https://example.com/image.png"
                  value={attachmentUrl}
                  onChange={(e) => setAttachmentUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="secondary" 
                  className="px-3" 
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload local image"
                >
                  <Upload className="w-4 h-4" />
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
             </div>
          </div>
         <div>
           <Label>Message</Label>
           <textarea 
             value={newMessage}
             onChange={(e) => setNewMessage(e.target.value)}
             className="w-full flex min-h-[80px] rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:bg-neutral-900/50 resize-y"
             placeholder="Type your message here..."
           />
         </div>
         <Button onClick={handleAdd} className="w-full">
           <Plus className="w-4 h-4 mr-1.5" /> Add Message
         </Button>
      </div>
    </section>
  );
};
