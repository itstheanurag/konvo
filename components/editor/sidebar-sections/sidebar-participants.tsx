'use client';

import React from 'react';
import { Users, Pencil, Trash2, Plus, X } from 'lucide-react';
import { Button, SectionHeader, Input } from '@/components/ui/design-system';
import { Participant } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarParticipantsProps {
  participants: Participant[];
  onAddParticipant: (p: Participant) => void;
  onUpdateParticipant: (p: Participant) => void;
  onRemoveParticipant: (id: string) => void;
}

export const SidebarParticipants: React.FC<SidebarParticipantsProps> = ({
  participants,
  onAddParticipant,
  onUpdateParticipant,
  onRemoveParticipant,
}) => {
  const [editingParticipant, setEditingParticipant] = React.useState<Participant | null>(null);

  const handleSaveParticipant = () => {
    if (editingParticipant) {
      if (participants.find(p => p.id === editingParticipant.id)) {
        onUpdateParticipant(editingParticipant);
      } else {
        onAddParticipant(editingParticipant);
      }
      setEditingParticipant(null);
    }
  };

  const createNewParticipant = () => {
    setEditingParticipant({
      id: Math.random().toString(36).substr(2, 9),
      name: 'New User',
      isMe: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      username: 'user'
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
         <SectionHeader icon={Users} title="Participants" />
      </div>
      
      <div className="space-y-2 mb-3">
         {participants.map(p => (
           <div key={p.id} className="flex items-center justify-between p-2 rounded-lg border border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/30">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-200">
                    {p.avatar && <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />}
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-medium">{p.name} {p.isMe && '(Me)'}</span>
                    {p.username && <span className="text-[10px] text-neutral-400">@{p.username}</span>}
                 </div>
              </div>
              <div className="flex gap-1">
                 <button onClick={() => setEditingParticipant(p)} className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded">
                    <Pencil className="w-3 h-3 text-neutral-500" />
                 </button>
                 {!p.isMe && participants.length > 2 && (
                   <button onClick={() => onRemoveParticipant(p.id)} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
                      <Trash2 className="w-3 h-3 text-red-500" />
                   </button>
                 )}
              </div>
           </div>
         ))}
      </div>
      <div className="flex flex-col gap-2">
         {participants.length >= 2 && (
            <p className="text-[10px] text-orange-500 bg-orange-50 dark:bg-orange-900/10 px-2 py-1.5 rounded">
               ⚠️ 1-on-1 chats only. Remove a user to add another.
            </p>
         )}
         <Button 
            variant="secondary" 
            onClick={createNewParticipant} 
            className="w-full text-xs h-8"
            disabled={participants.length >= 2}
         >
           <Plus className="w-3 h-3 mr-1" /> Add Participant
         </Button>
      </div>
      
      {/* Edit Modal / Form Area */}
      <AnimatePresence>
         {editingParticipant && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="mt-4 p-3 rounded-lg border border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/20 overflow-hidden"
           >
             <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Edit Participant</span>
                <button onClick={() => setEditingParticipant(null)}><X className="w-3 h-3 text-neutral-500" /></button>
             </div>
             <div className="space-y-2">
                <Input 
                  placeholder="Name" 
                  value={editingParticipant.name} 
                  onChange={(e) => setEditingParticipant({...editingParticipant, name: e.target.value})}
                />
                <Input 
                  placeholder="Username (optional)" 
                  value={editingParticipant.username || ''} 
                  onChange={(e) => setEditingParticipant({...editingParticipant, username: e.target.value})}
                />
                <Input 
                  placeholder="Avatar URL" 
                  value={editingParticipant.avatar || ''} 
                  onChange={(e) => setEditingParticipant({...editingParticipant, avatar: e.target.value})}
                />
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isMe"
                    checked={editingParticipant.isMe}
                    onChange={(e) => setEditingParticipant({...editingParticipant, isMe: e.target.checked})}
                    className="rounded border-neutral-300"
                  />
                  <label htmlFor="isMe" className="text-xs">Is "Me" (Owner)</label>
                </div>
                <Button onClick={handleSaveParticipant} className="w-full h-8 text-xs">Save Changes</Button>
             </div>
           </motion.div>
         )}
      </AnimatePresence>
    </section>
  );
};
