import type { PracticeQuestion } from '@/src/types/practiceQuestions';

type Projection = 'pa' | 'oblicua' | 'lateral';
type SourceQuestion = { title: string; prompt: string; options: string[]; answer: number; feedback?: string };

const feedback = (question: SourceQuestion) => question.feedback ?? `Respuesta correcta: ${question.options[question.answer]}`;
const build = (projection: Projection, questions: SourceQuestion[]): PracticeQuestion[] => questions.map((question, index) => ({
  id: `hand-v1-${projection}-${String(index + 1).padStart(2, '0')}`,
  conceptId: `hand-${projection}-${String(index + 1).padStart(2, '0')}`,
  type: 'choice',
  title: question.title,
  prompt: question.prompt,
  options: question.options,
  correctOption: question.options[question.answer],
  correctExplanation: feedback(question),
  isFinalChallenge: index === 14
}));

const pa = build('pa', [
  { title:'Identifica la proyección', prompt:'La técnica indica colocar la mano en prono, con los dedos extendidos y ligeramente separados. ¿Qué proyección de Mano corresponde?', options:['A) Lateral','B) Oblicua','C) PA','D) AP'], answer:2 },
  { title:'Prepara al paciente', prompt:'¿Cómo debe colocarse el paciente para iniciar la rutina PA de Mano?', options:['A) De pie frente a la mesa','B) Cómodamente sentado en un extremo de la mesa','C) En decúbito supino','D) Sentado de espaldas a la mesa'], answer:1 },
  { title:'Ubica la extremidad', prompt:'El paciente ya está sentado. ¿Dónde deben colocarse la mano y el antebrazo?', options:['A) A la altura de la mesa','B) A nivel del hombro','C) Debajo de la mesa','D) Sobre el tórax'], answer:0 },
  { title:'Construye la posición PA', prompt:'¿Cuál opción describe correctamente la posición de la mano?', options:['A) Rotar la mano 90° y colocar el pulgar paralelo al índice','B) Rotar la mano 45° uniendo índice y pulgar','C) Mano supina con dedos juntos','D) Mano en prono, dedos extendidos y ligeramente separados'], answer:3 },
  { title:'Detecta el error', prompt:'Un estudiante coloca la mano en prono, pero mantiene los dedos flexionados. ¿Qué parte de la técnica debe corregir?', options:['A) La DFR','B) La posición de la parte anatómica','C) La posición del paciente','D) El punto del RC'], answer:1, feedback:'En PA, los dedos deben estar extendidos y ligeramente separados.' },
  { title:'Corrige el posicionamiento', prompt:'¿Qué corrección corresponde al caso anterior?', options:['A) Extender los dedos y separarlos ligeramente','B) Rotar la mano 90°','C) Unir índice y pulgar','D) Cambiar la DFR a 30 pulgadas'], answer:0 },
  { title:'Selecciona el punto del RC', prompt:'¿Dónde debe centrarse el rayo central en PA de Mano?', options:['A) MCF del índice','B) Quinta MCF','C) Tercera articulación metacarpofalángica','D) Centro de la muñeca'], answer:2 },
  { title:'Dirección del rayo central', prompt:'¿Cómo debe dirigirse el RC hacia el punto de centrado?', options:['A) 45° medial','B) Perpendicular','C) 20° caudal','D) 15° cefálico'], answer:1 },
  { title:'Analiza un error de centrado', prompt:'La mano está correctamente en PA, pero el RC se centra en la MCF del índice. ¿Coincide con la técnica proporcionada?', options:['A) Sí, porque el índice es el punto de referencia','B) Sí, si la DFR es 40 pulgadas','C) Solo si los dedos están juntos','D) No; en PA debe centrarse en la tercera MCF'], answer:3 },
  { title:'Selecciona la DFR', prompt:'¿Qué DFR corresponde a PA de Mano?', options:['A) 40 pulgadas','B) 72 pulgadas','C) 30 pulgadas','D) 20 pulgadas'], answer:0 },
  { title:'Reconoce estructuras', prompt:'¿Cuál conjunto está formado únicamente por estructuras señaladas para la rutina de Mano?', options:['A) Radio, cúbito y escafoides','B) Falange distal, falange media y falange proximal','C) Clavícula, húmero y radio','D) Astrágalo, calcáneo y metatarsianos'], answer:1 },
  { title:'Relaciona articulaciones', prompt:'¿Cuál de estas articulaciones aparece dentro de las estructuras señaladas para Mano?', options:['A) Sacroilíaca','B) Glenohumeral','C) Metacarpofalángica','D) Talocrural'], answer:2 },
  { title:'Audita la técnica', prompt:'Caso: paciente sentado; mano y antebrazo a nivel de mesa; mano prona con dedos extendidos; RC perpendicular a la tercera MCF; DFR 30 pulgadas. ¿Qué debe corregirse?', options:['A) Cambiar a posición lateral','B) Centrar en la muñeca','C) Flexionar los dedos','D) Ajustar la DFR a 40 pulgadas'], answer:3 },
  { title:'Ordena el procedimiento', prompt:'Ordena: (1) RC perpendicular a tercera MCF; (2) sentar al paciente; (3) mano y antebrazo a nivel de mesa; (4) mano prona con dedos extendidos y ligeramente separados; (5) DFR 40 pulgadas.', options:['A) 2 → 3 → 4 → 1 → 5','B) 4 → 2 → 5 → 1 → 3','C) 2 → 1 → 3 → 5 → 4','D) 5 → 4 → 3 → 2 → 1'], answer:0 },
  { title:'Desafío final — construye la técnica', prompt:'Selecciona la opción que integra correctamente toda la proyección PA de Mano.', options:['A) Paciente sentado; mano a 90°; RC a MCF del índice; DFR 40 pulgadas.','B) Paciente sentado; mano y antebrazo a nivel de mesa; mano prona, dedos extendidos y ligeramente separados; RC perpendicular a tercera MCF; DFR 40 pulgadas.','C) Paciente sentado; rotación 45° uniendo índice y pulgar; RC a tercera MCF; DFR 30 pulgadas.','D) Paciente de pie; mano supina; RC a muñeca; DFR 72 pulgadas.'], answer:1, feedback:'Integra posición del paciente, parte anatómica, RC y DFR según la información proporcionada.' }
]);

const oblicua = build('oblicua', [
  { title:'Identifica la proyección', prompt:'Desde PA se rota la mano 45° y se unen la punta del índice con la punta del pulgar. ¿Qué proyección corresponde?', options:['A) PA','B) Lateral','C) AP','D) Oblicua'], answer:3 },
  { title:'Posición del paciente', prompt:'¿Cómo debe estar colocado el paciente?', options:['A) Cómodamente sentado en un extremo de la mesa','B) De pie','C) En decúbito lateral','D) Sentado lejos de la mesa'], answer:0 },
  { title:'Altura de mano y antebrazo', prompt:'¿Qué relación deben tener con la mesa?', options:['A) Mano alta y antebrazo bajo','B) Ambos a la altura de la mesa','C) Ambos por debajo de la mesa','D) Antebrazo sobre el tórax'], answer:1 },
  { title:'Ángulo de rotación', prompt:'Partiendo de PA, ¿cuánto debe rotarse la mano para la Oblicua?', options:['A) 90°','B) 15°','C) 45°','D) 30°'], answer:2 },
  { title:'Referencia para conseguir la oblicuidad', prompt:'¿Qué acción se utiliza para lograr la posición indicada?', options:['A) Unir la punta del índice con la punta del pulgar','B) Flexionar todos los dedos 90°','C) Colocar el pulgar paralelo al índice','D) Mantener la mano completamente plana'], answer:0 },
  { title:'Posición de los dedos', prompt:'Además de la rotación, ¿cómo deben quedar los dedos?', options:['A) Totalmente juntos','B) Flexionados','C) Cruzados','D) Ligeramente separados'], answer:3 },
  { title:'Detecta una confusión', prompt:'Un estudiante parte de PA y rota la mano 90°. ¿Está realizando la Oblicua indicada?', options:['A) Sí','B) No, la Oblicua indicada utiliza 45°','C) Sí, si une índice y pulgar','D) Solo si cambia el RC'], answer:1 },
  { title:'Selecciona el RC', prompt:'¿Dónde debe centrarse el RC en Oblicua de Mano?', options:['A) MCF del índice','B) Muñeca','C) Tercera articulación metacarpofalángica','D) Quinta MCF'], answer:2 },
  { title:'Comprueba la dirección', prompt:'El RC está centrado correctamente, pero presenta angulación. ¿Qué debe corregirse?', options:['A) Hacerlo perpendicular','B) Rotar la mano 90°','C) Bajar la DFR','D) Centrar en el índice'], answer:0 },
  { title:'DFR en contexto', prompt:'¿Qué combinación corresponde a la técnica proporcionada?', options:['A) 30 pulgadas + RC a muñeca','B) 72 pulgadas + RC a tercera MCF','C) 40 pulgadas + RC a MCF del índice','D) 40 pulgadas + RC perpendicular a tercera MCF'], answer:3 },
  { title:'Reconoce una estructura', prompt:'¿Cuál estructura está incluida en la lista proporcionada para Mano?', options:['A) Cabeza del V metacarpiano','B) Cabeza del radio','C) Olécranon','D) Escafoides'], answer:0 },
  { title:'Reconoce otra estructura', prompt:'¿Cuál de estas también fue señalada para la rutina de Mano?', options:['A) Acromion','B) Sesamoideo','C) Maléolo lateral','D) Cóndilo femoral'], answer:1 },
  { title:'Encuentra los errores', prompt:'Caso: paciente sentado; mano a nivel de mesa; desde PA rota 90°; RC perpendicular a tercera MCF; DFR 30 pulgadas. ¿Qué dos datos deben corregirse?', options:['A) Paciente y RC','B) RC y posición del paciente','C) Rotación a 45° y DFR a 40 pulgadas','D) Mano a nivel de mesa y RC'], answer:2 },
  { title:'Compara Oblicua con PA', prompt:'¿Qué elemento diferencia principalmente la posición anatómica de Oblicua respecto a PA según los datos proporcionados?', options:['A) La rotación de 45° lograda uniendo índice y pulgar','B) La DFR','C) El paciente deja de estar sentado','D) El RC deja de ser perpendicular'], answer:0 },
  { title:'Desafío final — construye la técnica', prompt:'Selecciona la descripción completa de la Oblicua de Mano.', options:['A) Mano prona y plana; RC a tercera MCF; DFR 30 pulgadas.','B) Paciente sentado; mano y antebrazo a nivel de mesa; desde PA rotar 45° uniendo punta de índice y pulgar; dedos ligeramente separados; RC perpendicular a tercera MCF; DFR 40 pulgadas.','C) Desde PA rotar 90°; pulgar paralelo al índice; RC a MCF del índice; DFR 40 pulgadas.','D) Paciente de pie; mano supina; RC a muñeca.'], answer:1, feedback:'La opción reúne todos los datos proporcionados para esta proyección.' }
]);

const lateral = build('lateral', [
  { title:'Identifica la proyección', prompt:'Desde PA se rota la mano 90°, el pulgar toma posición PA y queda paralelo al índice. ¿Qué proyección corresponde?', options:['A) Oblicua','B) Lateral','C) PA','D) AP'], answer:1 },
  { title:'Prepara al paciente', prompt:'¿Cuál es la posición del paciente?', options:['A) De pie','B) Decúbito supino','C) Cómodamente sentado en un extremo de la mesa','D) Sentado de espaldas'], answer:2 },
  { title:'Ubica la extremidad', prompt:'¿Dónde se colocan mano y antebrazo?', options:['A) A la altura de la mesa','B) A nivel del hombro','C) Debajo de la mesa','D) Sobre el tórax'], answer:0 },
  { title:'Ángulo de rotación', prompt:'Partiendo de PA, ¿cuánto debe rotarse la mano?', options:['A) 30°','B) 45°','C) 15°','D) 90°'], answer:3 },
  { title:'Posición del pulgar', prompt:'Al conseguir la lateral, ¿qué posición toma el pulgar según la información proporcionada?', options:['A) PA','B) Oblicua','C) AP','D) Flexionada'], answer:0 },
  { title:'Relación pulgar-índice', prompt:'¿Cómo debe quedar el pulgar respecto al índice?', options:['A) Perpendicular','B) Paralelo','C) Cruzado','D) Separado 90°'], answer:1 },
  { title:'Detecta el error', prompt:'Un estudiante rota la mano solo 45° intentando realizar Lateral. ¿Qué debe corregir?', options:['A) La DFR','B) El RC','C) La rotación debe ser 90°','D) La posición del paciente'], answer:2 },
  { title:'Distingue Oblicua de Lateral', prompt:'¿Qué dato pertenece a Lateral y no a la Oblicua proporcionada?', options:['A) Paciente sentado','B) DFR 40 pulgadas','C) Mano y antebrazo a nivel de mesa','D) Rotación de 90° con pulgar paralelo al índice'], answer:3 },
  { title:'Selecciona el punto del RC', prompt:'¿Dónde debe centrarse el RC en Lateral de Mano?', options:['A) Articulación metacarpofalángica del índice','B) Tercera MCF','C) Muñeca','D) Quinta MCF'], answer:0 },
  { title:'Comprueba la dirección y DFR', prompt:'¿Qué combinación corresponde a Lateral?', options:['A) RC angulado + 30 pulgadas','B) RC perpendicular + 40 pulgadas','C) RC perpendicular + 72 pulgadas','D) RC a tercera MCF + 20 pulgadas'], answer:1 },
  { title:'Reconoce estructuras', prompt:'¿Cuál de estas estructuras está incluida en la lista proporcionada para Mano?', options:['A) Tróclea humeral','B) Cabeza femoral','C) Articulación interfalángica proximal','D) Maléolo medial'], answer:2 },
  { title:'Integra anatomía', prompt:'¿Cuál grupo contiene únicamente elementos señalados para Mano?', options:['A) Falange distal, articulación interfalángica distal y falange media','B) Radio, cúbito y carpos','C) Húmero, radio y cúbito','D) Tibia, peroné y astrágalo'], answer:0 },
  { title:'Audita un caso', prompt:'Caso: paciente sentado; mano y antebrazo a nivel de mesa; rotación 90°; pulgar paralelo al índice; RC perpendicular a tercera MCF; DFR 40. ¿Qué dato no coincide con la técnica Lateral proporcionada?', options:['A) Posición del paciente','B) DFR','C) Rotación','D) Punto del RC'], answer:3, feedback:'En Lateral, el RC proporcionado es perpendicular a la articulación metacarpofalángica del dedo índice.' },
  { title:'Ordena el procedimiento', prompt:'Ordena: (1) rotar 90°; (2) sentar al paciente; (3) mano y antebrazo a nivel de mesa; (4) comprobar pulgar en PA y paralelo al índice; (5) RC perpendicular a MCF del índice y DFR 40.', options:['A) 2 → 3 → 1 → 4 → 5','B) 1 → 4 → 2 → 3 → 5','C) 2 → 5 → 3 → 1 → 4','D) 5 → 2 → 1 → 4 → 3'], answer:0 },
  { title:'Desafío final — construye la técnica', prompt:'Selecciona la descripción completa de la Lateral de Mano.', options:['A) Paciente sentado; mano prona; RC a tercera MCF; DFR 40.','B) Paciente sentado; rotar 45° uniendo índice y pulgar; RC a tercera MCF; DFR 40.','C) Paciente sentado; mano y antebrazo a nivel de mesa; desde PA rotar 90°; pulgar en PA y paralelo al índice; RC perpendicular a MCF del índice; DFR 40 pulgadas.','D) Paciente de pie; mano supina; RC a muñeca; DFR 72.'], answer:2, feedback:'Integra la posición anatómica, el punto del RC y la DFR indicados para Lateral.' }
]);

export const handQuestionBanks = { pa, oblicua, lateral };
export const handQuestionIds = {
  'mano-pa': new Set(pa.map((question) => question.id)),
  'mano-oblicua': new Set(oblicua.map((question) => question.id)),
  'mano-lateral': new Set(lateral.map((question) => question.id))
};

export function getHandQuestionBank(projectionId: string) {
  if (projectionId === 'mano-pa') return handQuestionBanks.pa;
  if (projectionId === 'mano-oblicua') return handQuestionBanks.oblicua;
  if (projectionId === 'mano-lateral') return handQuestionBanks.lateral;
  return [];
}

