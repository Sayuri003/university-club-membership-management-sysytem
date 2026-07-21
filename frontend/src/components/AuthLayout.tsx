import type { ReactNode } from 'react';
import { Users, GraduationCap, Sparkles } from 'lucide-react';
import { Brand, FeaturePill } from './Brand';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F3E8] lg:grid lg:grid-cols-2">
      {/* Left: registry panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#14213D] p-12 text-[#F7F3E8] lg:flex">
        <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle,rgba(247,243,232,0.5)_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="relative z-10">
          <Brand />
        </div>

        {/* Signature: membership card */}
        <div className="relative z-10 flex flex-1 items-center justify-center py-10">
          <div className="relative w-72 -rotate-3 rounded-md border border-[#B8863B]/40 bg-[#F7F3E8] p-5 text-[#14213D] shadow-2xl shadow-black/40 transition-transform duration-500 hover:rotate-0">
            <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[#B8863B]" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#B8863B]" />
            <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-[#B8863B]" />
            <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-[#B8863B]" />

            <p
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
              className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B8863B]"
            >
              Member Since
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#14213D]/10">
                <Users className="h-6 w-6 text-[#14213D]/40" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-24 rounded-full bg-[#14213D]/15" />
                <div className="h-2 w-16 rounded-full bg-[#14213D]/10" />
              </div>
            </div>
            <div className="mt-5 h-8 w-full opacity-70 [background-image:repeating-linear-gradient(90deg,#14213D_0px,#14213D_2px,transparent_2px,transparent_5px)]" />
            <p
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
              className="mt-2 text-[10px] tracking-[0.15em] text-[#14213D]/50"
            >
              NO. 0184 — VALID INDEFINITELY
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-5">
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif" }} className="text-3xl font-medium leading-tight">
            Your membership,
            <br />
            <span className="italic text-[#B8863B]">on record.</span>
          </h2>
          <p className="max-w-sm text-sm text-[#F7F3E8]/70">
            One place to register, verify, and keep track of every member in the club.
          </p>
          <div className="flex flex-wrap gap-2">
            <FeaturePill icon={Users} label="Member management" />
            <FeaturePill icon={GraduationCap} label="Student verified" />
            <FeaturePill icon={Sparkles} label="Role-based access" />
          </div>
        </div>

        <div
          style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
          className="relative z-10 text-[10px] uppercase tracking-wider text-[#F7F3E8]/40"
        >
          © {new Date().getFullYear()} UCMS — All rights reserved
        </div>
      </aside>

      {/* Right: form panel */}
      <main className="relative flex min-h-screen items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Brand />
          </div>

          <div className="mb-8 border-t-2 border-[#B8863B] pt-5">
            <h1 style={{ fontFamily: "'Newsreader', Georgia, serif" }} className="text-3xl font-medium text-[#14213D]">
              {title}
            </h1>
            <p className="mt-2 text-sm text-[#14213D]/60">{subtitle}</p>
          </div>

          {children}

          <div className="mt-8 border-t border-[#14213D]/10 pt-6 text-center text-sm text-[#14213D]/70">
            {footer}
          </div>
        </div>
      </main>
    </div>
  );
}