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

  // Deterministic "noise" based on atmId to avoid hydration mismatch
  const charCodeSum = atmId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const deterministicNoise = (charCodeSum % 20) / 100 - 0.1; // ±10% stable noise
  
  const baseDuration = amount / hourlyRate;
  const finalDuration = baseDuration * (1 + deterministicNoise);

  // Use a fixed start time for SSR stability, then adjust on client if needed
  // But for MVP, just using a stable calculation is better.
  const refillTime = new Date();
  refillTime.setHours(refillTime.getHours() + finalDuration);

  const confidenceRange: [number, number] = [
    finalDuration * 0.9,
    finalDuration * 1.1
  ];

  const depletionData = [];
  const hoursToSimulate = 48;
  
  for (let i = 0; i <= hoursToSimulate; i++) {
    const hourlyNoise = ((charCodeSum + i) % 10) / 100 - 0.05;
    const remaining = Math.max(0, amount - (hourlyRate * i * (1 + hourlyNoise)));
    
    // Stable time labels
    const timeLabel = new Date();
    timeLabel.setHours(timeLabel.getHours() + i);
    
    depletionData.push({
      time: timeLabel.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      amount: Math.round(remaining / 1000000)
    });
  }

  return {
    durationHours: finalDuration,
    refillTime,
    confidenceRange,
    depletionData
  };
}
