"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { SignInFlow } from "../types";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("SignIn");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="fixed top-6 left-6 z-10 flex items-center gap-2 text-white md:text-primary">
        <Image src="/logo.svg" alt="logo" width={32} height={32} />
        <span className="text-2xl font-bold text-white">Syncro</span>
      </div>

      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#1a2a43] via-[#3E5879] to-[#213555] flex flex-col items-start justify-center p-6 md:p-12 relative overflow-hidden">
        <div className="z-10">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Collaborate,{" "}
            <motion.span
              className="inline-block text-blue-400"
              whileHover={{
                scale: 1.1,
                color: "#60A5FA",
                transition: { duration: 0.2 },
              }}
            >
              sync
            </motion.span>{" "}
            and thrive
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your workflow with our powerful collaboration platform.
            Connect, create, and collaborate in real-time.
          </motion.p>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64 md:h-96"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* TODO : Add Banner image here */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a43] via-[#1a2a43]/80 to-transparent" />
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
          {state === "SignIn" ? (
            <SignInCard setState={setState} />
          ) : (
            <SignUpCard setState={setState} />
          )}
        </div>
      </div>
    </div>
  );
};
