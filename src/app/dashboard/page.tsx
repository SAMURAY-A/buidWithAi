'use client';

import { useState, useMemo, useEffect } from 'react';
import DashboardATM from '@/components/DashboardATM';
import DashboardBank from '@/components/DashboardBank';
import DashboardGlobal from '@/components/DashboardGlobal';
import ATMSelector from '@/components/ATMSelector';
import { useI18n } from '@/context/LanguageContext';
import Link from 'next/link';
import { LayoutDashboard, Building2, Globe, Cpu, Menu, X, Bell, Sun, Moon, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useBank } from '@/context/BankContext';
import NotificationDropdown from '@/components/NotificationDropdown';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
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
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none -z-10 opacity-40"></div>

      {/* Persistent Left Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="relative h-full bg-slate-950/40 backdrop-blur-3xl border-r border-slate-800 flex flex-col z-40 overflow-hidden transition-all"
      >
        <div className="p-6 h-20 flex items-center border-b border-slate-800 bg-slate-900/20">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Cpu size={20} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight italic">ATM<span className="text-blue-500">OPT</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 space-y-2">
            <Link 
              href="/live-routing"
              className="w-full flex items-center space-x-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500 hover:bg-blue-500/10 text-slate-400 hover:text-blue-500 transition-all group"
            >
              <MapIcon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest truncate">Live Monitoring</span>
            </Link>
          </div>
          <div className="flex-1 overflow-hidden">
            <ATMSelector atms={atms} selectedId={selectedAtmId} onSelect={setSelectedAtmId} />
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/20">
           <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black mr-3 text-white shadow-lg shadow-blue-500/20">SK</div>
              <div className="min-w-0">
                 <div className="text-xs font-black truncate text-slate-100">Samuray Kh.</div>
                 <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Lead AI Architect</div>
              </div>
           </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/40 backdrop-blur-md z-30 transition-all">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <nav className="flex space-x-1 bg-slate-900/50 p-1 rounded-2xl border border-slate-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-2 rounded-xl transition-all text-[10px] font-black tracking-widest uppercase ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-foreground shadow-xl border border-slate-700'
                      : 'text-slate-500 hover:text-foreground'
                  }`}
                >
                  <tab.icon size={14} className={`mr-2 ${activeTab === tab.id ? tab.color : ''}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all text-slate-400 hover:text-blue-500"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2.5 hover:bg-slate-800 rounded-xl border transition-all ${isNotificationsOpen ? 'border-blue-500 bg-blue-500/10 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-800 text-slate-400'}`}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
                )}
              </button>
              <NotificationDropdown isOpen={isNotificationsOpen} onClose={() => setNotificationsOpen(false)} />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
          <div className="max-w-7xl mx-auto space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                  <span>{t('systemLive')}</span>
                </div>
                <h2 className="text-5xl font-black text-foreground tracking-tighter">
                  {activeTab === 'atm' ? t('realTimeAnalysis') : activeTab === 'bank' ? t('cashFlowOpt') : t('logisticsHq')}
                </h2>
                <p className="text-slate-400 mt-3 text-sm font-medium max-w-2xl leading-relaxed">
                  {activeTab === 'atm' ? `Deep-dive metrics for ${currentAtm.name}. AI predictive modeling active.` : 
                   activeTab === 'bank' ? 'Regional liquidity matrix and branch-to-bank capital redistribution flow.' : 
                   'National logistics oversight, route optimization, and operational cost intelligence.'}
                </p>
              </div>
              
              <div className="flex items-center bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[24px] px-6 py-4 divide-x divide-slate-800 shadow-2xl">
                 <div className="pr-6">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Network Status</div>
                    <div className="flex items-center space-x-2">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                       <span className="text-xs font-black text-emerald-500 tracking-wider">{t('stable')}</span>
                    </div>
                 </div>
                 <div className="pl-6">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{t('lastUpdate')}</div>
                    <div className="text-xs font-black text-slate-300 tracking-wider">0 {t('minAgo')}</div>
                 </div>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + selectedAtmId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
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
