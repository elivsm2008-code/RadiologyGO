import { achievementCatalog, getAchievementDefinition, getProjectionCatalogItem, getStudyCatalogItem, projectionCatalog, studyCatalog } from '@/src/data/learningCatalog';
import type { Achievement, LearningProgress, LevelProgress, MasteryStatus, PracticeResult, PracticeUpdate, ProjectionProgress, ProjectionReviewProgress, QuestionAnswerUpdate, QuestionBankProgress } from '@/src/types/learning';

const emptyProjection = (): ProjectionProgress => ({ bestScore: 0, lastPractice: null, lastReviewCorrect: null, lastReviewScore: null, lastReviewTotal: null, mastery: 0, practiceCount: 0 });
const emptyBankProgress = (): QuestionBankProgress => ({ hasCompletedInitialRound: false, masteredQuestionIds: [], reinforcementQuestionIds: [] });
const emptyReview = (): ProjectionReviewProgress => ({ activeQuestionIds: [], correctQuestionIds: [], hasCompletedRound: false, reinforcementQuestionIds: [], startedAt: null });
const emptyVerification = () => ({ ...emptyBankProgress(), completedAt: null, selectedQuestionIds: [], status: 'Bloqueada' as const });

export function createInitialLearningProgress(): LearningProgress {
  return {
    achievements: [],
    projections: Object.fromEntries(projectionCatalog.map((item) => [item.id, emptyProjection()])),
    questionBankProgress: Object.fromEntries(projectionCatalog.map((item) => [item.id, emptyBankProgress()])),
    questionHistory: {}, recentQuestionIds: {}, reviews: Object.fromEntries(projectionCatalog.map((item) => [item.id, emptyReview()])), schemaVersion: 5, thumbVerification: emptyVerification(), handVerification: emptyVerification(), xp: 0
  };
}

export function normalizeLearningProgress(value?: Partial<LearningProgress> | null): LearningProgress {
  const initial = createInitialLearningProgress();
  if (!value || typeof value !== 'object') return initial;
  const hasQuestionMastery = (value.schemaVersion ?? 0) >= 3;
  const banks = Object.fromEntries(projectionCatalog.map((item) => {
    const stored = hasQuestionMastery ? value.questionBankProgress?.[item.id] : undefined;
    return [item.id, { ...emptyBankProgress(), ...(stored ?? {}) }];
  }));
  const projections = Object.fromEntries(projectionCatalog.map((item) => {
    const stored = value.projections?.[item.id];
    const mastery = Math.round(((banks[item.id]?.masteredQuestionIds.length ?? 0) / 30) * 100);
    return [item.id, { ...emptyProjection(), ...(stored ?? {}), mastery }];
  }));
  const verification = hasQuestionMastery ? { ...emptyVerification(), ...(value.thumbVerification ?? {}) } : emptyVerification();
  return {
    achievements: Array.isArray(value.achievements) ? value.achievements : [], projections, questionBankProgress: banks,
    questionHistory: value.questionHistory && typeof value.questionHistory === 'object' ? value.questionHistory : {},
    recentQuestionIds: value.recentQuestionIds && typeof value.recentQuestionIds === 'object' ? value.recentQuestionIds : {},
    reviews: Object.fromEntries(projectionCatalog.map((item) => [item.id, { ...emptyReview(), ...(value.reviews?.[item.id] ?? {}) }])),
    schemaVersion: 5, thumbVerification: verification,
    handVerification: hasQuestionMastery ? { ...emptyVerification(), ...(value.handVerification ?? {}) } : emptyVerification(),
    xp: typeof value.xp === 'number' && value.xp >= 0 ? value.xp : 0
  };
}

export function recordPracticeSessionStarted(current: LearningProgress, projectionId: string, questionIds: string[]) {
  return { ...current, recentQuestionIds: { ...current.recentQuestionIds, [projectionId]: questionIds } };
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
  if (!projectionIds.length) return 0;
  return Math.round(projectionIds.reduce((sum, id) => sum + (progress.projections[id]?.mastery ?? 0), 0) / projectionIds.length);
}
export const calculateStudyMastery = (progress: LearningProgress, studyId: string) => calculateAverageMastery(progress, getStudyCatalogItem(studyId)?.projectionIds ?? []);
export const calculateRegionMastery = (progress: LearningProgress, regionId: string) => calculateAverageMastery(progress, studyCatalog.filter((study) => study.regionId === regionId).flatMap((study) => study.projectionIds));
export const calculateThumbMastery = (progress: LearningProgress) => calculateStudyMastery(progress, 'dedo-pulgar');

function totalXpForLevel(level: number) { const completed = Math.max(0, level - 1); return completed * 100 + 25 * completed * Math.max(0, completed - 1); }
export function calculateLevelProgress(xp: number): LevelProgress {
  let level = 1; while (xp >= totalXpForLevel(level + 1)) level += 1;
  const currentLevelXp = totalXpForLevel(level), nextLevelTotalXp = totalXpForLevel(level + 1);
  const xpNeededForLevel = nextLevelTotalXp - currentLevelXp, xpIntoLevel = xp - currentLevelXp;
  return { currentLevelXp, level, nextLevelTotalXp, progressPercent: Math.round((xpIntoLevel / xpNeededForLevel) * 100), xpIntoLevel, xpNeededForLevel };
}
export function getProgressSummary(progress: LearningProgress) {
  return { badgesEarned: progress.achievements.length, masteredProjections: projectionCatalog.filter((item) => progress.projections[item.id]?.mastery === 100).length, totalPractices: Object.values(progress.projections).reduce((total, item) => total + item.practiceCount, 0) };
}

function unlock(owned: Achievement[], id: string, earnedAt: string) {
  if (owned.some((item) => item.id === id)) return null;
  const definition = getAchievementDefinition(id); return definition ? ({ earnedAt, id, title: definition.title } satisfies Achievement) : null;
}
const unique = (items: string[]) => [...new Set(items)];

export function applyQuestionAnswer(current: LearningProgress, scopeId: string, questionId: string, conceptId: string, correct: boolean, totalQuestionCount: number, isVerification = false, answeredAt = new Date().toISOString()): QuestionAnswerUpdate {
  const levelBefore = calculateLevelProgress(current.xp).level;
  const source = isVerification ? current.thumbVerification : (current.questionBankProgress[scopeId] ?? emptyBankProgress());
  const wasMastered = source.masteredQuestionIds.includes(questionId);
  const masteredQuestionIds = correct ? unique([...source.masteredQuestionIds, questionId]) : source.masteredQuestionIds;
  const reinforcementQuestionIds = correct
    ? source.reinforcementQuestionIds.filter((id) => id !== questionId)
    : wasMastered ? source.reinforcementQuestionIds : unique([...source.reinforcementQuestionIds, questionId]);
  const hasCompletedInitialRound = source.hasCompletedInitialRound || unique([...masteredQuestionIds, ...reinforcementQuestionIds]).length >= totalQuestionCount;
  const achievementsUnlocked: Achievement[] = [];
  let xpGained = correct && !wasMastered ? 2 : 0;
  let projections = current.projections;
  let questionBankProgress = current.questionBankProgress;
  let thumbVerification = current.thumbVerification;

  if (isVerification) {
    const completed = masteredQuestionIds.length === totalQuestionCount;
    thumbVerification = { ...current.thumbVerification, hasCompletedInitialRound, masteredQuestionIds, reinforcementQuestionIds, status: completed ? 'Verificada' : 'En progreso', completedAt: completed ? (current.thumbVerification.completedAt ?? answeredAt) : null };
    if (completed) {
      const achievement = unlock(current.achievements, 'dedo-pulgar-verificado', answeredAt);
      if (achievement) { achievementsUnlocked.push(achievement); xpGained += getAchievementDefinition(achievement.id)?.xpReward ?? 0; }
    }
  } else {
    const mastery = Math.round((masteredQuestionIds.length / totalQuestionCount) * 100);
    questionBankProgress = { ...current.questionBankProgress, [scopeId]: { hasCompletedInitialRound, masteredQuestionIds, reinforcementQuestionIds } };
    projections = { ...current.projections, [scopeId]: { ...(current.projections[scopeId] ?? emptyProjection()), mastery } };
    const projection = getProjectionCatalogItem(scopeId);
    if (mastery === 100 && projection) {
      const achievement = unlock(current.achievements, projection.achievementId, answeredAt);
      if (achievement) { achievementsUnlocked.push(achievement); xpGained += getAchievementDefinition(achievement.id)?.xpReward ?? 0; }
    }
    const study = projection ? getStudyCatalogItem(projection.studyId) : undefined;
    if (study && study.projectionIds.every((id) => projections[id]?.mastery === 100)) {
      const achievement = unlock([...current.achievements, ...achievementsUnlocked], study.achievementId, answeredAt);
      if (achievement) { achievementsUnlocked.push(achievement); xpGained += getAchievementDefinition(achievement.id)?.xpReward ?? 0; }
      if (thumbVerification.status === 'Bloqueada') thumbVerification = { ...thumbVerification, status: 'Disponible' };
    }
  }

  const previousHistory = current.questionHistory[questionId];
  const questionHistory = { ...current.questionHistory, [questionId]: { conceptId, correctCount: (previousHistory?.correctCount ?? 0) + (correct ? 1 : 0), incorrectCount: (previousHistory?.incorrectCount ?? 0) + (correct ? 0 : 1), lastAnsweredCorrectly: correct, lastSeenAt: answeredAt, projectionId: scopeId, seenCount: (previousHistory?.seenCount ?? 0) + 1 } };
  const progress = { ...current, achievements: [...current.achievements, ...achievementsUnlocked], projections, questionBankProgress, questionHistory, schemaVersion: 5, thumbVerification, xp: current.xp + xpGained };
  return { achievementsUnlocked, levelAfter: calculateLevelProgress(progress.xp).level, levelBefore, progress, xpGained };
}

export function completeQuestionRound(current: LearningProgress, scopeId: string, score: number, isVerification = false, completedAt = new Date().toISOString()) {
  if (isVerification) return current;
  const previous = current.projections[scopeId] ?? emptyProjection();
  return { ...current, projections: { ...current.projections, [scopeId]: { ...previous, bestScore: Math.max(previous.bestScore, score), lastPractice: completedAt, practiceCount: previous.practiceCount + 1 } } };
}

export function startProjectionReview(current: LearningProgress, projectionId: string, questionIds: string[], startedAt = new Date().toISOString()) {
  if (current.projections[projectionId]?.mastery !== 100) return current;
  return {
    ...current,
    reviews: {
      ...current.reviews,
      [projectionId]: { activeQuestionIds: questionIds, correctQuestionIds: [], hasCompletedRound: false, reinforcementQuestionIds: [], startedAt }
    }
  };
}

export function applyReviewAnswer(current: LearningProgress, projectionId: string, questionId: string, correct: boolean) {
  if (current.projections[projectionId]?.mastery !== 100) return current;
  const review = current.reviews[projectionId] ?? emptyReview();
  const correctQuestionIds = correct ? unique([...review.correctQuestionIds, questionId]) : review.correctQuestionIds;
  const reinforcementQuestionIds = correct
    ? review.reinforcementQuestionIds.filter((id) => id !== questionId)
    : unique([...review.reinforcementQuestionIds, questionId]);
  return { ...current, reviews: { ...current.reviews, [projectionId]: { ...review, correctQuestionIds, reinforcementQuestionIds } } };
}

export function completeProjectionReview(current: LearningProgress, projectionId: string, correctAnswers: number, totalAnswers: number, completedAt = new Date().toISOString()) {
  if (current.projections[projectionId]?.mastery !== 100 || totalAnswers <= 0) return current;
  const score = Math.round((correctAnswers / totalAnswers) * 100);
  const projection = current.projections[projectionId];
  const review = current.reviews[projectionId] ?? emptyReview();
  if (review.hasCompletedRound) return current;
  return {
    ...current,
    projections: {
      ...current.projections,
      [projectionId]: {
        ...projection,
        bestScore: Math.max(projection.bestScore, score),
        lastPractice: completedAt,
        lastReviewCorrect: correctAnswers,
        lastReviewScore: score,
        lastReviewTotal: totalAnswers,
        mastery: 100,
        practiceCount: projection.practiceCount + 1
      }
    },
    reviews: { ...current.reviews, [projectionId]: { ...review, hasCompletedRound: true } }
  };
}

export function initializeThumbVerification(current: LearningProgress, selectedQuestionIds: string[]) {
  if (current.thumbVerification.selectedQuestionIds.length || !['Disponible','En progreso'].includes(current.thumbVerification.status)) return current;
  return { ...current, thumbVerification: { ...current.thumbVerification, selectedQuestionIds, status: 'En progreso' as const } };
}

// Compatibilidad temporal para consumidores anteriores.
export function applyPracticeResult(current: LearningProgress, result: PracticeResult): PracticeUpdate {
  const total = result.correctAnswers + result.incorrectAnswers;
  const score = total ? Math.round((result.correctAnswers / total) * 100) : 0;
  const progress = completeQuestionRound(current, result.projectionId, score);
  const level = calculateLevelProgress(progress.xp).level;
  return { achievementsUnlocked: [], levelAfter: level, levelBefore: level, masteryGained: 0, progress, score, xpGained: 0 };
}

export { achievementCatalog };

