'use client';

import { atms } from '../data/atmData';
import { DollarSign, ArrowRightLeft, TrendingUp, Zap, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/context/LanguageContext';

export default function DashboardBank() {
  const { t } = useI18n();
  const totalCash = atms.reduce((acc, atm) => acc + atm.currentCash, 0);
  const excessCash = atms.filter(atm => atm.currentCash > atm.capacity * 0.7);
  const shortageAtms = atms.filter(atm => atm.currentCash < atm.capacity * 0.3);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t('totalLiquidity'), value: `${(totalCash / 1000000).toFixed(1)}M`, trend: '+2.4%', icon: DollarSign, color: 'text-emerald-500' },
          { label: t('idleCapital'), value: `${(excessCash.reduce((a, b) => a + b.currentCash, 0) / 1000000).toFixed(1)}M`, sub: `${excessCash.length} units`, icon: ArrowRightLeft, color: 'text-yellow-500' },
          { label: t('efficiencyIndex'), value: '94.8%', trend: '+0.8%', icon: Zap, color: 'text-accent' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-muted ${item.color}`}>
                <item.icon size={24} />
              </div>
            </div>
            <div className="text-[11px] text-muted-foreground uppercase font-black tracking-[0.2em] mb-1">{item.label}</div>
            <div className="text-3xl font-black text-foreground">{item.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 glass-card rounded-3xl overflow-hidden p-1 transition-colors">
          <div className="bg-card/40 p-8 rounded-[22px]">
            <h3 className="text-xl font-bold text-foreground mb-8 flex items-center">
              <ArrowRightLeft className="mr-3 text-accent" size={24} /> 
              {t('redistributionMatrix')}
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
                    className="group relative bg-muted/40 p-5 rounded-2xl border border-border flex items-center justify-between hover:border-accent/30 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                        <ArrowUpFromLine size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Source</div>
                        <div className="text-sm font-bold text-foreground">{donor.name.split('—')[1]}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-20 h-[1px] bg-gradient-to-r from-emerald-500/20 via-accent to-red-500/20 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-right">
                      <div>
                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Target</div>
                        <div className="text-sm font-bold text-foreground">{shortage.name.split('—')[1]}</div>
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

        <div className="lg:col-span-5 glass-card rounded-3xl p-1 overflow-hidden transition-colors">
          <div className="bg-card/40 p-8 rounded-[22px] h-full">
            <h3 className="text-xl font-bold text-foreground mb-8">{t('assetMonitoring')}</h3>
            <div className="space-y-6">
              {atms.slice(0, 7).map(atm => (
                <div key={atm.id} className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">{atm.name.split('—')[1]}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(atm.currentCash / atm.capacity) * 100}%` }}
                      className={`h-full rounded-full ${
                        atm.currentCash < atm.capacity * 0.3 ? 'bg-red-500' : 
                        atm.currentCash < atm.capacity * 0.6 ? 'bg-yellow-500' : 
                        'bg-emerald-500'
                      }`}
                    />
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
