'use client';

import { DollarSign, Calendar, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface InputPanelProps {
  cashAmount: number;
  setCashAmount: (val: number) => void;
  dayType: string;
  setDayType: (val: string) => void;
}

export default function InputPanel({ cashAmount, setCashAmount, dayType, setDayType }: InputPanelProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center">
          <Sparkles size={14} className="mr-2 text-blue-500" /> Scenario Engine
        </h3>
        <div className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-500">v4.0.1</div>
      </div>
      
      <div className="space-y-4">
        <label className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center">
          <DollarSign size={14} className="mr-2 text-blue-400" /> Capital Allocation (Millions)
        </label>
        <div className="relative group">
          <input
            type="number"
            value={cashAmount}
            onChange={(e) => setCashAmount(Number(e.target.value))}
            className="w-full glass-input rounded-2xl px-5 py-4 text-xl font-black text-white focus:outline-none placeholder-slate-700"
            placeholder="e.g. 100"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-600">UZS</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[50, 100, 150, 200].map((val) => (
            <button
              key={val}
              onClick={() => setCashAmount(val)}
              className={`px-4 py-2 text-[10px] font-black rounded-xl border transition-all uppercase tracking-widest ${
                cashAmount === val 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              {val}M
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center">
          <Calendar size={14} className="mr-2 text-emerald-400" /> Temporal Context
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { id: 'weekday', label: 'Standard Weekday', sub: 'Average usage' },
            { id: 'weekend', label: 'Peak Weekend', sub: 'High retail volume' },
            { id: 'salary_day', label: 'Salary Influx', sub: 'Critical demand' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setDayType(type.id)}
              className={`p-4 text-left rounded-2xl border transition-all group ${
                dayType === type.id
                  ? 'bg-blue-600/10 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                  : 'bg-slate-900/30 border-slate-800/50 text-slate-500 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div className="text-xs font-black uppercase tracking-tight group-hover:text-slate-200 transition-colors">
                {type.label}
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5 group-hover:text-slate-500 transition-colors uppercase font-bold">
                {type.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800/50">
        <div className="bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10 rounded-2xl p-5">
          <p className="text-[10px] text-blue-400/80 leading-relaxed font-medium">
            <span className="font-black text-blue-400 uppercase tracking-widest mr-2">Deep Learning:</span> 
            Analysis is being performed using historical data from the last 12 fiscal months. Adjusting parameters will recalibrate the depletion model in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
