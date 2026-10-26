import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { QuestionMasteryPractice } from '@/src/components/QuestionMasteryPractice';
import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { getUpperLimbStudy } from '@/src/data/upperLimbLearning';
import { getUpperLimbVerificationBank } from '@/src/data/upperLimbQuestionBanks';

export default function UpperLimbVerificationScreen() {
  const { estudio } = useLocalSearchParams<{ estudio?: string }>();
  const study = getUpperLimbStudy(estudio);
  const { isHydrated, progress } = useLearningProgress();
  const bank = estudio ? getUpperLimbVerificationBank(estudio) : [];
  const scopeId = `${estudio}-verification`;
  const unlocked = Boolean(study && isHydrated && study.projections.every((projection) => progress.projections[`${study.id}-${projection.slug}`]?.mastery === 100));

  return <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  {study?.title ?? 'Miembro superior'}</Text>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>VERIFICACIÓN DE CONOCIMIENTOS</Text>
        <Text style={styles.title}>{study?.title ?? 'Estudio'}</Text>
        <Text style={styles.subtitle}>20 preguntas oficiales con la proyección identificada explícitamente.</Text>
      </View>
      {unlocked && study ? <QuestionMasteryPractice bank={bank} scopeId={scopeId} title={`Verificación de ${study.title}`} verificationLabel={study.title} /> :
        <View style={styles.locked}><Text style={styles.lockedTitle}>Verificación bloqueada</Text><Text style={styles.lockedText}>Domina todas las proyecciones de esta región para desbloquearla.</Text></View>}
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea:{flex:1,backgroundColor:colors.grisClaro},content:{width:'100%',maxWidth:720,alignSelf:'center',paddingHorizontal:20,paddingTop:20,paddingBottom:42},
  backButton:{alignSelf:'flex-start',color:colors.azulClaro,fontSize:16,fontWeight:'700',paddingVertical:8,paddingRight:16},header:{marginTop:18,marginBottom:20},
  eyebrow:{color:colors.morado,fontSize:11,fontWeight:'800',letterSpacing:1.3},title:{marginTop:7,color:colors.azulOscuro,fontSize:30,fontWeight:'800'},subtitle:{marginTop:7,color:'#637988',fontSize:14,lineHeight:21},
  locked:{borderRadius:20,backgroundColor:colors.blanco,padding:22},lockedTitle:{color:colors.azulOscuro,fontSize:18,fontWeight:'800'},lockedText:{marginTop:8,color:'#667B89',fontSize:14,lineHeight:21}
});
