import type { AchievementDefinition } from '@/src/types/learning';
import { RewardCelebration } from './RewardCelebration';

type AchievementCelebrationProps = {
  definition: AchievementDefinition;
  xpGained: number;
};

export function AchievementCelebration({ definition, xpGained }: AchievementCelebrationProps) {
  return (
    <RewardCelebration
      code={definition.code}
      eyebrow="NUEVA INSIGNIA"
      message="¡Nuevo logro desbloqueado!"
      subtitle={`Dedo pulgar · +${xpGained} XP`}
      title={definition.title}
    />
  );
}
