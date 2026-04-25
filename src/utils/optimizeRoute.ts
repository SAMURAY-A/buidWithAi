import { ATM } from '../data/atmData';

export interface RouteOptimizationResult {
  optimizedRoute: ATM[];
  totalDistance: number;
  savings: number;
}

export function optimizeRoute(atmsToVisit: ATM[]): RouteOptimizationResult {
  // Simple "Greedy" approach for MVP
  // Start from a fixed point (Bank HQ) and visit nearest ATM
  const hq: [number, number] = [41.3111, 69.2797]; // Tashkent Center
  
  const calculateDistance = (p1: [number, number], p2: [number, number]) => {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
  };

  const route: ATM[] = [];
  let currentPos = hq;
  const unvisited = [...atmsToVisit];

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = calculateDistance(currentPos, unvisited[i].coordinates);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIdx = i;
      }
    }

    const nextAtm = unvisited.splice(nearestIdx, 1)[0];
    route.push(nextAtm);
    currentPos = nextAtm.coordinates;
  }

  return {
    optimizedRoute: route,
    totalDistance: route.length * 5.2, // Simulated distance
    savings: 23 // Fixed savings percentage for demo
  };
}
