'use client';

import { useI18n } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <div className="relative z-[2000]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-blue-500 transition-colors px-3 py-1.5 rounded-full"
      >
        <Globe size={14} className="text-blue-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
          {languages.find(l => l.code === language)?.label}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors hover:bg-blue-500/10 ${
                  language === lang.code ? 'text-blue-500 bg-blue-500/5' : 'text-slate-400'
                }`}
              >
                <span>{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
