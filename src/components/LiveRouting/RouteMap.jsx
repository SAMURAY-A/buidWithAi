'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

// We need to import L for custom icons
let L;
if (typeof window !== 'undefined') {
  L = require('leaflet');
}

export default function RouteMap({ atms, selectedId, onSelect, route }) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-slate-900 animate-pulse rounded-3xl" />;

  // Center on Tashkent if no selected, or on selected ATM
  const center = selectedId 
    ? [atms.find(a => a.id === selectedId)?.lat || 41.3111, atms.find(a => a.id === selectedId)?.lng || 69.2797]
    : [41.2995, 69.2401];

  const polylinePositions = route.map(atm => [atm.lat, atm.lng]);

  const getMarkerIcon = (hours, isSelected) => {
    if (!L) return null;
    
    let color = '#10b981'; // Green
    if (hours < 24) color = '#ef4444'; // Red
    else if (hours < 48) color = '#eab308'; // Yellow

    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="
        background-color: ${color};
        width: ${isSelected ? '24px' : '16px'};
        height: ${isSelected ? '24px' : '16px'};
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 15px ${color};
        transition: all 0.3s ease;
      "></div>`,
      iconSize: [isSelected ? 24 : 16, isSelected ? 24 : 16],
      iconAnchor: [isSelected ? 12 : 8, isSelected ? 12 : 8],
    });
  };

  // Dark mode map tiles vs Light mode
  const tileUrl = theme === 'dark' 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const attribution = theme === 'dark'
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className="relative w-full h-full rounded-3xl border border-border overflow-hidden group shadow-2xl transition-all">
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution={attribution}
          url={tileUrl}
        />
        
        {atms.map((atm) => (
          <Marker 
            key={atm.id} 
            position={[atm.lat, atm.lng]}
            icon={getMarkerIcon(atm.predicted_hours_left, selectedId === atm.id)}
            eventHandlers={{
              click: () => onSelect(atm.id),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <div className="text-sm font-black mb-1">{atm.name}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                  {atm.predicted_hours_left} Hours Left
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <Polyline 
          positions={polylinePositions}
          pathOptions={{ 
            color: '#3b82f6', 
            weight: 4, 
            opacity: 0.6,
            dashArray: '10, 10'
          }}
        />
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur px-5 py-3 rounded-2xl border border-border z-20 shadow-xl pointer-events-none transition-colors">
         <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2">Refill Priority</div>
         <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-2">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
               <span className="text-[10px] text-foreground font-bold">Critical</span>
            </div>
            <div className="flex items-center space-x-2">
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
               <span className="text-[10px] text-foreground font-bold">Warning</span>
            </div>
            <div className="flex items-center space-x-2">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
               <span className="text-[10px] text-foreground font-bold">Optimal</span>
            </div>
         </div>
      </div>
    </div>
  );
}
