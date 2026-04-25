'use client';

import React from 'react';
import { useBank } from '@/context/BankContext';
import { 
  DollarSign, 
  ArrowRightLeft, 
  Zap, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Building2, 
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/context/LanguageContext';

export default function DashboardBank() {
  const { t } = useI18n();
  const { atms, branches, centralBankCash, transferToCentralBank } = useBank();
  
  const totalAtmCash = atms.reduce((acc, atm) => acc + atm.currentCash, 0);
  const totalBranchCash = branches.reduce((acc, b) => acc + b.totalCash, 0);
  const systemLiquidity = totalAtmCash + totalBranchCash + centralBankCash;

  const excessBranches = branches.filter(b => b.totalCash > b.maxThreshold);

  return (
    <div className="space-y-8 pb-10">
      {/* Central Bank Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-3xl md:col-span-2 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Building2 size={80} />
          </div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Building2 size={20} />
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Central Bank Reserve</span>
          </div>
          <div className="text-4xl font-black text-foreground mb-2">{(centralBankCash / 1000000000).toFixed(2)}B <span className="text-sm font-bold text-muted-foreground">UZS</span></div>
          <div className="flex items-center text-xs font-bold text-emerald-500">
            <TrendingUp size={14} className="mr-1" />
            +1.2% from last cycle
          </div>
        </motion.div>

        {[
          { label: 'System Liquidity', value: `${(systemLiquidity / 1000000000).toFixed(1)}B`, icon: Zap, color: 'text-accent' },
          { label: 'Branch Total', value: `${(totalBranchCash / 1000000000).toFixed(1)}B`, icon: DollarSign, color: 'text-emerald-500' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className={`p-3 rounded-2xl bg-muted ${item.color} w-fit mb-4`}>
              <item.icon size={20} />
            </div>
            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">{item.label}</div>
            <div className="text-2xl font-black text-foreground">{item.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Branch Monitoring */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center">
              <Building2 className="mr-3 text-accent" size={24} />
              Regional Branch Flow
            </h3>
            <div className="flex space-x-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {branches.map((branch) => {
              const isExcess = branch.totalCash > branch.maxThreshold;
              const percentage = (branch.totalCash / branch.maxThreshold) * 100;

              return (
                <motion.div
                  key={branch.id}
                  className={`glass-card p-6 rounded-[24px] border ${isExcess ? 'border-red-500/30' : 'border-border'} transition-all`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isExcess ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-muted text-muted-foreground'}`}>
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{branch.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">ID: {branch.id}</span>
                          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">Current: {(branch.totalCash / 1000000).toFixed(1)}M UZS</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Cash Capacity</span>
                        <span className={`text-[10px] font-bold uppercase ${isExcess ? 'text-red-500' : 'text-emerald-500'}`}>{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, percentage)}%` }}
                          className={`h-full rounded-full ${isExcess ? 'bg-red-500' : 'bg-emerald-500'}`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {isExcess && (
                        <button
                          onClick={() => transferToCentralBank(branch.id, branch.totalCash - branch.maxThreshold * 0.8)}
                          className="px-4 py-2 rounded-xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 flex items-center"
                        >
                          <ArrowRightLeft size={14} className="mr-2" />
                          Fix Excess
                        </button>
                      )}
                      <button className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
                    <div>
                      <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Incoming / hr</div>
                      <div className="text-xs font-bold text-emerald-500">+{(branch.incomingCash / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Outgoing / hr</div>
                      <div className="text-xs font-bold text-red-500">-{(branch.outgoingCash / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Last Sync</div>
                      <div className="text-xs font-bold text-muted-foreground">Just now</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Operational</div>
                      <div className="text-xs font-bold text-emerald-500">99.9%</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-accent/20 bg-accent/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center">
              <Zap className="mr-2 text-accent" size={20} />
              Smart Actions
            </h3>
            <div className="space-y-4">
              {excessBranches.length > 0 ? (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
                  <div className="flex items-start space-x-3">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight mb-1">Excess Cash Detected</p>
                      <p className="text-[10px] leading-relaxed opacity-80">
                        {excessBranches.length} branch(es) exceed liquidity limits. Recommend immediate transfer to Central Bank.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <div className="flex items-start space-x-3">
                    <Zap size={18} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight mb-1">System Balanced</p>
                      <p className="text-[10px] leading-relaxed opacity-80">
                        All branches are currently within operational cash thresholds.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border hover:border-accent transition-all group">
                <span className="text-xs font-bold">Auto-Redistribution</span>
                <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border hover:border-accent transition-all group">
                <span className="text-xs font-bold">Request CIT Vehicle</span>
                <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-lg font-black uppercase tracking-tight mb-6">Operational Costs</h3>
            <div className="space-y-6">
              {[
                { label: 'Logistics', value: '42.5M', color: 'bg-blue-500' },
                { label: 'Maintenance', value: '18.2M', color: 'bg-purple-500' },
                { label: 'Security', value: '12.8M', color: 'bg-slate-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: '60%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
