'use client';

import { useState, useMemo } from 'react';
import { useBank } from '@/context/BankContext';
import { calculateDuration } from '../utils/calculateDuration';
import InputPanel from './InputPanel';
import ResultCard from './ResultCard';
import { motion } from 'framer-motion';
import { Target, Activity, ShieldCheck, TrendingDown, Clock, MapPin } from 'lucide-react';
import { useI18n } from '@/context/LanguageContext';

interface DashboardATMProps {
  selectedAtmId: string;
}

export default function DashboardATM({ selectedAtmId }: DashboardATMProps) {
  const { t } = useI18n();
  const { atms } = useBank();
  const [cashAmount, setCashAmount] = useState(80);
  const [dayType, setDayType] = useState('weekday');

  const currentAtm = useMemo(() => atms.find(a => a.id === selectedAtmId) || atms[0], [selectedAtmId, atms]);

  const prediction = useMemo(() => {
    return calculateDuration(currentAtm.id, currentAtm.currentCash, dayType);
  }, [currentAtm, dayType]);

  const maintenanceHistory = [
    { date: '24 Apr', action: t('generalService'), status: t('completed') },
    { date: '18 Apr', action: t('sensorAlignment'), status: t('completed') },
    { date: '10 Apr', action: `${t('softwarePatch')} v4.2`, status: t('completed') },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 space-y-8">
        <div className="glass-card rounded-[40px] p-8 bg-slate-900/40 border-slate-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-[24px] bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
               <Activity size={32} />
            </div>
            <div>
               <h3 className="text-xl font-black text-foreground">{currentAtm.name.split('—')[1] || currentAtm.name}</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                 <MapPin size={10} /> {currentAtm.location}
               </p>
            </div>
          </div>
          
          <InputPanel 
            cashAmount={cashAmount} 
            setCashAmount={setCashAmount} 
            dayType={dayType} 
            setDayType={setDayType} 
          />
        </div>

        <div className="glass-card rounded-[32px] p-6 bg-slate-900/20 border-slate-800">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
             <Clock size={12} className="text-blue-500" />
             {t('maintenanceHistory')}
           </h4>
           <div className="space-y-4">
              {maintenanceHistory.map((log, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-[10px] font-bold text-slate-500 w-10">{log.date}</div>
                    <div className="text-xs font-bold text-slate-300">{log.action}</div>
                  </div>
                  <div className="text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{log.status}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
      
      <div className="lg:col-span-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           {[
             { label: t('healthScore'), value: `${currentAtm.healthScore}%`, icon: ShieldCheck, color: 'text-emerald-500' },
             { label: t('currentLoad'), value: `${Math.round((currentAtm.currentCash/currentAtm.capacity)*100)}%`, icon: Activity, color: 'text-blue-500' },
             { label: t('estimatedDepletion'), value: `${currentAtm.predicted_depletion_time?.toFixed(1)}h`, icon: TrendingDown, color: 'text-red-500' },
           ].map((stat, i) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card rounded-[32px] p-6 flex flex-col gap-4 border-slate-800 bg-slate-950/20"
             >
                <div className={`p-3 rounded-2xl bg-slate-900 w-fit ${stat.color}`}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{stat.label}</div>
                   <div className="text-2xl font-black text-foreground">{stat.value}</div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="glass-card rounded-[40px] p-1 overflow-hidden transition-colors border-blue-500/10">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[38px] p-10">
             <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-black text-foreground flex items-center">
                    {t('depletionForecast')}
                    <span className="ml-4 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20">Neural Engine v4.2</span>
                  </h3>
                </div>
             </div>
             
             <ResultCard prediction={prediction} />
          </div>
        </div>
      </div>
    </div>
  );
}
