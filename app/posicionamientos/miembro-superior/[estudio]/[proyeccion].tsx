import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { QuestionMasteryPractice } from '@/src/components/QuestionMasteryPractice';
import { ProjectionLearningMode } from '@/src/components/ProjectionLearningMode';
import { colors } from '@/src/constants/colors';
import { getUpperLimbProjection, getUpperLimbStudy } from '@/src/data/upperLimbLearning';
import { getUpperLimbPracticeBank } from '@/src/data/upperLimbQuestionBanks';

type Mode = 'aprender' | 'practicar';

export default function UpperLimbProjectionScreen() {
  const { estudio, proyeccion } = useLocalSearchParams<{ estudio?: string; proyeccion?: string }>();
  const [mode, setMode] = useState<Mode>('aprender');
  const study = getUpperLimbStudy(estudio);
  const projection = getUpperLimbProjection(estudio, proyeccion);
  const bank = estudio && proyeccion ? getUpperLimbPracticeBank(estudio, proyeccion) : [];
  const scopeId = `${estudio}-${proyeccion}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  {study?.title ?? 'Miembro superior'}</Text>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{study?.title.toUpperCase() ?? 'PROYECCIÓN'}</Text>
          <Text style={styles.title}>{projection?.title ?? 'Proyección'}</Text>
          <Text style={styles.subtitle}>Técnica de posicionamiento radiológico</Text>
        </View>

        <View style={styles.tabs}>
          <Pressable onPress={() => setMode('aprender')} style={[styles.tab, mode === 'aprender' && styles.activeTab]}>
            <Text style={[styles.tabText, mode === 'aprender' && styles.activeTabText]}>APRENDER</Text>
          </Pressable>
          <Pressable onPress={() => setMode('practicar')} style={[styles.tab, mode === 'practicar' && styles.activeTab]}>
            <Text style={[styles.tabText, mode === 'practicar' && styles.activeTabText]}>PRACTICAR</Text>
          </Pressable>
        </View>

        {projection ? (
          mode === 'aprender' ? <ProjectionLearningMode projection={projection} /> : <QuestionMasteryPractice bank={bank} scopeId={scopeId} title={projection.title} />
        ) : (
          <View style={styles.missing}><Text style={styles.missingText}>Esta proyección aún no tiene contenido académico disponible.</Text></View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.grisClaro },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 42 },
  backButton: { alignSelf: 'flex-start', color: colors.azulClaro, fontSize: 16, fontWeight: '700', paddingVertical: 8, paddingRight: 16 },
  header: { marginTop: 18, marginBottom: 20 },
  eyebrow: { color: colors.morado, fontSize: 11, fontWeight: '800', letterSpacing: 1.3 },
  title: { marginTop: 7, color: colors.azulOscuro, fontSize: 30, fontWeight: '800' },
  subtitle: { marginTop: 7, color: '#637988', fontSize: 14 },
  tabs: { flexDirection: 'row', marginBottom: 18, borderRadius: 16, backgroundColor: '#E8EEF2', padding: 4 },
  tab: { flex: 1, alignItems: 'center', borderRadius: 13, paddingVertical: 11 },
  activeTab: { backgroundColor: colors.blanco },
  tabText: { color: '#788A96', fontSize: 12, fontWeight: '800', letterSpacing: 0.7 },
  activeTabText: { color: colors.azulOscuro },
  missing: { borderRadius: 18, backgroundColor: colors.blanco, padding: 20 },
  missingText: { color: '#667B89', fontSize: 14, lineHeight: 21 }
});
