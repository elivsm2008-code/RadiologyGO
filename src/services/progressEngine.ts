import type {
  Achievement,
  LearningProgress,
  MasteryStatus,
  PracticeResult,
  PracticeUpdate,
  ProjectionId,
  ProjectionProgress
} from '@/src/types/learning';

const projectionNames: Record<ProjectionId, string> = {
  ap: 'AP',
  oblicua: 'Oblicua',
  lateral: 'Lateral'
};

const emptyProjection = (): ProjectionProgress => ({
  bestScore: 0,
  lastPractice: null,
  mastery: 0,
  masteredRewardGranted: false,
  practiceCount: 0
});

export function createInitialLearningProgress(): LearningProgress {
  return {
    achievements: [],
    projections: {
      ap: emptyProjection(),
      oblicua: emptyProjection(),
      lateral: emptyProjection()
    },
    thumbMasteryRewardGranted: false,
    xp: 0
  };
}

export function getMasteryStatus(mastery: number): MasteryStatus {
  if (mastery === 100) return 'Dominada';
  if (mastery >= 90) return 'Dominio avanzado';
  if (mastery >= 75) return 'Casi dominada';
  if (mastery >= 50) return 'Avanzando';
  if (mastery >= 25) return 'En práctica';
  return 'Por aprender';
}

export function calculateThumbMastery(progress: LearningProgress) {
  const values = Object.values(progress.projections).map((projection) => projection.mastery);
  return Math.round(values.reduce((total, mastery) => total + mastery, 0) / values.length);
}

function calculateMasteryGain(currentMastery: number, score: number) {
  if (score < 50) return 0;

  const performanceGain = score >= 95 ? 20 : score >= 80 ? 12 : score >= 65 ? 7 : 3;
  const masteryFactor = currentMastery >= 98 ? 0.1 : currentMastery >= 90 ? 0.25 : currentMastery >= 75 ? 0.45 : currentMastery >= 50 ? 0.65 : 1;
  return Math.max(1, Math.round(performanceGain * masteryFactor));
}

export function applyPracticeResult(current: LearningProgress, result: PracticeResult, practicedAt = new Date().toISOString()): PracticeUpdate {
  const totalAnswers = result.correctAnswers + result.incorrectAnswers;
  if (totalAnswers <= 0) {
    return { achievementsUnlocked: [], masteryGained: 0, progress: current, score: 0, xpGained: 0 };
  }

  const score = Math.round((result.correctAnswers / totalAnswers) * 100);
  const previousProjection = current.projections[result.projectionId];
  const masteryGained = Math.min(100 - previousProjection.mastery, calculateMasteryGain(previousProjection.mastery, score));
  const mastery = previousProjection.mastery + masteryGained;
  const achievementsUnlocked: Achievement[] = [];
  let xpGained = Math.round(score / 10) + result.correctAnswers * 2;
  let masteredRewardGranted = previousProjection.masteredRewardGranted;

  if (mastery === 100 && !masteredRewardGranted) {
    masteredRewardGranted = true;
    xpGained += 50;
    achievementsUnlocked.push({
      earnedAt: practicedAt,
      id: `dominio-dedo-pulgar-${result.projectionId}`,
      title: `Dominio ${projectionNames[result.projectionId]} — Dedo pulgar`
    });
  }

  const projections = {
    ...current.projections,
    [result.projectionId]: {
      bestScore: Math.max(previousProjection.bestScore, score),
      lastPractice: practicedAt,
      mastery,
      masteredRewardGranted,
      practiceCount: previousProjection.practiceCount + 1
    }
  };

  const allMastered = Object.values(projections).every((projection) => projection.mastery === 100);
  let thumbMasteryRewardGranted = current.thumbMasteryRewardGranted;
  if (allMastered && !thumbMasteryRewardGranted) {
    thumbMasteryRewardGranted = true;
    xpGained += 100;
    achievementsUnlocked.push({
      earnedAt: practicedAt,
      id: 'maestria-dedo-pulgar',
      title: 'Maestría: Dedo pulgar'
    });
  }

  return {
    achievementsUnlocked,
    masteryGained,
    progress: {
      achievements: [...current.achievements, ...achievementsUnlocked],
      projections,
      thumbMasteryRewardGranted,
      xp: current.xp + xpGained
    },
    score,
    xpGained
  };
}
