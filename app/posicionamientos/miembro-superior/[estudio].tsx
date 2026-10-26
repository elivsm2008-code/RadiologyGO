import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { getUpperLimbStudy } from '@/src/data/upperLimbLearning';

export default function UpperLimbStudyScreen() {
  const { estudio, title } = useLocalSearchParams<{ estudio?: string; title?: string }>();
  const study = getUpperLimbStudy(estudio);

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
            {study.projections.map((projection) => (
              <Pressable
                key={projection.slug}
                onPress={() => router.push({ pathname: '/posicionamientos/miembro-superior/[estudio]/[proyeccion]', params: { estudio: study.id, proyeccion: projection.slug } })}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              >
                <View style={styles.projectionIcon}><Text style={styles.projectionIconText}>{projection.title.slice(0, 3).toUpperCase()}</Text></View>
                <View style={styles.projectionCopy}>
                  <Text style={styles.projectionTitle}>{projection.title}</Text>
                  <Text style={styles.projectionDescription}>Contenido académico disponible</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            ))}
            <View style={styles.pendingCard}>
              <Text style={styles.pendingTitle}>Verificación de conocimientos</Text>
              <Text style={styles.pendingText}>Próximamente: actividades de aprendizaje.</Text>
            </View>
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

