import type { AchievementDefinition } from '@/src/types/learning';
import { RewardCelebration } from './RewardCelebration';

type AchievementCelebrationProps = {
  definition: AchievementDefinition;
  showRayo?: boolean;
  xpGained: number;
};

export function AchievementCelebration({ definition, showRayo = true, xpGained }: AchievementCelebrationProps) {
  return (
    <RewardCelebration
      code={definition.code}
      eyebrow="NUEVA INSIGNIA"
      message="¡Nuevo logro desbloqueado!"
      showRayo={showRayo}
      subtitle={`Dedo pulgar · +${xpGained} XP`}
      title={definition.title}
    />
  );
}

