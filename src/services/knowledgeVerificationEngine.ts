import { verificationQuestionBanks } from '@/src/data/verificationQuestionBanks';
import type { PracticeQuestion } from '@/src/types/practiceQuestions';

export function createThumbVerificationQuestionIds() {
  return verificationQuestionBanks.thumb.map((question) => question.id);
}

export function getThumbVerificationBank(questionIds: string[]): PracticeQuestion[] {
  return questionIds.map((id) => verificationQuestionBanks.thumb.find((question) => question.id === id)).filter((question): question is PracticeQuestion => Boolean(question));
}

export function createHandVerificationQuestionIds() {
  return verificationQuestionBanks.hand.map((question) => question.id);
}

export function getHandVerificationBank(questionIds: string[]): PracticeQuestion[] {
  return questionIds.map((id) => verificationQuestionBanks.hand.find((question) => question.id === id)).filter((question): question is PracticeQuestion => Boolean(question));
}

