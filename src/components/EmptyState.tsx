import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon = "sports_soccer",
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-12 bg-surface-container-lowest dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-outline-variant dark:border-slate-800 transition-colors duration-300 w-full",
        className
      )}
    >
      <div className="w-20 h-20 bg-surface-container-low dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <span
          className="material-symbols-outlined text-5xl text-outline dark:text-slate-500 opacity-60"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          {icon}
        </span>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 font-lexend font-bold mb-2">
        {title}
      </h3>
      <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 max-w-md mx-auto mb-8">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
