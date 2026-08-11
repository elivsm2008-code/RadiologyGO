import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { applyPracticeResult, createInitialLearningProgress, recordPracticeSessionStarted } from '@/src/services/progressEngine';
import { loadLearningProgress, saveLearningProgress } from '@/src/services/progressStorage';
import type { LearningProgress, PracticeResult, PracticeUpdate } from '@/src/types/learning';

type LearningProgressContextValue = {
  isHydrated: boolean;
  progress: LearningProgress;
  registerPractice: (result: PracticeResult) => PracticeUpdate;
  startPracticeSession: (projectionId: string, questionIds: string[]) => void;
};

const LearningProgressContext = createContext<LearningProgressContextValue | null>(null);

export function LearningProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState(createInitialLearningProgress);
  const [isHydrated, setIsHydrated] = useState(false);
  const progressRef = useRef(progress);

  useEffect(() => {
    let active = true;
    loadLearningProgress().then((storedProgress) => {
      if (!active) return;
      progressRef.current = storedProgress;
      setProgress(storedProgress);
      setIsHydrated(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    saveLearningProgress(progress).catch(() => undefined);
  }, [isHydrated, progress]);

  const value = useMemo<LearningProgressContextValue>(() => ({
    isHydrated,
    progress,
    registerPractice: (result) => {
      const update = applyPracticeResult(progressRef.current, result);
      progressRef.current = update.progress;
      setProgress(update.progress);
      return update;
    },
    startPracticeSession: (projectionId, questionIds) => {
      const updated = recordPracticeSessionStarted(progressRef.current, projectionId, questionIds);
      progressRef.current = updated;
      setProgress(updated);
    }
  }), [isHydrated, progress]);

  return <LearningProgressContext.Provider value={value}>{children}</LearningProgressContext.Provider>;
}

export function useLearningProgress() {
  const context = useContext(LearningProgressContext);
  if (!context) throw new Error('useLearningProgress debe utilizarse dentro de LearningProgressProvider');
  return context;
}
