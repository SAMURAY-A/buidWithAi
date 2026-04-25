import { atmRates } from '../data/atmData';

export interface PredictionResult {
  durationHours: number;
  refillTime: Date;
  confidenceRange: [number, number];
  depletionData: { time: string; amount: number }[];
}

export function calculateDuration(
  atmId: string,
  amount: number,
  dayType: string
): PredictionResult {
  const rateData = atmRates.find(r => r.atm_id === atmId && r.day_type === dayType);
  const hourlyRate = rateData ? rateData.hourly_rate * 1000000 : 2000000; // default 2M/hour

  const baseDuration = amount / hourlyRate;
  const noise = Math.random() * 0.2 - 0.1; // ±10% noise
  const finalDuration = baseDuration * (1 + noise);

  const refillTime = new Date();
  refillTime.setHours(refillTime.getHours() + finalDuration);

  const confidenceRange: [number, number] = [
    finalDuration * 0.9,
    finalDuration * 1.1
  ];

  // Generate depletion curve data (next 48 hours or until empty)
  const depletionData = [];
  const hoursToSimulate = Math.min(Math.ceil(finalDuration * 1.2), 48);
  
  for (let i = 0; i <= hoursToSimulate; i++) {
    const remaining = Math.max(0, amount - (hourlyRate * i * (1 + (Math.random() * 0.1 - 0.05))));
    const timeLabel = new Date();
    timeLabel.setHours(timeLabel.getHours() + i);
    depletionData.push({
      time: timeLabel.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: Math.round(remaining / 1000000) // in Millions
    });
  }

  return {
    durationHours: finalDuration,
    refillTime,
    confidenceRange,
    depletionData
  };
}
