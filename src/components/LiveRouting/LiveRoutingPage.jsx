'use client';

import React, { useState, useMemo } from 'react';
import { atmLocations } from '@/data/atmLocations';
import { buildRoute } from '@/utils/buildRoute';
import ATMList from './ATMList';
import RouteMap from './RouteMap';
import { motion } from 'framer-motion';
import { Navigation, Clock, ShieldAlert, TrendingUp } from 'lucide-react';
import { useI18n } from '@/context/LanguageContext';

export default function LiveRoutingPage() {
  const { t } = useI18n();
  const [selectedId, setSelectedId] = useState(null);
  
  const sortedAtms = useMemo(() => {
    return buildRoute(atmLocations);
  }, []);

  const criticalAtm = sortedAtms[0];

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-160px)] gap-6">
      {/* LEFT SIDE (20%) */}
      <div className="lg:w-[20%] h-[350px] lg:h-full">
        <div className="glass-card h-full rounded-3xl overflow-hidden shadow-2xl transition-colors">
          <ATMList 
            atms={sortedAtms} 
            selectedId={selectedId} 
            onSelect={setSelectedId} 
          />
        </div>
      </div>

      {/* RIGHT SIDE (80%) */}
      <div className="lg:w-[80%] h-full flex flex-col gap-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 rounded-2xl flex items-center space-x-4 border-l-4 border-l-red-500"
           >
              <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
                <ShieldAlert size={20} />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{t('nextCritical')}</div>
                <div className="text-sm font-black truncate">{criticalAtm.name.split('—')[1]}</div>
              </div>
           </motion.div>

           <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5 rounded-2xl flex items-center space-x-4"
           >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                <Navigation size={20} />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{t('totalDistance')}</div>
                <div className="text-sm font-black">5 Stops / 42 km</div>
              </div>
           </motion.div>

           <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5 rounded-2xl flex items-center space-x-4"
           >
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{t('travelTime')}</div>
                <div className="text-sm font-black">3.5 {t('hours')}</div>
              </div>
           </motion.div>
        </div>

        {/* Map View */}
        <div className="flex-1 min-h-[400px] md:min-h-[500px]">
          <RouteMap 
            atms={atmLocations} 
            selectedId={selectedId} 
            onSelect={setSelectedId}
            route={sortedAtms}
          />
        </div>
      </div>
    </div>
  );
}
