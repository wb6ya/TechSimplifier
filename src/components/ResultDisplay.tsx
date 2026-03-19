'use client';

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { BookOpen, MonitorPlay, FileText, ChevronRight, ChevronDown } from 'lucide-react';

const renderMarkdownToHTML = (text: string) => {
  if (!text) return '';
  
  let html = text;

  // 1. Bold Text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
  
  // 2. Tables
  const tableRegex = /\|(.+)\|\n\|([-:| ]+)\|\n((?:\|.*\|\n?)*)/g;
  html = html.replace(tableRegex, (match, headerChunk, separatorChunk, bodyChunk) => {
    const headers = headerChunk.split('|').filter((h: string) => h.trim() !== '').map((h: string) => `<th class="p-4 border-b border-white/10 text-slate-300 font-semibold text-right">${h.trim()}</th>`).join('');
    
    const rows = bodyChunk.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim() !== '' || c.includes(' ')).map((c: string) => `<td class="p-4 border-b border-white/5 text-slate-200">${c.trim()}</td>`).join('');
      return `<tr class="hover:bg-white/5 transition-colors">${cells}</tr>`;
    }).join('');
    
    return `<div class="overflow-x-auto my-8 rounded-2xl border border-white/10 bg-[#09090b]/40 backdrop-blur-md shadow-lg"><table class="w-full text-right border-collapse"><thead class="bg-white/[0.05]"><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
  });

  // 3. Bullet points (Lists)
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc text-slate-200 mb-2">$1</li>');
  html = html.replace(/- (.*$)/gim, '<li class="ml-6 list-disc text-slate-200 mb-2">$1</li>');

  // 4. Paragraphs and Line Breaks
  const segments = html.split('\n\n');
  const finalHtml = segments.map(segment => {
    if (segment.trim().startsWith('<div') || segment.trim().startsWith('<li')) {
      return segment;
    }
    return `<p class="mb-5 leading-relaxed text-slate-300 font-medium text-lg lg:text-xl">${segment.replace(/\n/g, '<br />')}</p>`;
  }).join('');

  return finalHtml;
};

export interface ExplanationResult {
  explanation: string;
  terms: { term: string; definition: string }[];
  resources: { title: string; url?: string; type?: string; keyword?: string }[];
}

export default function ResultDisplay({ result }: { result: ExplanationResult }) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // Bento Box Framer Variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 80, damping: 20 } }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6 pb-20"
    >
      
      {/* EXPLANATION CARD (Spans full width or large area) */}
      <motion.div variants={itemVars} className="xl:col-span-3 bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 lg:p-14 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <h2 className="text-white text-3xl font-bold mb-10 flex items-center gap-4">
          <span className="w-2 h-8 rounded-full bg-cyan-500 inline-block shadow-[0_0_20px_rgba(6,182,212,0.6)]"></span>
          الجوهر التقني
        </h2>
        
        <div 
          className="prose prose-invert max-w-none prose-p:leading-[2.2] prose-p:text-slate-300 font-medium tracking-wide text-right"
          dangerouslySetInnerHTML={{ __html: renderMarkdownToHTML(result.explanation) }}
        />
      </motion.div>

      {/* TERMS ACCORDION (Dropdown) */}
      <motion.div variants={itemVars} className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-xl relative overflow-hidden group">
        <button 
          onClick={() => setIsTermsOpen(!isTermsOpen)}
          className="w-full flex items-center justify-between p-8 lg:px-12 lg:py-10 text-left outline-none"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl shadow-inner border border-indigo-500/20">
              <BookOpen className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-white text-2xl font-bold">مصطلحات مستخرجة</h3>
          </div>
          <div className={`p-3 rounded-full bg-white/5 transition-all duration-500 ${isTermsOpen ? 'rotate-180 bg-white/10' : 'rotate-0'}`}>
            <ChevronDown className="w-6 h-6 text-white/70" />
          </div>
        </button>

        <AnimatePresence>
          {isTermsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="px-8 pb-10 lg:px-12 flex flex-wrap gap-4 border-t border-white/5 pt-8">
                {result.terms && result.terms.length > 0 ? result.terms.map((t, i) => (
                  <div key={i} className="group/chip relative bg-[#09090b]/60 border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-2 shadow-xl hover:shadow-indigo-500/10 flex-1 min-w-[250px]">
                    <span className="text-indigo-300 font-mono font-bold text-xl block mb-3" dir="ltr">{t.term}</span>
                    <span className="text-slate-400 text-sm md:text-base font-medium leading-relaxed block">{t.definition}</span>
                  </div>
                )) : (
                  <div className="p-8 border-2 border-dashed border-white/5 rounded-3xl w-full flex items-center justify-center">
                    <p className="text-slate-600 font-mono text-sm">No terms detected.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* RESOURCES ACCORDION (Dropdown) */}
      <motion.div variants={itemVars} className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-xl relative overflow-hidden group">
        <button 
          onClick={() => setIsResourcesOpen(!isResourcesOpen)}
          className="w-full flex items-center justify-between p-8 lg:px-12 lg:py-10 text-left outline-none"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-500/10 rounded-2xl shadow-inner border border-slate-500/20">
              <ChevronRight className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-white text-2xl font-bold">المصادر الموثوقة</h3>
          </div>
          <div className={`p-3 rounded-full bg-white/5 transition-all duration-500 ${isResourcesOpen ? 'rotate-180 bg-white/10' : 'rotate-0'}`}>
            <ChevronDown className="w-6 h-6 text-white/70" />
          </div>
        </button>

        <AnimatePresence>
          {isResourcesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="px-8 pb-10 lg:px-12 flex flex-col gap-4 border-t border-white/5 pt-8">
                {result.resources && result.resources.length > 0 ? result.resources.map((res, i) => {
                  // Fallback checks for older structure or missing urls
                  const legacyKeyword = res.keyword;
                  const isDoc = res.type?.includes('doc') || !(res.url || legacyKeyword || res.title)?.includes('youtube');
                  const Icon = isDoc ? FileText : MonitorPlay;
                  
                  const linkUrl = res.url || (isDoc 
                    ? `https://www.google.com/search?q=${encodeURIComponent(legacyKeyword || res.title)}` 
                    : `https://www.youtube.com/results?search_query=${encodeURIComponent(legacyKeyword || res.title)}`);

                  return (
                    <a 
                      key={i}
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-[#09090b]/60 border border-white/5 rounded-[1.5rem] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 shadow-lg group/res"
                    >
                      <div className={`p-4 rounded-full transition-all duration-300 shrink-0 ${isDoc ? 'bg-blue-500/10 text-blue-400 group-hover/res:bg-blue-500/20 group-hover/res:shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-red-500/10 text-red-500 group-hover/res:bg-red-500/20 group-hover/res:shadow-[0_0_20px_rgba(239,68,68,0.3)]'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 overflow-hidden pr-2 flex flex-col justify-center">
                        <h4 className="text-slate-200 font-bold text-base md:text-lg leading-snug truncate group-hover/res:text-white transition-colors">{res.title}</h4>
                        <span className="text-slate-500 text-xs md:text-sm font-mono tracking-widest mt-1 block group-hover/res:text-slate-400 truncate" dir="ltr">{linkUrl.replace('https://www.', '')}</span>
                      </div>
                    </a>
                  );
                }) : (
                  <div className="p-8 border-2 border-dashed border-white/5 rounded-3xl w-full flex items-center justify-center">
                    <p className="text-slate-600 font-mono text-sm">No resources provided.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
}
