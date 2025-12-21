'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- Label ---
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-[10px] uppercase tracking-wider font-bold text-neutral-500 mb-1.5 block select-none",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";


// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
          "placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-neutral-900/50 dark:focus-visible:ring-neutral-700",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";


// --- Button ---
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-900/90 dark:hover:bg-neutral-100/90 shadow-sm border-transparent",
      secondary: "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-transparent",
      danger: "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-transparent"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          "h-9 px-4 py-2 border",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";


// --- Select (Custom) ---
interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export const Select = ({ value, onChange, options, className }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || value;

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm shadow-sm transition-all",
          "hover:bg-neutral-50 dark:hover:bg-neutral-900",
          "focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-700",
          "dark:bg-neutral-900/50",
          isOpen && "ring-1 ring-neutral-400 dark:ring-neutral-700"
        )}
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("ml-2 transition-transform opacity-50", isOpen && "rotate-180")}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute z-50 mt-1 w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg py-1 max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center px-3 py-1.5 text-sm text-left transition-colors",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  option.value === value && "bg-neutral-50 dark:bg-neutral-800/50 font-medium text-neutral-900 dark:text-neutral-100"
                )}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
Select.displayName = "Select";


// --- Section Header ---
export const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-900/50">
    <Icon className="w-4 h-4 text-neutral-500" />
    <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{title}</h3>
  </div>
);
