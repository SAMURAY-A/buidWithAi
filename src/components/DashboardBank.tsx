'use client';

import React from 'react';
import { useBank } from '@/context/BankContext';
import { 
  DollarSign, 
  ArrowRightLeft, 
  Zap, 
  Building2, 
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  ChevronUp,
  ArrowDownToLine
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/context/LanguageContext';
import { format } from 'date-fns';

export default function DashboardBank() {
  const { t } = useI18n();
  const { 
    branches, 
    centralBankCash, 
    centralBankTransfers, 
    transferToCentralBank, 
    autoRedistribute,
    requestCIT,
    atms 
  } = useBank();
  
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
          className="glass-card p-6 rounded-3xl md:col-span-2 relative overflow-hidden bg-gradient-to-br from-purple-600/10 to-blue-600/10 border-purple-500/20"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Building2 size={120} />
          </div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Building2 size={20} />
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{t('centralBankReserves')}</span>
          </div>
          <div className="text-4xl font-black text-foreground mb-2">{(centralBankCash / 1000000000).toFixed(2)}B <span className="text-sm font-bold text-muted-foreground">UZS</span></div>
          <div className="flex items-center text-xs font-bold text-emerald-500">
            <ChevronUp size={14} className="mr-1" />
            +{(centralBankTransfers.reduce((a,b)=>a+b.amount, 0)/1000000).toFixed(1)}M {t('now').toLowerCase()}
          </div>
        </motion.div>

        {[
          { label: t('totalLiquidity'), value: `${(systemLiquidity / 1000000000).toFixed(1)}B`, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: t('branchStatus'), value: `${(totalBranchCash / 1000000000).toFixed(1)}B`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className={`p-3 rounded-2xl ${item.bg} ${item.color} w-fit mb-4`}>
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
              <Building2 className="mr-3 text-blue-500" size={24} />
              {t('branchFlow')}
            </h3>
            <div className="flex space-x-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">{t('online')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {branches.map((branch) => {
              const isExcess = branch.totalCash > branch.maxThreshold;
              const percentage = (branch.totalCash / branch.maxThreshold) * 100;

              return (
                <motion.div
                  key={branch.id}
                  layout
                  className={`glass-card p-6 rounded-[24px] border ${isExcess ? 'border-red-500/30 bg-red-500/5' : 'border-slate-800'} transition-all`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isExcess ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 text-slate-400'}`}>
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{branch.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{t('atmId')}: {branch.id}</span>
                          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{t('now')}: {(branch.totalCash / 1000000).toFixed(1)}M UZS</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{t('threshold')}</span>
                        <span className={`text-[10px] font-black uppercase ${isExcess ? 'text-red-500' : 'text-emerald-500'}`}>{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, percentage)}%` }}
                          className={`h-full rounded-full ${isExcess ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'}`}
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
                          {t('transferToCentral')}
                        </button>
                      )}
                      <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-500">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t('incoming')} / {t('hours').charAt(0)}</div>
                      <div className="text-xs font-bold text-emerald-500">+{(branch.incomingCash / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t('outgoing')} / {t('hours').charAt(0)}</div>
                      <div className="text-xs font-bold text-red-500">-{(branch.outgoingCash / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t('status')}</div>
                      <div className={`text-xs font-bold ${isExcess ? 'text-red-500' : 'text-emerald-500'}`}>{isExcess ? t('excessAlert') : t('normal')}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t('health')}</div>
                      <div className="text-xs font-bold text-blue-500">99.9%</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Actions & Central Bank Logs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 relative overflow-hidden">
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center">
              <Zap className="mr-2 text-blue-500" size={20} />
              {t('smartActions')}
            </h3>
            <div className="space-y-4">
              {excessBranches.length > 0 ? (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
                  <div className="flex items-start space-x-3">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight mb-1">{t('excessCashDetected')}</p>
                      <p className="text-[10px] leading-relaxed opacity-80">
                        {excessBranches.length} {t('branchStatus').toLowerCase()} {t('excessAlert').toLowerCase()}.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <div className="flex items-start space-x-3">
                    <Zap size={18} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight mb-1">{t('systemBalanced')}</p>
                      <p className="text-[10px] leading-relaxed opacity-80">
                        {t('allBranchesNormal')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button 
                onClick={autoRedistribute}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all group"
              >
                <span className="text-xs font-bold">{t('autoRedistribution')}</span>
                <ChevronRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => requestCIT(atms.find(a => a.status === 'critical')?.id || 'atm-1')}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all group"
              >
                <span className="text-xs font-bold">{t('requestCit')}</span>
                <ChevronRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
              <Clock size={18} className="text-purple-500" />
              {t('recentTransfers')}
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {centralBankTransfers.length === 0 ? (
                <div className="text-center py-10 opacity-20">
                   <ArrowDownToLine size={24} className="mx-auto mb-2" />
                   <p className="text-[10px] font-bold uppercase tracking-widest">{t('noTransfers')}</p>
                </div>
              ) : (
                centralBankTransfers.map(transfer => (
                  <div key={transfer.id} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black text-purple-500 uppercase">{transfer.from}</span>
                      <span className="text-[9px] text-slate-500">{format(transfer.timestamp, 'HH:mm:ss')}</span>
                    </div>
                    <div className="text-sm font-black text-emerald-500">+{(transfer.amount/1000000).toFixed(1)}M UZS</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
