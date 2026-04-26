'use client';

import { useBank } from '@/context/BankContext';
import { useI18n } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { AlertCircle, MapPin, TrendingDown } from 'lucide-react';

interface CriticalATMListProps {
  onSelect: (id: string) => void;
  selectedId?: string;
}

export default function CriticalATMList({ onSelect, selectedId }: CriticalATMListProps) {
  const { atms } = useBank();
  const { t } = useI18n();

  const criticalAtms = atms
    .filter(atm => atm.status === 'critical' || atm.status === 'warning')
    .sort((a, b) => (a.currentCash / a.capacity) - (b.currentCash / b.capacity));

  return (
    <div className="flex flex-col h-full bg-slate-950/40 border-l border-slate-800 w-80">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50">
        <h3 className="text-xs font-black text-slate-100 uppercase tracking-[0.2em] flex items-center gap-2">
          <AlertCircle size={14} className="text-red-500" />
          {t('emptyList')}
        </h3>
        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">
          {criticalAtms.length} {t('monitoring')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {criticalAtms.length > 0 ? (
          criticalAtms.map((atm, i) => {
            const percentage = Math.round((atm.currentCash / atm.capacity) * 100);
            const isCritical = atm.status === 'critical';
            
            return (
              <motion.button
                key={atm.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onSelect(atm.id)}
                className={`w-full flex flex-col p-4 rounded-xl transition-all duration-300 border ${
                  selectedId === atm.id
                    ? 'bg-blue-500/10 border-blue-500 shadow-[0_4px_20px_rgba(59,130,246,0.1)]'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isCritical ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {isCritical ? t('high') : t('medium')}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <TrendingDown size={10} />
                    {atm.predicted_depletion_time?.toFixed(1)}h
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-xs font-bold text-slate-100 truncate mb-1">
                    {atm.name.split('—')[1] || atm.name}
                  </div>
                  <div className="flex items-center text-[9px] text-slate-500 uppercase font-bold tracking-wider">
                    <MapPin size={8} className="mr-1" />
                    <span className="truncate">{atm.location}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[8px] font-black uppercase mb-1">
                    <span className="text-slate-500">{t('currentLoad')}</span>
                    <span className={isCritical ? 'text-red-500' : 'text-amber-500'}>{percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${isCritical ? 'bg-red-500' : 'bg-amber-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </motion.button>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4 text-emerald-500">
               <TrendingDown size={24} className="rotate-180" />
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{t('noCriticalAtms')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
