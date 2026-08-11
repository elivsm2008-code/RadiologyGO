import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MasteryBar } from '@/src/components/MasteryBar';
import { ProjectionMasteryCard } from '@/src/components/ProjectionMasteryCard';
import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { thumbProjections } from '@/src/data/thumbLearning';
import { calculateThumbMastery, getMasteryStatus } from '@/src/services/progressEngine';

export default function ThumbScreen() {
  const { progress } = useLearningProgress();
  const generalMastery = calculateThumbMastery(progress);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Miembro superior</Text>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>ESTUDIO ANATÓMICO</Text>
          <Text style={styles.title}>Dedo pulgar</Text>
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
});
