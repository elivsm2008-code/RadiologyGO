import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { QuestionMasteryPractice } from '@/src/components/QuestionMasteryPractice';
import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { createThumbVerificationQuestionIds, getThumbVerificationBank } from '@/src/services/knowledgeVerificationEngine';

export default function ThumbVerificationScreen() {
  const { initializeVerification, isHydrated, progress } = useLearningProgress();
  const unlocked = ['ap','oblicua','lateral'].every((id) => progress.projections[id]?.mastery === 100);
  useEffect(() => {
    if (isHydrated && unlocked && progress.thumbVerification.selectedQuestionIds.length === 0) initializeVerification(createThumbVerificationQuestionIds());
  }, [isHydrated, unlocked]);
  const bank = getThumbVerificationBank(progress.thumbVerification.selectedQuestionIds);
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <Text accessibilityRole="button" onPress={() => router.back()} style={styles.back}>‹  Dedo pulgar</Text>
    <View style={styles.header}><Text style={styles.eyebrow}>EVALUACIÓN FINAL</Text><Text style={styles.title}>Verificación de conocimientos</Text><Text style={styles.subtitle}>10 preguntas de AP, 10 de Oblicua y 10 de Lateral.</Text></View>
    {!unlocked ? <View style={styles.locked}><Text style={styles.lockedTitle}>Verificación bloqueada</Text><Text style={styles.lockedText}>Domina AP, Oblicua y Lateral para desbloquear esta verificación.</Text></View> : bank.length === 30 ? <QuestionMasteryPractice bank={bank} isVerification scopeId="thumb-verification" title="Verificación de conocimientos" /> : <View style={styles.locked}><Text style={styles.lockedText}>Preparando tu verificación…</Text></View>}
  </ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:colors.grisClaro},content:{width:'100%',maxWidth:720,alignSelf:'center',paddingHorizontal:20,paddingTop:20,paddingBottom:36},back:{alignSelf:'flex-start',color:colors.azulClaro,fontSize:16,fontWeight:'700',paddingVertical:8},header:{marginTop:18,marginBottom:22},eyebrow:{color:colors.azulClaro,fontSize:12,fontWeight:'800',letterSpacing:1.5},title:{marginTop:8,color:colors.azulOscuro,fontSize:30,fontWeight:'800'},subtitle:{marginTop:8,color:'#5D7282',fontSize:14},locked:{borderRadius:22,backgroundColor:colors.blanco,padding:22},lockedTitle:{color:colors.azulOscuro,fontSize:18,fontWeight:'800'},lockedText:{marginTop:7,color:'#647987',fontSize:14,lineHeight:21}});
