import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';

export type PositioningCategory = {
  code: string;
  description: string;
  slug: string;
  title: string;
};

type PositioningCategoryCardProps = {
  category: PositioningCategory;
  index: number;
  onPress: () => void;
};

export function PositioningCategoryCard({ category, index, onPress }: PositioningCategoryCardProps) {
  const isAccent = index === 2;

  return (
    <Pressable
      accessibilityHint="Abre los estudios de esta región"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.icon, isAccent && styles.accentIcon]}>
        <View style={[styles.iconRing, isAccent && styles.accentRing]}>
          <Text style={[styles.iconCode, isAccent && styles.accentCode]}>{category.code}</Text>
        </View>
      </View>

      <View style={styles.copy}>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.description}>{category.description}</Text>
      </View>

      <View aria-hidden style={styles.arrowCircle}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 116,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3EBF1',
    borderRadius: 22,
    backgroundColor: colors.blanco,
    paddingHorizontal: 17,
    paddingVertical: 18,
    shadowColor: colors.azulOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  pressed: { opacity: 0.78, transform: [{ scale: 0.992 }] },
  icon: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#EAF6FC' },
  accentIcon: { backgroundColor: '#EFEEFF' },
  iconRing: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.azulClaro, borderRadius: 17 },
  accentRing: { borderColor: colors.morado },
  iconCode: { color: colors.azulOscuro, fontSize: 11, fontWeight: '800', letterSpacing: 0.4 },
  accentCode: { color: colors.morado },
  copy: { flex: 1, marginHorizontal: 15 },
  title: { color: colors.azulOscuro, fontSize: 18, fontWeight: '700' },
  description: { marginTop: 5, color: '#617686', fontSize: 13, lineHeight: 19 },
  arrowCircle: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: colors.grisClaro },
  arrow: { marginTop: -2, color: colors.azulClaro, fontSize: 27, fontWeight: '400' }
});
