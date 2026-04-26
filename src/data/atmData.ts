export interface ATM {
  id: string;
  name: string;
  location: string;
  type: 'residential' | 'business' | 'market' | 'industrial';
  coordinates: [number, number];
  currentCash: number;
  capacity: number;
  lastRefill: string;
  status: 'online' | 'warning' | 'critical' | 'offline';
  healthScore: number;
  cash_in?: number;
  cash_out?: number;
  predicted_depletion_time?: number;
}

const regions = [
  { name: 'Tashkent', center: [41.311081, 69.240562] as [number, number], radius: 0.15 },
  { name: 'Samarkand', center: [39.627012, 66.974973] as [number, number], radius: 0.12 },
  { name: 'Bukhara', center: [39.768083, 64.455577] as [number, number], radius: 0.1 },
  { name: 'Fergana', center: [40.3842, 71.7843] as [number, number], radius: 0.1 },
  { name: 'Namangan', center: [41.0001, 71.6726] as [number, number], radius: 0.1 },
  { name: 'Andijan', center: [40.7821, 72.3442] as [number, number], radius: 0.1 },
  { name: 'Nukus', center: [42.4619, 59.6166] as [number, number], radius: 0.08 },
  { name: 'Qarshi', center: [38.8610, 65.7847] as [number, number], radius: 0.08 },
  { name: 'Termez', center: [37.2242, 67.2783] as [number, number], radius: 0.05 },
  { name: 'Urgench', center: [41.5504, 60.6313] as [number, number], radius: 0.08 }
];

const types: ATM['type'][] = ['residential', 'business', 'market', 'industrial'];

const generateAtms = (count: number): ATM[] => {
  const result: ATM[] = [];
  for (let i = 1; i <= count; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Random coordinates within region radius
    const lat = region.center[0] + (Math.random() - 0.5) * region.radius;
    const lng = region.center[1] + (Math.random() - 0.5) * region.radius;
    
    const capacity = Math.floor(Math.random() * 200 + 100) * 1000000;
    const currentCash = Math.floor(Math.random() * (capacity * 0.9));
    
    let status: ATM['status'] = 'online';
    const percentage = (currentCash / capacity) * 100;
    if (percentage < 10) status = 'critical';
    else if (percentage < 30) status = 'warning';

    result.push({
      id: `atm-${i}`,
      name: `ATM #${i.toString().padStart(3, '0')} — ${region.name} ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      location: `${region.name}, District ${Math.floor(Math.random() * 10) + 1}`,
      type,
      coordinates: [lat, lng],
      currentCash,
      capacity,
      lastRefill: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      status,
      healthScore: Math.floor(Math.random() * 30) + 70,
    });
  }
  return result;
};

export const atms: ATM[] = generateAtms(160);

export const atmRates = atms.flatMap(atm => [
  { atm_id: atm.id, day_type: 'weekday', hourly_rate: Math.random() * 4 + 1 },
  { atm_id: atm.id, day_type: 'weekend', hourly_rate: Math.random() * 6 + 2 },
  { atm_id: atm.id, day_type: 'salary_day', hourly_rate: Math.random() * 10 + 5 },
]);
