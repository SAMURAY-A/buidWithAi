'use client';

import { useState, useMemo } from 'react';
import { atms } from '../data/atmData';
import { calculateDuration } from '../utils/calculateDuration';
import DashboardATM from '../components/DashboardATM';
import DashboardBank from '../components/DashboardBank';
import DashboardGlobal from '../components/DashboardGlobal';
import ATMSelector from '../components/ATMSelector';
import { LayoutDashboard, Building2, Globe, Cpu, Menu, X, Bell, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'atm' | 'bank' | 'global'>('atm');
  const [selectedAtmId, setSelectedAtmId] = useState(atms[0].id);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: 'atm', label: 'Unit Analysis', icon: LayoutDashboard, color: 'text-blue-400' },
    { id: 'bank', label: 'Branch Flow', icon: Building2, color: 'text-emerald-400' },
    { id: 'global', label: 'Global HQ', icon: Globe, color: 'text-purple-400' },
  ] as const;

  const currentAtm = useMemo(() => atms.find(a => a.id === selectedAtmId) || atms[0], [selectedAtmId]);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none -z-10 opacity-50"></div>

      {/* Persistent Left Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="relative h-full bg-[#03081c]/50 backdrop-blur-3xl border-r border-slate-800 flex flex-col z-40 overflow-hidden"
      >
        <div className="p-6 h-20 flex items-center border-b border-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Cpu size={20} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight text-white italic">ATM<span className="text-blue-500">OPT</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ATMSelector atms={atms} selectedId={selectedAtmId} onSelect={setSelectedAtmId} />
        </div>

        <div className="p-4 border-t border-slate-800/50">
           <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold mr-3">SK</div>
              <div className="min-w-0">
                 <div className="text-xs font-bold truncate">Samuray Kh.</div>
                 <div className="text-[10px] text-slate-500 uppercase tracking-tighter">Senior Architect</div>
              </div>
           </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-8 bg-[#020617]/40 backdrop-blur-md z-30">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <nav className="flex space-x-1 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-1.5 rounded-lg transition-all text-xs font-bold tracking-wide uppercase ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-white shadow-lg shadow-black/20'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <tab.icon size={14} className={`mr-2 ${activeTab === tab.id ? tab.color : ''}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-500">
              <Search size={14} className="mr-3" />
              <span>Search network...</span>
              <span className="ml-4 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">⌘K</span>
            </div>
            <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617]"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>System Live</span>
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight">
                  {activeTab === 'atm' ? 'Real-time Duration Analysis' : activeTab === 'bank' ? 'Cash Flow Optimization' : 'Global Logistics HQ'}
                </h2>
                <p className="text-slate-500 mt-2 text-sm font-medium">
                  {activeTab === 'atm' ? `Tracking ${currentAtm.name} performance metrics.` : 
                   activeTab === 'bank' ? 'Analyzing branch-level liquidity and redistribution needs.' : 
                   'High-level overview of network health and cost reduction strategies.'}
                </p>
              </div>
              
              <div className="flex items-center bg-slate-900/40 backdrop-blur border border-slate-800 rounded-2xl px-5 py-3 divide-x divide-slate-800">
                 <div className="pr-5">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Network Status</div>
                    <div className="flex items-center space-x-1.5">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                       <span className="text-xs font-bold text-emerald-400">Stable</span>
                    </div>
                 </div>
                 <div className="pl-5">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Last Update</div>
                    <div className="text-xs font-bold text-slate-300">2 min ago</div>
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
