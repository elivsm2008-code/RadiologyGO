import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { RayoCompanion } from './RayoCompanion';

type Props = {
  code?: string;
  eyebrow: string;
  message: string;
  subtitle: string;
  title: string;
};

export function RewardCelebration({ code, eyebrow, message, subtitle, title }: Props) {
  const scale = useRef(new Animated.Value(0.94)).current;
  useEffect(() => { Animated.spring(scale, { friction: 8, tension: 65, toValue: 1, useNativeDriver: true }).start(); }, [scale]);
  return (
    <Animated.View accessibilityRole="summary" style={[styles.card, { transform: [{ scale }] }]}>
      <RayoCompanion message={message} pose="celebrate" />
      <View style={styles.rewardRow}>
        {code && <View style={styles.medallion}><Text style={styles.code}>{code}</Text></View>}
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', marginTop: 16, borderWidth: 1, borderColor: '#CDE6F4', borderRadius: 22, backgroundColor: '#F4FBFF', padding: 15, overflow: 'hidden' },
  rewardRow: { flexDirection: 'row', alignItems: 'center' },
  medallion: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.azulClaro, borderRadius: 26, backgroundColor: colors.azulOscuro },
  code: { color: colors.blanco, fontSize: 11, fontWeight: '800' },
  copy: { flex: 1, marginLeft: 13 },
  eyebrow: { color: colors.azulClaro, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { marginTop: 3, color: colors.azulOscuro, fontSize: 16, fontWeight: '800' },
  subtitle: { marginTop: 4, color: '#607786', fontSize: 11, lineHeight: 16 }
});
