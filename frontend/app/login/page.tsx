'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-noir-100 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-smoke" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <motion.div
          className="bg-noir-200/80 backdrop-blur-lg rounded-2xl p-8 border border-gold-400/20 glow-gold"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-serif text-gradient mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Maison Noir
            </motion.h1>
            <p className="text-gray-400 text-sm">Secure Communication Platform</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                isLogin
                  ? 'bg-gold-400/20 text-gold-400 glow-gold'
                  : 'bg-noir-300 text-gray-400 hover:text-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                !isLogin
                  ? 'bg-gold-400/20 text-gold-400 glow-gold'
                  : 'bg-noir-300 text-gray-400 hover:text-gray-300'
              }`}
            >
              Register
            </button>
          </div>

          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

