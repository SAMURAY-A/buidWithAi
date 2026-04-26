'use client';

import React, { useState } from 'react';
import { useBank } from '@/context/BankContext';
import { 
  Truck, 
  Navigation, 
  Timer,
  TrendingUp,
  Cpu,
  Brain,
  Layers,
  Search,
  Activity,
  Shield,
  Lock,
  Eye,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/context/LanguageContext';
import { format } from 'date-fns';
import NetworkMap from './NetworkMap';
import CriticalATMList from './CriticalATMList';

export default function DashboardGlobal() {
  const { t } = useI18n();
  const { atms, recommendations, securityLogs } = useBank();
  const [selectedAtmId, setSelectedAtmId] = useState<string | undefined>(undefined);
  
  const criticalAtms = atms.filter(a => a.status === 'critical');
  const securityThreats = securityLogs.length;
  
  return (
    <div className="space-y-8 pb-12">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('networkStatus'), value: '99.98%', icon: Activity, color: 'text-emerald-500' },
          { label: t('aiAccuracy'), value: '94.2%', icon: Brain, color: 'text-purple-500' },
          { label: t('costSavings'), value: '28.4%', icon: TrendingUp, color: 'text-blue-500' },
          { label: t('activeUnits'), value: atms.length, icon: Cpu, color: 'text-orange-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl flex items-center space-x-4"
          >
            <div className="p-3 rounded-2xl bg-slate-900 text-foreground">
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{stat.label}</div>
              <div className="text-xl font-black text-foreground">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
        {/* Main Map View */}
        <div className="lg:col-span-8 relative h-[400px] lg:h-full">
          <div className="absolute top-4 left-4 z-10 w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="text" 
                placeholder={t('searchNetwork')}
                className="w-full bg-slate-950/80 backdrop-blur border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-[10px] font-bold focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <NetworkMap atms={atms} selectedId={selectedAtmId} onSelect={setSelectedAtmId} />
        </div>

        {/* Critical List Side Panel */}
        <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/20 backdrop-blur-sm">
          <CriticalATMList onSelect={setSelectedAtmId} selectedId={selectedAtmId} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Logistics & Fleet Section */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-8 border-slate-800 bg-slate-950/20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center">
              <Truck className="mr-3 text-blue-500" size={24} />
              {t('logisticsHq')}
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{t('activeRoutes')}</div>
                <div className="text-lg font-black text-foreground">{Math.ceil(criticalAtms.length / 5)}</div>
              </div>
              <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin-slow"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <Navigation size={20} className="text-blue-500 mb-4" />
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{t('totalDistanceToday')}</div>
              <div className="text-xl font-black">1,248.5 <span className="text-[10px] text-slate-500 font-bold">KM</span></div>
              <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <Timer size={20} className="text-purple-500 mb-4" />
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{t('avgRefillTime')}</div>
              <div className="text-xl font-black">42.5 <span className="text-[10px] text-slate-500 font-bold">MINS</span></div>
              <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <TrendingUp size={20} className="text-emerald-500 mb-4" />
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{t('fleetFuelSaving')}</div>
              <div className="text-xl font-black">22.4 <span className="text-[10px] text-slate-500 font-bold">%</span></div>
              <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Redistribution & Cyber Section */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card rounded-3xl p-8 border-blue-500/20 bg-blue-500/5">
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center">
              <Layers className="mr-2 text-blue-500" size={20} />
              {t('redistributionMatrix')}
            </h3>
            <div className="space-y-4">
               {recommendations.slice(0, 1).map(rec => (
                 <div key={rec.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-black uppercase text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">{rec.type}</span>
                      <span className="text-[9px] text-slate-500 font-bold uppercase">{rec.priority} {t('priority')}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-100 mb-1">{rec.title}</div>
                    <p className="text-[10px] text-slate-500">{rec.description}</p>
                 </div>
               ))}
               <button className="w-full py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors">
                 {t('executeStrategy')}
               </button>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 border-red-500/20 bg-red-500/5">
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center">
              <Shield className="mr-2 text-red-500" size={20} />
              {t('securityHub')}
            </h3>
            <div className="space-y-3 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
              {securityLogs.length === 0 ? (
                <div className="text-center py-6">
                  <Lock size={20} className="mx-auto text-slate-500 opacity-20 mb-2" />
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{t('systemSecure')}</p>
                </div>
              ) : (
                securityLogs.map(log => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                      <div>
                        <div className="text-[9px] font-bold text-red-500 uppercase">{log.type}</div>
                        <div className="text-[8px] text-slate-500">{log.attackerIp} • {format(log.timestamp, 'HH:mm:ss')}</div>
                      </div>
                    </div>
                    <div className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 text-[7px] font-black uppercase">{t('blocked')}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
