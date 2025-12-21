'use client';

export const SidebarHeader = () => {
  return (
    <div className="p-4 border-b border-neutral-100 dark:border-neutral-900">
      <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm">
           <img src="/icon.png" alt="Konvo Logo" className="w-full h-full object-cover" />
        </div>
        Konvo
        <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-500 uppercase font-semibold">Beta</span>
      </h1>
    </div>
  );
};
