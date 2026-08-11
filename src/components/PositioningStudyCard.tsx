import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';

export type PositioningStudy = {
  code: string;
  slug: string;
  title: string;
};

type PositioningStudyCardProps = {
  onPress: () => void;
  study: PositioningStudy;
};

export function PositioningStudyCard({ onPress, study }: PositioningStudyCardProps) {
  return (
    <Pressable
      accessibilityHint="Abre la pantalla provisional de este estudio"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.icon}>
        <View style={styles.iconRing}>
          <Text style={styles.iconCode}>{study.code}</Text>
        </View>
      </View>

      <Text style={styles.title}>{study.title}</Text>

      <View aria-hidden style={styles.arrowCircle}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3EBF1',
    borderRadius: 22,
    backgroundColor: colors.blanco,
    paddingHorizontal: 17,
    paddingVertical: 14,
    shadowColor: colors.azulOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  pressed: { opacity: 0.78, transform: [{ scale: 0.992 }] },
  icon: { width: 54, height: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: '#EAF6FC' },
  iconRing: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.azulClaro, borderRadius: 16 },
  iconCode: { color: colors.azulOscuro, fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
  title: { flex: 1, marginHorizontal: 15, color: colors.azulOscuro, fontSize: 17, fontWeight: '700', lineHeight: 23 },
  arrowCircle: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: colors.grisClaro },
  arrow: { marginTop: -2, color: colors.azulClaro, fontSize: 27, fontWeight: '400' }
});
