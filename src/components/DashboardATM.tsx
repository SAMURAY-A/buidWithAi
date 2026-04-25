'use client';

import { useState, useMemo } from 'react';
import { atms } from '../data/atmData';
import { calculateDuration } from '../utils/calculateDuration';
import InputPanel from './InputPanel';
import ResultCard from './ResultCard';
import NetworkMap from './NetworkMap';
import { motion } from 'framer-motion';
import { Target, Activity, ShieldCheck } from 'lucide-react';

interface DashboardATMProps {
  selectedAtmId: string;
}

export default function DashboardATM({ selectedAtmId }: DashboardATMProps) {
  const [cashAmount, setCashAmount] = useState(80);
  const [dayType, setDayType] = useState('weekday');

  const currentAtm = useMemo(() => atms.find(a => a.id === selectedAtmId) || atms[0], [selectedAtmId]);

  const prediction = useMemo(() => {
    return calculateDuration(selectedAtmId, cashAmount * 1000000, dayType);
  }, [selectedAtmId, cashAmount, dayType]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Controls & Map */}
      <div className="lg:col-span-4 space-y-8">
        <div className="glass-card rounded-3xl p-1">
          <div className="bg-[#0f172a]/60 rounded-[22px] p-6">
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
      
      {/* Right Column: Prediction Details */}
      <div className="lg:col-span-8 space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           {[
             { label: 'Health Score', value: `${currentAtm.healthScore}%`, icon: ShieldCheck, color: 'text-emerald-400' },
             { label: 'Current Load', value: `${Math.round((currentAtm.currentCash/currentAtm.capacity)*100)}%`, icon: Activity, color: 'text-blue-400' },
             { label: 'Location Bias', value: currentAtm.type, icon: Target, color: 'text-purple-400' },
           ].map((stat, i) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card rounded-2xl p-4 flex items-center space-x-4"
             >
                <div className={`p-3 rounded-xl bg-slate-900/50 ${stat.color}`}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{stat.label}</div>
                   <div className="text-xl font-black text-white">{stat.value}</div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="glass-card rounded-3xl p-1 overflow-hidden">
          <div className="bg-[#0f172a]/40 backdrop-blur-xl rounded-[22px] p-8">
             <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    Depletion Forecast
                    <span className="ml-3 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase">AI Model v4.2</span>
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">Simulated depletion curve based on historical hourly rates.</p>
                </div>
             </div>
             
             <ResultCard prediction={prediction} />
          </div>
        </div>
      </div>
    </div>
  );
}
