'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type PortfolioMode = 'recruiter' | 'engineer';

interface PortfolioInteractionContextValue {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
  clearSelectedSkill: () => void;
}

const PortfolioInteractionContext = createContext<PortfolioInteractionContextValue | null>(null);

export function PortfolioInteractionProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>('recruiter');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const storedMode = window.localStorage.getItem('portfolio-mode');
    if (storedMode === 'recruiter' || storedMode === 'engineer') {
      setModeState(storedMode);
    }
  }, []);

  const setMode = (nextMode: PortfolioMode) => {
    setModeState(nextMode);
    window.localStorage.setItem('portfolio-mode', nextMode);
  };

  const value = useMemo(
    () => ({
      mode,
      setMode,
      selectedSkill,
      setSelectedSkill,
      clearSelectedSkill: () => setSelectedSkill(null),
    }),
    [mode, selectedSkill],
  );

  return (
    <PortfolioInteractionContext.Provider value={value}>
      {children}
    </PortfolioInteractionContext.Provider>
  );
}

export function usePortfolioInteraction() {
  const context = useContext(PortfolioInteractionContext);
  if (!context) {
    throw new Error('usePortfolioInteraction must be used inside PortfolioInteractionProvider');
  }
  return context;
}
