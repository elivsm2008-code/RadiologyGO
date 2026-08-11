import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import type { AchievementDefinition } from '@/src/types/learning';
import { RayoCompanion } from './RayoCompanion';

type AchievementCelebrationProps = {
  definition: AchievementDefinition;
  xpGained: number;
};

export function AchievementCelebration({ definition, xpGained }: AchievementCelebrationProps) {
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.spring(scale, { friction: 8, tension: 65, toValue: 1, useNativeDriver: true }).start();
  }, [scale]);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <RayoCompanion message="¡Nuevo logro desbloqueado!" pose="celebrate" />
      <View style={styles.rewardRow}>
        <View style={styles.medallion}><Text style={styles.code}>{definition.code}</Text></View>
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>NUEVA INSIGNIA</Text>
          <Text style={styles.title}>{definition.title}</Text>
          <Text style={styles.subtitle}>Dedo pulgar · +{xpGained} XP en esta práctica</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', marginTop: 16, borderWidth: 1, borderColor: '#CDE6F4', borderRadius: 22, backgroundColor: '#F4FBFF', padding: 15 },
  rewardRow: { flexDirection: 'row', alignItems: 'center' },
  medallion: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.azulClaro, borderRadius: 26, backgroundColor: colors.azulOscuro },
  code: { color: colors.blanco, fontSize: 11, fontWeight: '800' },
  copy: { flex: 1, marginLeft: 13 },
  eyebrow: { color: colors.azulClaro, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { marginTop: 3, color: colors.azulOscuro, fontSize: 16, fontWeight: '800' },
  subtitle: { marginTop: 4, color: '#607786', fontSize: 11 }
});
