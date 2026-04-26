'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

import { useMap } from 'react-leaflet';

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (map && center) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

export default function RouteMap({ atms, selectedId, onSelect, route }) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [L, setL] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    import('leaflet').then(leaflet => {
      setL(leaflet.default);
    });
  }, []);

  if (!isMounted || !L) {
    return <div className="w-full h-full bg-slate-900 animate-pulse rounded-3xl flex items-center justify-center text-slate-500 font-black uppercase tracking-widest">Loading Route Infrastructure...</div>;
  }

  const selectedAtm = atms.find(a => a.id === selectedId);
  const center = selectedAtm 
    ? [selectedAtm.lat, selectedAtm.lng]
    : [41.2995, 69.2401];
  const zoom = selectedAtm ? 15 : 12;

  const polylinePositions = route.map(atm => [atm.lat, atm.lng]);

  const getMarkerIcon = (hours, isSelected) => {
    let color = '#10b981'; // Green
    if (hours < 15) color = '#ef4444'; // Red
    else if (hours < 40) color = '#f59e0b'; // Yellow

    const size = isSelected ? 28 : 18;
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 15px ${color};
        transition: all 0.3s ease;
      "></div>`,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
    });
  };

  const tileUrl = theme === 'dark' 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const attribution = '&copy; OpenStreetMap contributors';

  return (
    <div className="relative w-full h-full rounded-[32px] border border-slate-800 overflow-hidden group shadow-2xl transition-all bg-slate-950">
      <MapContainer 
        center={[41.2995, 69.2401]} 
        zoom={12} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', background: '#020617' }}
        zoomControl={false}
      >
        <TileLayer
          attribution={attribution}
          url={tileUrl}
        />
        
        <MapController center={center} zoom={zoom} />
        
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
              <div className="p-2 min-w-[150px]">
                <div className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">{atm.name.split('—')[1] || atm.name}</div>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{atm.predicted_hours_left} Hours Left</span>
                   <div className={`w-2 h-2 rounded-full ${atm.status === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <Polyline 
          positions={polylinePositions}
          pathOptions={{ 
            color: '#3b82f6', 
            weight: 5, 
            opacity: 0.8,
            dashArray: '12, 12',
            lineJoin: 'round'
          }}
        />
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-xl px-6 py-4 rounded-[20px] border border-slate-800 z-[1000] shadow-2xl pointer-events-none">
         <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3">Refill Route Logistics</div>
         <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
               <span className="text-[10px] text-slate-300 font-black uppercase">Critical</span>
            </div>
            <div className="flex items-center space-x-2">
               <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
               <span className="text-[10px] text-slate-300 font-black uppercase">Warning</span>
            </div>
            <div className="flex items-center space-x-2">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
               <span className="text-[10px] text-slate-300 font-black uppercase">Normal</span>
            </div>
         </div>
      </div>

      <div className="absolute top-6 left-6 z-[1000] bg-blue-600 px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-xl shadow-blue-500/20">
         Optimal Refill Path Active
      </div>
    </div>
  );
}
