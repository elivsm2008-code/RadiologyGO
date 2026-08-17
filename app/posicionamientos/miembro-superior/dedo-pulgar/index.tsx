import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MasteryBar } from '@/src/components/MasteryBar';
import { ProjectionMasteryCard } from '@/src/components/ProjectionMasteryCard';
import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { thumbProjections } from '@/src/data/thumbLearning';
import { calculateThumbMastery, getMasteryStatus } from '@/src/services/progressEngine';

export default function ThumbScreen() {
  const { progress } = useLearningProgress();
  const generalMastery = calculateThumbMastery(progress);
  const verification = progress.thumbVerification;
  const verificationUnlocked = ['ap', 'oblicua', 'lateral'].every((id) => progress.projections[id]?.mastery === 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Miembro superior</Text>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>ESTUDIO ANATÓMICO</Text>
          <Text style={styles.title}>Dedo pulgar</Text>
          {verification.status === 'Verificada' && <View style={styles.verifiedPill}><Text style={styles.verifiedText}>VERIFICADO</Text></View>}
          <Text style={styles.subtitle}>Domina las proyecciones fundamentales del pulgar.</Text>
        </View>

        <View style={styles.overallCard}>
          <View style={styles.overallTop}>
            <View>
              <Text style={styles.overallLabel}>Dominio de Dedo pulgar</Text>
              <Text style={styles.overallStatus}>{getMasteryStatus(generalMastery)}</Text>
            </View>
            <Text style={styles.overallPercentage}>{generalMastery}%</Text>
          </View>
          <MasteryBar value={generalMastery} />
          <View style={styles.xpRow}>
            <Text style={styles.xpLabel}>XP acumulado</Text>
            <Text style={styles.xpValue}>{progress.xp} XP</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Proyecciones</Text>
        <View style={styles.list}>
          {thumbProjections.map((projection) => (
            <ProjectionMasteryCard
              achievementTitle={progress.achievements.find((achievement) => achievement.id === `dominio-dedo-pulgar-${projection.id}`)?.title}
              key={projection.id}
              mastery={progress.projections[projection.id].mastery}
              onPress={() => router.push({
                pathname: '/posicionamientos/miembro-superior/dedo-pulgar/[proyeccion]',
                params: { proyeccion: projection.id }
              })}
              title={projection.title}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Evaluación final</Text>
        <Pressable
          accessibilityRole="button"
          disabled={!verificationUnlocked}
          onPress={() => router.push('/posicionamientos/miembro-superior/dedo-pulgar/verificacion')}
          style={[styles.verificationCard, !verificationUnlocked && styles.verificationLocked]}
        >
          <View style={styles.verificationIcon}><Text style={styles.verificationCode}>{verificationUnlocked ? 'VC' : '—'}</Text></View>
          <View style={styles.verificationCopy}>
            <Text style={styles.verificationTitle}>Verificación de conocimientos</Text>
            <Text style={styles.verificationText}>{verificationUnlocked ? verification.status : 'Domina AP, Oblicua y Lateral para desbloquear esta verificación.'}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.grisClaro },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 36 },
  backButton: { alignSelf: 'flex-start', color: colors.azulClaro, fontSize: 16, fontWeight: '700', paddingVertical: 8, paddingRight: 16 },
  header: { marginTop: 18, marginBottom: 24 },
  eyebrow: { color: colors.azulClaro, fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  title: { marginTop: 8, color: colors.azulOscuro, fontSize: 32, fontWeight: '800', letterSpacing: -0.6 },
  subtitle: { marginTop: 9, color: '#5D7282', fontSize: 15, lineHeight: 22 },
  overallCard: { borderRadius: 24, backgroundColor: colors.azulOscuro, padding: 20 },
  overallTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17 },
  overallLabel: { color: colors.blanco, fontSize: 17, fontWeight: '800' },
  overallStatus: { marginTop: 5, color: '#B8DDF2', fontSize: 13, fontWeight: '600' },
  overallPercentage: { color: colors.blanco, fontSize: 28, fontWeight: '800' },
  xpRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  xpLabel: { color: '#B8DDF2', fontSize: 12, fontWeight: '600' },
  xpValue: { color: colors.blanco, fontSize: 12, fontWeight: '800' },
  sectionTitle: { marginTop: 28, marginBottom: 14, color: colors.azulOscuro, fontSize: 19, fontWeight: '800' },
  list: { gap: 14 }
  ,verifiedPill:{alignSelf:'flex-start',marginTop:10,borderWidth:1,borderColor:'#9ED9F5',borderRadius:14,backgroundColor:'#EAF8FF',paddingHorizontal:11,paddingVertical:5},verifiedText:{color:colors.azulOscuro,fontSize:10,fontWeight:'900',letterSpacing:1.1},verificationCard:{flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#CDE6F4',borderRadius:22,backgroundColor:colors.blanco,padding:17},verificationLocked:{opacity:.55,backgroundColor:'#E9EDF0'},verificationIcon:{width:48,height:48,alignItems:'center',justifyContent:'center',borderWidth:3,borderColor:colors.azulClaro,borderRadius:24,backgroundColor:colors.azulOscuro},verificationCode:{color:colors.blanco,fontSize:11,fontWeight:'900'},verificationCopy:{flex:1,marginLeft:13},verificationTitle:{color:colors.azulOscuro,fontSize:15,fontWeight:'800'},verificationText:{marginTop:4,color:'#687D8B',fontSize:11,lineHeight:16},chevron:{color:colors.azulClaro,fontSize:28,fontWeight:'400'}
});
