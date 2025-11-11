'use client';

import { useState, useEffect } from 'react';
import { Plus, Hash } from 'lucide-react';
import axios from 'axios';

interface Server {
  _id: string;
  name: string;
  icon?: string;
}

export default function AppSidebar({
  selectedServer,
  onSelectServer,
}: {
  selectedServer: string | null;
  onSelectServer: (serverId: string) => void;
}) {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/servers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setServers(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch servers:', error);
    }
  };

  return (
    <div className="w-16 bg-noir-200 flex flex-col items-center py-4 gap-2 border-r border-noir-300">
      <button className="w-12 h-12 rounded-full bg-noir-300 hover:bg-gold-400/20 border border-gold-400/30 flex items-center justify-center transition-all hover:glow-gold">
        <Plus className="w-5 h-5 text-gold-400" />
      </button>
      <div className="w-8 h-px bg-noir-400 my-2" />
      {servers.map((server) => (
        <button
          key={server._id}
          onClick={() => onSelectServer(server._id)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            selectedServer === server._id
              ? 'bg-gold-400/30 glow-gold'
              : 'bg-noir-300 hover:bg-noir-400'
          }`}
        >
          {server.icon ? (
            <img src={server.icon} alt={server.name} className="w-full h-full rounded-full" />
          ) : (
            <Hash className="w-6 h-6 text-gold-400" />
          )}
        </button>
      ))}
    </div>
  );
}

