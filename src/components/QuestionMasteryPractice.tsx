import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { getAchievementDefinition } from '@/src/data/learningCatalog';
import type { Achievement, LearningProgress } from '@/src/types/learning';
import type { PracticeQuestion } from '@/src/types/practiceQuestions';
import { AchievementCelebration } from './AchievementCelebration';
import { MasteryBar } from './MasteryBar';
import { PracticeFeedback } from './PracticeFeedback';
import { RayoCompanion } from './RayoCompanion';

type Props = { bank: PracticeQuestion[]; isVerification?: boolean; scopeId: string; title: string };
type Result = { achievements: Achievement[]; levelAfter: number; levelBefore: number; mastered: number; pending: number; score: number; xp: number };
const startMessages = ['¡Vamos! Tú puedes con esta proyección.','Un paso a la vez. Yo te acompaño.','¿Listo? Vamos a demostrar lo que sabes.','Cada práctica te acerca al dominio.','¡Vamos por ese 100%!'];
const correctMessages = ['¡Excelente!','¡Eso es!','¡Muy bien! Sigue así.','¡Correcto! Vas dominando esta proyección.','¡Sabía que podías!'];
const reviewMessages = ['Casi. Revisemos este paso.','Tranqui, equivocarse también enseña.','Vamos a revisarlo juntos.','Estuviste cerca. Inténtalo de nuevo.','Este paso necesita un poquito más de práctica.'];
const pick = (items: string[]) => items[Math.floor(Math.random() * items.length)];
const normalized = (value: string) => value.trim().toLocaleLowerCase('es').replace(/\s+/g, ' ');
const same = (selected: string[], correct: string[]) => selected.length === correct.length && correct.every((item) => selected.includes(item));
function isCorrect(question: PracticeQuestion, selected: string[], textAnswer: string) {
  if (question.type === 'text') return question.acceptedAnswers.some((answer) => normalized(answer) === normalized(textAnswer));
  if (question.type === 'order') return selected.length === question.correctOrder.length && selected.every((answer, index) => answer === question.correctOrder[index]);
  if (question.type === 'multi-select') return same(selected, question.correctOptions);
  return selected[0] === question.correctOption;
}

export function QuestionMasteryPractice({ bank, isVerification = false, scopeId, title }: Props) {
  const { answerQuestion, completeRound, isHydrated, progress, startPracticeSession } = useLearningProgress();
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [rayoMessage, setRayoMessage] = useState(() => pick(startMessages));
  const [recoveredThisAnswer, setRecoveredThisAnswer] = useState(false);
  const [earned, setEarned] = useState<Achievement[]>([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [levelBefore, setLevelBefore] = useState(1);
  const [levelAfter, setLevelAfter] = useState(1);
  const [result, setResult] = useState<Result | null>(null);
  const question = questions[index];

  const sourceFor = (source: LearningProgress) => isVerification ? source.thumbVerification : source.questionBankProgress[scopeId];
  const begin = (source: LearningProgress) => {
    const sourceProgress = sourceFor(source);
    const allowed = isVerification ? source.thumbVerification.selectedQuestionIds : bank.map((item) => item.id);
    const classified = new Set([...sourceProgress.masteredQuestionIds, ...sourceProgress.reinforcementQuestionIds]);
    const ids = sourceProgress.hasCompletedInitialRound ? sourceProgress.reinforcementQuestionIds : allowed.filter((id) => !classified.has(id));
    const pendingIds = ids.length ? ids : sourceProgress.reinforcementQuestionIds;
    const next = pendingIds.map((id) => bank.find((item) => item.id === id)).filter((item): item is PracticeQuestion => Boolean(item));
    setQuestions(next); setIndex(0); setSelected([]); setTextAnswer(''); setAnswered(false); setCorrect(false);
    setCorrectCount(0); setIncorrectCount(0); setEarned([]); setXpEarned(0); setResult(null); setRayoMessage(pick(startMessages));
    setLevelBefore(1); setLevelAfter(1);
    if (next.length) startPracticeSession(scopeId, next.map((item) => item.id));
  };
  useEffect(() => { if (isHydrated) begin(progress); }, [isHydrated, scopeId]);

  const toggle = (option: string) => {
    if (answered) return;
    if (question.type === 'order') { if (!selected.includes(option)) setSelected([...selected, option]); return; }
    if (question.type === 'multi-select') { setSelected(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]); return; }
    setSelected([option]);
  };
  const check = () => {
    const answerIsCorrect = isCorrect(question, selected, textAnswer);
    const wasReinforcement = sourceFor(progress).reinforcementQuestionIds.includes(question.id);
    const update = answerQuestion(scopeId, question.id, question.conceptId, answerIsCorrect, bank.length, isVerification);
    setCorrect(answerIsCorrect); setAnswered(true); setRecoveredThisAnswer(answerIsCorrect && wasReinforcement);
    setCorrectCount((value) => value + (answerIsCorrect ? 1 : 0)); setIncorrectCount((value) => value + (answerIsCorrect ? 0 : 1));
    setEarned((value) => [...value, ...update.achievementsUnlocked]); setXpEarned((value) => value + update.xpGained);
    setLevelBefore((value) => value === 1 ? update.levelBefore : value); setLevelAfter(update.levelAfter);
    setRayoMessage(answerIsCorrect && wasReinforcement ? '¡Eso es! Ahora sí la tienes.' : pick(answerIsCorrect ? correctMessages : reviewMessages));
  };
  const next = () => {
    if (index < questions.length - 1) { setIndex(index + 1); setSelected([]); setTextAnswer(''); setAnswered(false); setCorrect(false); setRecoveredThisAnswer(false); setRayoMessage(pick(startMessages)); return; }
    const total = correctCount + incorrectCount;
    const score = total ? Math.round((correctCount / total) * 100) : 0;
    const completed = completeRound(scopeId, score, isVerification);
    const source = isVerification ? completed.thumbVerification : completed.questionBankProgress[scopeId];
    setResult({ achievements: earned, levelAfter, levelBefore, mastered: source.masteredQuestionIds.length, pending: source.reinforcementQuestionIds.length, score, xp: xpEarned });
  };

  if (!isHydrated) return <View style={styles.card}><Text style={styles.muted}>Cargando tu progreso…</Text></View>;
  const currentSource = sourceFor(progress);
  if (!question && !result) {
    const done = currentSource.masteredQuestionIds.length === bank.length;
    return <View style={styles.resultCard}><RayoCompanion message={done ? '¡Excelente! Has dominado esta proyección.' : 'Preparando tus preguntas pendientes.'} pose={done ? 'celebrate' : 'wave'} /><Text style={styles.resultScore}>{done ? '100%' : '0'}</Text><Text style={styles.resultLabel}>{done ? `${title} dominada` : 'No hay preguntas disponibles'}</Text></View>;
  }
  if (result) {
    const complete = result.mastered === bank.length;
    const message = complete ? (isVerification ? '¡Verificación completada!' : '¡Excelente! Has dominado esta proyección.') : result.pending <= 3 ? `¡Ya casi! Solo nos faltan ${result.pending}.` : '¡Buen trabajo! Nos quedan algunas por reforzar.';
    return <View style={styles.resultCard}>
      <RayoCompanion message={message} pose={complete ? 'celebrate' : 'wave'} />
      <Text style={styles.eyebrow}>{complete ? (isVerification ? 'VERIFICACIÓN COMPLETADA' : 'PROYECCIÓN DOMINADA') : 'RONDA COMPLETADA'}</Text>
      <Text style={styles.resultScore}>{Math.round((result.mastered / bank.length) * 100)}%</Text>
      <Text style={styles.resultLabel}>{result.mastered} de {bank.length} preguntas dominadas</Text>
      <View style={styles.progress}><MasteryBar value={(result.mastered / bank.length) * 100} /></View>
      {!complete && <Text style={styles.pending}>{result.pending} preguntas por reforzar</Text>}
      {result.levelAfter > result.levelBefore && <RayoCompanion message="¡Subiste de nivel!" pose="celebrate" />}
      {result.achievements.map((achievement) => { const definition = getAchievementDefinition(achievement.id); return definition ? <AchievementCelebration definition={definition} key={achievement.id} xpGained={definition.xpReward} /> : null; })}
      {!complete && <Pressable onPress={() => begin(progress)} style={styles.primary}><Text style={styles.primaryText}>Reforzar mis errores</Text></Pressable>}
    </View>;
  }
  const inputReady = question.type === 'text' ? textAnswer.trim().length > 0 : selected.length > 0;
  return <View>
    <RayoCompanion message={rayoMessage} pose={answered && correct ? 'celebrate' : answered ? 'neutral' : 'wave'} />
    <View style={styles.header}><Text style={styles.counter}>PREGUNTA {index + 1} DE {questions.length}</Text><MasteryBar value={((index + (answered ? 1 : 0)) / questions.length) * 100} /></View>
    <View style={styles.card}><Text style={styles.questionTitle}>{question.title}</Text><Text style={styles.prompt}>{question.prompt}</Text>
      {question.type === 'text' ? <TextInput autoCapitalize="none" editable={!answered} keyboardType="number-pad" onChangeText={setTextAnswer} placeholder="Escribe tu respuesta" style={styles.textInput} value={textAnswer} /> : <>
        {question.type === 'order' && selected.length > 0 && <View style={styles.sequence}>{selected.map((step, i) => <View key={step} style={styles.sequenceRow}><Text style={styles.sequenceNumber}>{i + 1}</Text><Text style={styles.sequenceText}>{step}</Text></View>)}{!answered && <Pressable onPress={() => setSelected([])}><Text style={styles.reset}>Reiniciar orden</Text></Pressable>}</View>}
        <View style={styles.options}>{question.options.map((option) => { const active = selected.includes(option); return <Pressable key={option} onPress={() => toggle(option)} style={[styles.option, active && styles.activeOption]}><View style={[styles.selector, active && styles.activeSelector]} /><Text style={[styles.optionText, active && styles.activeText]}>{option}</Text></Pressable>; })}</View>
      </>}
      {answered && <PracticeFeedback correct={correct} explanation={question.correctExplanation} message={correct ? (recoveredThisAnswer ? '¡Eso es! Ahora sí la tienes.' : '¡Correcto!') : 'Casi. Revisemos este paso.'} />}
      <Pressable disabled={!answered && !inputReady} onPress={answered ? next : check} style={[styles.primary, !answered && !inputReady && styles.disabled]}><Text style={styles.primaryText}>{answered ? (index === questions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta') : 'Comprobar'}</Text></Pressable>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  header:{gap:9,marginBottom:14},counter:{color:colors.azulOscuro,fontSize:11,fontWeight:'800',letterSpacing:.8},card:{borderRadius:22,backgroundColor:colors.blanco,padding:18},muted:{color:'#617686',textAlign:'center'},questionTitle:{color:colors.azulClaro,fontSize:11,fontWeight:'800',letterSpacing:1},prompt:{marginTop:9,color:colors.azulOscuro,fontSize:17,fontWeight:'700',lineHeight:24},options:{gap:10,marginTop:18},option:{minHeight:56,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#DDE6ED',borderRadius:16,padding:13},activeOption:{borderColor:colors.azulClaro,backgroundColor:'#F0F9FE'},selector:{width:18,height:18,borderWidth:2,borderColor:'#B9C8D2',borderRadius:9},activeSelector:{borderWidth:5,borderColor:colors.azulClaro},optionText:{flex:1,marginLeft:11,color:'#536A79',fontSize:13,lineHeight:19},activeText:{color:colors.azulOscuro,fontWeight:'600'},textInput:{marginTop:18,borderWidth:1,borderColor:'#DDE6ED',borderRadius:16,padding:15,color:colors.azulOscuro,fontSize:16},sequence:{gap:8,marginTop:16,borderRadius:16,backgroundColor:colors.grisClaro,padding:12},sequenceRow:{flexDirection:'row',alignItems:'center'},sequenceNumber:{width:25,height:25,textAlign:'center',textAlignVertical:'center',borderRadius:13,backgroundColor:colors.azulOscuro,color:colors.blanco,fontWeight:'800'},sequenceText:{flex:1,marginLeft:10,color:colors.azulOscuro,fontSize:12,lineHeight:17},reset:{alignSelf:'flex-end',color:colors.azulClaro,fontWeight:'700'},primary:{width:'100%',alignItems:'center',borderRadius:16,backgroundColor:colors.azulOscuro,paddingVertical:16,marginTop:18},disabled:{opacity:.35},primaryText:{color:colors.blanco,fontSize:15,fontWeight:'800'},resultCard:{alignItems:'center',borderRadius:24,backgroundColor:colors.blanco,padding:22},eyebrow:{marginTop:12,color:colors.azulClaro,fontSize:11,fontWeight:'800',letterSpacing:1.2},resultScore:{marginTop:10,color:colors.azulOscuro,fontSize:46,fontWeight:'800'},resultLabel:{color:'#6C8190',fontSize:13},progress:{width:'100%',marginTop:16},pending:{marginTop:14,color:colors.morado,fontSize:14,fontWeight:'800'}
});
