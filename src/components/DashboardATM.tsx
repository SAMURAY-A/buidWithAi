'use client';

import { useState, useMemo } from 'react';
import { useBank } from '@/context/BankContext';
import { calculateDuration } from '../utils/calculateDuration';
import InputPanel from './InputPanel';
import ResultCard from './ResultCard';
import NetworkMap from './NetworkMap';
import { motion } from 'framer-motion';
import { Target, Activity, ShieldCheck, RefreshCw } from 'lucide-react';
import { useI18n } from '@/context/LanguageContext';

interface DashboardATMProps {
  selectedAtmId: string;
}

export default function DashboardATM({ selectedAtmId }: DashboardATMProps) {
  const { t } = useI18n();
  const { atms, refillAtm } = useBank();
  const [cashAmount, setCashAmount] = useState(80);
  const [dayType, setDayType] = useState('weekday');

  const currentAtm = useMemo(() => atms.find(a => a.id === selectedAtmId) || atms[0], [selectedAtmId, atms]);

  const prediction = useMemo(() => {
    // Prediction based on current real-time cash if manual input is not changed significantly
    // For demo, we still use calculateDuration but pass currentAtm.currentCash
    return calculateDuration(selectedAtmId, currentAtm.currentCash, dayType);
  }, [selectedAtmId, currentAtm.currentCash, dayType]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 space-y-8">
        <div className="glass-card rounded-3xl p-1">
          <div className="bg-card/60 rounded-[22px] p-6">
            <InputPanel 
              cashAmount={cashAmount} 
              setCashAmount={setCashAmount} 
              dayType={dayType} 
              setDayType={setDayType} 
            />
          </div>
        </div>

        <div className="h-[300px]">
          <NetworkMap atms={atms} selectedId={selectedAtmId} />
        </div>
      </div>
      
      <div className="lg:col-span-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           {[
             { label: t('healthScore'), value: `${currentAtm.healthScore}%`, icon: ShieldCheck, color: 'text-emerald-500' },
             { label: t('currentLoad'), value: `${Math.round((currentAtm.currentCash/currentAtm.capacity)*100)}%`, icon: Activity, color: 'text-accent' },
             { label: t('locationBias'), value: currentAtm.type, icon: Target, color: 'text-purple-500' },
           ].map((stat, i) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card rounded-2xl p-4 flex items-center space-x-4 transition-colors"
             >
                <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{stat.label}</div>
                   <div className="text-xl font-black text-foreground">{stat.value}</div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="glass-card rounded-3xl p-1 overflow-hidden transition-colors">
          <div className="bg-card/40 backdrop-blur-xl rounded-[22px] p-8">
             <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center">
                    {t('depletionForecast')}
                    <span className="ml-3 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">AI v4.2</span>
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
