'use client';

import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] relative">
      {/* Magic Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3],
          filter: ['blur(40px)', 'blur(60px)', 'blur(40px)'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-64 h-64 rounded-full bg-cyan-500/20 mix-blend-screen"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
          filter: ['blur(50px)', 'blur(80px)', 'blur(50px)'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute w-72 h-72 rounded-full bg-indigo-500/20 mix-blend-screen -z-10"
      />

      {/* Futuristic Scanner Line */}
      <div className="w-full max-w-md h-px bg-white/10 relative overflow-hidden mt-12 rounded-full">
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      </div>

      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-8 text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200 text-lg font-medium tracking-widest font-mono"
        dir="ltr"
      >
        SIMPLIFYING.AI ...
      </motion.p>
    </div>
  );
}
