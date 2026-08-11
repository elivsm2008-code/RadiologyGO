import type { QuestionHistoryEntry } from '@/src/types/learning';
import type { PracticeQuestion } from '@/src/types/practiceQuestions';

type SelectPracticeQuestionsOptions = {
  bank: PracticeQuestion[];
  history: Record<string, QuestionHistoryEntry>;
  now?: number;
  projectionId: string;
  random?: () => number;
  recentQuestionIds?: string[];
  sessionSize?: number;
};

function conceptNeedsReview(history: Record<string, QuestionHistoryEntry>, conceptId: string, projectionId: string) {
  return Object.values(history)
    .filter((entry) => entry.conceptId === conceptId && entry.projectionId === projectionId)
    .reduce((score, entry) => score + entry.incorrectCount * 2 - entry.correctCount, 0);
}

function ageScore(lastSeenAt: string | undefined, now: number) {
  if (!lastSeenAt) return 120;
  const elapsedDays = Math.max(0, (now - new Date(lastSeenAt).getTime()) / 86_400_000);
  return Math.min(120, elapsedDays * 8);
}

export function selectPracticeQuestions({
  bank,
  history,
  now = Date.now(),
  projectionId,
  random = Math.random,
  recentQuestionIds = [],
  sessionSize = 7
}: SelectPracticeQuestionsOptions) {
  const recent = new Set(recentQuestionIds);
  const scored = bank.map((question) => {
    const questionHistory = history[question.id];
    const unseenScore = questionHistory ? 0 : 500;
    const questionReviewScore = questionHistory
      ? questionHistory.incorrectCount * 55 + (questionHistory.lastAnsweredCorrectly ? 0 : 80)
      : 0;
    const conceptReviewScore = Math.max(0, conceptNeedsReview(history, question.conceptId, projectionId)) * 25;
    const spacingScore = ageScore(questionHistory?.lastSeenAt, now);
    const recentPenalty = recent.has(question.id) ? 1000 : 0;
    return {
      question,
      score: unseenScore + questionReviewScore + conceptReviewScore + spacingScore - recentPenalty + random() * 30
    };
  });

  return scored
    .sort((left, right) => right.score - left.score)
    .slice(0, Math.min(sessionSize, bank.length))
    .map(({ question }) => question);
}
