import type { ReactNode } from 'react';
import { Brand, FeaturePill } from './Brand';
import { Users, GraduationCap, Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 lg:grid lg:grid-cols-2">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl animate-blob" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl animate-blob [animation-delay:3s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl animate-blob [animation-delay:6s]" />
      </div>

      {/* Left brand panel (desktop only) */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 p-12 text-white lg:flex">
        <div className="relative z-10">
          <Brand />
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Run your university club
            <br />
            <span className="text-emerald-300">like a pro.</span>
          </h2>
          <p className="max-w-md text-emerald-100/80">
            University Club Membership System — manage members, track roles, and keep your
            club organized in one secure place.
          </p>
          <div className="flex flex-wrap gap-2">
            <FeaturePill icon={Users} label="Member management" />
            <FeaturePill icon={GraduationCap} label="Student verified" />
            <FeaturePill icon={Sparkles} label="Role-based access" />
          </div>
        </div>

        <div className="relative z-10 text-xs text-emerald-200/60">
          © {new Date().getFullYear()} UCMS. All rights reserved.
        </div>

        {/* decorative grid */}
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
      </aside>

      {/* Right form panel */}
      <main className="relative flex min-h-screen items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 lg:hidden">
            <Brand />
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>

          {children}

          <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
            {footer}
          </div>
        </div>
      </main>
    </div>
  );
}
