'use client';

import { DollarSign, Calendar, Clock, Sparkles } from 'lucide-react';
import { useI18n } from '@/context/LanguageContext';

interface InputPanelProps {
  cashAmount: number;
  setCashAmount: (val: number) => void;
  dayType: string;
  setDayType: (val: string) => void;
}

export default function InputPanel({ cashAmount, setCashAmount, dayType, setDayType }: InputPanelProps) {
  const { t } = useI18n();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center">
          <Sparkles size={14} className="mr-2 text-accent" /> {t('predictionInputs')}
        </h3>
      </div>
      
      <div className="space-y-4">
        <label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider flex items-center">
          <DollarSign size={14} className="mr-2 text-accent" /> {t('cashAmount')}
        </label>
        <div className="relative group">
          <input
            type="number"
            value={cashAmount}
            onChange={(e) => setCashAmount(Number(e.target.value))}
            className="w-full glass-input rounded-2xl px-5 py-4 text-xl font-black text-foreground focus:outline-none placeholder-muted-foreground/30"
            placeholder={t('describeIssue')}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[50, 100, 150, 200].map((val) => (
            <button
              key={val}
              onClick={() => setCashAmount(val)}
              className={`px-4 py-2 text-[10px] font-black rounded-xl border transition-all uppercase tracking-widest ${
                cashAmount === val 
                  ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
                  : 'bg-muted/50 border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground'
              }`}
            >
              {val}M
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider flex items-center">
          <Calendar size={14} className="mr-2 text-emerald-500" /> {t('dayType')}
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { id: 'weekday', label: t('weekday') },
            { id: 'weekend', label: t('weekend') },
            { id: 'salary_day', label: t('salaryDay') }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setDayType(type.id)}
              className={`p-4 text-left rounded-2xl border transition-all group ${
                dayType === type.id
                  ? 'bg-accent/10 border-accent text-foreground shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                  : 'bg-muted/30 border-border text-muted-foreground hover:border-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="text-xs font-black uppercase tracking-tight transition-colors">
                {type.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
