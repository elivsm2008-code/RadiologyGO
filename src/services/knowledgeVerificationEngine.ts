import { thumbQuestionBanks } from '@/src/data/thumbQuestionBanks';
import type { PracticeQuestion } from '@/src/types/practiceQuestions';

function sample<T>(items: T[], count: number) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy.slice(0, count);
}

export function createThumbVerificationQuestionIds() {
  return [
    ...sample(thumbQuestionBanks.ap, 10),
    ...sample(thumbQuestionBanks.oblicua, 10),
    ...sample(thumbQuestionBanks.lateral, 10)
  ].map((question) => question.id);
}

export function getThumbVerificationBank(questionIds: string[]): PracticeQuestion[] {
  const all = [...thumbQuestionBanks.ap, ...thumbQuestionBanks.oblicua, ...thumbQuestionBanks.lateral];
  return questionIds.map((id) => all.find((question) => question.id === id)).filter((question): question is PracticeQuestion => Boolean(question));
}
