'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ATM } from '../data/atmData';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// We need a helper to get the hooks after the component is mounted
// We'll use a standard import for hooks and types, but only use them in the sub-component
import { useMap } from 'react-leaflet';

interface NetworkMapProps {
  atms: ATM[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

// Map Controller to handle centering - this component MUST be inside MapContainer
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap(); // This is now a standard hook call
  
  useEffect(() => {
    if (map) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  
  return null;
}

export default function NetworkMap({ atms, selectedId, onSelect }: NetworkMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    // Standard Leaflet import for client-side only
    import('leaflet').then(leaflet => {
      setL(leaflet.default);
    });
  }, []);

  const selectedAtm = atms.find(a => a.id === selectedId);
  const defaultCenter: [number, number] = [41.311081, 69.240562]; // Tashkent
  const center: [number, number] = selectedAtm ? selectedAtm.coordinates : defaultCenter;
  const zoom = selectedAtm ? 14 : 7;

  if (!isMounted || !L) {
    return (
      <div className="w-full h-full bg-slate-900 animate-pulse flex flex-col items-center justify-center text-slate-500 font-bold uppercase tracking-[0.2em] gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        Initializing Map System...
      </div>
    );
  }

  // Custom Icon Logic
  const getIcon = (status: string, isSelected: boolean) => {
    const color = isSelected ? '#3b82f6' : (status === 'critical' ? '#ef4444' : status === 'warning' ? '#f59e0b' : '#10b981');
    const size = isSelected ? 32 : 24;
    const shadow = isSelected ? '0 0 20px rgba(59, 130, 246, 0.8)' : '0 0 10px rgba(0,0,0,0.3)';
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px solid white; box-shadow: ${shadow}; transition: all 0.3s ease;"></div>`,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
    });
  };

  return (
    <div className="relative w-full h-full rounded-3xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
      <MapContainer 
        center={defaultCenter} 
        zoom={6} 
        style={{ height: '100%', width: '100%', background: '#020617' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <MapController center={center} zoom={zoom} />

        {atms.map((atm) => (
          <Marker
            key={atm.id}
            position={atm.coordinates}
            icon={getIcon(atm.status, selectedId === atm.id)}
            eventHandlers={{
              click: () => onSelect?.(atm.id),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-3 min-w-[180px]">
                <div className="font-black text-slate-900 uppercase tracking-tight text-sm mb-1">{atm.name.split('—')[1] || atm.name}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> {atm.location.split(',')[0]}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase">
                    <span className="text-slate-400">Cash Level:</span>
                    <span className={atm.status === 'critical' ? 'text-red-600' : 'text-emerald-600'}>
                      UZS {Math.round(atm.currentCash / 1000000)}M
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div 
                      className={`h-full transition-all duration-1000 ${atm.status === 'critical' ? 'bg-red-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${(atm.currentCash/atm.capacity)*100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase">
                    <span>Depletion:</span>
                    <span>{atm.predicted_depletion_time?.toFixed(1)} hours</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-3">
        <div className="bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl border border-slate-800 flex flex-col gap-2.5 shadow-2xl">
           <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
              <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest">Critical Level</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
              <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest">Warning Zone</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest">Optimal State</span>
           </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-[1000] bg-blue-600/90 backdrop-blur-xl px-4 py-2 rounded-xl border border-blue-400/50 text-[10px] text-white uppercase tracking-[0.2em] font-black shadow-2xl shadow-blue-500/20 flex items-center gap-3">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        Live Network Monitoring • {atms.length} Units Active
      </div>
    </div>
  );
}
