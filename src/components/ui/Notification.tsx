"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDictionary } from '../../i18n/LocaleProvider';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from './Icons';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationAction {
  label: string;
  href: string;
  target?: '_self' | '_blank';
}

interface NotificationProps {
  type: NotificationType;
  message: string;
  duration?: number;
  onCloseAction?: () => void;
  action?: NotificationAction;
  renderInline?: boolean;
}

export default function Notification({ 
  type, 
  message, 
  duration = 5000,
  onCloseAction,
  action,
  renderInline = false
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const dictionary = useDictionary();
  const notificationStrings = dictionary.components.notifications;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onCloseAction) onCloseAction();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onCloseAction]);
  
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };
  
  if (!isVisible) return null;

  const content = (
    <div
      className={`border px-4 py-3 rounded shadow-md ${getTypeStyles()}`}
      style={{ maxWidth: '90vw' }}
      role="alert"
    >
      <div className="flex items-start">
        <div className="mr-2 mt-0.5 shrink-0">
          {type === 'success' && <CheckCircle2 className="h-5 w-5" strokeWidth={2} />}
          {type === 'error' && <AlertCircle className="h-5 w-5" strokeWidth={2} />}
          {type === 'info' && <Info className="h-5 w-5" strokeWidth={2} />}
          {type === 'warning' && <AlertTriangle className="h-5 w-5" strokeWidth={2} />}
        </div>
        <div>
          <p className="font-bold">{notificationStrings.labels[type]}</p>
          <p className="text-sm">{message}</p>
          {action ? (
            <a
              href={action.href}
              target={action.target ?? '_self'}
              rel={action.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="mt-2 inline-flex items-center rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            >
              {action.label}
            </a>
          ) : null}
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            if (onCloseAction) onCloseAction();
          }}
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-gray-700"
        >
          <span className="sr-only">{notificationStrings.closeLabel}</span>
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );

  if (renderInline) {
    return content;
  }

  return createPortal(
    <div className="fixed top-4 right-4 z-50">
      {content}
    </div>,
    document.body
  );
}

// Notification manager to handle multiple notifications
export const useNotification = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: NotificationType;
    message: string;
    action?: NotificationAction;
  }>>([]);
  
  const addNotification = (type: NotificationType, message: string, action?: NotificationAction) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, type, message, action }]);
    return id;
  };
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const NotificationContainer = () => {
    if (notifications.length === 0) return null;
    
    return createPortal(
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {notifications.map(({ id, type, message, action }) => (
          <Notification
            key={id}
            type={type}
            message={message}
            action={action}
            onCloseAction={() => removeNotification(id)}
            renderInline
          />
        ))}
      </div>,
      document.body
    );
  };
  
  return {
    success: (message: string, action?: NotificationAction) => addNotification('success', message, action),
    error: (message: string, action?: NotificationAction) => addNotification('error', message, action),
    info: (message: string, action?: NotificationAction) => addNotification('info', message, action),
    warning: (message: string, action?: NotificationAction) => addNotification('warning', message, action),
    remove: removeNotification,
    NotificationContainer
  };
};
