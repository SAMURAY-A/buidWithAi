# ATM Optimizer AI 🤖🏦

backend githubLink =https://github.com/Abdumalik-ProDev/ATM-OPT

An advanced, AI-powered cash management and logistics optimization platform built for modern banking infrastructure. Designed to solve the critical problem of ATM cash depletion, inefficient logistics, and idle capital through real-time monitoring and predictive modeling.

## 🌟 Key Features

*   **🔮 Predictive Cash Modeling (Unit Analysis):**
    *   Simulates cash depletion based on historical data, day type (weekday, weekend, salary day), and time of day.
    *   Provides actionable "Optimal Refill Windows" to prevent ATMs from running out of cash.
*   **🏦 Smart Branch Flow & Capital Redistribution:**
    *   Monitors live liquidity across bank branches.
    *   Auto-detects excess cash and suggests/executes transfers to the Central Bank.
    *   Calculates real-time incoming/outgoing cash flows and health thresholds.
*   **🌍 Global Logistics HQ & Route Optimization:**
    *   Live map displaying network status using custom Leaflet infrastructure.
    *   Generates optimized routing paths for Cash-in-Transit (CIT) vehicles.
    *   Calculates total distance, average refill times, and fleet fuel savings.
*   **🛡️ Cybersecurity Hub:**
    *   Monitors incoming network requests for malicious activities.
    *   Auto-blocks recognized threat IPs and logs anomalies.
*   **💬 Integrated AI Support Assistant:**
    *   Context-aware AI chat that monitors the system and recommends actions.
    *   Escalation protocols to human operators when severe anomalies are detected.
*   **🌐 Full i18n Localization:**
    *   Complete multilingual support for **Uzbek (UZ)**, **English (EN)**, and **Russian (RU)**.
*   **📱 Fully Responsive UI:**
    *   Premium, glassmorphism-inspired design with `framer-motion` animations.
    *   Flawless experience on desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) (Turbopack)
*   **UI Library:** React 18
*   **Styling:** Tailwind CSS + Vanilla CSS (`globals.css`)
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Maps:** React Leaflet + OpenStreetMap
*   **State Management:** React Context API (`BankContext`, `LanguageContext`)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js or [Bun](https://bun.sh/) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SAMURAY-A/buidWithAi.git
   cd buidWithAi
   ```

2. Install dependencies:
   ```bash
   bun install
   # or npm install / yarn install
   ```

3. Start the development server:
   ```bash
   bun dev
   # or npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router (Dashboard, Live Routing, Layout)
├── components/           # Reusable UI Components
│   ├── LiveRouting/      # Map routing and list logic
│   ├── DashboardATM.tsx  # Unit Analysis view
│   ├── DashboardBank.tsx # Branch Flow view
│   ├── DashboardGlobal.tsx # Global HQ view
│   ├── SupportChat.tsx   # AI Assistant
│   └── ...
├── context/              # Global State (BankContext, LanguageContext)
├── data/                 # Mock Data & Telemetry (atmLocations.js, atmData.ts)
├── i18n/                 # Localization dictionaries (translations.ts)
└── utils/                # Helper functions (calculateDuration, buildRoute)
```

## 🎯 Hackathon Highlights
This project was specifically engineered to demonstrate:
1.  **Problem-Solution Fit:** Directly addresses idle capital and ATM downtime.
2.  **Innovation:** Uses simulated predictive AI models for localized cash burning rates.
3.  **Feasibility:** Built entirely with modern web technologies capable of easily hooking up to a real Banking API.
4.  **UX/UI:** State-of-the-art interface designed for clarity, impact, and aesthetic appeal.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is licensed under the MIT License.
