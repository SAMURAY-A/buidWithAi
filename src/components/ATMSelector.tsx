'use client';

import { ATM } from '../data/atmData';
import { MapPin, Box, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ATMSelectorProps {
  atms: ATM[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ATMSelector({ atms, selectedId, onSelect }: ATMSelectorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-slate-800">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Live ATM Network</h3>
        <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-wider">{atms.length} active units tracked</p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {atms.map((atm, i) => (
          <motion.button
            key={atm.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(atm.id)}
            className={`w-full flex items-start p-3 rounded-xl transition-all duration-300 border ${
              selectedId === atm.id
                ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_4px_20px_rgba(59,130,246,0.15)]'
                : 'bg-slate-900/40 border-transparent hover:border-slate-800 hover:bg-slate-900/60'
            }`}
          >
            <div className={`p-2 rounded-lg mr-3 ${
              selectedId === atm.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'
            }`}>
              <Box size={16} />
            </div>
            
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-[13px] font-bold truncate ${selectedId === atm.id ? 'text-blue-400' : 'text-slate-300'}`}>
                  {atm.name.split('—')[1] || atm.name}
                </span>
                {atm.status === 'critical' && <AlertCircle size={12} className="text-red-500 animate-pulse" />}
              </div>
              <div className="flex items-center text-[10px] text-slate-500 mt-0.5">
                <MapPin size={10} className="mr-1" />
                <span className="truncate">{atm.location.split(',')[0]}</span>
              </div>
              
              <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(atm.currentCash / atm.capacity) * 100}%` }}
                  className={`h-full ${
                    atm.currentCash < atm.capacity * 0.2 ? 'bg-red-500' : 
                    atm.currentCash < atm.capacity * 0.5 ? 'bg-yellow-500' : 
                    'bg-emerald-500'
                  }`}
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
