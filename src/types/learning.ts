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
  questionHistory: Record<string, QuestionHistoryEntry>;
  recentQuestionIds: Record<string, string[]>;
  schemaVersion: number;
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
