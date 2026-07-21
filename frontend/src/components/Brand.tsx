import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#14213D] ring-2 ring-[#B8863B]/60 transition-transform group-hover:scale-105">
        <Landmark className="h-5 w-5 text-[#F7F3E8]" strokeWidth={2} />
        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#B8863B] ring-2 ring-white" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            className="text-lg font-semibold tracking-tight text-[#14213D]"
          >
            UCMS
          </p>
          <p
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
            className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#B8863B]"
          >
            Club Registry
          </p>
        </div>
      )}
    </Link>
  );
}

export function FeaturePill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-sm border border-[#14213D]/15 bg-[#F7F3E8]/80 px-3 py-1.5 text-xs font-medium text-[#14213D] backdrop-blur">
      <Icon className="h-3.5 w-3.5 text-[#B8863B]" />
      {label}
    </div>
  );
}