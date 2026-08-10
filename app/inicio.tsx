import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PracticeCard } from '@/src/components/PracticeCard';
import { colors } from '@/src/constants/colors';
import type { PracticeOption } from '@/src/types/practice';

const practiceOptions: PracticeOption[] = [
  { id: 'posicionamientos', title: 'Posicionamientos' },
  { id: 'casos-clinicos', title: 'Casos clínicos' },
  { id: 'evaluaciones', title: 'Evaluaciones' },
  { id: 'mi-progreso', title: 'Mi progreso', accent: true }
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.brandRow}>
          <Text style={styles.brand}>Radiology</Text>
          <Text style={styles.brandHighlight}>GO</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>ENTRENAMIENTO</Text>
          <Text style={styles.title}>¿Qué deseas practicar hoy?</Text>
        </View>

        <View style={styles.grid}>
          {practiceOptions.map((option, index) => (
            <PracticeCard key={option.id} index={index} option={option} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.grisClaro },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', flexGrow: 1, paddingHorizontal: 20, paddingVertical: 28 },
  brandRow: { flexDirection: 'row', marginBottom: 34 },
  brand: { color: colors.azulOscuro, fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  brandHighlight: { color: colors.azulClaro, fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  header: { marginBottom: 26 },
  eyebrow: { marginBottom: 8, color: colors.azulClaro, fontSize: 12, fontWeight: '800', letterSpacing: 1.6 },
  title: { maxWidth: 430, color: colors.azulOscuro, fontSize: 30, fontWeight: '800', lineHeight: 38 },
  grid: { gap: 14 }
});
