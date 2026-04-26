'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Info, AlertTriangle, AlertCircle, Check } from 'lucide-react';
import { useBank, Notification } from '@/context/BankContext';
import { formatDistanceToNow } from 'date-fns';
import { useI18n } from '@/context/LanguageContext';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const { notifications, markNotificationAsRead, dismissNotification } = useBank();

  const getIcon = (severity: Notification['severity']) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="text-red-500" size={18} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={18} />;
      case 'info': return <Info className="text-blue-500" size={18} />;
      default: return <Info className="text-blue-500" size={18} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-96 max-h-[500px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-[70] flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center space-x-2">
                <span className="font-black text-sm uppercase tracking-wider">{t('notifications')}</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-red-500 text-[10px] text-white font-black">
                    {unreadCount} {t('new')}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg transition-colors">
                <X size={16} className="text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell size={20} className="text-slate-500 opacity-20" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{t('noNotifications')}</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-4 hover:bg-slate-800 transition-colors relative group ${!n.isRead ? 'bg-blue-500/5' : ''}`}
                      onClick={() => markNotificationAsRead(n.id)}
                    >
                      <div className="flex space-x-3">
                        <div className="mt-0.5">{getIcon(n.severity)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold truncate text-slate-100">{n.title}</span>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">
                              {formatDistanceToNow(n.timestamp, { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{n.message}</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(n.id);
                        }}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-800 rounded transition-all"
                      >
                        <X size={12} className="text-slate-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-slate-800 bg-slate-900/50 text-center">
                <button className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-400 tracking-widest">
                  {t('viewAllActivity')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
