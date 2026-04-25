'use client';

import { motion } from 'framer-motion';
import { ATM } from '../data/atmData';

interface NetworkMapProps {
  atms: ATM[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export default function NetworkMap({ atms, selectedId, onSelect }: NetworkMapProps) {
  return (
    <div className="relative w-full h-full bg-slate-950/50 rounded-2xl border border-slate-800 overflow-hidden group">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
        backgroundSize: '30px 30px' 
      }}></div>
      
      {/* Simulated Map Paths */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <path d="M100 100 L300 200 L500 150 L700 300" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path d="M200 400 L400 300 L600 450" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path d="M50 300 L250 350 L450 200" stroke="#3b82f6" strokeWidth="1" fill="none" />
      </svg>

      {/* ATM Nodes */}
      {atms.map((atm, i) => {
        // Map logical coordinates to visual positions
        const x = (atm.coordinates[1] - 69.2) * 5000 + 100;
        const y = (41.4 - atm.coordinates[0]) * 5000 + 100;

        return (
          <motion.button
            key={atm.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect?.(atm.id)}
            style={{ left: `${(i * 10) % 80 + 10}%`, top: `${(i * 15) % 80 + 10}%` }} // Semi-random for demo
            className={`absolute w-4 h-4 rounded-full border-2 transition-all duration-300 group/node ${
              selectedId === atm.id 
                ? 'bg-blue-500 border-white scale-150 shadow-[0_0_15px_rgba(59,130,246,1)]' 
                : atm.status === 'critical' ? 'bg-red-500 border-red-900' : 'bg-slate-700 border-slate-500 hover:bg-blue-400'
            }`}
          >
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 px-2 py-1 rounded-md opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap z-50">
              {atm.name.split('—')[1]}
            </div>
          </motion.button>
        );
      })}

      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
        Live Network Map (Tashkent Region)
      </div>
    </div>
  );
}
