import type { AchievementDefinition } from '@/src/types/learning';
import { RewardCelebration } from './RewardCelebration';
import { isThumbRadiographAchievement, ThumbRadiographBadge } from './ThumbRadiographBadge';

type AchievementCelebrationProps = {
  definition: AchievementDefinition;
  showRayo?: boolean;
  xpGained: number;
};

export function AchievementCelebration({ definition, showRayo = true, xpGained }: AchievementCelebrationProps) {
  const isThumbBadge = isThumbRadiographAchievement(definition.id);
  return (
    <RewardCelebration
      code={definition.code}
      eyebrow="NUEVA INSIGNIA"
      message="¡Nuevo logro desbloqueado!"
      showRayo={showRayo}
      subtitle={`Dedo pulgar · +${xpGained} XP`}
      title={definition.title}
      visual={isThumbBadge ? <ThumbRadiographBadge definition={definition} earned={{ earnedAt: new Date().toISOString(), id: definition.id, title: definition.title }} mode="celebration" /> : undefined}
    />
  );
}

