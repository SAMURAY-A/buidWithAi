'use client';

import { ATM } from '../data/atmData';
import { MapPin, Box, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/context/LanguageContext';

interface ATMSelectorProps {
  atms: ATM[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ATMSelector({ atms, selectedId, onSelect }: ATMSelectorProps) {
  const { t } = useI18n();
  
  return (
    <div className="flex flex-col h-full bg-sidebar">
      <div className="p-6 border-b border-sidebar-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">{t('selectAtm')}</h3>
        <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase tracking-wider">{atms.length} {t('unitsActive')}</p>
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
                ? 'bg-accent/10 border-accent shadow-[0_4px_20px_rgba(59,130,246,0.1)]'
                : 'bg-muted/40 border-transparent hover:border-border hover:bg-muted/60'
            }`}
          >
            <div className={`p-2 rounded-lg mr-3 ${
              selectedId === atm.id ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'
            }`}>
              <Box size={16} />
            </div>
            
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-[13px] font-bold truncate ${selectedId === atm.id ? 'text-accent' : 'text-foreground'}`}>
                  {atm.name.split('—')[1] || atm.name}
                </span>
                {atm.status === 'critical' && <AlertCircle size={12} className="text-red-500 animate-pulse" />}
              </div>
              <div className="flex items-center text-[10px] text-muted-foreground mt-0.5">
                <MapPin size={10} className="mr-1" />
                <span className="truncate">{atm.location.split(',')[0]}</span>
              </div>
              <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${atm.status === 'critical' ? 'bg-red-500' : atm.status === 'warning' ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                  style={{ width: `${(atm.currentCash / atm.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
