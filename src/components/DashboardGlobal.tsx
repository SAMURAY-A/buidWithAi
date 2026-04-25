'use client';

import React from 'react';
import { useBank } from '@/context/BankContext';
import { 
  Truck, 
  ShieldAlert, 
  BarChart3, 
  Navigation, 
  Route, 
  Timer,
  Shield,
  Zap,
  TrendingUp,
  Cpu,
  Lock,
  Eye,
  AlertCircle,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/context/LanguageContext';
import { format } from 'date-fns';

export default function DashboardGlobal() {
  const { t } = useI18n();
  const { atms, securityLogs, recommendations } = useBank();
  
  const criticalAtms = atms.filter(a => a.status === 'critical');
  const totalAtmCash = atms.reduce((acc, atm) => acc + atm.currentCash, 0);

  // Mock Logistics Optimization Calculation
  const logisticsEfficiency = 84.2;
  const savingsAmount = "12.4M";

  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Predictive Logistics Section */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card rounded-3xl overflow-hidden p-1 transition-colors">
            <div className="bg-card/40 p-8 rounded-[22px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center">
                  <Truck className="mr-3 text-accent" size={24} />
                  Logistics Optimization Matrix
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                    Efficiency: {logisticsEfficiency}%
                  </span>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-[32px] p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center font-black text-xs shadow-lg shadow-accent/20 border border-white/20">HQ</div>
                    {criticalAtms.slice(0, 4).map((atm, i) => (
                      <React.Fragment key={atm.id}>
                        <div className="w-10 h-[2px] bg-gradient-to-r from-accent/20 to-accent/20"></div>
                        <div className="px-4 py-2 rounded-xl bg-card border border-border flex items-center space-x-3 shadow-sm group hover:border-accent transition-all cursor-help">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                          <span className="text-xs font-bold">{atm.name.split('—')[1]}</span>
                        </div>
                      </React.Fragment>
                    ))}
                    {criticalAtms.length > 4 && (
                      <div className="text-xs font-bold text-muted-foreground ml-2">+{criticalAtms.length - 4} more</div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Total Distance', value: '42.8 km', icon: Navigation, color: 'text-blue-500' },
                      { label: 'Travel Time', value: '1.5 hrs', icon: Timer, color: 'text-purple-500' },
                      { label: 'Fuel Saved', value: '12.4%', icon: TrendingUp, color: 'text-emerald-500' },
                      { label: 'Units Served', value: criticalAtms.length, icon: Route, color: 'text-orange-500' },
                    ].map(stat => (
                      <div key={stat.label} className="p-4 rounded-2xl bg-card/60 border border-border">
                        <stat.icon size={16} className={`${stat.color} mb-2`} />
                        <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-0.5">{stat.label}</div>
                        <div className="text-sm font-black">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights & Cybersecurity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Business Insights */}
            <div className="glass-card rounded-3xl p-8 transition-colors">
              <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center">
                <Brain className="mr-2 text-purple-500" size={20} />
                AI Business Insights
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'High Demand Zone', value: 'Chilonzor-9', score: 98 },
                  { label: 'Best ATM Location', value: 'Airport T2', score: 94 },
                  { label: 'Refill Efficiency', value: 'Global', score: 87 },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold">{item.label}</span>
                      <span className="text-[10px] font-black text-purple-500">{item.score}/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-foreground">{item.value}</span>
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${item.score}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cybersecurity Panel */}
            <div className="glass-card rounded-3xl p-8 transition-colors bg-slate-950/20">
              <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center">
                <Shield className="mr-2 text-red-500" size={20} />
                Cybersecurity Hub
              </h3>
              <div className="space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                {securityLogs.length === 0 ? (
                  <div className="text-center py-10">
                    <Lock size={24} className="mx-auto text-muted-foreground opacity-20 mb-2" />
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">System Secure</p>
                  </div>
                ) : (
                  securityLogs.map(log => (
                    <div key={log.id} className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <div>
                          <div className="text-[10px] font-bold text-red-500 uppercase">{log.type}</div>
                          <div className="text-[9px] text-muted-foreground">{log.attackerIp} • {format(log.timestamp, 'HH:mm:ss')}</div>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-500 text-[8px] font-black uppercase">Blocked</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center">
              <Cpu className="mr-2 text-blue-500" size={20} />
              AI Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.length === 0 ? (
                <div className="text-center py-8">
                  <Zap size={24} className="mx-auto text-muted-foreground opacity-20 mb-2" />
                  <p className="text-xs text-muted-foreground font-medium">All systems optimized</p>
                </div>
              ) : (
                recommendations.map(rec => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-2xl border ${rec.priority === 'high' ? 'bg-red-500/5 border-red-500/20' : 'bg-card border-border'}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 p-1.5 rounded-lg ${rec.priority === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                        <AlertCircle size={14} />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-tight mb-1">{rec.title}</div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">{rec.description}</p>
                        <button className="mt-3 text-[9px] font-black uppercase text-accent hover:underline tracking-widest">Execute Strategy</button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 transition-colors">
            <h3 className="text-lg font-black uppercase tracking-tight mb-6">Network Health</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Global Uptime</div>
                    <div className="text-2xl font-black">99.98%</div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow"></div>
               </div>
               
               <div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                    <span className="text-muted-foreground">Cash Distribution</span>
                    <span>Optimized</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: '85%' }}></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
