import type { LearningProjection, LearningSection } from '@/src/data/thumbLearning';

export type UpperLimbProjection = LearningProjection & {
  slug: string;
};

export type UpperLimbStudy = {
  id: string;
  title: string;
  projections: UpperLimbProjection[];
};

function projection(
  slug: string,
  title: string,
  patientPosition: string,
  anatomicalPosition: string,
  centralRay: string,
  dfr = '40 pulgadas.'
): UpperLimbProjection {
  const learningSections: LearningSection[] = [
    { code: '01', title: 'Posición del paciente', content: [patientPosition] },
    { code: '02', title: 'Posición anatómica', content: [anatomicalPosition] },
    { code: '03', title: 'Rayo central (RC)', content: [centralRay] },
    { code: '04', title: 'DFR', content: [dfr] }
  ];

  return { id: slug, slug, title, learningSections, exercises: [] };
}

const seatedAtTable = 'Colocado en un extremo de la mesa, cómodamente sentado.';
const supineOrErect = 'Puede realizarse con el paciente en decúbito supino o en posición erecta. Si está en decúbito supino, colocar una esponja bajo las rodillas para mayor comodidad; no colocar almohada bajo la cabeza.';

export const upperLimbStudies: UpperLimbStudy[] = [
  {
    id: 'muneca',
    title: 'Muñeca',
    projections: [
      projection('pa', 'PA', seatedAtTable, 'Mano y antebrazo a la altura de la mesa. Mano en prono, con los dedos del 2.º al 5.º flexionados a 90° (posición similar a la lateral de pulgar).', 'Perpendicular al centro de la región del carpo.'),
      projection('oblicua', 'Oblicua', seatedAtTable, 'Mano y antebrazo a la altura de la mesa. Girar mano y muñeca 45° desde la posición prona (similar a la oblicua de mano).', 'Perpendicular al centro de la región del carpo.'),
      projection('lateral', 'Lateral', seatedAtTable, 'Mano y antebrazo a la altura de la mesa. Girar mano y muñeca 90° externamente desde la posición prona (similar a la lateral de mano).', 'Perpendicular al centro de la región del carpo.')
    ]
  },
  {
    id: 'antebrazo',
    title: 'Antebrazo',
    projections: [
      projection('ap', 'AP', seatedAtTable, 'Mano y antebrazo a la altura de la mesa. Mano en supino; cóndilos humerales paralelos al receptor de imagen. Deben visualizarse las articulaciones distal y proximal del antebrazo.', 'Perpendicular al punto central del antebrazo.'),
      projection('lateral', 'Lateral', seatedAtTable, 'Mano y antebrazo a la altura de la mesa. Desde AP, flexionar el codo 90° y apoyar la parte externa de mano, muñeca y antebrazo sobre la mesa. Cóndilos humerales perpendiculares al receptor de imagen. Deben visualizarse las articulaciones distal y proximal del antebrazo.', 'Perpendicular al punto central del antebrazo.')
    ]
  },
  {
    id: 'codo',
    title: 'Codo',
    projections: [
      projection('ap', 'AP', seatedAtTable, 'Mano y antebrazo a la altura de la mesa. Mano en supino; cóndilos humerales paralelos al receptor de imagen.', 'Perpendicular al punto medio de los cóndilos humerales.'),
      projection('lateral', 'Lateral', seatedAtTable, 'Mano y antebrazo a la altura de la mesa. Desde AP, flexionar el codo 90°. Mano y muñeca en lateral (como la lateral de mano o muñeca); cóndilos humerales perpendiculares al receptor de imagen.', 'Perpendicular al cóndilo externo del húmero.')
    ]
  },
  {
    id: 'humero',
    title: 'Húmero',
    projections: [
      projection('ap', 'AP', supineOrErect, 'Mano del lado afectado en supino; cóndilos humerales paralelos al receptor de imagen.', 'Perpendicular al punto medio del húmero.'),
      projection('lateral', 'Lateral', supineOrErect, 'La mano del lado afectado debe estar en posición prona. Los cóndilos humerales deben quedar perpendiculares al receptor de imagen.', 'Perpendicular al punto medio del húmero.')
    ]
  },
  {
    id: 'hombro',
    title: 'Hombro',
    projections: [
      projection('ap-rotacion-interna', 'AP Rotación Interna', supineOrErect, 'Mano del lado afectado en prono; cóndilos humerales perpendiculares al receptor de imagen.', 'Perpendicular a la apófisis coracoides.'),
      projection('ap-rotacion-externa', 'AP Rotación Externa', supineOrErect, 'Mano del lado afectado en supino; cóndilos humerales paralelos al receptor de imagen.', 'Perpendicular a la apófisis coracoides.')
    ]
  },
  {
    id: 'clavicula',
    title: 'Clavícula',
    projections: [
      projection('ap-sin-angulacion', 'AP Sin Angulación', supineOrErect, 'Con los brazos a la par del cuerpo, lo más cómodamente posible, y la cabeza recta en relación con el tórax.', 'Perpendicular al punto medio de la clavícula.'),
      projection('ap-con-angulacion', 'AP Con Angulación', supineOrErect, 'Con los brazos a la par del cuerpo, lo más cómodamente posible, y la cabeza recta en relación con el tórax.', 'Con 15° de angulación cefálica, dirigido al punto medio de la clavícula.')
    ]
  },
  {
    id: 'escapula',
    title: 'Escápula',
    projections: [
      projection('ap', 'AP', supineOrErect, 'Brazo del lado afectado a 90° respecto de la fosa glenoidea; codo del mismo brazo a 90° respecto del húmero; mano dirigida hacia la cabeza.', 'Perpendicular al punto medio de la escápula. Palpar previamente la parte superior del hombro y el ángulo inferior de la escápula para localizar mejor la región media.'),
      projection('lateral', 'Lateral', 'En decúbito prono o erecto en PA. Desde esa posición, el plano medio sagital (PMS) forma 45° con el receptor de imagen y el lado afectado queda junto al receptor.', 'Brazo afectado a la altura de la cintura contralateral; brazo contralateral en posición cómoda.', 'Perpendicular al punto medio de la escápula. Palpar previamente el borde superior del hombro y el ángulo inferior de la escápula para localizar mejor la región media.')
    ]
  },
  {
    id: 'articulacion-acromioclavicular',
    title: 'Articulación Acromioclavicular',
    projections: [
      projection('ap-sin-peso', 'AP Sin Peso', 'Paciente erecto.', 'Paciente en posición anatómica. Obtener imágenes de ambas articulaciones acromioclaviculares (derecha e izquierda) en una sola toma, para compararlas.', 'Perpendicular, incidiendo en el ángulo esternal (ángulo de Louis) o escotadura supraesternal.'),
      projection('ap-con-peso', 'AP Con Peso', 'Paciente erecto. Colocar peso proporcional al paciente en ambas manos, con el objetivo descrito en el material de forzar la articulación acromioclavicular para observar una posible luxación.', 'Paciente en posición anatómica. Obtener imágenes de ambas articulaciones acromioclaviculares (derecha e izquierda) en una sola toma, para compararlas.', 'Perpendicular, incidiendo en el ángulo esternal (ángulo de Louis) o escotadura supraesternal.')
    ]
  },
  {
    id: 'articulacion-esternoclavicular',
    title: 'Articulación Esternoclavicular',
    projections: [
      projection('pa', 'PA', 'En decúbito prono o erecto en PA.', 'Si está en prono, acostar al paciente cómodamente boca abajo, con los brazos descansando a los lados del cuerpo y la cabeza colocada cómodamente.', 'Perpendicular, emergiendo en el ángulo supraesternal o ángulo de Louis.'),
      projection('oa', 'OA', 'En decúbito prono o erecto en PA.', 'Desde prono, girar al paciente 45° hacia el lado contralateral a la articulación estudiada. Brazo ipsilateral cómodamente junto al cuerpo; brazo contralateral hacia la cabeza con codo flexionado a 90°. Rodilla contralateral a 45° y apoyada sobre la pierna ipsilateral. Obtener imágenes de ambas articulaciones para comparación.', 'Perpendicular, emergiendo en la articulación estudiada.')
    ]
  }
];

export function getUpperLimbStudy(id?: string) {
  return upperLimbStudies.find((study) => study.id === id);
}

export function getUpperLimbProjection(studyId?: string, projectionId?: string) {
  return getUpperLimbStudy(studyId)?.projections.find((item) => item.slug === projectionId);
}

