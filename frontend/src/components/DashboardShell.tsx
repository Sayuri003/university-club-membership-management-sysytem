import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brand } from './Brand';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

interface DashboardShellProps {
  navItems: NavItem[];
  badge?: string;
  children: ReactNode;
}

const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

export function DashboardShell({ navItems, badge, children }: DashboardShellProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { startLoading } = useLoading();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const isActive = (to: string) =>
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition ${
      active
        ? 'bg-[#14213D] text-[#F7F3E8]'
        : 'text-[#14213D]/70 hover:bg-[#14213D]/5 hover:text-[#14213D]'
    }`;

  const handleNavClick = (active: boolean) => {
    if (!active) {
      startLoading();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E8]">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[#14213D]/10 bg-[#F7F3E8] lg:flex">
        <div className="flex h-16 items-center border-b border-[#14213D]/10 px-6">
          <Brand />
        </div>
        {badge && (
          <div className="px-6 pt-4">
            <span
              style={mono}
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#B8863B]/40 bg-[#B8863B]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#B8863B]"
            >
              <ShieldCheck className="h-3.5 w-3.5" /> {badge}
            </span>
          </div>
        )}
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => handleNavClick(active)}
                className={navLinkClass(active)}
              >
                <item.icon className={`h-4 w-4 ${active ? 'text-[#B8863B]' : 'text-[#14213D]/40'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[#14213D]/10 p-4">
          <div className="flex items-center gap-3 rounded-sm px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14213D]/8 text-[#14213D]/60">
              <UserIcon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#14213D]">{user?.email}</p>
              <p style={mono} className="text-[10px] uppercase tracking-wider text-[#14213D]/40">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-[#14213D]/70 transition hover:bg-[#B3413A]/10 hover:text-[#B3413A]"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#14213D]/10 bg-[#F7F3E8]/90 px-4 backdrop-blur lg:hidden">
        <Brand />
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-sm p-2 text-[#14213D] hover:bg-[#14213D]/5"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-[#14213D]/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[80%] bg-[#F7F3E8] shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-[#14213D]/10 px-6">
              <Brand />
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-sm p-2 text-[#14213D]/60 hover:bg-[#14213D]/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1 px-4 py-4">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      handleNavClick(active);
                      setMobileOpen(false);
                    }}
                    className={navLinkClass(active)}
                  >
                    <item.icon className={`h-4 w-4 ${active ? 'text-[#B8863B]' : 'text-[#14213D]/40'}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-[#14213D]/10 p-4">
              <p className="truncate text-sm font-medium text-[#14213D]">{user?.email}</p>
              <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-[#B3413A] transition hover:bg-[#B3413A]/10"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
          {children}
        </div>
      </main>
    </div>
  );
}

export { LayoutDashboard, Users };