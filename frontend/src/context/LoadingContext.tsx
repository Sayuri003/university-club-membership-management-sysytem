import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

interface LoadingContextValue {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

// Minimum time (ms) the loader stays visible once triggered,
// so fast navigations don't just flash the screen.
const MIN_LOADING_TIME = 500;

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const startTimeRef = useRef<number>(0);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    startTimeRef.current = Date.now();
    setIsLoading(true);
  };

  const stopLoading = () => {
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(MIN_LOADING_TIME - elapsed, 0);

    hideTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      hideTimeoutRef.current = null;
    }, remaining);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return ctx;
}