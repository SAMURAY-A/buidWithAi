'use client';

import { atms } from '../data/atmData';
import { DollarSign, ArrowRightLeft, TrendingUp, Zap, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardBank() {
  const totalCash = atms.reduce((acc, atm) => acc + atm.currentCash, 0);
  const excessCash = atms.filter(atm => atm.currentCash > atm.capacity * 0.7);
  const shortageAtms = atms.filter(atm => atm.currentCash < atm.capacity * 0.3);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Liquidity', value: `${(totalCash / 1000000).toFixed(1)}M`, trend: '+2.4%', icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Idle Capital', value: `${(excessCash.reduce((a, b) => a + b.currentCash, 0) / 1000000).toFixed(1)}M`, sub: `${excessCash.length} units over 70%`, icon: ArrowRightLeft, color: 'text-yellow-400' },
          { label: 'Efficiency Index', value: '94.8%', trend: '+0.8%', icon: Zap, color: 'text-blue-400' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-slate-900/50 ${item.color}`}>
                <item.icon size={24} />
              </div>
              {item.trend && (
                <div className="flex items-center text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <TrendingUp size={10} className="mr-1" /> {item.trend}
                </div>
              )}
            </div>
            <div className="text-[11px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">{item.label}</div>
            <div className="text-3xl font-black text-white">{item.value}</div>
            {item.sub && <div className="text-[10px] text-slate-600 mt-1 uppercase font-bold">{item.sub}</div>}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 glass-card rounded-3xl overflow-hidden p-1">
          <div className="bg-[#0f172a]/40 p-8 rounded-[22px]">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center">
              <ArrowRightLeft className="mr-3 text-blue-500" size={24} /> 
              Smart Redistribution Matrix
            </h3>
            <div className="space-y-4">
              {shortageAtms.map((shortage, i) => {
                const donor = excessCash[i % excessCash.length] || atms[0];
                return (
                  <motion.div
                    key={shortage.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-[#020617]/40 p-5 rounded-2xl border border-slate-800/50 flex items-center justify-between hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                        <ArrowUpFromLine size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Source</div>
                        <div className="text-sm font-bold text-slate-200">{donor.name.split('—')[1]}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="px-3 py-1 bg-blue-600/10 text-blue-400 text-[10px] font-black rounded-lg border border-blue-500/20 mb-2">
                        MOVE 40M
                      </div>
                      <div className="w-20 h-[1px] bg-gradient-to-r from-emerald-500/20 via-blue-500 to-red-500/20 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-right">
                      <div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Destination</div>
                        <div className="text-sm font-bold text-slate-200">{shortage.name.split('—')[1]}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                        <ArrowDownToLine size={18} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 glass-card rounded-3xl p-1 overflow-hidden">
          <div className="bg-[#0f172a]/40 p-8 rounded-[22px] h-full">
            <h3 className="text-xl font-bold text-white mb-8">Asset Health Monitoring</h3>
            <div className="space-y-6">
              {atms.slice(0, 7).map(atm => (
                <div key={atm.id} className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">{atm.name.split('—')[1]}</span>
                    <span className={atm.currentCash < atm.capacity * 0.3 ? 'text-red-500' : 'text-emerald-500'}>
                      {(atm.currentCash / 1000000).toFixed(0)}M / {(atm.capacity / 1000000).toFixed(0)}M
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(atm.currentCash / atm.capacity) * 100}%` }}
                      className={`h-full rounded-full ${
                        atm.currentCash < atm.capacity * 0.3 ? 'bg-gradient-to-r from-red-600 to-red-400' : 
                        atm.currentCash < atm.capacity * 0.6 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 
                        'bg-gradient-to-r from-emerald-600 to-emerald-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-widest transition-colors border border-slate-700">
              View Detailed Metrics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
