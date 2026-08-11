import type { ProjectionId } from '@/src/types/learning';
import type { PracticeQuestion } from '@/src/types/practiceQuestions';

const patientPosition = 'Colocado en un extremo de la mesa, cómodamente sentado.';
const tablePosition = 'Colocar la mano y el antebrazo a la altura de la mesa.';
const centralRay = 'Perpendicular a la articulación metacarpofalángica del dedo pulgar.';
const dfr = '40 pulgadas.';
const structures = ['Falange distal', 'Falange proximal', 'Primer metacarpiano'];

const apPosition = 'Rotar la mano internamente hasta que el dedo pulgar esté en posición AP.';
const obliqueFingerPosition = 'Extender los dedos de la mano.';
const pronePosition = 'Colocar la mano en posición prona.';
const lateralFingerPosition = 'Flexionar los dedos del 2.º al 5.º a 90 grados.';
const lateralResult = 'El dedo pulgar toma automáticamente la posición lateral.';

function commonQuestions(prefix: string): PracticeQuestion[] {
  return [
    {
      id: `${prefix}-paciente-1`, conceptId: 'posicion-paciente', type: 'choice', title: 'Preparación del paciente',
      prompt: 'Selecciona la posición indicada para el paciente.',
      options: [patientPosition, 'De pie junto a la mesa.', 'Acostado sobre la mesa.'], correctOption: patientPosition,
      correctExplanation: `La posición indicada es: ${patientPosition}`
    },
    {
      id: `${prefix}-paciente-2`, conceptId: 'posicion-paciente', type: 'completion', title: 'Completa la preparación',
      prompt: 'El paciente debe estar colocado en un extremo de la mesa y…',
      options: ['Cómodamente sentado.', 'De pie.', 'Acostado.'], correctOption: 'Cómodamente sentado.',
      correctExplanation: patientPosition
    },
    {
      id: `${prefix}-paciente-3`, conceptId: 'posicion-paciente', type: 'scenario', title: '¿Qué corregirías?',
      prompt: 'El paciente está de pie junto a la mesa. ¿Qué posición corresponde según lo aprendido?',
      options: [patientPosition, 'Mantenerlo de pie.', 'Colocarlo acostado.'], correctOption: patientPosition,
      correctExplanation: `Debe estar ${patientPosition.toLocaleLowerCase('es')}`
    },
    {
      id: `${prefix}-mesa-1`, conceptId: 'altura-mesa', type: 'choice', title: 'Altura de trabajo',
      prompt: '¿Qué debe colocarse a la altura de la mesa?',
      options: ['La mano y el antebrazo.', 'Solo el dedo pulgar.', 'Solo el antebrazo.'], correctOption: 'La mano y el antebrazo.',
      correctExplanation: tablePosition
    },
    {
      id: `${prefix}-mesa-2`, conceptId: 'altura-mesa', type: 'completion', title: 'Completa el primer paso',
      prompt: 'Colocar ___ a la altura de la mesa.',
      options: ['La mano y el antebrazo.', 'El dedo pulgar únicamente.', 'La mano únicamente.'], correctOption: 'La mano y el antebrazo.',
      correctExplanation: tablePosition
    },
    {
      id: `${prefix}-rayo-1`, conceptId: 'rayo-central', type: 'completion', title: 'Completa el rayo central',
      prompt: 'El rayo central debe dirigirse…',
      options: [centralRay, 'Paralelo al dedo pulgar.', 'Perpendicular al extremo distal del pulgar.'], correctOption: centralRay,
      correctExplanation: `En esta proyección, el rayo central debe ser ${centralRay.toLocaleLowerCase('es')}`
    },
    {
      id: `${prefix}-rayo-2`, conceptId: 'rayo-central', type: 'choice', title: 'Dirección del rayo',
      prompt: '¿Cuál es la dirección indicada del rayo central?',
      options: ['Perpendicular.', 'Paralela.', 'Oblicua.'], correctOption: 'Perpendicular.',
      correctExplanation: centralRay
    },
    {
      id: `${prefix}-rayo-3`, conceptId: 'rayo-central', type: 'choice', title: 'Punto del rayo central',
      prompt: '¿A qué articulación debe dirigirse el rayo central?',
      options: ['Articulación metacarpofalángica del dedo pulgar.', 'Articulación interfalángica del dedo pulgar.', 'Articulación de la muñeca.'], correctOption: 'Articulación metacarpofalángica del dedo pulgar.',
      correctExplanation: centralRay
    },
    {
      id: `${prefix}-rayo-4`, conceptId: 'rayo-central', type: 'scenario', title: 'Detecta la corrección',
      prompt: 'Se propone dirigir el rayo paralelo al pulgar. ¿Qué debe corregirse?',
      options: [centralRay, 'Mantener el rayo paralelo.', 'Dirigirlo a la muñeca.'], correctOption: centralRay,
      correctExplanation: `La indicación correcta es: ${centralRay}`
    },
    {
      id: `${prefix}-dfr-1`, conceptId: 'dfr', type: 'choice', title: 'Configura la DFR',
      prompt: '¿Cuál es la DFR indicada?', options: ['40 pulgadas.', '30 pulgadas.', '60 pulgadas.'], correctOption: dfr,
      correctExplanation: `La DFR indicada es de ${dfr}`
    },
    {
      id: `${prefix}-dfr-2`, conceptId: 'dfr', type: 'completion', title: 'Completa la distancia',
      prompt: 'La DFR utilizada es de ___ pulgadas.', options: ['40', '30', '50'], correctOption: '40',
      correctExplanation: `La DFR indicada es de ${dfr}`
    },
    {
      id: `${prefix}-dfr-3`, conceptId: 'dfr', type: 'scenario', title: 'Corrige la DFR',
      prompt: 'Un estudiante utiliza una DFR de 30 pulgadas. ¿Qué valor debería utilizar?',
      options: ['40 pulgadas.', 'Mantener 30 pulgadas.', '60 pulgadas.'], correctOption: dfr,
      correctExplanation: `Debe utilizar ${dfr}`
    },
    {
      id: `${prefix}-dfr-4`, conceptId: 'dfr', type: 'true-false', title: 'Comprueba la DFR',
      prompt: 'La DFR indicada para esta proyección es de 40 pulgadas.', options: ['Verdadero.', 'Falso.'], correctOption: 'Verdadero.',
      correctExplanation: `Es correcto: la DFR es de ${dfr}`
    },
    {
      id: `${prefix}-anatomia-1`, conceptId: 'estructuras', type: 'multi-select', title: 'Verificación anatómica',
      prompt: 'Selecciona todas las estructuras que deben observarse.',
      options: [...structures, 'Falange media', 'Segundo metacarpiano'], correctOptions: structures,
      correctExplanation: `Deben observarse: ${structures.join(', ')}.`
    },
    {
      id: `${prefix}-anatomia-2`, conceptId: 'estructuras', type: 'choice', title: 'Estructura distal',
      prompt: '¿Cuál de estas estructuras debe observarse?',
      options: ['Falange distal', 'Falange media', 'Segundo metacarpiano'], correctOption: 'Falange distal',
      correctExplanation: `Deben observarse: ${structures.join(', ')}.`
    },
    {
      id: `${prefix}-anatomia-3`, conceptId: 'estructuras', type: 'choice', title: 'Estructura proximal',
      prompt: 'Identifica otra estructura que debe observarse.',
      options: ['Falange proximal', 'Falange media', 'Segundo metacarpiano'], correctOption: 'Falange proximal',
      correctExplanation: `Deben observarse: ${structures.join(', ')}.`
    },
    {
      id: `${prefix}-anatomia-4`, conceptId: 'estructuras', type: 'completion', title: 'Completa la anatomía',
      prompt: 'Además de las falanges distal y proximal, debe observarse…',
      options: ['Primer metacarpiano', 'Segundo metacarpiano', 'Falange media'], correctOption: 'Primer metacarpiano',
      correctExplanation: `Deben observarse: ${structures.join(', ')}.`
    }
  ];
}

const apQuestions: PracticeQuestion[] = [
  ...commonQuestions('ap'),
  {
    id: 'ap-posicion-1', conceptId: 'posicion-parte-ap', type: 'choice', title: 'Orientación AP',
    prompt: '¿Qué acción lleva el dedo pulgar a la posición AP?',
    options: [apPosition, pronePosition, lateralFingerPosition], correctOption: apPosition, correctExplanation: apPosition
  },
  {
    id: 'ap-posicion-2', conceptId: 'posicion-parte-ap', type: 'completion', title: 'Completa la posición AP',
    prompt: 'Rotar la mano ___ hasta que el dedo pulgar esté en posición AP.',
    options: ['Internamente.', 'A posición prona.', 'Sin rotarla.'], correctOption: 'Internamente.', correctExplanation: apPosition
  },
  {
    id: 'ap-posicion-3', conceptId: 'posicion-parte-ap', type: 'scenario', title: '¿Qué corregirías?',
    prompt: 'La mano se colocó en prona, pero se busca la proyección AP. ¿Qué acción corresponde?',
    options: [apPosition, pronePosition, lateralFingerPosition], correctOption: apPosition, correctExplanation: apPosition
  },
  {
    id: 'ap-posicion-4', conceptId: 'posicion-parte-ap', type: 'true-false', title: 'Reconoce la orientación',
    prompt: 'Para obtener AP, la mano se rota internamente hasta que el pulgar quede en posición AP.',
    options: ['Verdadero.', 'Falso.'], correctOption: 'Verdadero.', correctExplanation: apPosition
  },
  {
    id: 'ap-secuencia-1', conceptId: 'secuencia-ap', type: 'order', title: 'Ordena el posicionamiento',
    prompt: 'Toca los pasos en el orden indicado.', options: [apPosition, tablePosition], correctOrder: [tablePosition, apPosition],
    correctExplanation: `Primero: ${tablePosition} Después: ${apPosition}`
  },
  {
    id: 'ap-diferencia-1', conceptId: 'diferencias-proyeccion', type: 'choice', title: 'Distingue la proyección',
    prompt: '¿Qué instrucción pertenece específicamente a AP?',
    options: [apPosition, obliqueFingerPosition, lateralFingerPosition], correctOption: apPosition, correctExplanation: apPosition
  },
  {
    id: 'ap-siguiente-1', conceptId: 'secuencia-ap', type: 'completion', title: 'Siguiente paso',
    prompt: 'Después de colocar mano y antebrazo a la altura de la mesa, para AP corresponde…',
    options: [apPosition, pronePosition, lateralFingerPosition], correctOption: apPosition, correctExplanation: apPosition
  }
];

const obliqueQuestions: PracticeQuestion[] = [
  ...commonQuestions('oblicua'),
  {
    id: 'oblicua-posicion-1', conceptId: 'posicion-parte-oblicua', type: 'choice', title: 'Orientación oblicua',
    prompt: '¿Cómo se coloca la mano para la proyección Oblicua?', options: [pronePosition, apPosition, lateralFingerPosition], correctOption: pronePosition,
    correctExplanation: `${obliqueFingerPosition} ${pronePosition}`
  },
  {
    id: 'oblicua-dedos-1', conceptId: 'posicion-parte-oblicua', type: 'choice', title: 'Posición de los dedos',
    prompt: '¿Qué debe hacerse con los dedos de la mano?', options: [obliqueFingerPosition, lateralFingerPosition, 'Mantener los dedos flexionados.'], correctOption: obliqueFingerPosition,
    correctExplanation: `${obliqueFingerPosition} ${pronePosition}`
  },
  {
    id: 'oblicua-posicion-2', conceptId: 'posicion-parte-oblicua', type: 'completion', title: 'Completa la orientación',
    prompt: 'Extender los dedos y colocar la mano en posición…', options: ['Prona.', 'AP.', 'Lateral.'], correctOption: 'Prona.',
    correctExplanation: `${obliqueFingerPosition} ${pronePosition}`
  },
  {
    id: 'oblicua-posicion-3', conceptId: 'posicion-parte-oblicua', type: 'scenario', title: '¿Qué corregirías?',
    prompt: 'Los dedos están flexionados durante la preparación de Oblicua. ¿Qué corresponde?',
    options: [obliqueFingerPosition, lateralFingerPosition, apPosition], correctOption: obliqueFingerPosition,
    correctExplanation: `${obliqueFingerPosition} ${pronePosition}`
  },
  {
    id: 'oblicua-secuencia-1', conceptId: 'secuencia-oblicua', type: 'order', title: 'Ordena el posicionamiento',
    prompt: 'Toca los pasos en el orden indicado.', options: [pronePosition, tablePosition, obliqueFingerPosition],
    correctOrder: [tablePosition, obliqueFingerPosition, pronePosition], correctExplanation: `${tablePosition} ${obliqueFingerPosition} ${pronePosition}`
  },
  {
    id: 'oblicua-diferencia-1', conceptId: 'diferencias-proyeccion', type: 'choice', title: 'Distingue la proyección',
    prompt: '¿Qué combinación corresponde a Oblicua?',
    options: [`${obliqueFingerPosition} ${pronePosition}`, apPosition, `${pronePosition} ${lateralFingerPosition}`],
    correctOption: `${obliqueFingerPosition} ${pronePosition}`, correctExplanation: `${obliqueFingerPosition} ${pronePosition}`
  },
  {
    id: 'oblicua-siguiente-1', conceptId: 'secuencia-oblicua', type: 'completion', title: 'Siguiente paso',
    prompt: 'Después de colocar mano y antebrazo a la altura de la mesa, corresponde…',
    options: [obliqueFingerPosition, lateralFingerPosition, apPosition], correctOption: obliqueFingerPosition,
    correctExplanation: `${obliqueFingerPosition} Después: ${pronePosition}`
  },
  {
    id: 'oblicua-prona-1', conceptId: 'posicion-parte-oblicua', type: 'true-false', title: 'Comprueba la orientación',
    prompt: 'En Oblicua, la mano se coloca en posición prona.', options: ['Verdadero.', 'Falso.'], correctOption: 'Verdadero.',
    correctExplanation: `${obliqueFingerPosition} ${pronePosition}`
  }
];

const lateralQuestions: PracticeQuestion[] = [
  ...commonQuestions('lateral'),
  {
    id: 'lateral-prona-1', conceptId: 'posicion-parte-lateral', type: 'choice', title: 'Orientación de la mano',
    prompt: '¿En qué posición debe colocarse la mano?', options: [pronePosition, apPosition, 'Con la mano sin apoyar.'], correctOption: pronePosition,
    correctExplanation: pronePosition
  },
  {
    id: 'lateral-dedos-1', conceptId: 'dedos-lateral', type: 'choice', title: 'Posición de los dedos',
    prompt: '¿Qué dedos se flexionan?', options: ['Del 2.º al 5.º.', 'Solo el dedo pulgar.', 'Del 1.º al 3.º.'], correctOption: 'Del 2.º al 5.º.',
    correctExplanation: lateralFingerPosition
  },
  {
    id: 'lateral-dedos-2', conceptId: 'dedos-lateral', type: 'completion', title: 'Completa la flexión',
    prompt: 'Flexionar los dedos del 2.º al 5.º a ___ grados.', options: ['90', '45', '30'], correctOption: '90', correctExplanation: lateralFingerPosition
  },
  {
    id: 'lateral-dedos-3', conceptId: 'dedos-lateral', type: 'scenario', title: '¿Qué corregirías?',
    prompt: 'Los dedos del 2.º al 5.º permanecen extendidos. ¿Qué acción corresponde?',
    options: [lateralFingerPosition, obliqueFingerPosition, apPosition], correctOption: lateralFingerPosition,
    correctExplanation: `${lateralFingerPosition} ${lateralResult}`
  },
  {
    id: 'lateral-resultado-1', conceptId: 'resultado-lateral', type: 'choice', title: 'Resultado del posicionamiento',
    prompt: '¿Qué ocurre con el pulgar después de realizar los pasos indicados?',
    options: [lateralResult, 'Toma automáticamente la posición AP.', 'Permanece en posición prona.'], correctOption: lateralResult,
    correctExplanation: lateralResult
  },
  {
    id: 'lateral-resultado-2', conceptId: 'resultado-lateral', type: 'true-false', title: 'Comprueba el resultado',
    prompt: 'Al flexionar los dedos indicados, el pulgar toma automáticamente la posición lateral.',
    options: ['Verdadero.', 'Falso.'], correctOption: 'Verdadero.', correctExplanation: `${lateralFingerPosition} ${lateralResult}`
  },
  {
    id: 'lateral-secuencia-1', conceptId: 'secuencia-lateral', type: 'order', title: 'Construye la posición lateral',
    prompt: 'Toca los pasos en el orden indicado.',
    options: [lateralFingerPosition, tablePosition, lateralResult, pronePosition],
    correctOrder: [tablePosition, pronePosition, lateralFingerPosition, lateralResult],
    correctExplanation: `${tablePosition} ${pronePosition} ${lateralFingerPosition} ${lateralResult}`
  },
  {
    id: 'lateral-diferencia-1', conceptId: 'diferencias-proyeccion', type: 'choice', title: 'Distingue la proyección',
    prompt: '¿Qué instrucción identifica a Lateral frente a AP y Oblicua?',
    options: [lateralFingerPosition, apPosition, obliqueFingerPosition], correctOption: lateralFingerPosition,
    correctExplanation: `${lateralFingerPosition} ${lateralResult}`
  },
  {
    id: 'lateral-siguiente-1', conceptId: 'secuencia-lateral', type: 'completion', title: 'Siguiente paso',
    prompt: 'Después de colocar la mano en posición prona, corresponde…',
    options: [lateralFingerPosition, obliqueFingerPosition, apPosition], correctOption: lateralFingerPosition,
    correctExplanation: `${lateralFingerPosition} ${lateralResult}`
  },
  {
    id: 'lateral-prona-2', conceptId: 'posicion-parte-lateral', type: 'true-false', title: 'Comprueba la orientación',
    prompt: 'En Lateral, la mano se coloca en posición prona antes de flexionar los dedos.',
    options: ['Verdadero.', 'Falso.'], correctOption: 'Verdadero.',
    correctExplanation: `${pronePosition} ${lateralFingerPosition}`
  }
];

export const thumbQuestionBanks: Record<ProjectionId, PracticeQuestion[]> = {
  ap: apQuestions,
  oblicua: obliqueQuestions,
  lateral: lateralQuestions
};

export function getThumbQuestionBank(projectionId: ProjectionId) {
  return thumbQuestionBanks[projectionId];
}
