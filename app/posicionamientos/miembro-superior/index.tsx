import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PositioningStudyCard, type PositioningStudy } from '@/src/components/PositioningStudyCard';
import { colors } from '@/src/constants/colors';

const studies: PositioningStudy[] = [
  { code: 'DP', title: 'Dedo Pulgar', slug: 'dedo-pulgar' },
  { code: 'MA', title: 'Mano', slug: 'mano' },
  { code: 'MU', title: 'Muñeca', slug: 'muneca' },
  { code: 'AN', title: 'Antebrazo', slug: 'antebrazo' },
  { code: 'CO', title: 'Codo', slug: 'codo' },
  { code: 'HU', title: 'Húmero', slug: 'humero' },
  { code: 'HO', title: 'Hombro', slug: 'hombro' },
  { code: 'CL', title: 'Clavícula', slug: 'clavicula' },
  { code: 'ES', title: 'Escápula', slug: 'escapula' },
  { code: 'AC', title: 'Articulación Acromio Clavicular', slug: 'articulacion-acromioclavicular' },
  { code: 'EC', title: 'Articulación Esterno Clavicular', slug: 'articulacion-esternoclavicular' }
];

export default function UpperLimbScreen() {
  const openStudy = (study: PositioningStudy) => {
    if (study.slug === 'dedo-pulgar' || study.slug === 'mano') {
      router.push(`/posicionamientos/miembro-superior/${study.slug}`);
      return;
    }

    router.push({
      pathname: '/posicionamientos/miembro-superior/[estudio]',
      params: { estudio: study.slug, title: study.title }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Posicionamientos</Text>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>REGIÓN ANATÓMICA</Text>
          <Text style={styles.title}>Miembro superior</Text>
          <Text style={styles.subtitle}>Selecciona el estudio que deseas explorar.</Text>
        </View>

        <View style={styles.list}>
          {studies.map((study) => (
            <PositioningStudyCard
              key={study.slug}
              onPress={() => openStudy(study)}
              study={study}
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
  list: { gap: 14 }
});

