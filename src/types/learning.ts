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
  projectionId: ProjectionId;
};

export type ProjectionProgress = {
  bestScore: number;
  lastPractice: string | null;
  mastery: number;
  masteredRewardGranted: boolean;
  practiceCount: number;
};

export type Achievement = {
  earnedAt: string;
  id: string;
  title: string;
};

export type LearningProgress = {
  achievements: Achievement[];
  projections: Record<ProjectionId, ProjectionProgress>;
  thumbMasteryRewardGranted: boolean;
  xp: number;
};

export type PracticeUpdate = {
  achievementsUnlocked: Achievement[];
  masteryGained: number;
  progress: LearningProgress;
  score: number;
  xpGained: number;
};
