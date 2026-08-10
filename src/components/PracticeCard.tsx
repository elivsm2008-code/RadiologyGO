import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import type { PracticeOption } from '@/src/types/practice';

import { EntranceAnimation } from './EntranceAnimation';

type PracticeCardProps = {
  index: number;
  option: PracticeOption;
};

export function PracticeCard({ index, option }: PracticeCardProps) {
  return (
    <EntranceAnimation delay={80 + index * 80}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={option.title}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <View style={[styles.icon, option.accent && styles.accentIcon]}>
          <View style={[styles.iconCenter, option.accent && styles.accentIconCenter]} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>{option.title}</Text>
          <Text style={[styles.caption, option.accent && styles.accentCaption]}>Próximamente</Text>
        </View>
        <Text aria-hidden style={[styles.arrow, option.accent && styles.accentArrow]}>›</Text>
      </Pressable>
    </EntranceAnimation>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 96,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EEF3',
    borderRadius: 20,
    backgroundColor: colors.blanco,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  icon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#EAF6FC' },
  accentIcon: { backgroundColor: '#EFEEFF' },
  iconCenter: { width: 15, height: 15, borderWidth: 4, borderColor: colors.azulClaro, borderRadius: 8 },
  accentIconCenter: { borderColor: colors.morado },
  copy: { flex: 1, marginLeft: 15 },
  title: { color: colors.azulOscuro, fontSize: 18, fontWeight: '700' },
  caption: { marginTop: 4, color: '#6D8190', fontSize: 13, fontWeight: '500' },
  accentCaption: { color: colors.morado },
  arrow: { color: colors.azulClaro, fontSize: 32, fontWeight: '300' },
  accentArrow: { color: colors.morado }
});
