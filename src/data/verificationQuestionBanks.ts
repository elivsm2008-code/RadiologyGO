import type { PracticeQuestion } from '@/src/types/practiceQuestions';

type Section = 'AP' | 'PA' | 'OBLICUA' | 'LATERAL' | 'INTEGRADORA';
type Source = { section: Section; prompt: string; options: string[]; answer: number };

function build(scope: 'thumb' | 'hand', items: Source[]): PracticeQuestion[] {
  return items.map((item, index) => ({
    id: `${scope}-verification-v2-${String(index + 1).padStart(2, '0')}`,
    conceptId: `${scope}-verification-${item.section.toLocaleLowerCase('es')}-${index + 1}`,
    type: 'choice',
    title: item.section === 'INTEGRADORA' ? 'Pregunta integradora' : `Proyección ${item.section}`,
    prompt: item.prompt,
    options: item.options,
    correctOption: item.options[item.answer],
    correctExplanation: `Respuesta correcta: ${item.options[item.answer]}`,
    verificationSection: item.section
  }));
}

const thumb = build('thumb', [
  { section:'AP', prompt:'En la proyección AP de Dedo Pulgar, ¿cómo se obtiene la posición AP del pulgar?', options:['A) Colocando la mano en prono y dejando los dedos extendidos','B) Rotando internamente la mano hasta que el pulgar quede en posición AP','C) Flexionando los dedos del 2.º al 5.º a 90°','D) Rotando la mano 90°'], answer:1 },
  { section:'AP', prompt:'Para realizar la proyección AP de Dedo Pulgar, ¿cómo debe colocarse inicialmente el paciente?', options:['A) De pie frente a la mesa','B) En decúbito supino','C) Cómodamente sentado en un extremo de la mesa','D) Sentado de espaldas a la mesa'], answer:2 },
  { section:'AP', prompt:'En la proyección AP de Dedo Pulgar, ¿dónde deben colocarse la mano y el antebrazo?', options:['A) A la altura de la mesa','B) A nivel del hombro','C) Debajo de la mesa','D) Sobre el tórax'], answer:0 },
  { section:'AP', prompt:'En la proyección AP de Dedo Pulgar, ¿dónde debe dirigirse el rayo central?', options:['A) A la muñeca','B) A la articulación interfalángica','C) Al primer metacarpiano','D) A la articulación metacarpofalángica del dedo pulgar'], answer:3 },
  { section:'AP', prompt:'En la proyección AP de Dedo Pulgar, ¿cómo debe dirigirse el rayo central?', options:['A) Perpendicular','B) Con angulación de 45°','C) Cefálico','D) Caudal'], answer:0 },
  { section:'AP', prompt:'En la proyección AP de Dedo Pulgar, ¿qué DFR debe utilizarse?', options:['A) 72 pulgadas','B) 30 pulgadas','C) 40 pulgadas','D) 20 pulgadas'], answer:2 },
  { section:'OBLICUA', prompt:'Para la proyección Oblicua de Dedo Pulgar, ¿cómo debe colocarse la mano?', options:['A) En prono','B) En supino','C) Rotada 90°','D) En posición lateral'], answer:0 },
  { section:'OBLICUA', prompt:'En la proyección Oblicua de Dedo Pulgar, ¿cómo deben colocarse los dedos según la técnica proporcionada?', options:['A) Flexionados a 90°','B) Extendidos','C) Cerrados formando un puño','D) Cruzados'], answer:1 },
  { section:'OBLICUA', prompt:'En la proyección Oblicua de Dedo Pulgar, ¿dónde se dirige el rayo central?', options:['A) Al centro de la muñeca','B) A la falange distal','C) A la articulación metacarpofalángica del dedo pulgar','D) Al primer metacarpiano'], answer:2 },
  { section:'OBLICUA', prompt:'En la proyección Oblicua de Dedo Pulgar, ¿cómo debe dirigirse el rayo central?', options:['A) 15° cefálico','B) 20° caudal','C) 45° medial','D) Perpendicular'], answer:3 },
  { section:'OBLICUA', prompt:'Para la proyección Oblicua de Dedo Pulgar, ¿qué DFR corresponde?', options:['A) 40 pulgadas','B) 30 pulgadas','C) 72 pulgadas','D) 20 pulgadas'], answer:0 },
  { section:'OBLICUA', prompt:'Estás realizando la proyección Oblicua de Dedo Pulgar y colocas la mano en prono, pero flexionas los dedos del 2.º al 5.º a 90°. ¿Qué ocurrió?', options:['A) La técnica continúa siendo Oblicua','B) Se utilizó un posicionamiento correspondiente a la técnica Lateral proporcionada','C) Se realizó correctamente AP','D) Únicamente debe modificarse la DFR'], answer:1 },
  { section:'LATERAL', prompt:'Para realizar la proyección Lateral de Dedo Pulgar, ¿en qué posición se coloca primero la mano?', options:['A) Supino','B) AP','C) Prono','D) Oblicua 45°'], answer:2 },
  { section:'LATERAL', prompt:'En la proyección Lateral de Dedo Pulgar, ¿qué dedos deben flexionarse a 90°?', options:['A) Del 2.º al 5.º','B) Únicamente el índice','C) El pulgar','D) Índice y pulgar'], answer:0 },
  { section:'LATERAL', prompt:'En la proyección Lateral de Dedo Pulgar, ¿qué sucede con el pulgar al flexionar los dedos del 2.º al 5.º a 90° según la técnica proporcionada?', options:['A) Queda en AP','B) Toma automáticamente la posición lateral','C) Queda en prono','D) También debe flexionarse 90°'], answer:1 },
  { section:'LATERAL', prompt:'En la proyección Lateral de Dedo Pulgar, ¿dónde debe dirigirse el rayo central?', options:['A) A la muñeca','B) A la falange distal','C) Al primer metacarpiano','D) A la articulación metacarpofalángica del dedo pulgar'], answer:3 },
  { section:'LATERAL', prompt:'Para la proyección Lateral de Dedo Pulgar, ¿qué combinación es correcta?', options:['A) RC perpendicular + DFR 40 pulgadas','B) RC angulado + DFR 30 pulgadas','C) RC perpendicular + DFR 72 pulgadas','D) RC a la muñeca + DFR 40 pulgadas'], answer:0 },
  { section:'LATERAL', prompt:'Durante una proyección Lateral de Dedo Pulgar, la mano está en prono pero los dedos del 2.º al 5.º permanecen extendidos. ¿Qué corrección corresponde?', options:['A) Rotar internamente hasta AP','B) Cambiar el RC a la muñeca','C) Flexionar los dedos del 2.º al 5.º a 90°','D) Cambiar la DFR a 30 pulgadas'], answer:2 },
  { section:'INTEGRADORA', prompt:'¿Qué característica diferencia la proyección AP de la Lateral de Dedo Pulgar según las técnicas proporcionadas?', options:['A) AP utiliza 30 pulgadas y Lateral 40 pulgadas','B) AP utiliza rotación interna hasta colocar el pulgar en AP, mientras que Lateral utiliza mano prona y flexión de los dedos 2.º–5.º a 90°','C) Lateral utiliza RC en la muñeca','D) AP utiliza RC angulado'], answer:1 },
  { section:'INTEGRADORA', prompt:'¿Qué elemento comparten las proyecciones AP, Oblicua y Lateral de Dedo Pulgar según la información proporcionada?', options:['A) Mano prona en todas','B) Flexión de los dedos 2.º–5.º en todas','C) RC perpendicular a la articulación metacarpofalángica del pulgar y DFR de 40 pulgadas','D) Rotación interna en todas'], answer:2 }
]);

const hand = build('hand', [
  { section:'PA', prompt:'En la proyección PA de Mano, ¿cómo debe colocarse la mano?', options:['A) En prono, con los dedos extendidos y ligeramente separados','B) Rotada 90°','C) Rotada 45° uniendo índice y pulgar','D) En supino'], answer:0 },
  { section:'PA', prompt:'Para realizar la proyección PA de Mano, ¿cómo debe colocarse el paciente?', options:['A) De pie','B) Cómodamente sentado en un extremo de la mesa','C) En decúbito lateral','D) Sentado de espaldas'], answer:1 },
  { section:'PA', prompt:'En la proyección PA de Mano, ¿dónde deben colocarse la mano y el antebrazo?', options:['A) Debajo de la mesa','B) A nivel del hombro','C) A la altura de la mesa','D) Sobre el tórax'], answer:2 },
  { section:'PA', prompt:'En la proyección PA de Mano, ¿dónde debe centrarse el rayo central?', options:['A) En la muñeca','B) En la MCF del índice','C) En la quinta MCF','D) En la tercera articulación metacarpofalángica'], answer:3 },
  { section:'PA', prompt:'En la proyección PA de Mano, ¿cómo debe dirigirse el rayo central?', options:['A) Perpendicular','B) 45° medial','C) 20° caudal','D) 15° cefálico'], answer:0 },
  { section:'PA', prompt:'Para la proyección PA de Mano, ¿qué DFR corresponde?', options:['A) 72 pulgadas','B) 40 pulgadas','C) 30 pulgadas','D) 20 pulgadas'], answer:1 },
  { section:'OBLICUA', prompt:'En la proyección Oblicua de Mano, partiendo de PA, ¿cuánto debe rotarse la mano?', options:['A) 90°','B) 30°','C) 45°','D) 15°'], answer:2 },
  { section:'OBLICUA', prompt:'Para conseguir la posición Oblicua de Mano según la técnica proporcionada, ¿qué referencia se utiliza?', options:['A) Colocar el pulgar paralelo al índice','B) Unir la punta del índice con la punta del pulgar','C) Flexionar todos los dedos a 90°','D) Mantener la mano completamente plana'], answer:1 },
  { section:'OBLICUA', prompt:'En la proyección Oblicua de Mano, ¿cómo deben quedar los dedos?', options:['A) Ligeramente separados','B) Cerrados formando un puño','C) Cruzados','D) Totalmente flexionados'], answer:0 },
  { section:'OBLICUA', prompt:'En la proyección Oblicua de Mano, ¿dónde debe centrarse el rayo central?', options:['A) En la muñeca','B) En la MCF del índice','C) En la quinta MCF','D) En la tercera articulación metacarpofalángica'], answer:3 },
  { section:'OBLICUA', prompt:'Para la proyección Oblicua de Mano, ¿qué combinación técnica corresponde?', options:['A) RC a MCF del índice + DFR 30 pulgadas','B) RC perpendicular a tercera MCF + DFR 40 pulgadas','C) RC a muñeca + DFR 40 pulgadas','D) RC angulado + DFR 72 pulgadas'], answer:1 },
  { section:'OBLICUA', prompt:'Estás realizando una proyección Oblicua de Mano y rotas la mano 90° desde PA. ¿Qué debes corregir?', options:['A) La rotación debe ser de 45°','B) La DFR debe ser 30 pulgadas','C) El paciente debe ponerse de pie','D) El RC debe dirigirse a la muñeca'], answer:0 },
  { section:'LATERAL', prompt:'En la proyección Lateral de Mano, partiendo de PA, ¿cuánto debe rotarse la mano?', options:['A) 45°','B) 15°','C) 90°','D) 30°'], answer:2 },
  { section:'LATERAL', prompt:'En la proyección Lateral de Mano, ¿qué posición toma el pulgar según la técnica proporcionada?', options:['A) Oblicua','B) PA','C) AP','D) Flexionada'], answer:1 },
  { section:'LATERAL', prompt:'En la proyección Lateral de Mano, ¿cómo debe quedar el pulgar respecto al índice?', options:['A) Paralelo','B) Perpendicular','C) Cruzado','D) Flexionado'], answer:0 },
  { section:'LATERAL', prompt:'En la proyección Lateral de Mano, ¿dónde debe centrarse el rayo central?', options:['A) Tercera MCF','B) Muñeca','C) Quinta MCF','D) Articulación metacarpofalángica del dedo índice'], answer:3 },
  { section:'LATERAL', prompt:'Para la proyección Lateral de Mano, ¿qué combinación es correcta?', options:['A) RC angulado + DFR 30 pulgadas','B) RC perpendicular a tercera MCF + DFR 40 pulgadas','C) RC perpendicular a MCF del índice + DFR 40 pulgadas','D) RC a muñeca + DFR 72 pulgadas'], answer:2 },
  { section:'LATERAL', prompt:'Durante una proyección Lateral de Mano, el estudiante rota correctamente la mano 90°, pero centra el RC en la tercera MCF. ¿Qué debe corregir?', options:['A) El punto del RC debe ser la MCF del índice','B) Debe reducir la rotación a 45°','C) Debe cambiar la DFR a 30 pulgadas','D) Debe colocar al paciente de pie'], answer:0 },
  { section:'INTEGRADORA', prompt:'¿Cuál es una diferencia entre la proyección Oblicua y la Lateral de Mano según las técnicas proporcionadas?', options:['A) Oblicua utiliza DFR 30 y Lateral 40','B) Oblicua rota la mano 45° y Lateral 90°','C) Lateral utiliza al paciente de pie','D) Oblicua utiliza RC angulado'], answer:1 },
  { section:'INTEGRADORA', prompt:'¿Cuál opción relaciona correctamente las proyecciones PA, Oblicua y Lateral de Mano con su punto de centrado?', options:['A) PA → muñeca / Oblicua → muñeca / Lateral → tercera MCF','B) PA → MCF del índice / Oblicua → tercera MCF / Lateral → muñeca','C) PA → tercera MCF / Oblicua → tercera MCF / Lateral → MCF del índice','D) PA → quinta MCF / Oblicua → MCF del índice / Lateral → tercera MCF'], answer:2 }
]);

export const verificationQuestionBanks = { thumb, hand };
export const verificationQuestionIds = {
  thumb: new Set(thumb.map((question) => question.id)),
  hand: new Set(hand.map((question) => question.id))
};

