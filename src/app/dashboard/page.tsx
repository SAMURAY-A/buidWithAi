'use client';

import { useState, useMemo, useEffect } from 'react';
import { atms } from '@/data/atmData';
import DashboardATM from '@/components/DashboardATM';
import DashboardBank from '@/components/DashboardBank';
import DashboardGlobal from '@/components/DashboardGlobal';
import ATMSelector from '@/components/ATMSelector';
import { useI18n } from '@/context/LanguageContext';
import Link from 'next/link';
import { LayoutDashboard, Building2, Globe, Cpu, Menu, X, Bell, Search, Sun, Moon, Languages, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useBank } from '@/context/BankContext';
import NotificationDropdown from '@/components/NotificationDropdown';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useI18n();
  const { atms, notifications } = useBank();
  const [activeTab, setActiveTab] = useState<'atm' | 'bank' | 'global'>('atm');
  const [selectedAtmId, setSelectedAtmId] = useState(atms[0].id);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: 'atm', label: t('unitAnalysis'), icon: LayoutDashboard, color: 'text-blue-400' },
    { id: 'bank', label: t('branchFlow'), icon: Building2, color: 'text-emerald-400' },
    { id: 'global', label: t('globalHq'), icon: Globe, color: 'text-purple-400' },
  ] as const;

  const currentAtm = useMemo(() => atms.find(a => a.id === selectedAtmId) || atms[0], [selectedAtmId, atms]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none -z-10"></div>

      {/* Persistent Left Sidebar */}
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
            <span className="font-black text-lg tracking-tight italic">{t('title').split(' ')[0]}<span className="text-blue-500">{t('title').split(' ')[1]}</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 space-y-2">
            <Link 
              href="/live-routing"
              className="w-full flex items-center space-x-3 p-3 rounded-xl bg-muted/40 border border-transparent hover:border-accent hover:bg-accent/5 text-muted-foreground hover:text-accent transition-all group"
            >
              <MapIcon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold truncate">Live Monitoring & Routing</span>
            </Link>
          </div>
          <div className="flex-1 overflow-hidden">
            <ATMSelector atms={atms} selectedId={selectedAtmId} onSelect={setSelectedAtmId} />
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
           <div className="bg-muted p-3 rounded-xl border border-border flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold mr-3 text-white">SK</div>
              <div className="min-w-0">
                 <div className="text-xs font-bold truncate">Samuray Kh.</div>
                 <div className="text-[10px] text-muted-foreground uppercase tracking-tighter">Senior Architect</div>
              </div>
           </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/40 backdrop-blur-md z-30 transition-colors">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <nav className="flex space-x-1 bg-muted p-1 rounded-xl border border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-1.5 rounded-lg transition-all text-xs font-bold tracking-wide uppercase ${
                    activeTab === tab.id
                      ? 'bg-card text-foreground shadow-lg shadow-black/5 border border-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon size={14} className={`mr-2 ${activeTab === tab.id ? tab.color : ''}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-muted rounded-xl border border-border p-1">
              {(['en', 'uz', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${
                    language === lang ? 'bg-card text-blue-500 shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-muted rounded-xl border border-border transition-all text-muted-foreground hover:text-blue-500"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 hover:bg-muted rounded-xl border transition-all ${isNotificationsOpen ? 'border-blue-500 bg-blue-500/5 text-blue-500' : 'border-border text-muted-foreground'}`}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
                )}
              </button>
              <NotificationDropdown isOpen={isNotificationsOpen} onClose={() => setNotificationsOpen(false)} />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>{t('systemLive')}</span>
                </div>
                <h2 className="text-4xl font-black text-foreground tracking-tight">
                  {activeTab === 'atm' ? t('realTimeAnalysis') : activeTab === 'bank' ? t('cashFlowOpt') : t('logisticsHq')}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm font-medium">
                  {activeTab === 'atm' ? `Tracking ${currentAtm.name} performance metrics.` : 
                   activeTab === 'bank' ? 'Analyzing branch-level liquidity and redistribution needs.' : 
                   'High-level overview of network health and cost reduction strategies.'}
                </p>
              </div>
              
              <div className="flex items-center bg-card backdrop-blur border border-border rounded-2xl px-5 py-3 divide-x divide-border">
                 <div className="pr-5">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Network Status</div>
                    <div className="flex items-center space-x-1.5">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                       <span className="text-xs font-bold text-emerald-500">{t('stable')}</span>
                    </div>
                 </div>
                 <div className="pl-5">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">{t('lastUpdate')}</div>
                    <div className="text-xs font-bold text-muted-foreground">2 {t('minAgo')}</div>
                 </div>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + selectedAtmId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'atm' && <DashboardATM selectedAtmId={selectedAtmId} />}
                {activeTab === 'bank' && <DashboardBank />}
                {activeTab === 'global' && <DashboardGlobal />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
