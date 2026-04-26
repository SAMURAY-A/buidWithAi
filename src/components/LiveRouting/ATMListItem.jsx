import React from 'react';
import { useI18n } from '@/context/LanguageContext';

export default function ATMListItem({ atm, isSelected, onClick }) {
  const { t } = useI18n();
  const getStatusColor = (hours) => {
    if (hours < 24) return 'bg-red-500';
    if (hours < 48) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <button
      onClick={() => onClick(atm.id)}
      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
        isSelected 
          ? 'bg-blue-600/10 border-blue-500 shadow-lg' 
          : 'bg-muted/40 border-transparent hover:border-border hover:bg-muted/60'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-blue-400' : 'text-foreground'}`}>
          {atm.name.split('—')[1] || atm.name}
        </h4>
        <div className={`w-2 h-2 rounded-full ${getStatusColor(atm.predicted_hours_left)}`} />
      </div>
      <p className="text-[10px] text-muted-foreground truncate mb-2">{atm.location}</p>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-black ${atm.predicted_hours_left < 24 ? 'text-red-500' : 'text-muted-foreground'}`}>
          {atm.predicted_hours_left}{t('hours').charAt(0)} {t('left') || 'left'}
        </span>
        {atm.predicted_hours_left < 12 && (
          <span className="text-[8px] font-black uppercase text-red-500 animate-pulse">{t('high')} Risk</span>
        )}
      </div>
    </button>
  );
}
