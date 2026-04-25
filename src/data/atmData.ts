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
}

export const atms: ATM[] = [
  {
    id: 'atm-1',
    name: 'ATM #001 — Chilonzor Center',
    location: 'Bunyodkor Ave, Tashkent',
    type: 'residential',
    coordinates: [41.2827, 69.2041],
    currentCash: 450000000,
    capacity: 100000000,
    lastRefill: '2026-04-24T10:00:00Z',
    status: 'online',
    healthScore: 98,
  },
  {
    id: 'atm-2',
    name: 'ATM #002 — Yunusobod Business',
    location: 'Amir Temur Str, Business District',
    type: 'business',
    coordinates: [41.3645, 69.2867],
    currentCash: 12000000,
    capacity: 150000000,
    lastRefill: '2026-04-23T08:00:00Z',
    status: 'critical',
    healthScore: 85,
  },
  {
    id: 'atm-3',
    name: 'ATM #003 — Sergeli Market',
    location: 'Sergeli-8, Market Area',
    type: 'market',
    coordinates: [41.2281, 69.2201],
    currentCash: 85000000,
    capacity: 200000000,
    lastRefill: '2026-04-25T06:00:00Z',
    status: 'online',
    healthScore: 92,
  },
  {
    id: 'atm-4',
    name: 'ATM #004 — Buyuk Ipak Yuli',
    location: 'Metro Station Exit',
    type: 'business',
    coordinates: [41.3265, 69.3289],
    currentCash: 5000000,
    capacity: 120000000,
    lastRefill: '2026-04-24T15:00:00Z',
    status: 'critical',
    healthScore: 78,
  },
  {
    id: 'atm-5',
    name: 'ATM #005 — Mirabad Avenue',
    location: 'Mirabad Str, High-end Residential',
    type: 'business',
    coordinates: [41.2995, 69.2711],
    currentCash: 60000000,
    capacity: 150000000,
    lastRefill: '2026-04-24T12:00:00Z',
    status: 'online',
    healthScore: 95,
  },
  {
    id: 'atm-6',
    name: 'ATM #006 — Airport Terminal',
    location: 'Tashkent Int. Airport',
    type: 'market',
    coordinates: [41.2581, 69.2801],
    currentCash: 120000000,
    capacity: 250000000,
    lastRefill: '2026-04-25T02:00:00Z',
    status: 'online',
    healthScore: 99,
  },
  {
    id: 'atm-7',
    name: 'ATM #007 — Samarkand Darvoza',
    location: 'Qoratosh Str, Shopping Mall',
    type: 'market',
    coordinates: [41.3165, 69.2489],
    currentCash: 15000000,
    capacity: 180000000,
    lastRefill: '2026-04-24T18:00:00Z',
    status: 'warning',
    healthScore: 88,
  },
  {
    id: 'atm-8',
    name: 'ATM #008 — Industrial Zone',
    location: 'Bektemir District',
    type: 'industrial',
    coordinates: [41.2295, 69.3411],
    currentCash: 2000000,
    capacity: 100000000,
    lastRefill: '2026-04-23T20:00:00Z',
    status: 'critical',
    healthScore: 65,
  },
  {
    id: 'atm-9',
    name: 'ATM #009 — Chilanzar Metro',
    location: 'Metro Station Entrance',
    type: 'business',
    coordinates: [41.2727, 69.2141],
    currentCash: 45000000,
    capacity: 120000000,
    lastRefill: '2026-04-24T22:00:00Z',
    status: 'online',
    healthScore: 94,
  },
  {
    id: 'atm-10',
    name: 'ATM #010 — Shaykhontokhur',
    location: 'Navoi Ave, Cultural Center',
    type: 'business',
    coordinates: [41.3195, 69.2611],
    currentCash: 95000000,
    capacity: 150000000,
    lastRefill: '2026-04-25T09:00:00Z',
    status: 'online',
    healthScore: 97,
  },
];

export const atmRates = atms.flatMap(atm => [
  { atm_id: atm.id, day_type: 'weekday', hourly_rate: Math.random() * 5 + 1 },
  { atm_id: atm.id, day_type: 'weekend', hourly_rate: Math.random() * 7 + 2 },
  { atm_id: atm.id, day_type: 'salary_day', hourly_rate: Math.random() * 10 + 5 },
]);
