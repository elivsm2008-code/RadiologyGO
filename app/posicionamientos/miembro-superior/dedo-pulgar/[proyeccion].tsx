import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MasteryBar } from '@/src/components/MasteryBar';
import { ProjectionLearningMode } from '@/src/components/ProjectionLearningMode';
import { ProjectionPracticeMode } from '@/src/components/ProjectionPracticeMode';
import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { getThumbProjection } from '@/src/data/thumbLearning';
import { getMasteryStatus } from '@/src/services/progressEngine';

type Mode = 'aprender' | 'practicar';

export default function ThumbProjectionScreen() {
  const { proyeccion } = useLocalSearchParams<{ proyeccion?: string }>();
  const projection = getThumbProjection(proyeccion);
  const [mode, setMode] = useState<Mode>('aprender');
  const { progress } = useLearningProgress();

  if (!projection) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.missing}><Text style={styles.title}>Proyección no disponible</Text></View>
      </SafeAreaView>
    );
  }

  const projectionProgress = progress.projections[projection.id];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Dedo pulgar</Text>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>DEDO PULGAR</Text>
          <Text style={styles.title}>{projection.title}</Text>
          <Text style={styles.subtitle}>{getMasteryStatus(projectionProgress.mastery)} · {projectionProgress.mastery}% de dominio</Text>
          <View style={styles.progress}><MasteryBar value={projectionProgress.mastery} /></View>
        </View>

        <View style={styles.tabs}>
          <Pressable onPress={() => setMode('aprender')} style={[styles.tab, mode === 'aprender' && styles.activeTab]}>
            <Text style={[styles.tabText, mode === 'aprender' && styles.activeTabText]}>APRENDER</Text>
          </Pressable>
          <Pressable onPress={() => setMode('practicar')} style={[styles.tab, mode === 'practicar' && styles.activeTab]}>
            <Text style={[styles.tabText, mode === 'practicar' && styles.activeTabText]}>PRACTICAR</Text>
          </Pressable>
        </View>

        {mode === 'aprender' ? <ProjectionLearningMode /> : <ProjectionPracticeMode />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.grisClaro },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 36 },
  backButton: { alignSelf: 'flex-start', color: colors.azulClaro, fontSize: 16, fontWeight: '700', paddingVertical: 8, paddingRight: 16 },
  header: { marginTop: 18, marginBottom: 22 },
  eyebrow: { color: colors.azulClaro, fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  title: { marginTop: 8, color: colors.azulOscuro, fontSize: 32, fontWeight: '800' },
  subtitle: { marginTop: 7, color: '#5D7282', fontSize: 14, fontWeight: '600' },
  progress: { marginTop: 14 },
  tabs: { flexDirection: 'row', borderRadius: 18, backgroundColor: '#E4EBF0', padding: 4, marginBottom: 20 },
  tab: { flex: 1, alignItems: 'center', borderRadius: 14, paddingVertical: 13 },
  activeTab: { backgroundColor: colors.blanco },
  tabText: { color: '#718492', fontSize: 12, fontWeight: '800', letterSpacing: 0.8 },
  activeTabText: { color: colors.azulOscuro },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }
});
