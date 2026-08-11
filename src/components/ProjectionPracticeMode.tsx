import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import type { PracticeExercise, ThumbProjection } from '@/src/data/thumbLearning';
import type { PracticeUpdate } from '@/src/types/learning';
import { MasteryBar } from './MasteryBar';
import { PracticeFeedback } from './PracticeFeedback';

type ProjectionPracticeModeProps = {
  projection: ThumbProjection;
};

const positiveMessages = ['¡Correcto!', 'Excelente posicionamiento.', '¡Vas dominando esta proyección!'];

function sameAnswers(selected: string[], correct: string[]) {
  return selected.length === correct.length && correct.every((answer) => selected.includes(answer));
}

function isCorrectAnswer(exercise: PracticeExercise, selected: string[]) {
  if (exercise.type === 'order') return selected.length === exercise.correctOrder.length && selected.every((answer, index) => answer === exercise.correctOrder[index]);
  if (exercise.type === 'multi-select') return sameAnswers(selected, exercise.correctOptions);
  return selected[0] === exercise.correctOption;
}

export function ProjectionPracticeMode({ projection }: ProjectionPracticeModeProps) {
  const { registerPractice } = useLearningProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [result, setResult] = useState<PracticeUpdate | null>(null);

  const exercise = projection.exercises[currentIndex];

  const resetPractice = () => {
    setCurrentIndex(0);
    setSelected([]);
    setAnswered(false);
    setCorrect(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setResult(null);
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
    if (answerIsCorrect) setCorrectAnswers((value) => value + 1);
    else setIncorrectAnswers((value) => value + 1);
  };

  const continuePractice = () => {
    if (currentIndex === projection.exercises.length - 1) {
      setResult(registerPractice({
        correctAnswers,
        incorrectAnswers,
        projectionId: projection.id
      }));
      return;
    }

    setCurrentIndex((value) => value + 1);
    setSelected([]);
    setAnswered(false);
    setCorrect(false);
  };

  if (result) {
    return (
      <View style={styles.resultCard}>
        <Text style={styles.resultEyebrow}>PRÁCTICA COMPLETADA</Text>
        <Text style={styles.resultScore}>{result.score}%</Text>
        <Text style={styles.resultLabel}>Puntuación obtenida</Text>
        <View style={styles.resultProgress}><MasteryBar value={result.score} /></View>

        <View style={styles.resultGrid}>
          <View style={styles.resultMetric}><Text style={styles.metricValue}>+{result.masteryGained}%</Text><Text style={styles.metricLabel}>Dominio</Text></View>
          <View style={styles.resultMetric}><Text style={styles.metricValue}>+{result.xpGained}</Text><Text style={styles.metricLabel}>XP</Text></View>
        </View>

        {result.achievementsUnlocked.map((achievement) => (
          <View key={achievement.id} style={styles.achievement}>
            <Text style={styles.achievementTitle}>{achievement.id === 'maestria-dedo-pulgar' ? '¡Maestría desbloqueada!' : '¡Proyección dominada!'}</Text>
            <Text style={styles.achievementText}>{achievement.title}</Text>
          </View>
        ))}

        <Pressable accessibilityRole="button" onPress={resetPractice} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Practicar de nuevo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.practiceHeader}>
        <View style={styles.counterRow}>
          <Text style={styles.counter}>DESAFÍO {currentIndex + 1} DE {projection.exercises.length}</Text>
          <Text style={styles.exerciseType}>{exercise.type === 'order' ? 'ORDENAR' : exercise.type === 'multi-select' ? 'SELECCIÓN MÚLTIPLE' : 'SELECCIÓN'}</Text>
        </View>
        <MasteryBar value={((currentIndex + (answered ? 1 : 0)) / projection.exercises.length) * 100} />
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
          <Text style={styles.primaryButtonText}>{answered ? (currentIndex === projection.exercises.length - 1 ? 'Ver resultado' : 'Siguiente desafío') : 'Comprobar'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  achievement: { width: '100%', marginTop: 15, borderRadius: 17, backgroundColor: '#F3F1FF', padding: 15 },
  achievementTitle: { color: colors.morado, fontSize: 14, fontWeight: '800' },
  achievementText: { marginTop: 4, color: colors.azulOscuro, fontSize: 13, fontWeight: '600' }
});
