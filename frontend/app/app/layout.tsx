'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AppSidebar from '@/components/app/AppSidebar';
import ChannelSidebar from '@/components/app/ChannelSidebar';
import ChatArea from '@/components/app/ChatArea';
import UserPanel from '@/components/app/UserPanel';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  
  // Don't show app layout on profile/settings pages
  const isAppPage = pathname === '/app';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-noir-100 flex items-center justify-center">
        <div className="text-gold-400">Loading...</div>
      </div>
    );
  }

  // If not on main app page (e.g., profile/settings), just render children
  if (!isAppPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-noir-100 text-gray-100 overflow-hidden">
      <AppSidebar
        selectedServer={selectedServer}
        onSelectServer={setSelectedServer}
      />
      {selectedServer && (
        <ChannelSidebar
          serverId={selectedServer}
          selectedChannel={selectedChannel}
          onSelectChannel={setSelectedChannel}
        />
      )}
      {selectedChannel ? (
        <ChatArea channelId={selectedChannel} serverId={selectedServer} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-serif text-gradient mb-2">
              Welcome to Maison Noir
            </h2>
            <p className="text-gray-400">
              Select a channel to start chatting
            </p>
          </div>
        </div>
      )}
      <UserPanel user={user} />
    </div>
  );
}

