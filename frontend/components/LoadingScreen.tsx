'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-noir-100 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-smoke" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-serif text-gradient mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Maison Noir
        </motion.h1>
        <motion.p
          className="text-gold-400 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Entering Maison Noir...
        </motion.p>
        <motion.div
          className="mt-8 w-16 h-1 bg-gold-400 mx-auto"
          animate={{ width: ['0%', '100%', '0%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

