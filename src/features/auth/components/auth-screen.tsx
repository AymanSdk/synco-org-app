'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { SignInCard } from './sign-in-card';
import { SignUpCard } from './sign-up-card';
import { SignInFlow } from '../types';
import { Background3D } from '@/components/animated-shapes';

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>('SignIn');

  return (
    <>
      <Head>
        <title>Authentication - Syncro Org</title>
      </Head>
      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="fixed left-6 top-6 z-10 flex items-center gap-2 text-white md:text-primary">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Syncro Org Logo"
              width={32}
              height={32}
              aria-label="Syncro Org Logo"
            />
          </Link>
        </div>

        <div className="relative flex w-full flex-col items-start justify-center overflow-hidden bg-gradient-to-br from-[#1a2a43] via-[#3E5879] to-[#213555] p-6 md:w-1/2 md:p-12">
          <Background3D />
          <div className="z-10">
            <motion.h1
              className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Collaborate,{' '}
              <motion.span
                className="inline-block text-blue-400"
                whileHover={{
                  scale: 1.1,
                  color: '#60A5FA',
                  transition: { duration: 0.2 },
                }}
              >
                sync
              </motion.span>{' '}
              and thrive
            </motion.h1>

            <motion.p
              className="mb-12 max-w-xl text-lg text-gray-300 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sign in to transform your workflow with our powerful collaboration
              platform. Connect, create, and collaborate in real-time.
            </motion.p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center bg-background p-6 md:w-1/2 md:p-12">
          <div className="w-full max-w-md duration-500 animate-in fade-in zoom-in">
            {state === 'SignIn' ? (
              <SignInCard setState={setState} />
            ) : (
              <SignUpCard setState={setState} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
