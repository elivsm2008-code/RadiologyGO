import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { getAchievementDefinition } from '@/src/data/learningCatalog';
import type { ThumbProjection } from '@/src/data/thumbLearning';
import { getThumbQuestionBank } from '@/src/data/thumbQuestionBanks';
import { selectPracticeQuestions } from '@/src/services/practiceRotationEngine';
import type { LearningProgress, PracticeUpdate, QuestionResult } from '@/src/types/learning';
import type { PracticeQuestion } from '@/src/types/practiceQuestions';
import { AchievementCelebration } from './AchievementCelebration';
import { MasteryBar } from './MasteryBar';
import { PracticeFeedback } from './PracticeFeedback';
import { RayoCompanion } from './RayoCompanion';

type ProjectionPracticeModeProps = {
  projection: ThumbProjection;
};

const positiveMessages = ['¡Correcto!', 'Excelente posicionamiento.', '¡Vas dominando esta proyección!'];
const practiceMessages = [
  '¡Vamos! Tú puedes con esta proyección.',
  'Un paso a la vez. Yo te acompaño.',
  '¿Listo? Vamos a demostrar lo que sabes.',
  'Cada práctica te acerca al dominio.',
  '¡Vamos por ese 100%!'
];
const correctRayoMessages = [
  '¡Excelente!',
  '¡Eso es!',
  '¡Muy bien! Sigue así.',
  '¡Correcto! Vas dominando esta proyección.',
  '¡Sabía que podías!'
];
const reviewRayoMessages = [
  'Casi. Revisemos este paso.',
  'Tranqui, equivocarse también enseña.',
  'Vamos a revisarlo juntos.',
  'Estuviste cerca. Inténtalo de nuevo.',
  'Este paso necesita un poquito más de práctica.'
];

function pickMessage(messages: string[]) {
  return messages[Math.floor(Math.random() * messages.length)];
}

function sameAnswers(selected: string[], correct: string[]) {
  return selected.length === correct.length && correct.every((answer) => selected.includes(answer));
}

function isCorrectAnswer(exercise: PracticeQuestion, selected: string[]) {
  if (exercise.type === 'order') return selected.length === exercise.correctOrder.length && selected.every((answer, index) => answer === exercise.correctOrder[index]);
  if (exercise.type === 'multi-select') return sameAnswers(selected, exercise.correctOptions);
  return selected[0] === exercise.correctOption;
}

export function ProjectionPracticeMode({ projection }: ProjectionPracticeModeProps) {
  const { isHydrated, progress, registerPractice, startPracticeSession } = useLearningProgress();
  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [result, setResult] = useState<PracticeUpdate | null>(null);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [rayoMessage, setRayoMessage] = useState(() => pickMessage(practiceMessages));

  const exercise = sessionQuestions[currentIndex];

  const beginPractice = (sourceProgress: LearningProgress) => {
    const questions = selectPracticeQuestions({
      bank: getThumbQuestionBank(projection.id),
      history: sourceProgress.questionHistory,
      projectionId: projection.id,
      recentQuestionIds: sourceProgress.recentQuestionIds[projection.id],
      sessionSize: 7
    });
    setSessionQuestions(questions);
    startPracticeSession(projection.id, questions.map((question) => question.id));
    setCurrentIndex(0);
    setSelected([]);
    setAnswered(false);
    setCorrect(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuestionResults([]);
    setResult(null);
    setRayoMessage(pickMessage(practiceMessages));
  };

  useEffect(() => {
    if (isHydrated && sessionQuestions.length === 0) beginPractice(progress);
  }, [isHydrated, projection.id]);

  const resetPractice = () => {
    beginPractice(result?.progress ?? progress);
  };

  const toggleOption = (option: string) => {
    if (answered) return;
    if (exercise.type === 'order') {
      if (!selected.includes(option)) setSelected([...selected, option]);
      return;
    }
    if (exercise.type === 'multi-select') {
      setSelected(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
      return;
    }
    setSelected([option]);
  };

  const checkAnswer = () => {
    if (selected.length === 0) return;
    const answerIsCorrect = isCorrectAnswer(exercise, selected);
    setCorrect(answerIsCorrect);
    setAnswered(true);
    setRayoMessage(pickMessage(answerIsCorrect ? correctRayoMessages : reviewRayoMessages));
    setQuestionResults((value) => [...value, { conceptId: exercise.conceptId, correct: answerIsCorrect, questionId: exercise.id }]);
    if (answerIsCorrect) setCorrectAnswers((value) => value + 1);
    else setIncorrectAnswers((value) => value + 1);
  };

  const continuePractice = () => {
    if (currentIndex === sessionQuestions.length - 1) {
      setResult(registerPractice({
        correctAnswers,
        incorrectAnswers,
        projectionId: projection.id,
        questionResults
      }));
      return;
    }

    setCurrentIndex((value) => value + 1);
    setSelected([]);
    setAnswered(false);
    setCorrect(false);
    setRayoMessage(pickMessage(practiceMessages));
  };

  if (!isHydrated || !exercise) {
    return <View style={styles.loadingCard}><Text style={styles.loadingText}>Preparando una práctica diferente…</Text></View>;
  }

  if (result) {
    const finalMastery = result.progress.projections[projection.id]?.mastery ?? 0;
    const completionMessage = finalMastery === 100
      ? '¡LO LOGRASTE! Esta proyección ya es tuya.'
      : result.score >= 80
        ? '¡Increíble! Cada vez dominas mejor esta proyección.'
        : result.score >= 50
          ? '¡Buen trabajo! Vamos avanzando.'
          : 'Todavía hay cosas por practicar. Vamos paso a paso.';

    return (
      <View style={styles.resultCard}>
        <RayoCompanion message={completionMessage} pose={result.score >= 80 ? 'celebrate' : 'wave'} />
        <Text style={styles.resultEyebrow}>PRÁCTICA COMPLETADA</Text>
        <Text style={styles.resultScore}>{result.score}%</Text>
        <Text style={styles.resultLabel}>Puntuación obtenida</Text>
        <View style={styles.resultProgress}><MasteryBar value={result.score} /></View>

        <View style={styles.resultGrid}>
          <View style={styles.resultMetric}><Text style={styles.metricValue}>+{result.masteryGained}%</Text><Text style={styles.metricLabel}>Dominio</Text></View>
          <View style={styles.resultMetric}><Text style={styles.metricValue}>+{result.xpGained}</Text><Text style={styles.metricLabel}>XP</Text></View>
        </View>

        {result.levelAfter > result.levelBefore && (
          <View style={styles.levelUp}>
            <RayoCompanion message="¡Subiste de nivel!" pose="celebrate" />
            <Text style={styles.levelUpEyebrow}>¡SUBISTE DE NIVEL!</Text>
            <Text style={styles.levelUpTitle}>Nivel {result.levelAfter}</Text>
            <Text style={styles.levelUpText}>Rayo celebra contigo este nuevo avance.</Text>
          </View>
        )}

        {result.achievementsUnlocked.map((achievement) => {
          const definition = getAchievementDefinition(achievement.id);
          return definition ? <AchievementCelebration definition={definition} key={achievement.id} xpGained={definition.xpReward} /> : null;
        })}

        <Pressable accessibilityRole="button" onPress={resetPractice} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Practicar de nuevo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <RayoCompanion message={rayoMessage} pose={answered && correct ? 'celebrate' : answered ? 'neutral' : 'wave'} />
      <View style={styles.practiceHeader}>
        <View style={styles.counterRow}>
          <Text style={styles.counter}>DESAFÍO {currentIndex + 1} DE {sessionQuestions.length}</Text>
          <Text style={styles.exerciseType}>{exercise.type === 'order' ? 'ORDENAR' : exercise.type === 'multi-select' ? 'SELECCIÓN MÚLTIPLE' : exercise.type === 'true-false' ? 'VERDADERO / FALSO' : exercise.type === 'scenario' ? 'ESCENARIO' : exercise.type === 'completion' ? 'COMPLETAR' : 'SELECCIÓN'}</Text>
        </View>
        <MasteryBar value={((currentIndex + (answered ? 1 : 0)) / sessionQuestions.length) * 100} />
      </View>

      <View style={styles.challengeCard}>
        <Text style={styles.challengeTitle}>{exercise.title}</Text>
        <Text style={styles.prompt}>{exercise.prompt}</Text>

        {exercise.type === 'order' && selected.length > 0 && (
          <View style={styles.sequence}>
            {selected.map((step, index) => (
              <View key={step} style={styles.sequenceRow}>
                <View style={styles.sequenceNumber}><Text style={styles.sequenceNumberText}>{index + 1}</Text></View>
                <Text style={styles.sequenceText}>{step}</Text>
              </View>
            ))}
            {!answered && <Pressable onPress={() => setSelected([])}><Text style={styles.resetOrder}>Reiniciar orden</Text></Pressable>}
          </View>
        )}

        <View style={styles.options}>
          {exercise.options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <Pressable
                accessibilityRole="button"
                key={option}
                onPress={() => toggleOption(option)}
                style={[styles.option, isSelected && styles.selectedOption, answered && isSelected && (correct ? styles.correctOption : styles.incorrectOption)]}
              >
                <View style={[styles.selector, isSelected && styles.selectedSelector]} />
                <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>

        {answered && (
          <PracticeFeedback
            correct={correct}
            explanation={exercise.correctExplanation}
            message={correct ? positiveMessages[currentIndex % positiveMessages.length] : 'Casi. Revisemos este paso.'}
          />
        )}

        <Pressable
          accessibilityRole="button"
          disabled={selected.length === 0}
          onPress={answered ? continuePractice : checkAnswer}
          style={[styles.primaryButton, selected.length === 0 && styles.disabledButton]}
        >
          <Text style={styles.primaryButtonText}>{answered ? (currentIndex === sessionQuestions.length - 1 ? 'Ver resultado' : 'Siguiente desafío') : 'Comprobar'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingCard: { borderRadius: 20, backgroundColor: colors.blanco, padding: 22 },
  loadingText: { color: '#617686', fontSize: 14, textAlign: 'center' },
  practiceHeader: { marginBottom: 14 },
  counterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 9 },
  counter: { color: colors.azulOscuro, fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  exerciseType: { color: colors.azulClaro, fontSize: 10, fontWeight: '800' },
  challengeCard: { borderRadius: 22, backgroundColor: colors.blanco, padding: 18 },
  challengeTitle: { color: colors.azulOscuro, fontSize: 19, fontWeight: '800' },
  prompt: { marginTop: 8, color: '#5E7382', fontSize: 14, lineHeight: 21 },
  sequence: { gap: 8, marginTop: 16, borderRadius: 16, backgroundColor: colors.grisClaro, padding: 12 },
  sequenceRow: { flexDirection: 'row', alignItems: 'center' },
  sequenceNumber: { width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: colors.azulOscuro },
  sequenceNumberText: { color: colors.blanco, fontSize: 11, fontWeight: '800' },
  sequenceText: { flex: 1, marginLeft: 10, color: colors.azulOscuro, fontSize: 12, lineHeight: 17 },
  resetOrder: { alignSelf: 'flex-end', color: colors.azulClaro, fontSize: 12, fontWeight: '700', paddingTop: 4 },
  options: { gap: 10, marginTop: 18 },
  option: { minHeight: 56, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDE6ED', borderRadius: 16, padding: 13 },
  selectedOption: { borderColor: colors.azulClaro, backgroundColor: '#F0F9FE' },
  correctOption: { borderColor: colors.azulClaro },
  incorrectOption: { borderColor: colors.morado, backgroundColor: '#F7F5FF' },
  selector: { width: 18, height: 18, borderWidth: 2, borderColor: '#B9C8D2', borderRadius: 9 },
  selectedSelector: { borderWidth: 5, borderColor: colors.azulClaro },
  optionText: { flex: 1, marginLeft: 11, color: '#536A79', fontSize: 13, lineHeight: 19 },
  selectedOptionText: { color: colors.azulOscuro, fontWeight: '600' },
  primaryButton: { alignItems: 'center', borderRadius: 16, backgroundColor: colors.azulOscuro, paddingVertical: 16, marginTop: 18 },
  disabledButton: { opacity: 0.35 },
  primaryButtonText: { color: colors.blanco, fontSize: 15, fontWeight: '800' },
  resultCard: { alignItems: 'center', borderRadius: 24, backgroundColor: colors.blanco, padding: 22 },
  resultEyebrow: { color: colors.azulClaro, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  resultScore: { marginTop: 13, color: colors.azulOscuro, fontSize: 48, fontWeight: '800' },
  resultLabel: { color: '#6C8190', fontSize: 13 },
  resultProgress: { width: '100%', marginTop: 18 },
  resultGrid: { width: '100%', flexDirection: 'row', gap: 12, marginTop: 18 },
  resultMetric: { flex: 1, alignItems: 'center', borderRadius: 16, backgroundColor: colors.grisClaro, padding: 14 },
  metricValue: { color: colors.azulOscuro, fontSize: 19, fontWeight: '800' },
  metricLabel: { marginTop: 3, color: '#718492', fontSize: 12 },
  levelUp: { width: '100%', marginTop: 15, borderRadius: 17, backgroundColor: '#F3F1FF', padding: 15 },
  levelUpEyebrow: { color: colors.morado, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  levelUpTitle: { marginTop: 4, color: colors.azulOscuro, fontSize: 18, fontWeight: '800' },
  levelUpText: { marginTop: 4, color: '#617686', fontSize: 12 }
});
