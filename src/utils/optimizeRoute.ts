import { ATM } from '../data/atmData';

export interface RouteOptimizationResult {
  optimizedRoute: ATM[];
  totalDistance: number;
  totalDuration: number;
  savings: number;
  efficiency: number;
  fuelSaving: number;
}

export function optimizeRoute(atmsToVisit: ATM[]): RouteOptimizationResult {
  // Start from a fixed point (Bank HQ) and visit nearest ATM
  const hq: [number, number] = [41.3111, 69.2797]; // Tashkent Center
  
  const calculateDistance = (p1: [number, number], p2: [number, number]) => {
    // Basic Euclidean distance for simulation, scaled to KM
    const d = Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
    return d * 111; // 1 degree is roughly 111km
  };

  const route: ATM[] = [];
  let currentPos = hq;
  const unvisited = [...atmsToVisit];
  let totalDistance = 0;

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
    totalDistance += minDistance;
    currentPos = nextAtm.coordinates;
  }

  // Return to HQ
  totalDistance += calculateDistance(currentPos, hq);

  const avgSpeed = 40; // km/h
  const totalDuration = totalDistance / avgSpeed;
  
  // Simulated savings and efficiency
  const savings = 28.4;
  const efficiency = 94.2;
  const fuelSaving = 15.5;

  return {
    optimizedRoute: route,
    totalDistance,
    totalDuration,
    savings,
    efficiency,
    fuelSaving
  };
}
