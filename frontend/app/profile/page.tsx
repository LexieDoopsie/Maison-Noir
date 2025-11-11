'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Edit2, Save, X, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(userData);
    setUser(parsed);
    setUsername(parsed.username);
    setBio(parsed.bio || '');
  }, [router]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        '/api/users/profile',
        { username, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setUser(response.data.data);
        setEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-noir-100 flex items-center justify-center">
        <div className="text-gold-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/app"
          className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </Link>
        <div className="bg-noir-200/80 backdrop-blur-lg rounded-2xl p-8 border border-gold-400/20 glow-gold">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-serif text-gradient">Profile</h1>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gold-400/20 text-gold-400 rounded-lg hover:bg-gold-400/30 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-gold-400/20 text-gold-400 rounded-lg hover:bg-gold-400/30 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setUsername(user.username);
                    setBio(user.bio || '');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-noir-300 text-gray-400 rounded-lg hover:bg-noir-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gold-400/20 flex items-center justify-center border-2 border-gold-400/30">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full" />
                ) : (
                  <span className="text-4xl text-gold-400 font-semibold">
                    {user.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1">
                {editing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-noir-300 border border-gold-400/30 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-gold-400/60 focus:glow-gold"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold text-gold-400">{user.username}</h2>
                )}
                <div className="flex items-center gap-2 mt-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Bio</label>
              {editing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full bg-noir-300 border border-gold-400/30 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-gold-400/60 focus:glow-gold resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-300">{bio || 'No bio yet.'}</p>
              )}
            </div>

            <div className="pt-6 border-t border-noir-300">
              <h3 className="text-lg font-semibold text-gold-400 mb-4">Security Settings</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-noir-300 rounded-lg hover:bg-noir-400 transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-3 bg-noir-300 rounded-lg hover:bg-noir-400 transition-colors">
                  Two-Factor Authentication
                </button>
                <button className="w-full text-left px-4 py-3 bg-noir-300 rounded-lg hover:bg-noir-400 transition-colors">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

