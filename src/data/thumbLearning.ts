import type { ProjectionId } from '@/src/types/learning';

export type LearningSection = {
  code: string;
  content: string[];
  title: string;
};

type ExerciseBase = {
  correctExplanation: string;
  id: string;
  prompt: string;
  title: string;
};

export type ChoiceExercise = ExerciseBase & {
  correctOption: string;
  options: string[];
  type: 'choice' | 'completion';
};

export type MultiSelectExercise = ExerciseBase & {
  correctOptions: string[];
  options: string[];
  type: 'multi-select';
};

export type OrderExercise = ExerciseBase & {
  correctOrder: string[];
  options: string[];
  type: 'order';
};

export type PracticeExercise = ChoiceExercise | MultiSelectExercise | OrderExercise;

export type ThumbProjection = {
  exercises: PracticeExercise[];
  id: ProjectionId;
  learningSections: LearningSection[];
  title: string;
};

const patientPosition = 'Colocado en un extremo de la mesa, cómodamente sentado.';
const tablePosition = 'Colocar la mano y el antebrazo a la altura de la mesa.';
const centralRay = 'Perpendicular a la articulación metacarpofalángica del dedo pulgar.';
const dfr = '40 pulgadas.';
const structures = ['Falange distal', 'Falange proximal', 'Primer metacarpiano'];

const commonLearningSections = (partPosition: string[]): LearningSection[] => [
  { code: 'PP', title: 'Posición del paciente', content: [patientPosition] },
  { code: 'PA', title: 'Posición de la parte anatómica', content: [tablePosition, ...partPosition] },
  { code: 'RC', title: 'Rayo central', content: [centralRay] },
  { code: 'DFR', title: 'DFR', content: [dfr] },
  { code: 'EA', title: 'Estructuras anatómicas', content: structures }
];

const commonExercises = (prefix: string): PracticeExercise[] => [
  {
    id: `${prefix}-paciente`,
    type: 'choice',
    title: 'Preparación del paciente',
    prompt: 'Selecciona la posición indicada para el paciente.',
    options: [patientPosition, 'De pie junto a la mesa.', 'Acostado sobre la mesa.'],
    correctOption: patientPosition,
    correctExplanation: `La posición indicada es: ${patientPosition}`
  },
  {
    id: `${prefix}-rayo`,
    type: 'completion',
    title: 'Completa el rayo central',
    prompt: 'El rayo central debe dirigirse…',
    options: [centralRay, 'Paralelo al dedo pulgar.', 'Perpendicular al extremo distal del dedo pulgar.'],
    correctOption: centralRay,
    correctExplanation: `En esta proyección, el rayo central debe ser ${centralRay.toLocaleLowerCase('es')}`
  },
  {
    id: `${prefix}-dfr`,
    type: 'choice',
    title: 'Configura la DFR',
    prompt: 'Selecciona la DFR indicada.',
    options: ['40 pulgadas.', '20 pulgadas.', '60 pulgadas.'],
    correctOption: dfr,
    correctExplanation: `La DFR indicada es de ${dfr}`
  },
  {
    id: `${prefix}-estructuras`,
    type: 'multi-select',
    title: 'Verificación anatómica',
    prompt: 'Selecciona todas las estructuras que deben observarse.',
    options: [...structures, 'Segundo metacarpiano', 'Falange media'],
    correctOptions: structures,
    correctExplanation: `Deben observarse: ${structures.join(', ')}.`
  }
];

const apSteps = [
  tablePosition,
  'Rotar la mano internamente hasta que el dedo pulgar esté en posición AP.'
];

const obliqueSteps = [
  tablePosition,
  'Extender los dedos de la mano.',
  'Colocar la mano en posición prona.'
];

const lateralSteps = [
  tablePosition,
  'Colocar la mano en posición prona.',
  'Flexionar los dedos del 2.º al 5.º a 90 grados.',
  'El dedo pulgar toma automáticamente la posición lateral.'
];

export const thumbProjections: ThumbProjection[] = [
  {
    id: 'ap',
    title: 'AP',
    learningSections: commonLearningSections([apSteps[1]]),
    exercises: [
      {
        id: 'ap-orden',
        type: 'order',
        title: 'Secuencia de posicionamiento',
        prompt: 'Toca los pasos en el orden correcto.',
        options: [apSteps[1], apSteps[0]],
        correctOrder: apSteps,
        correctExplanation: `Primero: ${apSteps[0]} Después: ${apSteps[1]}`
      },
      ...commonExercises('ap')
    ]
  },
  {
    id: 'oblicua',
    title: 'Oblicua',
    learningSections: commonLearningSections(obliqueSteps.slice(1)),
    exercises: [
      {
        id: 'oblicua-orden',
        type: 'order',
        title: 'Secuencia de posicionamiento',
        prompt: 'Toca los pasos en el orden correcto.',
        options: [obliqueSteps[2], obliqueSteps[0], obliqueSteps[1]],
        correctOrder: obliqueSteps,
        correctExplanation: `El orden indicado es: ${obliqueSteps.join(' ')}`
      },
      ...commonExercises('oblicua')
    ]
  },
  {
    id: 'lateral',
    title: 'Lateral',
    learningSections: commonLearningSections(lateralSteps.slice(1)),
    exercises: [
      {
        id: 'lateral-orden',
        type: 'order',
        title: 'Construye la posición lateral',
        prompt: 'Toca los pasos en el orden correcto.',
        options: [lateralSteps[2], lateralSteps[0], lateralSteps[3], lateralSteps[1]],
        correctOrder: lateralSteps,
        correctExplanation: `El orden indicado es: ${lateralSteps.join(' ')}`
      },
      {
        id: 'lateral-dedos',
        type: 'completion',
        title: 'Completa el posicionamiento',
        prompt: 'Después de colocar la mano en prona, corresponde…',
        options: ['Flexionar los dedos del 2.º al 5.º a 90 grados.', 'Extender los dedos del 2.º al 5.º.', 'Rotar la mano internamente.'],
        correctOption: 'Flexionar los dedos del 2.º al 5.º a 90 grados.',
        correctExplanation: 'Se deben flexionar los dedos del 2.º al 5.º a 90 grados. Automáticamente, el dedo pulgar tomará la posición lateral.'
      },
      ...commonExercises('lateral')
    ]
  }
];

export function getThumbProjection(id?: string) {
  return thumbProjections.find((projection) => projection.id === id);
}
