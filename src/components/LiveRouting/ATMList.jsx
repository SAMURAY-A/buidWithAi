import React from 'react';
import ATMListItem from './ATMListItem';

export default function ATMList({ atms, selectedId, onSelect }) {
  return (
    <div className="flex flex-col h-full bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border overflow-hidden shadow-2xl transition-all">
      <div className="p-6 border-b border-sidebar-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Priority Queue</h3>
        <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase tracking-wider">Sorted by urgency</p>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {atms.map((atm) => (
          <ATMListItem
            key={atm.id}
            atm={atm}
            isSelected={selectedId === atm.id}
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
