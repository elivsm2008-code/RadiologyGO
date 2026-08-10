import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PracticeCard } from '@/src/components/PracticeCard';
import { colors } from '@/src/constants/colors';
import type { PracticeOption } from '@/src/types/practice';

const practiceOptions: PracticeOption[] = [
  { id: 'posicionamientos', title: 'Posicionamientos' },
  { id: 'casos-clinicos', title: 'Casos clÃ­nicos' },
  { id: 'evaluaciones', title: 'Evaluaciones' },
  { id: 'mi-progreso', title: 'Mi progreso', accent: true }
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>RadiologyGO</Text>
          <Text style={styles.question}>Â¿QuÃ© deseas practicar hoy?</Text>
        </View>

        <View style={styles.grid}>
          {practiceOptions.map((option) => (
            <PracticeCard key={option.id} option={option} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.grisClaro },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingVertical: 32 },
  header: { marginBottom: 28 },
  title: { color: colors.azulOscuro, fontSize: 32, fontWeight: '800', marginBottom: 8 },
  question: { color: colors.azulOscuro, fontSize: 20, fontWeight: '600' },
  grid: { gap: 16 }
});
