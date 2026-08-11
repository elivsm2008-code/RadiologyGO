import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { getMasteryStatus } from '@/src/services/progressEngine';
import { MasteryBar } from './MasteryBar';

type ProjectionMasteryCardProps = {
  mastery: number;
  onPress: () => void;
  title: string;
};

export function ProjectionMasteryCard({ mastery, onPress, title }: ProjectionMasteryCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.status}>{getMasteryStatus(mastery)}</Text>
        </View>
        <View style={styles.percentageBadge}>
          <Text style={styles.percentage}>{mastery}%</Text>
        </View>
      </View>
      <MasteryBar value={mastery} />
      <Text aria-hidden style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#E3EBF1', borderRadius: 22, backgroundColor: colors.blanco, padding: 18, shadowColor: colors.azulOscuro, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.992 }] },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingRight: 32 },
  title: { color: colors.azulOscuro, fontSize: 20, fontWeight: '800' },
  status: { marginTop: 4, color: '#617686', fontSize: 13, fontWeight: '600' },
  percentageBadge: { minWidth: 54, alignItems: 'center', borderRadius: 14, backgroundColor: '#EAF6FC', paddingHorizontal: 10, paddingVertical: 8 },
  percentage: { color: colors.azulOscuro, fontSize: 15, fontWeight: '800' },
  arrow: { position: 'absolute', right: 17, top: 20, color: colors.azulClaro, fontSize: 27 }
});
