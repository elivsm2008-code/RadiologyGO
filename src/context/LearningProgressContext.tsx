import { createContext, type PropsWithChildren, useContext, useMemo, useState } from 'react';

import { applyPracticeResult, createInitialLearningProgress } from '@/src/services/progressEngine';
import type { LearningProgress, PracticeResult, PracticeUpdate } from '@/src/types/learning';

type LearningProgressContextValue = {
  progress: LearningProgress;
  registerPractice: (result: PracticeResult) => PracticeUpdate;
};

const LearningProgressContext = createContext<LearningProgressContextValue | null>(null);

export function LearningProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState(createInitialLearningProgress);

  const value = useMemo<LearningProgressContextValue>(() => ({
    progress,
    registerPractice: (result) => {
      const update = applyPracticeResult(progress, result);
      setProgress(update.progress);
      return update;
    }
  }), [progress]);

  return <LearningProgressContext.Provider value={value}>{children}</LearningProgressContext.Provider>;
}

export function useLearningProgress() {
  const context = useContext(LearningProgressContext);
  if (!context) throw new Error('useLearningProgress debe utilizarse dentro de LearningProgressProvider');
  return context;
}
