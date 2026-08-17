import type { ThumbProjection } from '@/src/data/thumbLearning';
import { getThumbQuestionBank } from '@/src/data/thumbQuestionBanks';
import { QuestionMasteryPractice } from './QuestionMasteryPractice';

export function ProjectionPracticeMode({ projection }: { projection: ThumbProjection }) {
  return <QuestionMasteryPractice bank={getThumbQuestionBank(projection.id)} scopeId={projection.id} title={projection.title} />;
}
