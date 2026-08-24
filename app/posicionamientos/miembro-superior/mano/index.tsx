import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MasteryBar } from '@/src/components/MasteryBar';
import { ProjectionMasteryCard } from '@/src/components/ProjectionMasteryCard';
import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { handProjections } from '@/src/data/handLearning';
import { calculateStudyMastery, getMasteryStatus } from '@/src/services/progressEngine';

export default function HandScreen() {
  const { progress } = useLearningProgress();
  const mastery = calculateStudyMastery(progress, 'mano');
  const verificationUnlocked = handProjections.every((item) => progress.projections[item.id]?.mastery === 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Miembro superior</Text>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>ESTUDIO ANATÓMICO</Text>
          <Text style={styles.title}>Mano</Text>
          <Text style={styles.subtitle}>Explora las proyecciones fundamentales de la mano.</Text>
        </View>

        <View style={styles.overallCard}>
          <View style={styles.overallTop}>
            <View><Text style={styles.overallLabel}>Dominio de Mano</Text><Text style={styles.overallStatus}>{getMasteryStatus(mastery)}</Text></View>
            <Text style={styles.overallPercentage}>{mastery}%</Text>
          </View>
          <MasteryBar value={mastery} />
          <Text style={styles.pendingNote}>El dominio comenzará cuando se agreguen los bancos oficiales.</Text>
        </View>

        <Text style={styles.sectionTitle}>Proyecciones</Text>
        <View style={styles.list}>
          {handProjections.map((projection) => (
            <ProjectionMasteryCard
              achievementTitle={progress.achievements.find((item) => item.id === `dominio-${projection.id}`)?.title}
              key={projection.id}
              mastery={progress.projections[projection.id]?.mastery ?? 0}
              onPress={() => router.push({ pathname: '/posicionamientos/miembro-superior/mano/[proyeccion]', params: { proyeccion: projection.slug } })}
              title={projection.title}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Evaluación final</Text>
        <Pressable accessibilityRole="button" disabled style={styles.verificationCard}>
          <View style={styles.verificationIcon}><Text style={styles.verificationCode}>—</Text></View>
          <View style={styles.verificationCopy}>
            <Text style={styles.verificationTitle}>Verificación de conocimientos</Text>
            <Text style={styles.verificationText}>{verificationUnlocked ? 'Banco oficial pendiente de integración.' : 'Domina P.A., Oblicua y Lateral para desbloquear esta verificación.'}</Text>
          </View>
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
  title: { marginTop: 8, color: colors.azulOscuro, fontSize: 32, fontWeight: '800' },
  subtitle: { marginTop: 9, color: '#5D7282', fontSize: 15, lineHeight: 22 },
  overallCard: { borderRadius: 24, backgroundColor: colors.azulOscuro, padding: 20 },
  overallTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17 },
  overallLabel: { color: colors.blanco, fontSize: 17, fontWeight: '800' },
  overallStatus: { marginTop: 5, color: '#B8DDF2', fontSize: 13, fontWeight: '600' },
  overallPercentage: { color: colors.blanco, fontSize: 28, fontWeight: '800' },
  pendingNote: { marginTop: 12, color: '#B8DDF2', fontSize: 11, lineHeight: 16 },
  sectionTitle: { marginTop: 28, marginBottom: 14, color: colors.azulOscuro, fontSize: 19, fontWeight: '800' },
  list: { gap: 14 },
  verificationCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D8E0E5', borderRadius: 22, backgroundColor: '#E9EDF0', padding: 17, opacity: 0.65 },
  verificationIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#9DAAB2', borderRadius: 24, backgroundColor: '#758792' },
  verificationCode: { color: colors.blanco, fontSize: 11, fontWeight: '900' },
  verificationCopy: { flex: 1, marginLeft: 13 },
  verificationTitle: { color: colors.azulOscuro, fontSize: 15, fontWeight: '800' },
  verificationText: { marginTop: 4, color: '#687D8B', fontSize: 11, lineHeight: 16 }
});

