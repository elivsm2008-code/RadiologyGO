import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { QuestionMasteryPractice } from '@/src/components/QuestionMasteryPractice';
import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { createHandVerificationQuestionIds, getHandVerificationBank } from '@/src/services/knowledgeVerificationEngine';

export default function HandVerificationScreen() {
  const { initializeVerification, isHydrated, progress } = useLearningProgress();
  const unlocked = ['Disponible', 'En progreso', 'Verificada'].includes(progress.handVerification.status);
  useEffect(() => {
    if (isHydrated && unlocked && progress.handVerification.selectedQuestionIds.length === 0) initializeVerification('hand', createHandVerificationQuestionIds());
  }, [isHydrated, unlocked, progress.handVerification.selectedQuestionIds.length]);
  const bank = getHandVerificationBank(progress.handVerification.selectedQuestionIds);
  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.content}>
    <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Mano</Text>
    <Text style={styles.eyebrow}>EVALUACIÓN FINAL</Text><Text style={styles.title}>Verificación de conocimientos</Text>
    <Text style={styles.subtitle}>6 preguntas de PA, 6 de Oblicua, 6 de Lateral y 2 integradoras.</Text>
    {!unlocked ? <View style={styles.locked}><Text style={styles.lockedTitle}>Verificación bloqueada</Text><Text style={styles.lockedText}>Domina P.A., Oblicua y Lateral para desbloquear esta verificación.</Text></View> : bank.length === 20 ? <QuestionMasteryPractice bank={bank} verificationKind="hand" scopeId="hand-verification" title="Verificación de Mano" /> : <View style={styles.locked}><Text style={styles.lockedText}>Preparando tu verificación…</Text></View>}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea:{flex:1,backgroundColor:colors.grisClaro},content:{width:'100%',maxWidth:720,alignSelf:'center',padding:20,paddingBottom:36},backButton:{alignSelf:'flex-start',color:colors.azulClaro,fontSize:16,fontWeight:'700',paddingVertical:8,paddingRight:16},eyebrow:{marginTop:18,color:colors.azulClaro,fontSize:12,fontWeight:'800',letterSpacing:1.5},title:{marginTop:8,color:colors.azulOscuro,fontSize:30,fontWeight:'800'},subtitle:{marginTop:8,marginBottom:20,color:'#5D7282',fontSize:14},locked:{borderRadius:22,backgroundColor:colors.blanco,padding:22},lockedTitle:{color:colors.azulOscuro,fontSize:18,fontWeight:'800'},lockedText:{marginTop:7,color:'#687D8B',fontSize:13,lineHeight:19}
});

