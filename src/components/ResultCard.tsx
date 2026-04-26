'use client';

import { useState, useEffect } from 'react';
import { PredictionResult } from '../utils/calculateDuration';
import { Timer, AlertTriangle, CheckCircle2, TrendingDown, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Chart from './Chart';
import { useI18n } from '@/context/LanguageContext';

interface ResultCardProps {
  prediction: PredictionResult;
}

export default function ResultCard({ prediction }: ResultCardProps) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCritical = prediction.durationHours < 24;
  const isWarning = prediction.durationHours >= 24 && prediction.durationHours < 48;

  if (!mounted) return <div className="h-96 bg-muted animate-pulse rounded-3xl" />;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/40 p-8 rounded-3xl border border-border flex items-center group hover:border-accent/30 transition-all"
        >
          <div className={`p-5 rounded-2xl mr-6 shadow-xl transition-all duration-500 group-hover:scale-110 ${
            isCritical ? 'bg-red-500 text-white shadow-red-500/20' : 
            isWarning ? 'bg-yellow-500 text-white shadow-yellow-500/20' : 
            'bg-accent text-white shadow-accent/20'
          }`}>
            <Timer size={32} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em] mb-1">{t('estimatedDepletion')}</div>
            <div className="text-4xl font-black text-foreground">
              ~{Math.round(prediction.durationHours)} <span className="text-lg text-muted-foreground font-normal">HRS</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-muted/40 p-8 rounded-3xl border border-border flex items-center group hover:border-emerald-500/30 transition-all"
        >
          <div className="p-5 rounded-2xl mr-6 bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
            <Calendar size={32} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em] mb-1">{t('refillWindow')}</div>
            <div className="text-2xl font-black text-foreground">
              {prediction.refillTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
              <span className="text-accent mx-2">@</span>
              {prediction.refillTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 ${
          isCritical ? 'bg-red-500/10 border-red-500/20 text-red-500' :
          isWarning ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600' :
          'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
        }`}
      >
        <div className="flex items-center">
          <AlertTriangle size={24} className="mr-4" />
          <div>
            <div className="text-sm font-black uppercase tracking-widest transition-colors">
              {isCritical ? 'Critical Shortage Risk' : isWarning ? 'Moderate Risk' : 'Optimal Level'}
            </div>
            <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Risk Level: {isCritical ? 'Extreme' : isWarning ? 'Medium' : 'Low'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-8">
           <div>
              <div className="text-[10px] uppercase font-black opacity-50 mb-1">{t('demandTrend')}</div>
              <div className="flex items-center text-xs font-bold">
                 <TrendingDown size={14} className="mr-1 rotate-180" />
                 UPWARD (+12%)
              </div>
           </div>
           <div>
              <div className="text-[10px] uppercase font-black opacity-50 mb-1">{t('healthCheck')}</div>
              <div className="flex items-center text-xs font-bold">
                 <CheckCircle2 size={14} className="mr-1" />
                 STABLE
              </div>
           </div>
        </div>
      </motion.div>

      <div className="bg-muted/40 p-8 rounded-3xl border border-border transition-colors">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-black text-foreground flex items-center">
              <TrendingDown size={20} className="mr-3 text-accent" />
              {t('depletionForecast')}
            </h3>
          </div>
        </div>
        <div className="h-80 w-full">
           <Chart data={prediction.depletionData} />
        </div>
      </div>
    </div>
  );
}
