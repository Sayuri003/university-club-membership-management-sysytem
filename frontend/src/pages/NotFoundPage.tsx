import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <Brand />
      <p className="mt-10 font-display text-7xl font-bold text-slate-900">404</p>
      <p className="mt-3 text-slate-500">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-ghost mt-6">
        <Home className="h-4 w-4" /> Back home
      </Link>
    </div>
  );
}
