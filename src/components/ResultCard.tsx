'use client';

import { PredictionResult } from '../utils/calculateDuration';
import { Timer, AlertTriangle, CheckCircle2, TrendingDown, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Chart from './Chart';

interface ResultCardProps {
  prediction: PredictionResult;
}

export default function ResultCard({ prediction }: ResultCardProps) {
  const isCritical = prediction.durationHours < 24;
  const isWarning = prediction.durationHours >= 24 && prediction.durationHours < 48;

  return (
    <div className="space-y-8">
      {/* Top Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#020617]/40 p-8 rounded-3xl border border-slate-800/50 flex items-center group hover:border-blue-500/30 transition-all"
        >
          <div className={`p-5 rounded-2xl mr-6 shadow-xl transition-all duration-500 group-hover:scale-110 ${
            isCritical ? 'bg-red-500 text-white shadow-red-500/20' : 
            isWarning ? 'bg-yellow-500 text-white shadow-yellow-500/20' : 
            'bg-blue-600 text-white shadow-blue-500/20'
          }`}>
            <Timer size={32} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em] mb-1">Estimated Depletion</div>
            <div className="text-4xl font-black text-white">
              ~{Math.round(prediction.durationHours)} <span className="text-lg text-slate-600 font-normal">HRS</span>
            </div>
            <div className="flex items-center text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">
              <span className="text-emerald-500 mr-1.5">±{Math.round(prediction.durationHours * 0.1)}h</span> Confidence Interval
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#020617]/40 p-8 rounded-3xl border border-slate-800/50 flex items-center group hover:border-emerald-500/30 transition-all"
        >
          <div className="p-5 rounded-2xl mr-6 bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
            <Calendar size={32} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em] mb-1">Optimal Refill Window</div>
            <div className="text-2xl font-black text-white">
              {prediction.refillTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
              <span className="text-blue-500 mx-2">@</span>
              {prediction.refillTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center text-[10px] text-emerald-500 mt-2 font-bold uppercase tracking-widest">
              <CheckCircle2 size={12} className="mr-1.5" /> Priority: High Savings
            </div>
          </div>
        </motion.div>
      </div>

      {/* Critical Status Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-2xl border-2 flex items-center justify-between ${
          isCritical ? 'bg-red-500/10 border-red-500/20 text-red-400' :
          isWarning ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
          'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
        }`}
      >
        <div className="flex items-center">
          <AlertTriangle size={24} className="mr-4" />
          <div>
            <div className="text-sm font-black uppercase tracking-widest">
              {isCritical ? 'Critical Shortage Risk' : isWarning ? 'Warning: Low Levels' : 'System Healthy'}
            </div>
            <div className="text-xs opacity-70 font-medium">
              {isCritical ? 'ATM predicted to run empty within the current shift.' : 
               isWarning ? 'Replenishment recommended within the next 24-48 hours.' : 
               'Cash supply is stable for the foreseeable forecast window.'}
            </div>
          </div>
        </div>
        <button className="px-6 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
          Dispatch Team
        </button>
      </motion.div>

      {/* Chart Visualization */}
      <div className="bg-[#020617]/40 p-8 rounded-3xl border border-slate-800/50">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-black text-white flex items-center">
              <TrendingDown size={20} className="mr-3 text-blue-500" />
              Liquidity Depletion Trace
            </h3>
            <p className="text-slate-600 text-xs mt-1 uppercase font-bold tracking-widest">Projected 48-Hour Cash Flow Analysis</p>
          </div>
          <div className="flex space-x-4">
             <div className="flex items-center text-[10px] font-black text-slate-500 uppercase">
                <div className="w-2 h-2 rounded-full bg-blue-600 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div> Projected
             </div>
             <div className="flex items-center text-[10px] font-black text-slate-500 uppercase">
                <div className="w-2 h-2 rounded-full bg-slate-800 mr-2"></div> Confidence
             </div>
          </div>
        </div>
        <div className="h-80 w-full">
           <Chart data={prediction.depletionData} />
        </div>
      </div>
    </div>
  );
}
