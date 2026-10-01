import type { AchievementDefinition } from '@/src/types/learning';

export type ProjectionCatalogItem = {
  achievementId: string;
  id: string;
  studyId: string;
  title: string;
};

export type StudyCatalogItem = {
  achievementId: string;
  id: string;
  projectionIds: string[];
  regionId: string;
  title: string;
};

export const projectionCatalog: ProjectionCatalogItem[] = [
  { id: 'ap', title: 'AP', studyId: 'dedo-pulgar', achievementId: 'dominio-dedo-pulgar-ap' },
  { id: 'oblicua', title: 'Oblicua', studyId: 'dedo-pulgar', achievementId: 'dominio-dedo-pulgar-oblicua' },
  { id: 'lateral', title: 'Lateral', studyId: 'dedo-pulgar', achievementId: 'dominio-dedo-pulgar-lateral' },
  { id: 'mano-pa', title: 'P.A.', studyId: 'mano', achievementId: 'dominio-mano-pa' },
  { id: 'mano-oblicua', title: 'Oblicua', studyId: 'mano', achievementId: 'dominio-mano-oblicua' },
  { id: 'mano-lateral', title: 'Lateral', studyId: 'mano', achievementId: 'dominio-mano-lateral' }
];

export const studyCatalog: StudyCatalogItem[] = [
  {
    id: 'dedo-pulgar',
    title: 'Dedo pulgar',
    regionId: 'miembro-superior',
    projectionIds: ['ap', 'oblicua', 'lateral'],
    achievementId: 'maestria-dedo-pulgar'
  },
  {
    id: 'mano',
    title: 'Mano',
    regionId: 'miembro-superior',
    projectionIds: ['mano-pa', 'mano-oblicua', 'mano-lateral'],
    achievementId: 'maestria-mano'
  }
];

export const achievementCatalog: AchievementDefinition[] = [
  {
    id: 'dominio-dedo-pulgar-ap',
    code: 'AP',
    title: 'Dedo Pulgar — AP Dominada',
    description: 'Has completado correctamente los 15 desafíos de la proyección AP.',
    requirement: 'Domina los 15 desafíos oficiales de AP.',
    xpReward: 50
  },
  {
    id: 'dominio-dedo-pulgar-oblicua',
    code: 'OB',
    title: 'Dedo Pulgar — Oblicua Dominada',
    description: 'Has completado correctamente los 15 desafíos de la proyección Oblicua.',
    requirement: 'Domina los 15 desafíos oficiales de Oblicua.',
    xpReward: 50
  },
  {
    id: 'dominio-dedo-pulgar-lateral',
    code: 'LT',
    title: 'Dedo Pulgar — Lateral Dominada',
    description: 'Has completado correctamente los 15 desafíos de la proyección Lateral.',
    requirement: 'Domina los 15 desafíos oficiales de Lateral.',
    xpReward: 50
  },
  {
    id: 'maestria-dedo-pulgar',
    code: 'DP',
    title: 'Maestría: Dedo pulgar',
    description: 'Reconocimiento por dominar todas las proyecciones de Dedo pulgar.',
    requirement: 'Alcanza 100% en AP, Oblicua y Lateral.',
    xpReward: 100
  },
  {
    id: 'dedo-pulgar-verificado',
    code: 'DV',
    title: 'Dedo Pulgar — Verificado',
    description: 'Has demostrado dominio completo de AP, Oblicua y Lateral.',
    requirement: 'Domina las 30 preguntas de la Verificación de conocimientos.',
    xpReward: 200
  },
  {
    id: 'dominio-mano-pa', code: 'PA', title: 'Dominio P.A. — Mano',
    description: 'Has completado correctamente los 15 desafíos de la proyección P.A. de Mano.', requirement: 'Domina los 15 desafíos oficiales de P.A.', xpReward: 50
  },
  {
    id: 'dominio-mano-oblicua', code: 'OB', title: 'Dominio Oblicua — Mano',
    description: 'Has completado correctamente los 15 desafíos de la proyección Oblicua de Mano.', requirement: 'Domina los 15 desafíos oficiales de Oblicua.', xpReward: 50
  },
  {
    id: 'dominio-mano-lateral', code: 'LT', title: 'Dominio Lateral — Mano',
    description: 'Has completado correctamente los 15 desafíos de la proyección Lateral de Mano.', requirement: 'Domina los 15 desafíos oficiales de Lateral.', xpReward: 50
  },
  {
    id: 'maestria-mano', code: 'MA', title: 'Maestría: Mano',
    description: 'Reconocimiento por dominar las tres proyecciones de Mano.', requirement: 'Alcanza 100% en P.A., Oblicua y Lateral.', xpReward: 100
  },
  {
    id: 'mano-verificada', code: 'MV', title: 'Mano Verificada',
    description: 'Has demostrado dominio completo de P.A., Oblicua y Lateral de Mano.', requirement: 'Domina los 30 desafíos de la Verificación de conocimientos.', xpReward: 200
  }
];

export function getProjectionCatalogItem(id: string) {
  return projectionCatalog.find((projection) => projection.id === id);
}

export function getStudyCatalogItem(id: string) {
  return studyCatalog.find((study) => study.id === id);
}

export function getAchievementDefinition(id: string) {
  return achievementCatalog.find((achievement) => achievement.id === id);
}

