import { achievementCatalog, getAchievementDefinition, getProjectionCatalogItem, getStudyCatalogItem, projectionCatalog, studyCatalog } from '@/src/data/learningCatalog';
import type { Achievement, LearningProgress, LevelProgress, MasteryStatus, PracticeResult, PracticeUpdate, ProjectionProgress } from '@/src/types/learning';

const emptyProjection = (): ProjectionProgress => ({ bestScore: 0, lastPractice: null, mastery: 0, practiceCount: 0 });

export function createInitialLearningProgress(): LearningProgress {
  return {
    achievements: [],
    projections: Object.fromEntries(projectionCatalog.map((projection) => [projection.id, emptyProjection()])),
    questionHistory: {},
    recentQuestionIds: {},
    schemaVersion: 2,
    xp: 0
  };
}

export function normalizeLearningProgress(value?: Partial<LearningProgress> | null): LearningProgress {
  const initial = createInitialLearningProgress();
  if (!value || typeof value !== 'object') return initial;

  return {
    achievements: Array.isArray(value.achievements) ? value.achievements : [],
    projections: Object.fromEntries(projectionCatalog.map((projection) => [
      projection.id,
      { ...emptyProjection(), ...(value.projections?.[projection.id] ?? {}) }
    ])),
    questionHistory: value.questionHistory && typeof value.questionHistory === 'object' ? value.questionHistory : {},
    recentQuestionIds: value.recentQuestionIds && typeof value.recentQuestionIds === 'object' ? value.recentQuestionIds : {},
    schemaVersion: 2,
    xp: typeof value.xp === 'number' && value.xp >= 0 ? value.xp : 0
  };
}

export function recordPracticeSessionStarted(current: LearningProgress, projectionId: string, questionIds: string[]) {
  return {
    ...current,
    recentQuestionIds: { ...current.recentQuestionIds, [projectionId]: questionIds }
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

export function calculateAverageMastery(progress: LearningProgress, projectionIds: string[]) {
  if (projectionIds.length === 0) return 0;
  const total = projectionIds.reduce((sum, id) => sum + (progress.projections[id]?.mastery ?? 0), 0);
  return Math.round(total / projectionIds.length);
}

export function calculateStudyMastery(progress: LearningProgress, studyId: string) {
  return calculateAverageMastery(progress, getStudyCatalogItem(studyId)?.projectionIds ?? []);
}

export function calculateRegionMastery(progress: LearningProgress, regionId: string) {
  const projectionIds = studyCatalog.filter((study) => study.regionId === regionId).flatMap((study) => study.projectionIds);
  return calculateAverageMastery(progress, projectionIds);
}

export function calculateThumbMastery(progress: LearningProgress) {
  return calculateStudyMastery(progress, 'dedo-pulgar');
}

function totalXpForLevel(level: number) {
  const completedLevels = Math.max(0, level - 1);
  return completedLevels * 100 + 25 * completedLevels * Math.max(0, completedLevels - 1);
}

export function calculateLevelProgress(xp: number): LevelProgress {
  let level = 1;
  while (xp >= totalXpForLevel(level + 1)) level += 1;
  const currentLevelXp = totalXpForLevel(level);
  const nextLevelTotalXp = totalXpForLevel(level + 1);
  const xpNeededForLevel = nextLevelTotalXp - currentLevelXp;
  const xpIntoLevel = xp - currentLevelXp;
  return {
    currentLevelXp,
    level,
    nextLevelTotalXp,
    progressPercent: Math.round((xpIntoLevel / xpNeededForLevel) * 100),
    xpIntoLevel,
    xpNeededForLevel
  };
}

export function getProgressSummary(progress: LearningProgress) {
  return {
    badgesEarned: progress.achievements.length,
    masteredProjections: projectionCatalog.filter((projection) => progress.projections[projection.id]?.mastery === 100).length,
    totalPractices: Object.values(progress.projections).reduce((total, projection) => total + projection.practiceCount, 0)
  };
}

function calculateMasteryGain(currentMastery: number, score: number) {
  if (score < 50) return 0;
  const performanceGain = score >= 95 ? 20 : score >= 80 ? 12 : score >= 65 ? 7 : 3;
  const masteryFactor = currentMastery >= 98 ? 0.1 : currentMastery >= 90 ? 0.25 : currentMastery >= 75 ? 0.45 : currentMastery >= 50 ? 0.65 : 1;
  return Math.max(1, Math.round(performanceGain * masteryFactor));
}

function unlockAchievement(achievements: Achievement[], achievementId: string, earnedAt: string) {
  if (achievements.some((achievement) => achievement.id === achievementId)) return null;
  const definition = getAchievementDefinition(achievementId);
  if (!definition) return null;
  return { earnedAt, id: definition.id, title: definition.title } satisfies Achievement;
}

export function applyPracticeResult(current: LearningProgress, result: PracticeResult, practicedAt = new Date().toISOString()): PracticeUpdate {
  const projectionItem = getProjectionCatalogItem(result.projectionId);
  const totalAnswers = result.correctAnswers + result.incorrectAnswers;
  const levelBefore = calculateLevelProgress(current.xp).level;
  if (!projectionItem || totalAnswers <= 0) {
    return { achievementsUnlocked: [], levelAfter: levelBefore, levelBefore, masteryGained: 0, progress: current, score: 0, xpGained: 0 };
  }

  const score = Math.round((result.correctAnswers / totalAnswers) * 100);
  const previousProjection = current.projections[result.projectionId] ?? emptyProjection();
  const masteryGained = Math.min(100 - previousProjection.mastery, calculateMasteryGain(previousProjection.mastery, score));
  const mastery = previousProjection.mastery + masteryGained;
  const achievementsUnlocked: Achievement[] = [];
  let xpGained = Math.round(score / 10) + result.correctAnswers * 2;

  const projections = {
    ...current.projections,
    [result.projectionId]: {
      bestScore: Math.max(previousProjection.bestScore, score),
      lastPractice: practicedAt,
      mastery,
      practiceCount: previousProjection.practiceCount + 1
    }
  };

  const questionHistory = { ...current.questionHistory };
  result.questionResults?.forEach((questionResult) => {
    const previous = questionHistory[questionResult.questionId];
    questionHistory[questionResult.questionId] = {
      conceptId: questionResult.conceptId,
      correctCount: (previous?.correctCount ?? 0) + (questionResult.correct ? 1 : 0),
      incorrectCount: (previous?.incorrectCount ?? 0) + (questionResult.correct ? 0 : 1),
      lastAnsweredCorrectly: questionResult.correct,
      lastSeenAt: practicedAt,
      projectionId: result.projectionId,
      seenCount: (previous?.seenCount ?? 0) + 1
    };
  });

  if (mastery === 100) {
    const achievement = unlockAchievement(current.achievements, projectionItem.achievementId, practicedAt);
    if (achievement) {
      achievementsUnlocked.push(achievement);
      xpGained += getAchievementDefinition(achievement.id)?.xpReward ?? 0;
    }
  }

  const study = getStudyCatalogItem(projectionItem.studyId);
  if (study && study.projectionIds.every((id) => projections[id]?.mastery === 100)) {
    const achievement = unlockAchievement([...current.achievements, ...achievementsUnlocked], study.achievementId, practicedAt);
    if (achievement) {
      achievementsUnlocked.push(achievement);
      xpGained += getAchievementDefinition(achievement.id)?.xpReward ?? 0;
    }
  }

  const progress = {
    achievements: [...current.achievements, ...achievementsUnlocked],
    projections,
    questionHistory,
    recentQuestionIds: current.recentQuestionIds,
    schemaVersion: 2,
    xp: current.xp + xpGained
  };

  return {
    achievementsUnlocked,
    levelAfter: calculateLevelProgress(progress.xp).level,
    levelBefore,
    masteryGained,
    progress,
    score,
    xpGained
  };
}

export { achievementCatalog };
