'use client';

import React from 'react';

interface ChatContainerProps {
  view: 'phone' | 'desktop';
  children: React.ReactNode;
}

export const ChatContainer = React.forwardRef<HTMLDivElement, ChatContainerProps>(({ view, children }, ref) => {
  if (view === 'phone') {
    return (
      <div className="relative mx-auto border-neutral-800 dark:border-neutral-800 bg-neutral-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-neutral-800 top-0 left-1/2 -translate-x-1/2 rounded-b-[1rem] absolute" />
        <div className="h-[46px] w-[3px] bg-neutral-800 absolute -left-[17px] top-[124px] rounded-l-lg" />
        <div className="h-[46px] w-[3px] bg-neutral-800 absolute -left-[17px] top-[178px] rounded-l-lg" />
        <div className="h-[64px] w-[3px] bg-neutral-800 absolute -right-[17px] top-[142px] rounded-r-lg" />
        <div 
          ref={ref}
          className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-neutral-900 border-[8px] border-black"
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className="w-full max-w-4xl h-[600px] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col"
    >
      <div className="h-10 bg-neutral-100 dark:bg-neutral-800 flex items-center px-4 gap-2 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
});

ChatContainer.displayName = "ChatContainer";
