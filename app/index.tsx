import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { EntranceAnimation } from '@/src/components/EntranceAnimation';
import { RayoIntro } from '@/src/components/RayoIntro';
import { colors } from '@/src/constants/colors';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <EntranceAnimation delay={80} style={styles.brandBlock}>
            <View style={styles.brandRow}>
              <Text style={styles.brand}>Radiology</Text>
              <Text style={styles.brandHighlight}>GO</Text>
              <View style={styles.accentDot} />
            </View>
            <Text style={styles.tagline}>Aprende. Practica. Perfecciona.</Text>
          </EntranceAnimation>

          <View style={styles.mascotSection}>
            <RayoIntro />
          </View>

          <EntranceAnimation delay={360} style={styles.messageBlock}>
            <Text style={styles.greeting}>¡Hola! Soy Rayo, tu compañero de aprendizaje.</Text>
            <Text style={styles.supportingText}>
              Cada imagen de calidad comienza con un buen posicionamiento.
            </Text>
          </EntranceAnimation>

          <EntranceAnimation delay={500} style={styles.actionBlock}>
            <Pressable
              accessibilityHint="Abre la pantalla principal"
              accessibilityRole="button"
              onPress={() => router.replace('/inicio')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>Comenzar</Text>
              <Text aria-hidden style={styles.buttonArrow}>→</Text>
            </Pressable>
          </EntranceAnimation>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.blanco },
  scrollContent: { flexGrow: 1 },
  container: {
    width: '100%',
    maxWidth: 560,
    minHeight: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 28
  },
  brandBlock: { alignItems: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  brand: { color: colors.azulOscuro, fontSize: 34, fontWeight: '800', letterSpacing: -1 },
  brandHighlight: { color: colors.azulClaro, fontSize: 34, fontWeight: '800', letterSpacing: -1 },
  accentDot: { width: 7, height: 7, marginLeft: 5, marginTop: 17, borderRadius: 4, backgroundColor: colors.morado },
  tagline: { marginTop: 7, color: colors.azulOscuro, fontSize: 16, fontWeight: '500', letterSpacing: 0.2 },
  mascotSection: { width: '100%', alignItems: 'center', marginVertical: 22 },
  messageBlock: { alignItems: 'center', paddingHorizontal: 4 },
  greeting: { color: colors.azulOscuro, fontSize: 21, fontWeight: '700', lineHeight: 28, textAlign: 'center' },
  supportingText: { maxWidth: 390, marginTop: 10, color: '#526779', fontSize: 15, lineHeight: 22, textAlign: 'center' },
  actionBlock: { width: '100%', marginTop: 26 },
  button: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: colors.azulOscuro,
    paddingHorizontal: 24,
    shadowColor: colors.azulOscuro,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5
  },
  buttonPressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  buttonText: { color: colors.blanco, fontSize: 18, fontWeight: '700' },
  buttonArrow: { position: 'absolute', right: 24, color: colors.azulClaro, fontSize: 25, fontWeight: '600' }
});
