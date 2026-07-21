import { DashboardShell } from '../../components/DashboardShell';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  BadgeCheck,
  Megaphone,
  ArrowRight,
  Users,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { to: '/user/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/user/clubs', label: 'Clubs', icon: Building2 },
  { to: '/user/events', label: 'Events', icon: CalendarDays },
  { to: '/user/memberships', label: 'Memberships', icon: BadgeCheck },
  { to: '/user/notices', label: 'Notices', icon: Megaphone },
];

const serif = { fontFamily: "'Newsreader', Georgia, serif" };
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

export default function UserDashboard() {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] ?? 'there';

  const stats = [
    { label: 'Membership', value: 'Active', icon: ShieldCheck },
    { label: 'Role', value: 'Member', icon: Users },
    { label: 'Clubs', value: 'Browse', icon: Building2 },
  ];

  return (
    <DashboardShell navItems={navItems}>
      <div className="mb-8 border-b-2 border-[#B8863B] pb-6">
        <p style={mono} className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8863B]">
          Member portal
        </p>
        <h1 style={serif} className="mt-2 text-3xl font-medium text-[#14213D]">
          Welcome back, {firstName}
        </h1>
        <p className="mt-2 text-[#14213D]/60">
          Explore university clubs and discover what's happening.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-sm border border-[#14213D]/12 bg-white/60 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#14213D]/8 text-[#14213D]">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p style={mono} className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#14213D]/40">
                  {s.label}
                </p>
                <p style={serif} className="text-lg font-medium text-[#14213D]">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-sm border border-[#14213D]/12 bg-[#14213D] p-6 text-[#F7F3E8] lg:col-span-2">
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle,rgba(247,243,232,0.5)_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#B8863B] text-[#14213D]">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 style={serif} className="relative mt-4 text-xl font-medium">
            Discover clubs at your university
          </h2>
          <p className="relative mt-2 max-w-md text-sm text-[#F7F3E8]/70">
            Browse all registered clubs, learn what they do, and find the ones that match your interests.
          </p>
          <div className="relative mt-5 flex flex-wrap gap-3">
            <Link
              to="/user/clubs"
              className="inline-flex items-center gap-2 rounded-sm bg-[#B8863B] px-5 py-2.5 text-sm font-semibold text-[#14213D] transition hover:bg-[#F7F3E8]"
            >
              Browse clubs <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/user/events"
              className="inline-flex items-center gap-2 rounded-sm border border-[#F7F3E8]/30 px-5 py-2.5 text-sm font-semibold text-[#F7F3E8] transition hover:bg-white/10"
            >
              <CalendarDays className="h-4 w-4" /> See events
            </Link>
          </div>
        </div>

        <div className="rounded-sm border border-[#14213D]/12 bg-white/60 p-6">
          <h3 style={serif} className="text-base font-medium text-[#14213D]">Quick links</h3>
          <div className="mt-4 space-y-1">
            {[
              { to: '/user/clubs', label: 'All clubs' },
              { to: '/user/events', label: 'Upcoming events' },
              { to: '/user/memberships', label: 'My memberships' },
              { to: '/user/notices', label: 'Notices' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex items-center justify-between rounded-sm px-4 py-3 text-sm font-medium text-[#14213D]/80 transition hover:bg-[#14213D]/5"
              >
                {l.label} <ArrowRight className="h-4 w-4 text-[#B8863B]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}