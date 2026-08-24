import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AchievementBadge } from '@/src/components/AchievementBadge';
import { MasteryBar } from '@/src/components/MasteryBar';
import { RayoCompanion } from '@/src/components/RayoCompanion';
import { colors } from '@/src/constants/colors';
import { useLearningProgress } from '@/src/context/LearningProgressContext';
import { achievementCatalog, studyCatalog } from '@/src/data/learningCatalog';
import { calculateLevelProgress, calculateRegionMastery, calculateStudyMastery, getMasteryStatus, getProgressSummary } from '@/src/services/progressEngine';

export default function ProgressScreen() {
  const { isHydrated, progress } = useLearningProgress();
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const level = calculateLevelProgress(progress.xp);
  const summary = getProgressSummary(progress);
  const upperLimbMastery = calculateRegionMastery(progress, 'miembro-superior');
  const thumbMastery = calculateStudyMastery(progress, 'dedo-pulgar');
  const handMastery = calculateStudyMastery(progress, 'mano');
  const thumbStudy = studyCatalog.find((study) => study.id === 'dedo-pulgar');
  const handStudy = studyCatalog.find((study) => study.id === 'mano');
  const selectedDefinition = achievementCatalog.find((badge) => badge.id === selectedBadgeId);
  const selectedEarned = progress.achievements.find((achievement) => achievement.id === selectedBadgeId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Inicio</Text>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>TU EVOLUCIÓN</Text>
          <Text style={styles.title}>Mi progreso</Text>
          <Text style={styles.subtitle}>Cada práctica cuenta.</Text>
        </View>

        {!isHydrated ? (
          <View style={styles.loadingCard}><Text style={styles.loadingText}>Cargando tu progreso…</Text></View>
        ) : (
          <>
            <RayoCompanion message="Mira todo lo que has avanzado. Sigamos construyendo tu dominio." pose="wave" />

            <View style={styles.levelCard}>
              <View style={styles.levelTop}>
                <View>
                  <Text style={styles.levelLabel}>NIVEL ACTUAL</Text>
                  <Text style={styles.levelValue}>Nivel {level.level}</Text>
                </View>
                <Text style={styles.totalXp}>{progress.xp} XP</Text>
              </View>
              <MasteryBar value={level.progressPercent} />
              <Text style={styles.levelDetail}>{level.xpIntoLevel} / {level.xpNeededForLevel} XP para el siguiente nivel</Text>
            </View>

            <View style={styles.summaryGrid}>
              <SummaryMetric label="XP total" value={`${progress.xp}`} />
              <SummaryMetric label="Proyecciones dominadas" value={`${summary.masteredProjections}`} />
              <SummaryMetric label="Insignias" value={`${summary.badgesEarned}`} />
              <SummaryMetric label="Prácticas" value={`${summary.totalPractices}`} />
            </View>

            <Text style={styles.sectionTitle}>Progreso por región</Text>
            <ProgressCard label="Miembro superior" mastery={upperLimbMastery} />
            <View style={styles.upcomingCard}>
              <Text style={styles.upcomingTitle}>Otras regiones anatómicas</Text>
              <Text style={styles.upcomingText}>Próximamente</Text>
            </View>

            <Text style={styles.sectionTitle}>Progreso por estudio</Text>
            <View style={styles.studyCard}>
              <ProgressCard compact label="Dedo pulgar" mastery={thumbMastery} />
              <View style={styles.projectionList}>
                {thumbStudy?.projectionIds.map((projectionId) => {
                  const projection = progress.projections[projectionId];
                  const title = projectionId === 'ap' ? 'AP' : projectionId === 'oblicua' ? 'Oblicua' : 'Lateral';
                  return (
                    <View key={projectionId} style={styles.projectionBlock}>
                      <View style={styles.projectionRow}>
                        <View style={styles.projectionCopy}>
                          <Text style={styles.projectionTitle}>{title}</Text>
                          <Text style={styles.projectionStatus}>{getMasteryStatus(projection?.mastery ?? 0)}</Text>
                        </View>
                        <View style={styles.projectionProgress}><MasteryBar value={projection?.mastery ?? 0} /></View>
                        <Text style={styles.projectionValue}>{projection?.mastery ?? 0}%</Text>
                      </View>
                      {projection?.lastReviewScore != null && <Text style={styles.reviewStats}>Último repaso: {projection.lastReviewCorrect}/{projection.lastReviewTotal} · {projection.lastReviewScore}%   ·   Mejor resultado: {projection.bestScore}%   ·   Prácticas: {projection.practiceCount}</Text>}
                    </View>
                  );
                })}
                <View style={styles.verificationRow}>
                  <View style={styles.projectionCopy}>
                    <Text style={styles.projectionTitle}>Verificación</Text>
                    <Text style={styles.projectionStatus}>{progress.thumbVerification.status}</Text>
                  </View>
                  <View style={styles.projectionProgress}><MasteryBar value={(progress.thumbVerification.masteredQuestionIds.length / 30) * 100} /></View>
                  <Text style={styles.projectionValue}>{Math.round((progress.thumbVerification.masteredQuestionIds.length / 30) * 100)}%</Text>
                </View>
                {progress.thumbVerification.status === 'Verificada' && <View style={styles.verifiedBanner}><Text style={styles.verifiedBannerTitle}>Dedo pulgar — Verificado</Text><Text style={styles.verifiedBannerText}>Verificación de conocimientos completada.</Text></View>}
              </View>
            </View>

            <View style={[styles.studyCard, styles.nextStudyCard]}>
              <ProgressCard compact label="Mano" mastery={handMastery} />
              <View style={styles.projectionList}>
                {handStudy?.projectionIds.map((projectionId) => {
                  const projection = progress.projections[projectionId];
                  const title = projectionId === 'mano-pa' ? 'P.A.' : projectionId === 'mano-oblicua' ? 'Oblicua' : 'Lateral';
                  return (
                    <View key={projectionId} style={styles.projectionRow}>
                      <View style={styles.projectionCopy}>
                        <Text style={styles.projectionTitle}>{title}</Text>
                        <Text style={styles.projectionStatus}>{getMasteryStatus(projection?.mastery ?? 0)}</Text>
                      </View>
                      <View style={styles.projectionProgress}><MasteryBar value={projection?.mastery ?? 0} /></View>
                      <Text style={styles.projectionValue}>{projection?.mastery ?? 0}%</Text>
                    </View>
                  );
                })}
                <View style={styles.verificationRow}>
                  <View style={styles.projectionCopy}><Text style={styles.projectionTitle}>Verificación</Text><Text style={styles.projectionStatus}>Bloqueada</Text></View>
                  <View style={styles.projectionProgress}><MasteryBar value={0} /></View>
                  <Text style={styles.projectionValue}>0%</Text>
                </View>
                <Text style={styles.bankPending}>El progreso se activará con los bancos oficiales de Mano.</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Mis insignias</Text>
            <View style={styles.badges}>
              {achievementCatalog.map((definition) => (
                <AchievementBadge
                  definition={definition}
                  earned={progress.achievements.find((achievement) => achievement.id === definition.id)}
                  key={definition.id}
                  onPress={() => setSelectedBadgeId(selectedBadgeId === definition.id ? null : definition.id)}
                />
              ))}
            </View>

            {selectedDefinition && (
              <View style={styles.badgeDetail}>
                <Text style={styles.badgeDetailEyebrow}>DETALLE DE INSIGNIA</Text>
                <Text style={styles.badgeDetailTitle}>{selectedDefinition.title}</Text>
                <Text style={styles.badgeDetailText}>{selectedDefinition.description}</Text>
                <Text style={styles.badgeRequirement}>{selectedDefinition.requirement}</Text>
                <Text style={styles.badgeState}>{selectedEarned ? `Desbloqueada · ${new Date(selectedEarned.earnedAt).toLocaleDateString('es')}` : 'Bloqueada'}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return <View style={styles.metric}><Text style={styles.metricValue}>{value}</Text><Text style={styles.metricLabel}>{label}</Text></View>;
}

function ProgressCard({ compact = false, label, mastery }: { compact?: boolean; label: string; mastery: number }) {
  return (
    <View style={[styles.progressCard, compact && styles.compactProgressCard]}>
      <View style={styles.progressTop}><Text style={styles.progressLabel}>{label}</Text><Text style={styles.progressValue}>{mastery}%</Text></View>
      <MasteryBar value={mastery} />
      <Text style={styles.progressStatus}>{getMasteryStatus(mastery)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.grisClaro },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 42 },
  backButton: { alignSelf: 'flex-start', color: colors.azulClaro, fontSize: 16, fontWeight: '700', paddingVertical: 8, paddingRight: 16 },
  header: { marginTop: 18, marginBottom: 22 },
  eyebrow: { color: colors.azulClaro, fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  title: { marginTop: 8, color: colors.azulOscuro, fontSize: 32, fontWeight: '800' },
  subtitle: { marginTop: 8, color: '#5D7282', fontSize: 15 },
  loadingCard: { borderRadius: 20, backgroundColor: colors.blanco, padding: 24 },
  loadingText: { color: '#617686', fontSize: 14, textAlign: 'center' },
  levelCard: { borderRadius: 24, backgroundColor: colors.azulOscuro, padding: 20 },
  levelTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17 },
  levelLabel: { color: '#B8DDF2', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  levelValue: { marginTop: 4, color: colors.blanco, fontSize: 25, fontWeight: '800' },
  totalXp: { color: colors.blanco, fontSize: 17, fontWeight: '800' },
  levelDetail: { marginTop: 10, color: '#B8DDF2', fontSize: 11 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  metric: { width: '48%', flexGrow: 1, borderRadius: 18, backgroundColor: colors.blanco, padding: 16 },
  metricValue: { color: colors.azulOscuro, fontSize: 21, fontWeight: '800' },
  metricLabel: { marginTop: 4, color: '#718492', fontSize: 12 },
  sectionTitle: { marginTop: 28, marginBottom: 13, color: colors.azulOscuro, fontSize: 19, fontWeight: '800' },
  progressCard: { borderWidth: 1, borderColor: '#E3EBF1', borderRadius: 20, backgroundColor: colors.blanco, padding: 17 },
  compactProgressCard: { borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#E7EDF1', borderRadius: 0, paddingHorizontal: 0, paddingTop: 0 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 11 },
  progressLabel: { color: colors.azulOscuro, fontSize: 16, fontWeight: '800' },
  progressValue: { color: colors.azulClaro, fontSize: 15, fontWeight: '800' },
  progressStatus: { marginTop: 8, color: '#718492', fontSize: 11, fontWeight: '600' },
  upcomingCard: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderRadius: 17, backgroundColor: '#E7EBEE', padding: 15 },
  upcomingTitle: { color: '#65747D', fontSize: 13, fontWeight: '700' },
  upcomingText: { color: '#87949B', fontSize: 12 },
  studyCard: { borderWidth: 1, borderColor: '#E3EBF1', borderRadius: 22, backgroundColor: colors.blanco, padding: 17 },
  nextStudyCard: { marginTop: 12 },
  projectionList: { gap: 14, marginTop: 17 },
  projectionRow: { flexDirection: 'row', alignItems: 'center' },
  projectionBlock: { gap: 7 },
  reviewStats: { color: '#718492', fontSize: 10, lineHeight: 15 },
  projectionCopy: { width: 82 },
  projectionTitle: { color: colors.azulOscuro, fontSize: 13, fontWeight: '700' },
  projectionStatus: { marginTop: 2, color: '#7A8D9C', fontSize: 9 },
  projectionProgress: { flex: 1, marginHorizontal: 10 },
  projectionValue: { width: 38, color: colors.azulOscuro, fontSize: 12, fontWeight: '800', textAlign: 'right' },
  verificationRow: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E7EDF1', paddingTop: 14 },
  verifiedBanner: { borderWidth: 1, borderColor: '#B8E2F7', borderRadius: 16, backgroundColor: '#EFFAFF', padding: 14 },
  verifiedBannerTitle: { color: colors.azulOscuro, fontSize: 14, fontWeight: '800' },
  verifiedBannerText: { marginTop: 3, color: '#647987', fontSize: 11 },
  bankPending: { color: '#718492', fontSize: 10, lineHeight: 15 },
  badges: { gap: 11 },
  badgeDetail: { marginTop: 12, borderLeftWidth: 4, borderLeftColor: colors.morado, borderRadius: 16, backgroundColor: colors.blanco, padding: 16 },
  badgeDetailEyebrow: { color: colors.morado, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  badgeDetailTitle: { marginTop: 5, color: colors.azulOscuro, fontSize: 17, fontWeight: '800' },
  badgeDetailText: { marginTop: 7, color: '#5E7382', fontSize: 13, lineHeight: 19 },
  badgeRequirement: { marginTop: 7, color: '#5E7382', fontSize: 12, fontWeight: '600' },
  badgeState: { marginTop: 9, color: colors.azulClaro, fontSize: 12, fontWeight: '800' }
});

