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
  },
  {
    id: 'dedo-pulgar-verificado',
    code: 'DV',
    title: 'Dedo Pulgar Verificado',
    description: 'Certificación por completar la Verificación de conocimientos de Dedo pulgar.',
    requirement: 'Domina las 30 preguntas de la Verificación de conocimientos.',
    xpReward: 200
  },
  {
    id: 'dominio-mano-pa', code: 'PA', title: 'Dominio P.A. — Mano',
    description: 'Dominio de la proyección P.A. de Mano.', requirement: 'Domina las 30 preguntas oficiales de P.A.', xpReward: 50
  },
  {
    id: 'dominio-mano-oblicua', code: 'OB', title: 'Dominio Oblicua — Mano',
    description: 'Dominio de la proyección Oblicua de Mano.', requirement: 'Domina las 30 preguntas oficiales de Oblicua.', xpReward: 50
  },
  {
    id: 'dominio-mano-lateral', code: 'LT', title: 'Dominio Lateral — Mano',
    description: 'Dominio de la proyección Lateral de Mano.', requirement: 'Domina las 30 preguntas oficiales de Lateral.', xpReward: 50
  },
  {
    id: 'maestria-mano', code: 'MA', title: 'Maestría: Mano',
    description: 'Reconocimiento por dominar las tres proyecciones de Mano.', requirement: 'Alcanza 100% en P.A., Oblicua y Lateral.', xpReward: 100
  },
  {
    id: 'mano-verificada', code: 'MV', title: 'Mano Verificada',
    description: 'Certificación de la Verificación de conocimientos de Mano.', requirement: 'Completa la verificación oficial de Mano.', xpReward: 200
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

