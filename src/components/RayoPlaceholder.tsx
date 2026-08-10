import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';

export function RayoPlaceholder() {
  return (
    <View accessibilityLabel="Espacio provisional para la mascota Rayo" style={styles.frame}>
      <View style={styles.orbitLarge} />
      <View style={styles.orbitSmall} />
      <View style={styles.mascotCircle}>
        <Text aria-hidden style={styles.bolt}>⚡</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>RAYO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    maxWidth: 340,
    aspectRatio: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DCEAF3',
    borderRadius: 32,
    backgroundColor: colors.grisClaro
  },
  orbitLarge: { position: 'absolute', width: 260, height: 260, borderWidth: 1, borderColor: '#D8EAF5', borderRadius: 130 },
  orbitSmall: { position: 'absolute', width: 198, height: 198, borderWidth: 1, borderColor: '#CBE3F1', borderRadius: 99 },
  mascotCircle: {
    width: 132,
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: colors.blanco,
    borderRadius: 66,
    backgroundColor: colors.azulOscuro,
    shadowColor: colors.azulOscuro,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 5
  },
  bolt: { color: colors.azulClaro, fontSize: 54 },
  badge: { position: 'absolute', right: 20, bottom: 18, borderRadius: 12, backgroundColor: colors.morado, paddingHorizontal: 11, paddingVertical: 6 },
  badgeText: { color: colors.blanco, fontSize: 10, fontWeight: '800', letterSpacing: 1.3 }
});
