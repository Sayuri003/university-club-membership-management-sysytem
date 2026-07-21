import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export function Spinner({ className = '' }: { className?: string }) {
  return <Loader2 className={`h-4 w-4 animate-spin ${className}`} />;
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-[#14213D]/60">
      <Spinner className="h-6 w-6 text-[#B8863B]" />
      <p
        style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
        className="text-xs uppercase tracking-wider"
      >
        {label}
      </p>
    </div>
  );
}

export function ErrorBanner({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-sm border-l-4 border-[#B3413A] bg-[#B3413A]/[0.06] px-4 py-3 text-sm text-[#7A2C26]">
      <span
        style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
        className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#B3413A]"
      >
        Notice
      </span>
      <div>{children}</div>
    </div>
  );
}