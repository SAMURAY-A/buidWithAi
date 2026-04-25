'use client';

import { atms } from '../data/atmData';
import { optimizeRoute } from '../utils/optimizeRoute';
import { Truck, ShieldAlert, BarChart3, Navigation, Route, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/context/LanguageContext';

export default function DashboardGlobal() {
  const { t } = useI18n();
  const criticalAtms = atms.filter(a => a.currentCash < a.capacity * 0.2);
  const { optimizedRoute, totalDistance, savings } = optimizeRoute(criticalAtms);

  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 glass-card rounded-3xl overflow-hidden p-1 transition-colors">
          <div className="bg-card/40 p-8 rounded-[22px] h-full relative">
             <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-black text-foreground flex items-center">
                    <Truck className="mr-4 text-accent" size={32} /> 
                    {t('predictiveLogistics')}
                  </h3>
                </div>
                <div className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black border border-emerald-500/20 uppercase tracking-widest">
                  {t('costReduction')}: {savings}%
                </div>
             </div>
             
             <div className="bg-background/60 p-8 rounded-3xl border border-border relative overflow-hidden group transition-colors">
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-4">
                     <div className="bg-accent px-4 py-2 rounded-xl text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-accent/20">HQ</div>
                     {optimizedRoute.map((atm, i) => (
                       <motion.div 
                        key={atm.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex items-center"
                       >
                          <div className="w-8 h-[2px] bg-border"></div>
                          <div className="bg-card border border-border p-3 rounded-2xl flex items-center space-x-3 hover:border-accent/50 transition-colors cursor-pointer group/node">
                            <div className="w-2 h-2 rounded-full bg-red-500 group-hover/node:animate-ping"></div>
                            <span className="text-xs font-bold text-foreground">{atm.name.split('—')[1]}</span>
                          </div>
                       </motion.div>
                     ))}
                  </div>
                  
                  <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                     {[
                       { label: 'Distance', value: `${totalDistance.toFixed(1)} km`, icon: Navigation, color: 'text-accent' },
                       { label: 'Time', value: '4.2 hrs', icon: Timer, color: 'text-emerald-500' },
                       { label: 'Status', value: 'Active', icon: Route, color: 'text-purple-500' },
                     ].map((stat, i) => (
                       <div key={stat.label} className="p-5 rounded-2xl bg-card border border-border transition-colors">
                          <stat.icon size={18} className={`${stat.color} mb-3`} />
                          <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">{stat.label}</div>
                          <div className="text-lg font-black text-foreground">{stat.value}</div>
                       </div>
                     ))}
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="glass-card rounded-3xl p-1 overflow-hidden transition-colors">
             <div className="bg-card/40 p-8 rounded-[22px]">
               <h3 className="text-xl font-bold text-foreground mb-8 flex items-center">
                 <ShieldAlert className="mr-3 text-red-500" size={24} /> 
                 {t('criticalAlerts')}
               </h3>
               <div className="space-y-4">
                  {criticalAtms.map((atm, i) => (
                    <motion.div 
                      key={atm.id} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors"
                    >
                       <div className="font-black text-red-500 text-sm tracking-tight">{atm.name.split('—')[1]}</div>
                    </motion.div>
                  ))}
               </div>
             </div>
           </div>

           <div className="glass-card rounded-3xl p-1 overflow-hidden transition-colors">
             <div className="bg-card/40 p-8 rounded-[22px]">
               <h3 className="text-xl font-bold text-foreground mb-8 flex items-center">
                 <BarChart3 className="mr-3 text-accent" size={24} /> 
                 {t('hqMetrics')}
               </h3>
               <div className="space-y-8">
                  <div>
                     <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2">Network Cash</div>
                     <div className="text-3xl font-black text-foreground">1,482.5M</div>
                  </div>
                  <div>
                     <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2">Optimization</div>
                     <div className="text-3xl font-black text-accent">88.4%</div>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
