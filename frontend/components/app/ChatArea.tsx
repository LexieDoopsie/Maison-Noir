'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Smile } from 'lucide-react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import ReactMarkdown from 'react-markdown';

interface Message {
  _id: string;
  content: string;
  userId: string;
  user?: {
    username: string;
    avatar?: string;
  };
  createdAt: string;
  reactions: Array<{ emoji: string; users: string[] }>;
}

export default function ChatArea({
  channelId,
  serverId,
}: {
  channelId: string;
  serverId: string | null;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typing, setTyping] = useState<{ [key: string]: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchMessages();
    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [channelId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
      const apiPath = API_URL ? `${API_URL}/api` : '/api';
      const response = await axios.get(`${apiPath}/channels/${channelId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const connectSocket = () => {
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const newSocket = io(API_URL, {
      auth: { token },
    });

    newSocket.on('connect', () => {
      newSocket.emit('join:channel', { channelId });
    });

    newSocket.on('message:new', (message: Message) => {
      if (message.channelId === channelId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    newSocket.on('typing:update', (data: { channelId: string; userId: string; username: string }) => {
      if (data.channelId === channelId && data.userId !== user._id) {
        setTyping((prev) => ({ ...prev, [data.userId]: data.username }));
        setTimeout(() => {
          setTyping((prev) => {
            const updated = { ...prev };
            delete updated[data.userId];
            return updated;
          });
        }, 3000);
      }
    });

    setSocket(newSocket);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const optimisticMessage: Message = {
      _id: `temp-${Date.now()}`,
      content: newMessage,
      userId: user._id,
      user: { username: user.username, avatar: user.avatar },
      createdAt: new Date().toISOString(),
      reactions: [],
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage('');

    socket.emit('message:send', {
      channelId,
      content: newMessage,
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col bg-noir-100">
      <div className="h-12 border-b border-noir-300 px-4 flex items-center">
        <h3 className="font-semibold text-gold-400"># channel</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message._id} className="flex gap-3 group hover:bg-noir-200/30 p-2 rounded">
            <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0">
              {message.user?.avatar ? (
                <img src={message.user.avatar} alt={message.user.username} className="w-full h-full rounded-full" />
              ) : (
                <span className="text-gold-400 font-semibold">
                  {message.user?.username?.[0]?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gold-400">{message.user?.username || 'Unknown'}</span>
                <span className="text-xs text-gray-500">{formatTime(message.createdAt)}</span>
              </div>
              <div className="text-gray-300 prose prose-invert max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
              {message.reactions.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {message.reactions.map((reaction, idx) => (
                    <button
                      key={idx}
                      className="px-2 py-1 bg-noir-300 rounded-full text-sm hover:bg-noir-400 transition-colors"
                    >
                      {reaction.emoji} {reaction.users.length}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {Object.keys(typing).length > 0 && (
          <div className="text-sm text-gray-500 italic">
            {Object.values(typing).join(', ')} typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-noir-300">
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gold-400 transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              if (socket) {
                socket.emit('typing:start', { channelId });
              }
            }}
            onBlur={() => {
              if (socket) {
                socket.emit('typing:stop', { channelId });
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-noir-300 border border-gold-400/30 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-gold-400/60 focus:glow-gold transition-all"
          />
          <button
            type="submit"
            className="p-2 bg-gold-400/20 text-gold-400 rounded-lg hover:bg-gold-400/30 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

