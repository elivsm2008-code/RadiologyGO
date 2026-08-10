import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/src/constants/colors';
import type { PracticeOption } from '@/src/types/practice';

type PracticeCardProps = {
  option: PracticeOption;
};

export function PracticeCard({ option }: PracticeCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={option.title}
      style={({ pressed }) => [styles.card, option.accent && styles.accentCard, pressed && styles.pressed]}
    >
      <Text style={[styles.title, option.accent && styles.accentTitle]}>{option.title}</Text>
      <Text style={[styles.caption, option.accent && styles.accentCaption]}>PrÃ³ximamente</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { minHeight: 104, justifyContent: 'center', borderRadius: 18, borderLeftWidth: 6, borderLeftColor: colors.azulClaro, backgroundColor: colors.blanco, paddingHorizontal: 20, paddingVertical: 18 },
  accentCard: { borderLeftColor: colors.morado },
  pressed: { opacity: 0.75 },
  title: { color: colors.azulOscuro, fontSize: 20, fontWeight: '700' },
  accentTitle: { color: colors.morado },
  caption: { color: colors.azulClaro, fontSize: 14, fontWeight: '600', marginTop: 6 },
  accentCaption: { color: colors.morado }
});
