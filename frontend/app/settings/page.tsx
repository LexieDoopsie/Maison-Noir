'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Key, ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    }
  }, [router]);

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
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-6 h-6 text-gold-400" />
            <h1 className="text-3xl font-serif text-gradient">Settings</h1>
          </div>

          <div className="space-y-6">
            <div className="border-b border-noir-300 pb-6">
              <h2 className="text-xl font-semibold text-gold-400 mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Appearance
              </h2>
              <div className="flex items-center justify-between p-4 bg-noir-300 rounded-lg">
                <div>
                  <p className="text-gray-200 font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-400">Use dark theme (default)</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-gold-400' : 'bg-noir-400'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="border-b border-noir-300 pb-6">
              <h2 className="text-xl font-semibold text-gold-400 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-noir-300 rounded-lg">
                  <div>
                    <p className="text-gray-200 font-medium">Message Notifications</p>
                    <p className="text-sm text-gray-400">Get notified about new messages</p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications ? 'bg-gold-400' : 'bg-noir-400'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b border-noir-300 pb-6">
              <h2 className="text-xl font-semibold text-gold-400 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </h2>
              <div className="space-y-3">
                <button className="w-full text-left p-4 bg-noir-300 rounded-lg hover:bg-noir-400 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium">Change Password</p>
                      <p className="text-sm text-gray-400">Update your account password</p>
                    </div>
                    <Key className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-noir-300 rounded-lg hover:bg-noir-400 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Add an extra layer of security</p>
                    </div>
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

