'use client';

import { User, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserPanel({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="w-64 bg-noir-200 border-l border-noir-300 flex flex-col">
      <div className="flex-1" />
      <div className="h-16 border-t border-noir-300 px-4 flex items-center gap-3">
        <Link href="/profile">
          <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center cursor-pointer hover:bg-gold-400/30 transition-colors">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full" />
            ) : (
              <span className="text-gold-400 font-semibold">{user.username?.[0]?.toUpperCase() || 'U'}</span>
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link href="/profile">
            <div className="text-sm font-semibold text-gold-400 truncate cursor-pointer hover:text-gold-300">
              {user.username}
            </div>
          </Link>
          <div className="text-xs text-gray-500">Online</div>
        </div>
        <div className="flex gap-1">
          <Link href="/settings">
            <button className="p-1.5 text-gray-400 hover:text-gold-400 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

