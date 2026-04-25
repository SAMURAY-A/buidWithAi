'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ChartProps {
  data: { time: string; amount: number }[];
}

export default function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis 
          dataKey="time" 
          stroke="#475569" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          interval={4}
        />
        <YAxis 
          stroke="#475569" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tickFormatter={(value) => `${value}M`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
          itemStyle={{ color: '#3b82f6' }}
        />
        <Area 
          type="monotone" 
          dataKey="amount" 
          stroke="#3b82f6" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorAmount)" 
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
