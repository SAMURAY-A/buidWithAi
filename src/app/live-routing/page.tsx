'use client';

import { useState, useEffect } from 'react';
import { atms } from '@/data/atmData';
import LiveRoutingPage from '@/components/LiveRouting/LiveRoutingPage';
import { LayoutDashboard, Building2, Globe, Cpu, Menu, X, Bell, Sun, Moon, Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useI18n } from '@/context/LanguageContext';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LiveRoutingRoute() {
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useI18n();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none -z-10 opacity-30"></div>

      {/* Sidebar (Duplicated for routing adherence) */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="relative h-full bg-sidebar backdrop-blur-3xl border-r border-sidebar-border flex flex-col z-40 overflow-hidden transition-colors"
      >
        <div className="p-6 h-20 flex items-center border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Cpu size={20} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight italic">ATM<span className="text-blue-500">OPT</span></span>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2">
           <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-xl text-muted-foreground hover:bg-muted transition-colors">
              <LayoutDashboard size={20} />
              <span className="text-sm font-bold">Dashboard</span>
           </Link>
           <div className="flex items-center space-x-3 p-3 rounded-xl bg-accent/10 border border-accent text-accent shadow-lg shadow-accent/10">
              <MapIcon size={20} />
              <span className="text-sm font-bold">Live Monitoring</span>
           </div>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/40 backdrop-blur-md z-30 transition-colors">
          <div className="flex items-center space-x-6">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="text-lg font-black tracking-tight uppercase">Live Monitoring & Routing</h2>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 hover:bg-muted rounded-xl border border-border transition-all text-muted-foreground hover:text-blue-500">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto">
             <LiveRoutingPage />
          </div>
        </div>
      </div>
    </div>
  );
}
