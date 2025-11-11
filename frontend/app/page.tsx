'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return <LoadingScreen />;
  }

  return null;
}

