'use client';

import { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import axios from 'axios';

interface InviteModalProps {
  serverId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteModal({ serverId, isOpen, onClose }: InviteModalProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && serverId) {
      fetchInviteCode();
    }
  }, [isOpen, serverId]);

  const fetchInviteCode = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/servers/${serverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setInviteCode(response.data.data.inviteCode);
      }
    } catch (error) {
      console.error('Failed to fetch invite code:', error);
    }
  };

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/invite/${inviteCode}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-noir-200 border border-gold-400/30 rounded-2xl p-6 max-w-md w-full mx-4 glow-gold">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif text-gradient">Maison Code</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gold-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-4">
          Share this code to invite others to join your server
        </p>

        <div className="bg-noir-300 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <code className="text-gold-400 font-mono text-lg">{inviteCode}</code>
            <button
              onClick={handleCopy}
              className="p-2 bg-gold-400/20 text-gold-400 rounded-lg hover:bg-gold-400/30 transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Or share this link: {window.location.origin}/invite/{inviteCode}
        </div>
      </div>
    </div>
  );
}

