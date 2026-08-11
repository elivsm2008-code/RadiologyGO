import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import type { Achievement, AchievementDefinition } from '@/src/types/learning';

type AchievementBadgeProps = {
  definition: AchievementDefinition;
  earned?: Achievement;
  onPress?: () => void;
};

export function AchievementBadge({ definition, earned, onPress }: AchievementBadgeProps) {
  const glow = useRef(new Animated.Value(0.22)).current;
  const unlocked = Boolean(earned);

  useEffect(() => {
    if (!unlocked) return;
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(glow, { duration: 1300, toValue: 0.48, useNativeDriver: true }),
      Animated.timing(glow, { duration: 1300, toValue: 0.18, useNativeDriver: true })
    ]));
    animation.start();
    return () => animation.stop();
  }, [glow, unlocked]);

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, !unlocked && styles.lockedCard, pressed && styles.pressed]}>
      <View style={styles.visual}>
        {unlocked && <Animated.View style={[styles.glow, { opacity: glow }]} />}
        <View style={[styles.medallion, !unlocked && styles.lockedMedallion]}>
          <View style={[styles.medallionInner, !unlocked && styles.lockedMedallionInner]}>
            <Text style={[styles.code, !unlocked && styles.lockedCode]}>{definition.code}</Text>
          </View>
        </View>
        {!unlocked && (
          <View style={styles.lock}>
            <View style={styles.lockArc} />
            <View style={styles.lockBody} />
          </View>
        )}
      </View>

      <View style={styles.copy}>
        <Text style={[styles.title, !unlocked && styles.lockedText]}>{definition.title}</Text>
        <Text style={styles.subtitle}>Dedo pulgar</Text>
        <Text style={styles.detail}>
          {earned ? `Obtenida: ${new Date(earned.earnedAt).toLocaleDateString('es')}` : definition.requirement}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { minHeight: 104, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D9E8F1', borderRadius: 20, backgroundColor: colors.blanco, padding: 15 },
  lockedCard: { borderColor: '#E1E6EA', backgroundColor: '#F1F3F5' },
  pressed: { opacity: 0.8 },
  visual: { width: 66, height: 66, alignItems: 'center', justifyContent: 'center' },
  glow: { position: 'absolute', width: 66, height: 66, borderRadius: 33, backgroundColor: colors.azulClaro },
  medallion: { width: 54, height: 54, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.azulClaro, borderRadius: 27, backgroundColor: colors.azulOscuro },
  lockedMedallion: { borderColor: '#AAB5BC', backgroundColor: '#D7DDE1' },
  medallionInner: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#8AD1F2', borderRadius: 19 },
  lockedMedallionInner: { borderColor: '#B8C1C7' },
  code: { color: colors.blanco, fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  lockedCode: { color: '#7B878E' },
  lock: { position: 'absolute', right: 0, bottom: 0, width: 24, height: 24, alignItems: 'center', justifyContent: 'flex-end', borderRadius: 12, backgroundColor: '#7E8A92' },
  lockArc: { position: 'absolute', top: 4, width: 9, height: 9, borderWidth: 2, borderBottomWidth: 0, borderColor: colors.blanco, borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  lockBody: { width: 12, height: 9, marginBottom: 4, borderRadius: 2, backgroundColor: colors.blanco },
  copy: { flex: 1, marginLeft: 14 },
  title: { color: colors.azulOscuro, fontSize: 15, fontWeight: '800' },
  lockedText: { color: '#66757E' },
  subtitle: { marginTop: 3, color: colors.azulClaro, fontSize: 12, fontWeight: '700' },
  detail: { marginTop: 5, color: '#71818B', fontSize: 11, lineHeight: 16 }
});
