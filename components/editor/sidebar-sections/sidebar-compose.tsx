'use client';

import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { Label, Select, Input, Button, SectionHeader } from '@/components/ui/design-system';
import { Participant } from '@/lib/types';

interface SidebarComposeProps {
  participants: Participant[];
  onAddMessage: (text: string, senderId: string, timestamp?: string) => void;
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
  const [customTime, setCustomTime] = React.useState('');

  const handleAdd = () => {
    if (newMessage.trim()) {
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

      onAddMessage(newMessage, selectedSender, formattedTime);
      setNewMessage('');
    }
  };

  return (
    <section>
      <SectionHeader icon={MessageSquare} title="Compose" />
      <div className="space-y-3">
         <div className="grid grid-cols-2 gap-3">
           <div>
             <Label>Sender</Label>
             <Select 
               value={selectedSender}
               onChange={(val) => setSelectedSender(val)}
               options={participants.map(p => ({ label: p.name, value: p.id }))}
             />
           </div>
           <div>
              <Label>Time (Optional)</Label>
              <Input 
                type="datetime-local" 
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="text-[10px]"
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
