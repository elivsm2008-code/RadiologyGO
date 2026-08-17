import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { applyPracticeResult, applyQuestionAnswer, applyReviewAnswer, completeProjectionReview, completeQuestionRound, createInitialLearningProgress, initializeThumbVerification, recordPracticeSessionStarted, startProjectionReview } from '@/src/services/progressEngine';
import { loadLearningProgress, saveLearningProgress } from '@/src/services/progressStorage';
import type { LearningProgress, PracticeResult, PracticeUpdate, QuestionAnswerUpdate } from '@/src/types/learning';

type LearningProgressContextValue = {
  isHydrated: boolean;
  progress: LearningProgress;
  registerPractice: (result: PracticeResult) => PracticeUpdate;
  answerQuestion: (scopeId: string, questionId: string, conceptId: string, correct: boolean, total: number, isVerification?: boolean) => QuestionAnswerUpdate;
  answerReviewQuestion: (projectionId: string, questionId: string, correct: boolean) => LearningProgress;
  completeReview: (projectionId: string, correct: number, total: number) => LearningProgress;
  completeRound: (scopeId: string, score: number, isVerification?: boolean) => LearningProgress;
  initializeVerification: (questionIds: string[]) => LearningProgress;
  startPracticeSession: (projectionId: string, questionIds: string[]) => void;
  startReview: (projectionId: string, questionIds: string[]) => LearningProgress;
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
    answerQuestion: (scopeId, questionId, conceptId, correct, total, isVerification = false) => {
      const update = applyQuestionAnswer(progressRef.current, scopeId, questionId, conceptId, correct, total, isVerification);
      progressRef.current = update.progress;
      setProgress(update.progress);
      return update;
    },
    answerReviewQuestion: (projectionId, questionId, correct) => {
      const updated = applyReviewAnswer(progressRef.current, projectionId, questionId, correct);
      progressRef.current = updated;
      setProgress(updated);
      return updated;
    },
    completeReview: (projectionId, correct, total) => {
      const updated = completeProjectionReview(progressRef.current, projectionId, correct, total);
      progressRef.current = updated;
      setProgress(updated);
      return updated;
    },
    completeRound: (scopeId, score, isVerification = false) => {
      const updated = completeQuestionRound(progressRef.current, scopeId, score, isVerification);
      progressRef.current = updated;
      setProgress(updated);
      return updated;
    },
    initializeVerification: (questionIds) => {
      const updated = initializeThumbVerification(progressRef.current, questionIds);
      progressRef.current = updated;
      setProgress(updated);
      return updated;
    },
    startPracticeSession: (projectionId, questionIds) => {
      const updated = recordPracticeSessionStarted(progressRef.current, projectionId, questionIds);
      progressRef.current = updated;
      setProgress(updated);
    },
    startReview: (projectionId, questionIds) => {
      const updated = startProjectionReview(progressRef.current, projectionId, questionIds);
      progressRef.current = updated;
      setProgress(updated);
      return updated;
    }
  }), [isHydrated, progress]);

  return <LearningProgressContext.Provider value={value}>{children}</LearningProgressContext.Provider>;
}

export function useLearningProgress() {
  const context = useContext(LearningProgressContext);
  if (!context) throw new Error('useLearningProgress debe utilizarse dentro de LearningProgressProvider');
  return context;
}
