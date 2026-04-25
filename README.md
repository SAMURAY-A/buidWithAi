# ATM Optimizer AI — Enterprise Dashboard

A high-fidelity, predictive cash management and logistics optimization platform for banking networks. This project is a Next.js frontend built to demonstrate AI-powered ATM liquidity forecasting and intelligent route planning.

---

## 🚀 Overview for Backend Developers

This repository contains the frontend implementation of the ATM Optimizer. It simulates complex data processing and AI predictions currently handled by mock utilities. Your role will be to replace these mocks with robust RESTful or GraphQL APIs.

### Key Capabilities
- **Neural Depletion Forecasting**: Predicts exactly when an ATM will run out of cash based on historical patterns and day types.
- **Dynamic Routing**: Calculates the most efficient refill sequence using geospatial data.
- **Smart Redistribution**: Identifies "donor" ATMs (idle cash) and "recipient" ATMs (critical shortage).
- **AI Support Assistant**: Hybrid AI/Human support chat system with automated escalation.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion (for smooth transitions and real-time feel)
- **Mapping**: Leaflet + React-Leaflet (OpenStreetMap)
- **i18n**: Custom Context-based Internationalization (EN, UZ, RU)
- **Theme**: Next-Themes (Dark/Light mode support)
- **Charts**: Recharts (for depletion curves)

---

## 📊 Data Structures & API Requirements

The frontend currently relies on `/src/data/atmData.ts` and `/src/data/atmLocations.js`. To integrate a backend, the following schemas are expected:

### 1. ATM Object Schema
```typescript
interface ATM {
  id: string;
  name: string;
  location: string;
  type: 'residential' | 'business' | 'market' | 'industrial';
  coordinates: [number, number]; // [lat, lng]
  currentCash: number;
  capacity: number;
  lastRefill: string; // ISO Date
  status: 'online' | 'warning' | 'critical' | 'offline';
  healthScore: number; // 0-100
}
```

### 2. Historical Rates (For AI Model)
The frontend uses hourly withdrawal rates to simulate depletion.
```typescript
interface ATMRate {
  atm_id: string;
  day_type: 'weekday' | 'weekend' | 'salary_day';
  hourly_rate: number; // In millions per hour
}
```

---

## 🧠 Logic to be Offloaded to Backend

Currently, the frontend performs several calculations that should eventually be handled by the backend/AI service:

1.  **Prediction Engine (`src/utils/calculateDuration.ts`)**:
    - **Current**: Deterministic calculation with ID-based noise.
    - **Future**: Should be an API call to a Time-Series Forecasting model (e.g., Prophet or LSTM).

2.  **Route Optimization (`src/utils/buildRoute.js`)**:
    - **Current**: Simple sort by `predicted_hours_left`.
    - **Future**: Should implement a Vehicle Routing Problem (VRP) algorithm or Traveling Salesman Problem (TSP) with time windows.

3.  **Support Chat (`src/components/SupportChat.tsx`)**:
    - **Current**: Keyword-based logic.
    - **Future**: Integration with an LLM (OpenAI/Gemini) and a WebSocket (Socket.io) for live operator intervention.

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation
```bash
git clone <repository-url>
cd buildWithAi
npm install
```

### Development
```bash
npm run dev
# Dashboard is available on http://localhost:3000
```

### Build
```bash
npm run build
```

---

## 📂 Project Structure

- `src/app/`: Next.js App Router (Pages: Home, Login, Dashboard, Live-Routing).
- `src/components/`: Reusable UI components.
  - `LiveRouting/`: Specific components for the 20/80 map dashboard.
- `src/context/`: Language and Theme providers.
- `src/i18n/`: Translation dictionaries.
- `src/utils/`: Mock algorithms and helper functions.

---

## 📍 Future Integration Points (TODO)

- [ ] **Auth**: Replace `localStorage` mock with JWT/NextAuth.
- [ ] **Real Map Data**: Integrate a routing engine (e.g., OSRM or Google Distance Matrix).
- [ ] **WebSockets**: Implement real-time "Unit Health" updates.
- [ ] **Database**: Migrate from static JSON to PostgreSQL/MongoDB.

---

**Developed for the Global Banking Solutions Hackathon 2026.**
