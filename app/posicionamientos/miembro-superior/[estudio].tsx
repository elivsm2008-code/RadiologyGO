import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';

export default function UpperLimbStudyScreen() {
  const { title } = useLocalSearchParams<{ title?: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Miembro superior</Text>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>ESTUDIO SELECCIONADO</Text>
          <Text style={styles.title}>{title ?? 'Estudio'}</Text>
          <Text style={styles.description}>Esta pantalla queda preparada para desarrollar sus proyecciones en la siguiente fase.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.grisClaro },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', flex: 1, paddingHorizontal: 20, paddingVertical: 22 },
  backButton: { alignSelf: 'flex-start', color: colors.azulClaro, fontSize: 16, fontWeight: '700', paddingVertical: 8, paddingRight: 16 },
  card: { marginTop: 42, borderRadius: 24, backgroundColor: colors.blanco, padding: 26 },
  eyebrow: { color: colors.morado, fontSize: 12, fontWeight: '800', letterSpacing: 1.4 },
  title: { marginTop: 10, color: colors.azulOscuro, fontSize: 28, fontWeight: '800' },
  description: { marginTop: 12, color: '#617686', fontSize: 15, lineHeight: 23 }
});
