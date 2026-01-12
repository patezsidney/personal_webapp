'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';
import './toast.css';

type ToastType = 'success' | 'error';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextData {
  showToast: (message: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(({ title, description, type }: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        <Toast.Viewport className="ToastViewport" />
        {children}

        {toasts.map(({ id, title, description, type }) => (
          <Toast.Root
            key={id}
            className={`ToastRoot ${type}`}
            onOpenChange={(open) => !open && removeToast(id)}
          >
            <Toast.Title className="ToastTitle">{title}</Toast.Title>
            {description && (
              <Toast.Description className="ToastDescription">{description}</Toast.Description>
            )}
            <Toast.Close className="ToastClose" aria-label="Close">
              <Cross2Icon />
            </Toast.Close>
          </Toast.Root>
        ))}
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
