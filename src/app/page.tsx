'use client';

import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingState from '@/components/LoadingState';
import ResultDisplay, { ExplanationResult } from '@/components/ResultDisplay';

export default function Home() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ExplanationResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error('السيرفر متعطل، جرب مره ثانية.');

      const data = await res.json();
      if(data.error) throw new Error(data.error);
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ غير متوقع!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-cyan-500/30 overflow-hidden font-sans relative" dir="rtl">
      {/* Background ambient light */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <main className="container mx-auto max-w-screen-2xl h-screen flex flex-col lg:flex-row p-6 lg:p-8 xl:p-12 gap-8 lg:gap-12 relative z-10">
        
        {/* LEFT WORKSPACE (INPUT) */}
        <motion.section 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-5/12 xl:w-1/3 flex flex-col h-full lg:justify-center relative shrink-0"
        >
          <div className="mb-10 lg:mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 mb-6 tracking-tight drop-shadow-sm">
              Tech Simplifier.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              مساحتك الخاصة كمهندس. ألصق النصوص التقنية الإنجليزية المعقدة، ودعنا نفككها لك بشفافية واحترافية عالية.
            </p>
          </div>

          <div className="relative group rounded-[2.5rem] p-[2px] bg-gradient-to-b from-white/10 to-transparent transition-all duration-700 focus-within:from-cyan-500/40 focus-within:to-indigo-500/20 shadow-2xl">
            <div className="bg-[#09090b]/90 backdrop-blur-3xl rounded-[2.4rem] overflow-hidden flex flex-col min-h-[300px] lg:h-[450px] border border-white/5">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the deep technical documentation here..."
                className="w-full flex-1 bg-transparent p-8 text-white placeholder-slate-600 focus:outline-none resize-none text-xl font-mono leading-relaxed tracking-wide"
                dir="ltr"
              />
              
              <div className="p-4 bg-white/[0.02]">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !text.trim()}
                  className="w-full flex items-center justify-center gap-3 py-4 lg:py-5 rounded-2xl bg-white text-[#09090b] font-bold text-lg hover:bg-slate-200 active:scale-[0.98] disabled:bg-white/10 disabled:text-slate-600 disabled:scale-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:shadow-none hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] disabled:cursor-not-allowed cursor-pointer"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>{isLoading ? 'جاري الفهم العميق...' : 'بسطها لي'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* RIGHT OUTPUT (BENTO GRID) */}
        <section className="w-full lg:w-7/12 xl:w-2/3 h-full overflow-y-auto pb-32 lg:pb-0 scrollbar-hide pt-10 lg:pt-0">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(20px)" }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center min-h-[500px]"
              >
                <LoadingState />
              </motion.div>
            )}

            {!isLoading && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center min-h-[500px]"
              >
                <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl p-10 rounded-[3rem] flex flex-col items-center text-center">
                  <X className="w-16 h-16 text-red-500 mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                  <p className="text-xl text-red-200 font-semibold">{error}</p>
                </div>
              </motion.div>
            )}

            {!isLoading && result && !error && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="min-h-full py-4 lg:py-12"
              >
                <ResultDisplay result={result} />
              </motion.div>
            )}

            {!isLoading && !result && !error && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-slate-700 font-mono text-center border-2 border-dashed border-white/5 rounded-[3rem] min-h-[400px] lg:min-h-full"
              >
                <Sparkles className="w-20 h-20 mb-6 opacity-20" />
                <p className="text-xl font-semibold tracking-widest uppercase">Awaiting Transmission</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>
    </div>
  );
}
