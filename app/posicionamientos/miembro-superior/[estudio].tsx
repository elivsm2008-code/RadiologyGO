import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { ProjectionMasteryCard } from '@/src/components/ProjectionMasteryCard';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { getUpperLimbStudy } from '@/src/data/upperLimbLearning';

export default function UpperLimbStudyScreen() {
  const { estudio, title } = useLocalSearchParams<{ estudio?: string; title?: string }>();
  const study = getUpperLimbStudy(estudio);
  const { isHydrated, progress } = useLearningProgress();
  const projectionIds = study?.projections.map((projection) => `${study.id}-${projection.slug}`) ?? [];
  const verificationId = study ? `${study.id}-verification` : '';
  const verificationProgress = verificationId ? progress.questionBankProgress[verificationId] : undefined;
  const verificationMastery = verificationProgress ? Math.round((verificationProgress.masteredQuestionIds.length / 20) * 100) : 0;
  const verificationUnlocked = isHydrated && projectionIds.length > 0 && projectionIds.every((id) => progress.projections[id]?.mastery === 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Miembro superior</Text>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>RUTINA DE POSICIONAMIENTO</Text>
          <Text style={styles.title}>{study?.title ?? title ?? 'Estudio'}</Text>
          <Text style={styles.description}>Selecciona una proyección para estudiar su técnica.</Text>
        </View>
        {study ? (
          <View style={styles.list}>
            {study.projections.map((projection) => {
              const scopeId = `${study.id}-${projection.slug}`;
              return <ProjectionMasteryCard
                key={projection.slug}
                onPress={() => router.push({ pathname: '/posicionamientos/miembro-superior/[estudio]/[proyeccion]', params: { estudio: study.id, proyeccion: projection.slug } })}
                mastery={progress.projections[scopeId]?.mastery ?? 0}
                title={projection.title}
                achievementTitle={`${study.title} — ${projection.title}`}
              />;
            })}
            <Pressable
              disabled={!verificationUnlocked}
              onPress={() => router.push({ pathname: '/posicionamientos/miembro-superior/[estudio]/verificacion', params: { estudio: study.id } })}
              style={({ pressed }) => [styles.verificationCard, !verificationUnlocked && styles.lockedCard, pressed && verificationUnlocked && styles.cardPressed]}
            >
              <View style={styles.projectionIcon}><Text style={styles.projectionIconText}>{verificationUnlocked ? 'VC' : '🔒'}</Text></View>
              <View style={styles.projectionCopy}>
                <Text style={styles.projectionTitle}>Verificación de conocimientos</Text>
                <Text style={styles.projectionDescription}>{verificationUnlocked ? `${verificationProgress?.masteredQuestionIds.length ?? 0}/20 · ${verificationMastery}% dominado` : 'Domina todas las proyecciones para desbloquearla'}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.pendingCard}><Text style={styles.pendingText}>Contenido pendiente.</Text></View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.grisClaro },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 22, paddingBottom: 40 },
  backButton: { alignSelf: 'flex-start', color: colors.azulClaro, fontSize: 16, fontWeight: '700', paddingVertical: 8, paddingRight: 16 },
  header: { marginTop: 26, marginBottom: 22 },
  eyebrow: { color: colors.morado, fontSize: 12, fontWeight: '800', letterSpacing: 1.4 },
  title: { marginTop: 10, color: colors.azulOscuro, fontSize: 28, fontWeight: '800' },
  description: { marginTop: 10, color: '#617686', fontSize: 15, lineHeight: 23 },
  list: { gap: 12 },
  verificationCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#C9DDEC', borderRadius: 20, backgroundColor: colors.blanco, padding: 15 },
  lockedCard: { opacity: 0.6, backgroundColor: '#F4F7F9' },
  card: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DFE9EF', borderRadius: 20, backgroundColor: colors.blanco, padding: 15 },
  cardPressed: { opacity: 0.75, transform: [{ scale: 0.99 }] },
  projectionIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#EAF6FC' },
  projectionIconText: { color: colors.azulOscuro, fontSize: 11, fontWeight: '900' },
  projectionCopy: { flex: 1, marginLeft: 14 },
  projectionTitle: { color: colors.azulOscuro, fontSize: 17, fontWeight: '800' },
  projectionDescription: { marginTop: 4, color: '#6B7F8D', fontSize: 13 },
  chevron: { color: colors.azulClaro, fontSize: 30, fontWeight: '400' },
  pendingCard: { marginTop: 6, borderWidth: 1, borderColor: '#E1E7EC', borderRadius: 18, backgroundColor: '#F4F7F9', padding: 16 },
  pendingTitle: { color: colors.azulOscuro, fontSize: 15, fontWeight: '800' },
  pendingText: { marginTop: 5, color: '#778894', fontSize: 13, lineHeight: 19 }
});
