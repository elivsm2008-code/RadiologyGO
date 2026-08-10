import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.title}>RadiologyGO</Text>
          <Text style={styles.subtitle}>Aprende. Practica. Perfecciona.</Text>
        </View>

        <View accessibilityLabel="Espacio provisional para Rayo" style={styles.mascotPlaceholder}>
          <Text style={styles.placeholderText}>Rayo aparecerá aquí</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/inicio')}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Comenzar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.azulOscuro },
  content: { flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 48 },
  brand: { alignItems: 'center', gap: 8 },
  title: { color: colors.blanco, fontSize: 38, fontWeight: '800', letterSpacing: 0.4 },
  subtitle: { color: colors.blanco, fontSize: 17, textAlign: 'center', opacity: 0.9 },
  mascotPlaceholder: { width: 220, height: 220, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderStyle: 'dashed', borderColor: colors.azulClaro, borderRadius: 110, backgroundColor: 'rgba(255, 255, 255, 0.08)' },
  placeholderText: { color: colors.azulClaro, fontSize: 15, fontWeight: '600' },
  button: { width: '100%', alignItems: 'center', backgroundColor: colors.azulClaro, borderRadius: 16, paddingVertical: 16 },
  buttonPressed: { opacity: 0.8 },
  buttonText: { color: colors.blanco, fontSize: 18, fontWeight: '700' }
});
