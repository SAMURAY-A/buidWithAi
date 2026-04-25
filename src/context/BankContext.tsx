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
  type: 'refill' | 'transfer' | 'security';
  priority: 'high' | 'medium' | 'low';
}

interface BankContextType {
  atms: ATM[];
  branches: Branch[];
  centralBankCash: number;
  notifications: Notification[];
  securityLogs: SecurityLog[];
  recommendations: Recommendation[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markNotificationAsRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  refillAtm: (id: string) => void;
  transferToCentralBank: (branchId: string, amount: number) => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [atms, setAtms] = useState<ATM[]>(initialAtms.map(atm => ({
    ...atm,
    // Add extra properties for simulation
    cash_in: 0,
    cash_out: Math.random() * 500000 + 100000, // random cash out rate per minute for demo
    predicted_depletion_time: Math.random() * 72 + 5 // hours
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
      maxThreshold: 4500000000, // Trigger excess
      coordinates: [41.3645, 69.2867]
    }
  ]);

  const [centralBankCash, setCentralBankCash] = useState(150240500000);
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
    setBranches(prev => prev.map(b => 
      b.id === branchId ? { ...b, totalCash: b.totalCash - amount } : b
    ));
    setCentralBankCash(prev => prev + amount);
    addNotification({
      title: 'Cash Transfer Complete',
      message: `Transferred ${amount.toLocaleString()} UZS from branch to Central Bank.`,
      severity: 'info',
      type: 'branch_excess'
    });
  };

  // Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const isWeekend = [0, 6].includes(new Date().getDay());
      const isSalaryDay = new Date().getDate() === 25; // Today is 25th in simulation!
      
      let multiplier = 1;
      if (isSalaryDay) multiplier = 2.5;
      else if (isWeekend) multiplier = 1.5;

      // Update ATMs
      setAtms(prev => prev.map(atm => {
        const cashOut = (Math.random() * 500000 + 100000) * multiplier;
        const newCash = Math.max(0, atm.currentCash - cashOut);
        
        let status = atm.status;
        const percentage = (newCash / atm.capacity) * 100;
        
        if (percentage < 5) status = 'critical';
        else if (percentage < 20) status = 'warning';
        else status = 'online';

        // Trigger notifications if critical
        if (status === 'critical' && atm.status !== 'critical') {
          addNotification({
            title: 'Critical Cash Level',
            message: `${atm.name} is below 5% cash capacity. Emergency refill required.`,
            severity: 'critical',
            type: 'atm_depletion'
          });
        }

        // Predicted depletion time update (simple logic)
        const hourlyRate = cashOut * 60;
        const predictedHours = hourlyRate > 0 ? newCash / hourlyRate : 99;

        return {
          ...atm,
          currentCash: newCash,
          status,
          predicted_depletion_time: predictedHours
        } as ATM;
      }));

      // Update Branches
      setBranches(prev => prev.map(branch => {
        const incoming = Math.random() * 5000000 + 1000000;
        const outgoing = Math.random() * 3000000 + 500000;
        const newTotal = branch.totalCash + incoming - outgoing;

        if (newTotal > branch.maxThreshold && branch.totalCash <= branch.maxThreshold) {
          addNotification({
            title: 'EXCESS CASH ALERT',
            message: `${branch.name} has exceeded maximum threshold. Redistribution required.`,
            severity: 'warning',
            type: 'branch_excess'
          });
        }

        return {
          ...branch,
          totalCash: newTotal,
          incomingCash: incoming * 60,
          outgoingCash: outgoing * 60
        };
      }));

      // Random Security Log
      if (Math.random() > 0.95) {
        const types: SecurityLog['type'][] = ['Credential Stuffing', 'SQL Injection', 'Data Exfiltration'];
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
        
        addNotification({
          title: 'Security Incident Detected',
          message: `${type} attack attempted and blocked.`,
          severity: 'critical',
          type: 'security'
        });
      }

    }, 5000); // Update every 5 seconds for simulation speed

    return () => clearInterval(interval);
  }, [addNotification]);

  // AI Recommendations Logic
  useEffect(() => {
    const recs: Recommendation[] = [];
    
    // Check for critical ATMs
    atms.filter(a => a.status === 'critical').forEach(a => {
      recs.push({
        id: `rec-atm-${a.id}`,
        title: `Refill ${a.name}`,
        description: `Cash level is critically low (${((a.currentCash/a.capacity)*100).toFixed(1)}%). Predicted depletion in ${a.predicted_depletion_time.toFixed(1)} hours.`,
        type: 'refill',
        priority: 'high'
      });
    });

    // Check for excess branch cash
    branches.filter(b => b.totalCash > b.maxThreshold).forEach(b => {
      recs.push({
        id: `rec-br-${b.id}`,
        title: `Transfer from ${b.name}`,
        description: `Branch exceeds threshold by ${(b.totalCash - b.maxThreshold).toLocaleString()} UZS.`,
        type: 'transfer',
        priority: 'medium'
      });
    });

    setRecommendations(recs);
  }, [atms, branches]);

  return (
    <BankContext.Provider value={{
      atms,
      branches,
      centralBankCash,
      notifications,
      securityLogs,
      recommendations,
      addNotification,
      markNotificationAsRead,
      dismissNotification,
      refillAtm,
      transferToCentralBank
    }}>
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (context === undefined) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};
