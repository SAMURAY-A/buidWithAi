'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { atms as initialAtms, ATM } from '@/data/atmData';

export interface Branch {
  id: string;
  name: string;
  totalCash: number;
  incomingCash: number;
  outgoingCash: number;
  maxThreshold: number;
  coordinates: [number, number];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  severity: 'critical' | 'warning' | 'info';
  type: 'atm_depletion' | 'branch_excess' | 'security' | 'route';
  isRead: boolean;
}

export interface SecurityLog {
  id: string;
  timestamp: Date;
  type: 'Credential Stuffing' | 'SQL Injection' | 'Data Exfiltration' | 'DDoS' | 'Brute Force';
  attackerIp: string;
  status: 'Blocked' | 'Detected' | 'Mitigated';
  severity: 'high' | 'medium' | 'low';
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'refill' | 'transfer' | 'security' | 'redistribute';
  priority: 'high' | 'medium' | 'low';
  targetId?: string;
}

export interface CentralBankTransfer {
  id: string;
  amount: number;
  from: string;
  timestamp: Date;
}

interface BankContextType {
  atms: ATM[];
  branches: Branch[];
  centralBankCash: number;
  centralBankTransfers: CentralBankTransfer[];
  notifications: Notification[];
  securityLogs: SecurityLog[];
  recommendations: Recommendation[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markNotificationAsRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  refillAtm: (id: string) => void;
  transferToCentralBank: (branchId: string, amount: number) => void;
  autoRedistribute: () => void;
  requestCIT: (atmId: string) => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [atms, setAtms] = useState<ATM[]>(initialAtms.map(atm => ({
    ...atm,
    cash_in: Math.random() * 200000,
    cash_out: Math.random() * 500000 + 100000,
    predicted_depletion_time: Math.random() * 72 + 5
  })));

  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 'branch-1',
      name: 'Central Branch - Tashkent',
      totalCash: 8500000000,
      incomingCash: 120000000,
      outgoingCash: 45000000,
      maxThreshold: 10000000000,
      coordinates: [41.3111, 69.2797]
    },
    {
      id: 'branch-2',
      name: 'Chilonzor Regional Branch',
      totalCash: 4200000000,
      incomingCash: 85000000,
      outgoingCash: 95000000,
      maxThreshold: 5000000000,
      coordinates: [41.2827, 69.2041]
    },
    {
      id: 'branch-3',
      name: 'Yunusobod District Office',
      totalCash: 4800000000,
      incomingCash: 150000000,
      outgoingCash: 30000000,
      maxThreshold: 4500000000,
      coordinates: [41.3645, 69.2867]
    }
  ]);

  const [centralBankCash, setCentralBankCash] = useState(150240500000);
  const [centralBankTransfers, setCentralBankTransfers] = useState<CentralBankTransfer[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const addNotification = useCallback((n: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...n,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      isRead: false
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 50));
  }, []);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const refillAtm = (id: string) => {
    setAtms(prev => prev.map(atm => 
      atm.id === id 
        ? { ...atm, currentCash: atm.capacity, status: 'online', predicted_depletion_time: 72 } 
        : atm
    ));
    addNotification({
      title: 'ATM Refilled',
      message: `ATM ${id} has been successfully refilled to capacity.`,
      severity: 'info',
      type: 'atm_depletion'
    });
  };

  const transferToCentralBank = (branchId: string, amount: number) => {
    const branch = branches.find(b => b.id === branchId);
    if (!branch) return;

    setBranches(prev => prev.map(b => 
      b.id === branchId ? { ...b, totalCash: b.totalCash - amount } : b
    ));
    setCentralBankCash(prev => prev + amount);
    setCentralBankTransfers(prev => [
      { id: Math.random().toString(36).substr(2, 9), amount, from: branch.name, timestamp: new Date() },
      ...prev
    ].slice(0, 20));

    addNotification({
      title: 'Cash Transfer Complete',
      message: `Transferred ${amount.toLocaleString()} UZS from ${branch.name} to Central Bank.`,
      severity: 'info',
      type: 'branch_excess'
    });
  };

  const autoRedistribute = () => {
    // Logic: Find an ATM with high cash and one with low cash, then move some
    const sorted = [...atms].sort((a, b) => (a.currentCash / a.capacity) - (b.currentCash / b.capacity));
    const low = sorted[0];
    const high = sorted[sorted.length - 1];

    if (low && high && (high.currentCash / high.capacity) > 0.7 && (low.currentCash / low.capacity) < 0.2) {
      const amount = Math.min(high.currentCash * 0.3, low.capacity - low.currentCash);
      
      setAtms(prev => prev.map(atm => {
        if (atm.id === low.id) return { ...atm, currentCash: atm.currentCash + amount, status: 'online' };
        if (atm.id === high.id) return { ...atm, currentCash: atm.currentCash - amount };
        return atm;
      }));

      addNotification({
        title: 'Auto-Redistribution Active',
        message: `Moving ${Math.round(amount/1000000)}M UZS from ${high.name} to ${low.name}.`,
        severity: 'info',
        type: 'route'
      });
    }
  };

  const requestCIT = (atmId: string) => {
    const atm = atms.find(a => a.id === atmId);
    if (!atm) return;

    addNotification({
      title: 'CIT Vehicle Requested',
      message: `Emergency refill vehicle dispatched for ${atm.name}. ETA: 45 mins.`,
      severity: 'warning',
      type: 'route'
    });
    
    // Simulate arrival after 5 seconds for demo
    setTimeout(() => {
      refillAtm(atmId);
    }, 5000);
  };

  // Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const isWeekend = [0, 6].includes(new Date().getDay());
      const isSalaryDay = new Date().getDate() === 25;
      
      let multiplier = 1;
      if (isSalaryDay) multiplier = 2.5;
      else if (isWeekend) multiplier = 1.5;

      // Update ATMs
      setAtms(prev => prev.map(atm => {
        const cashOut = (Math.random() * 800000 + 200000) * multiplier;
        const cashIn = Math.random() * 300000;
        const newCash = Math.max(0, atm.currentCash - cashOut + cashIn);
        
        let status = atm.status;
        const percentage = (newCash / atm.capacity) * 100;
        
        if (percentage < 10) status = 'critical';
        else if (percentage < 30) status = 'warning';
        else status = 'online';

        if (status === 'critical' && atm.status !== 'critical') {
          addNotification({
            title: 'Critical Cash Level',
            message: `${atm.name} is below 10% capacity. Refill required urgently.`,
            severity: 'critical',
            type: 'atm_depletion'
          });
        }

        const hourlyRate = (cashOut - cashIn) * 12; // simulated per hour
        const predictedHours = hourlyRate > 0 ? newCash / hourlyRate : 99;

        return {
          ...atm,
          currentCash: newCash,
          status,
          predicted_depletion_time: predictedHours,
          cash_in: cashIn,
          cash_out: cashOut
        };
      }));

      // Update Branches
      setBranches(prev => prev.map(branch => {
        const incoming = Math.random() * 10000000 + 2000000;
        const outgoing = Math.random() * 8000000 + 1000000;
        const newTotal = branch.totalCash + incoming - outgoing;

        if (newTotal > branch.maxThreshold && branch.totalCash <= branch.maxThreshold) {
          addNotification({
            title: 'EXCESS CASH ALERT',
            message: `${branch.name} has exceeded maximum threshold.`,
            severity: 'warning',
            type: 'branch_excess'
          });
        }

        return {
          ...branch,
          totalCash: newTotal,
          incomingCash: incoming,
          outgoingCash: outgoing
        };
      }));

      // Random Security Log
      if (Math.random() > 0.98) {
        const types: SecurityLog['type'][] = ['Credential Stuffing', 'SQL Injection', 'DDoS', 'Brute Force'];
        const type = types[Math.floor(Math.random() * types.length)];
        const newLog: SecurityLog = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          type,
          attackerIp: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          status: 'Blocked',
          severity: 'high'
        };
        setSecurityLogs(prev => [newLog, ...prev].slice(0, 20));
        addNotification({ title: 'Security Incident Blocked', message: `${type} attempt mitigated.`, severity: 'critical', type: 'security' });
      }

    }, 4000);

    return () => clearInterval(interval);
  }, [addNotification, refillAtm]);

  // AI Recommendations Logic
  useEffect(() => {
    const recs: Recommendation[] = [];
    
    atms.filter(a => a.status === 'critical').forEach(a => {
      recs.push({
        id: `rec-atm-${a.id}`,
        title: `Refill ${a.name}`,
        description: `Predicted depletion in ${a.predicted_depletion_time?.toFixed(1) || '0'}h. Request CIT.`,
        type: 'refill',
        priority: 'high',
        targetId: a.id
      });
    });

    branches.filter(b => b.totalCash > b.maxThreshold).forEach(b => {
      recs.push({
        id: `rec-br-${b.id}`,
        title: `Transfer from ${b.name}`,
        description: `Excess liquidity: ${Math.round((b.totalCash - b.maxThreshold)/1000000)}M UZS.`,
        type: 'transfer',
        priority: 'medium',
        targetId: b.id
      });
    });

    if (atms.some(a => a.status === 'critical') && atms.some(a => (a.currentCash/a.capacity) > 0.8)) {
      recs.push({
        id: 'rec-redist',
        title: 'Optimize Network Balance',
        description: 'Imbalance detected. Auto-redistribute suggested.',
        type: 'redistribute',
        priority: 'low'
      });
    }

    setRecommendations(recs);
  }, [atms, branches]);

  return (
    <BankContext.Provider value={{
      atms,
      branches,
      centralBankCash,
      centralBankTransfers,
      notifications,
      securityLogs,
      recommendations,
      addNotification,
      markNotificationAsRead,
      dismissNotification,
      refillAtm,
      transferToCentralBank,
      autoRedistribute,
      requestCIT
    }}>
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (context === undefined) throw new Error('useBank must be used within a BankProvider');
  return context;
};
