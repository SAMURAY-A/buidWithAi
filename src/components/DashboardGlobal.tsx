'use client';

import { atms } from '../data/atmData';
import { optimizeRoute } from '../utils/optimizeRoute';
import { Map, Truck, ShieldAlert, BarChart3, Navigation, Ship, Route, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardGlobal() {
  const criticalAtms = atms.filter(a => a.currentCash < a.capacity * 0.2);
  const { optimizedRoute, totalDistance, savings } = optimizeRoute(criticalAtms);

  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Logistics Optimization Card */}
        <div className="lg:col-span-8 glass-card rounded-3xl overflow-hidden p-1">
          <div className="bg-[#0f172a]/40 p-8 rounded-[22px] h-full relative">
             <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center">
                    <Truck className="mr-4 text-blue-500" size={32} /> 
                    Predictive Logistics
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">AI-driven route optimization for critical unit refills.</p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-2xl text-[10px] font-black border border-emerald-500/20 uppercase tracking-widest">
                  EST. {savings}% COST REDUCTION
                </div>
             </div>
             
             <div className="bg-[#020617]/60 p-8 rounded-3xl border border-slate-800/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Route size={200} className="rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                </div>
                
                <div className="relative z-10">
                  <div className="text-[11px] text-slate-500 mb-6 uppercase tracking-[0.3em] font-black flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    Dynamic Route Protocol
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                     <div className="bg-blue-600 px-4 py-2 rounded-xl text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20">BANK HQ</div>
                     {optimizedRoute.map((atm, i) => (
                       <motion.div 
                        key={atm.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex items-center"
                       >
                          <div className="w-8 h-[2px] bg-slate-800"></div>
                          <div className="bg-slate-900 border border-slate-700 p-3 rounded-2xl flex items-center space-x-3 hover:border-blue-500/50 transition-colors cursor-pointer group/node">
                            <div className="w-2 h-2 rounded-full bg-red-500 group-hover/node:animate-ping"></div>
                            <span className="text-xs font-bold text-slate-200">{atm.name.split('—')[1]}</span>
                          </div>
                       </motion.div>
                     ))}
                  </div>
                  
                  <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                     {[
                       { label: 'Total Distance', value: `${totalDistance.toFixed(1)} km`, icon: Navigation, color: 'text-blue-400' },
                       { label: 'Time Saved', value: '4.2 hrs', icon: Timer, color: 'text-emerald-400' },
                       { label: 'Fuel Impact', value: '-18%', icon: Ship, color: 'text-purple-400' },
                     ].map((stat, i) => (
                       <div key={stat.label} className="p-5 rounded-2xl bg-[#020617]/80 border border-slate-800/50">
                          <stat.icon size={18} className={`${stat.color} mb-3`} />
                          <div className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-1">{stat.label}</div>
                          <div className="text-lg font-black text-white">{stat.value}</div>
                       </div>
                     ))}
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Network Health Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="glass-card rounded-3xl p-1 overflow-hidden">
             <div className="bg-[#0f172a]/40 p-8 rounded-[22px]">
               <h3 className="text-xl font-bold text-white mb-8 flex items-center">
                 <ShieldAlert className="mr-3 text-red-500" size={24} /> 
                 Critical Alerts
               </h3>
               <div className="space-y-4">
                  {criticalAtms.length > 0 ? criticalAtms.map((atm, i) => (
                    <motion.div 
                      key={atm.id} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 group cursor-pointer hover:bg-red-500/10 transition-colors"
                    >
                       <div className="flex justify-between items-start">
                          <div className="font-black text-red-400 text-sm tracking-tight">{atm.name.split('—')[1]}</div>
                          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest px-2 py-0.5 bg-red-500/10 rounded-md">Urgent</span>
                       </div>
                       <div className="text-[11px] text-red-500/70 mt-2 font-medium">Predicted depletion: <span className="font-black">~4.5 hours</span></div>
                       <div className="mt-3 h-1 w-full bg-red-950/30 rounded-full overflow-hidden">
                          <div className="h-full bg-red-600 w-1/4 animate-pulse"></div>
                       </div>
                    </motion.div>
                  )) : (
                    <div className="text-slate-500 text-sm italic py-8 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                      System optimal. No alerts.
                    </div>
                  )}
               </div>
             </div>
           </div>

           <div className="glass-card rounded-3xl p-1 overflow-hidden">
             <div className="bg-[#0f172a]/40 p-8 rounded-[22px]">
               <h3 className="text-xl font-bold text-white mb-8 flex items-center">
                 <BarChart3 className="mr-3 text-blue-500" size={24} /> 
                 HQ Metrics
               </h3>
               <div className="space-y-8">
                  <div>
                     <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Network Cash Balance</div>
                     <div className="text-3xl font-black text-white">1,482.5M <span className="text-sm font-normal text-slate-600 tracking-normal">UZS</span></div>
                     <div className="mt-2 text-[10px] text-emerald-500 font-bold">+12% from last cycle</div>
                  </div>
                  <div>
                     <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Optimization Rate</div>
                     <div className="text-3xl font-black text-blue-500">88.4%</div>
                     <div className="w-full h-1.5 bg-slate-900 rounded-full mt-3">
                        <div className="h-full bg-blue-600 rounded-full w-[88%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                     </div>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
