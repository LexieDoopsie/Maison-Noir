'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User, Mail, Lock, Loader2 } from 'lucide-react';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        router.push('/app');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <User className="w-4 h-4" />
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full bg-noir-300 border border-gold-400/30 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-gold-400/60 focus:glow-gold transition-all"
          placeholder="Choose a username"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-noir-300 border border-gold-400/30 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-gold-400/60 focus:glow-gold transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full bg-noir-300 border border-gold-400/30 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-gold-400/60 focus:glow-gold transition-all"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-noir-100 py-3 rounded-lg font-semibold hover:glow-gold-strong transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating...
          </>
        ) : (
          'Join Maison Noir'
        )}
      </button>
    </form>
  );
}

