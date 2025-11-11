'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

export default function InvitePage() {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    joinServer();
  }, [code]);

  const joinServer = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await axios.post(
        `/api/servers/join/${code}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setStatus('success');
        setMessage('Successfully joined server!');
        setTimeout(() => {
          router.push('/app');
        }, 2000);
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.error || 'Failed to join server');
    }
  };

  return (
    <div className="min-h-screen bg-noir-100 flex items-center justify-center">
      <div className="bg-noir-200/80 backdrop-blur-lg rounded-2xl p-8 border border-gold-400/20 glow-gold max-w-md w-full mx-4 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-gold-400 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-gradient mb-2">Joining Server...</h2>
            <p className="text-gray-400">Please wait</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-gradient mb-2">Welcome!</h2>
            <p className="text-gray-400">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-red-400 mb-2">Error</h2>
            <p className="text-gray-400 mb-4">{message}</p>
            <button
              onClick={() => router.push('/app')}
              className="px-4 py-2 bg-gold-400/20 text-gold-400 rounded-lg hover:bg-gold-400/30 transition-colors"
            >
              Go to App
            </button>
          </>
        )}
      </div>
    </div>
  );
}

