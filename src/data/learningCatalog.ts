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
  { id: 'lateral', title: 'Lateral', studyId: 'dedo-pulgar', achievementId: 'dominio-dedo-pulgar-lateral' }
];

export const studyCatalog: StudyCatalogItem[] = [
  {
    id: 'dedo-pulgar',
    title: 'Dedo pulgar',
    regionId: 'miembro-superior',
    projectionIds: ['ap', 'oblicua', 'lateral'],
    achievementId: 'maestria-dedo-pulgar'
  }
];

export const achievementCatalog: AchievementDefinition[] = [
  {
    id: 'dominio-dedo-pulgar-ap',
    code: 'AP',
    title: 'Dominio AP',
    description: 'Dominio de la proyección AP de Dedo pulgar.',
    requirement: 'Alcanza 100% de dominio en AP.',
    xpReward: 50
  },
  {
    id: 'dominio-dedo-pulgar-oblicua',
    code: 'OB',
    title: 'Dominio Oblicua',
    description: 'Dominio de la proyección Oblicua de Dedo pulgar.',
    requirement: 'Alcanza 100% de dominio en Oblicua.',
    xpReward: 50
  },
  {
    id: 'dominio-dedo-pulgar-lateral',
    code: 'LT',
    title: 'Dominio Lateral',
    description: 'Dominio de la proyección Lateral de Dedo pulgar.',
    requirement: 'Alcanza 100% de dominio en Lateral.',
    xpReward: 50
  },
  {
    id: 'maestria-dedo-pulgar',
    code: 'DP',
    title: 'Maestría: Dedo pulgar',
    description: 'Reconocimiento por dominar todas las proyecciones de Dedo pulgar.',
    requirement: 'Alcanza 100% en AP, Oblicua y Lateral.',
    xpReward: 100
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
