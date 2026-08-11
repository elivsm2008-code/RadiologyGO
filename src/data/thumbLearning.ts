import type { ProjectionId } from '@/src/types/learning';

export type ThumbProjection = {
  id: ProjectionId;
  title: string;
};

export const thumbProjections: ThumbProjection[] = [
  { id: 'ap', title: 'AP' },
  { id: 'oblicua', title: 'Oblicua' },
  { id: 'lateral', title: 'Lateral' }
];

export const learningSectionTitles = [
  'Posición del paciente',
  'Posición de la parte anatómica',
  'Rayo central',
  'DFR',
  'Anatomía demostrada',
  'Errores frecuentes',
  'Indicaciones especiales'
] as const;

export const practiceChallengeTitles = [
  'Posición del paciente',
  'Colocación del pulgar',
  'Dirección del rayo central',
  'Identificación de la imagen'
] as const;

export function getThumbProjection(id?: string) {
  return thumbProjections.find((projection) => projection.id === id);
}
