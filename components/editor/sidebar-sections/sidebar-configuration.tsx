'use client';

import React from 'react';
import { Settings, Moon, Sun, Monitor } from 'lucide-react';
import { Label, Select, SectionHeader } from '@/components/ui/design-system';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { PLATFORMS, PlatformType } from '@/lib/types';

interface SidebarConfigurationProps {
  currentPlatform: PlatformType;
  onPlatformChange: (p: PlatformType) => void;
}

export const SidebarConfiguration: React.FC<SidebarConfigurationProps> = ({
  currentPlatform,
  onPlatformChange,
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <section>
      <SectionHeader icon={Settings} title="Configuration" />
      <div className="space-y-4">
        <div>
          <Label>Platform</Label>
          <Select 
            value={currentPlatform}
            onChange={(val) => onPlatformChange(val as PlatformType)}
            options={Object.values(PLATFORMS).map(p => ({ label: p.name, value: p.id }))}
          />
        </div>

           <div>
              <Label>Theme</Label>
              <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg">
                {(['light', 'dark', 'system'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={cn(
                      "flex-1 flex items-center justify-center py-1.5 rounded-md transition-all",
                      theme === t
                        ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
                    )}
                  >
                     {t === 'light' && <Sun className="w-3 h-3" />}
                     {t === 'dark' && <Moon className="w-3 h-3" />}
                     {t === 'system' && <Monitor className="w-3 h-3" />}
                  </button>
                ))}
              </div>
           </div>
        </div>
    </section>
  );
};
