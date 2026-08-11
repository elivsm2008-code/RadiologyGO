import { StyleSheet, View } from 'react-native';

import { colors } from '@/src/constants/colors';

type MasteryBarProps = {
  value: number;
};

export function MasteryBar({ value }: MasteryBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <View accessibilityLabel={`${safeValue}% de dominio`} accessibilityRole="progressbar" style={styles.track}>
      <View style={[styles.fill, { width: `${safeValue}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, overflow: 'hidden', borderRadius: 4, backgroundColor: '#DCE8F0' },
  fill: { height: '100%', borderRadius: 4, backgroundColor: colors.azulClaro }
});
