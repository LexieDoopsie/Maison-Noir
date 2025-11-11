'use client';

import { useState, useEffect } from 'react';
import { Hash, Plus, Settings } from 'lucide-react';
import axios from 'axios';

interface Channel {
  _id: string;
  name: string;
  type: 'text' | 'voice' | 'dm';
}

export default function ChannelSidebar({
  serverId,
  selectedChannel,
  onSelectChannel,
}: {
  serverId: string;
  selectedChannel: string | null;
  onSelectChannel: (channelId: string) => void;
}) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [serverName, setServerName] = useState('');

  useEffect(() => {
    if (serverId) {
      fetchChannels();
      fetchServer();
    }
  }, [serverId]);

  const fetchChannels = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/channels/server/${serverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setChannels(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch channels:', error);
    }
  };

  const fetchServer = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/servers/${serverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setServerName(response.data.data.name);
      }
    } catch (error) {
      console.error('Failed to fetch server:', error);
    }
  };

  return (
    <div className="w-64 bg-noir-200 flex flex-col border-r border-noir-300">
      <div className="h-12 border-b border-noir-300 px-4 flex items-center justify-between">
        <h2 className="font-semibold text-gold-400">{serverName}</h2>
        <button className="text-gray-400 hover:text-gold-400 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="px-2 py-1 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-400 uppercase">Text Channels</span>
          <button className="text-gray-400 hover:text-gold-400">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {channels
          .filter((ch) => ch.type === 'text')
          .map((channel) => (
            <button
              key={channel._id}
              onClick={() => onSelectChannel(channel._id)}
              className={`w-full px-2 py-1.5 rounded flex items-center gap-2 text-sm transition-colors ${
                selectedChannel === channel._id
                  ? 'bg-noir-300 text-gold-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-noir-300/50'
              }`}
            >
              <Hash className="w-4 h-4" />
              {channel.name}
            </button>
          ))}
      </div>
    </div>
  );
}

