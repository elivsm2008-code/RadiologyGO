export type ProjectionId = 'ap' | 'oblicua' | 'lateral';

export type MasteryStatus =
  | 'Por aprender'
  | 'En práctica'
  | 'Avanzando'
  | 'Casi dominada'
  | 'Dominio avanzado'
  | 'Dominada';

export type PracticeResult = {
  correctAnswers: number;
  incorrectAnswers: number;
  projectionId: string;
  questionResults?: QuestionResult[];
  totalQuestionCount?: number;
};

export type QuestionResult = {
  conceptId: string;
  correct: boolean;
  questionId: string;
};

export type QuestionHistoryEntry = {
  conceptId: string;
  correctCount: number;
  incorrectCount: number;
  lastAnsweredCorrectly: boolean;
  lastSeenAt: string;
  projectionId: string;
  seenCount: number;
};

export type ProjectionProgress = {
  bestScore: number;
  lastPractice: string | null;
  mastery: number;
  practiceCount: number;
};

export type QuestionBankProgress = {
  hasCompletedInitialRound: boolean;
  masteredQuestionIds: string[];
  reinforcementQuestionIds: string[];
};

export type VerificationStatus = 'Bloqueada' | 'Disponible' | 'En progreso' | 'Verificada';

export type KnowledgeVerificationProgress = QuestionBankProgress & {
  completedAt: string | null;
  selectedQuestionIds: string[];
  status: VerificationStatus;
};

export type Achievement = {
  earnedAt: string;
  id: string;
  title: string;
};

export type AchievementDefinition = {
  code: string;
  description: string;
  id: string;
  requirement: string;
  title: string;
  xpReward: number;
};

export type LearningProgress = {
  achievements: Achievement[];
  projections: Record<string, ProjectionProgress>;
  questionBankProgress: Record<string, QuestionBankProgress>;
  questionHistory: Record<string, QuestionHistoryEntry>;
  recentQuestionIds: Record<string, string[]>;
  schemaVersion: number;
  thumbVerification: KnowledgeVerificationProgress;
  xp: number;
};

export type LevelProgress = {
  currentLevelXp: number;
  level: number;
  nextLevelTotalXp: number;
  progressPercent: number;
  xpIntoLevel: number;
  xpNeededForLevel: number;
};

export type PracticeUpdate = {
  achievementsUnlocked: Achievement[];
  levelAfter: number;
  levelBefore: number;
  masteryGained: number;
  progress: LearningProgress;
  score: number;
  xpGained: number;
};

export type QuestionAnswerUpdate = {
  achievementsUnlocked: Achievement[];
  levelAfter: number;
  levelBefore: number;
  progress: LearningProgress;
  xpGained: number;
};
