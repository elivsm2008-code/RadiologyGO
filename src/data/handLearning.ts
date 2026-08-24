import type { LearningProjection, LearningSection } from '@/src/data/thumbLearning';

const patientPosition = 'Colocado en un extremo de la mesa, cómodamente sentado.';
const tablePosition = 'Colocar mano y antebrazo a la altura de la mesa.';
const dfr = '40 pulgadas.';
const structures = [
  'Falange distal.',
  'Articulación interfalángica distal.',
  'Falange media.',
  'Articulación interfalángica proximal.',
  'Falange proximal.',
  'Articulación metacarpofalángica.',
  'Cabeza del V metacarpiano.',
  'Sésamoideo.'
];

export type HandProjection = LearningProjection & {
  id: 'mano-pa' | 'mano-oblicua' | 'mano-lateral';
  slug: 'pa' | 'oblicua' | 'lateral';
};

function sections(partPosition: string[], centralRay: string): LearningSection[] {
  return [
    { code: 'PP', title: 'Posición del paciente', content: [patientPosition] },
    { code: 'PA', title: 'Posición de la parte anatómica', content: [tablePosition, ...partPosition] },
    { code: 'RC', title: 'Rayo central', content: [centralRay] },
    { code: 'DFR', title: 'DFR', content: [dfr] },
    { code: 'EA', title: 'Estructuras anatómicas', content: structures }
  ];
}

export const handProjections: HandProjection[] = [
  {
    id: 'mano-pa', slug: 'pa', title: 'P.A.', exercises: [],
    learningSections: sections(
      ['Colocar la mano en posición prono, con los dedos extendidos y ligeramente separados entre sí.'],
      'Perpendicular a la tercera articulación metacarpofalángica.'
    )
  },
  {
    id: 'mano-oblicua', slug: 'oblicua', title: 'Oblicua', exercises: [],
    learningSections: sections(
      ['Partiendo de la posición P.A., girar la mano 45°.', 'Esto se logra uniendo la punta del dedo índice con la punta del dedo pulgar.', 'Los dedos deben estar ligeramente separados.'],
      'Perpendicular a la tercera articulación metacarpofalángica.'
    )
  },
  {
    id: 'mano-lateral', slug: 'lateral', title: 'Lateral', exercises: [],
    learningSections: sections(
      ['Partiendo de la posición P.A., girar la mano 90°.', 'El dedo pulgar tomará la posición P.A. y deberá quedar paralelo al dedo índice.'],
      'Perpendicular a la articulación metacarpofalángica del dedo índice.'
    )
  }
];

export function getHandProjection(slug?: string) {
  return handProjections.find((projection) => projection.slug === slug);
}

