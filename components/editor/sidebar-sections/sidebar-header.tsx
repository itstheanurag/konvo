import { Github } from 'lucide-react';

export const SidebarHeader = () => {
  return (
    <div className="p-4 border-b border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
      <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm">
           <img src="/icon.png" alt="Konvo Logo" className="w-full h-full object-cover" />
        </div>
        Konvo
        <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-500 uppercase font-semibold">Beta</span>
      </h1>
      <a 
        href="https://github.com/itstheanurag/konvo" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
        title="Star on GitHub"
      >
        <Github className="w-5 h-5" />
      </a>
    </div>
  );
};
