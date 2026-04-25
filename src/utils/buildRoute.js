/**
 * Sorts ATMs by predicted hours left and builds a sequential route.
 * @param {Array} atms 
 * @returns {Array} Optimized route
 */
export function buildRoute(atms) {
  return [...atms].sort((a, b) => a.predicted_hours_left - b.predicted_hours_left);
}

/**
 * Estimates travel time between two points (mocked).
 * @param {Object} p1 {lat, lng}
 * @param {Object} p2 {lat, lng}
 * @returns {number} Hours
 */
export function estimateTravelTime(p1, p2) {
  const dist = Math.sqrt(Math.pow(p1.lat - p2.lat, 2) + Math.pow(p1.lng - p2.lng, 2));
  return dist * 10; // Mocked: 1 unit = 10 hours
}
