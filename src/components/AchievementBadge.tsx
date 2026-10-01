import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import type { Achievement, AchievementDefinition } from '@/src/types/learning';

export type AchievementBadgeVariant = 'projection' | 'mastery' | 'verification';

type Props = { definition: AchievementDefinition; earned?: Achievement; mode?: 'collection' | 'celebration'; onPress?: () => void; subtitle?: string; variant?: AchievementBadgeVariant };

export function getAchievementBadgeVariant(id: string): AchievementBadgeVariant {
  if (id.includes('verificad')) return 'verification';
  if (id.includes('maestria')) return 'mastery';
  return 'projection';
}

export function AchievementBadge({ definition, earned, mode = 'collection', onPress, subtitle, variant = getAchievementBadgeVariant(definition.id) }: Props) {
  const unlocked = Boolean(earned);
  const reveal = useRef(new Animated.Value(unlocked ? 0.82 : 1)).current;
  useEffect(() => {
    if (!unlocked) return;
    Animated.sequence([
      Animated.spring(reveal, { friction: 7, tension: 70, toValue: 1.06, useNativeDriver: true }),
      Animated.timing(reveal, { duration: 220, toValue: 1, useNativeDriver: true })
    ]).start();
  }, [reveal, unlocked]);

  const art = <Animated.View style={[styles.artStage, mode === 'celebration' && styles.largeStage, { transform: [{ scale: reveal }] }]}>
    {unlocked && <View style={[styles.glow, variant === 'verification' && styles.verificationGlow]} />}
    <View style={[styles.outerRing, variant === 'mastery' && styles.masteryOuter, variant === 'verification' && styles.verificationOuter, !unlocked && styles.lockedOuter]}>
      <View style={[styles.techNotch, styles.notchTop]} /><View style={[styles.techNotch, styles.notchBottom]} />
      <View style={[styles.badgeFace, variant === 'mastery' && styles.masteryFace, variant === 'verification' && styles.verificationFace, !unlocked && styles.lockedFace]}>
        <View style={[styles.innerRing, !unlocked && styles.lockedInner]}>
          <Text style={[styles.symbol, !unlocked && styles.lockedSymbol]}>{variant === 'verification' ? '✓' : variant === 'mastery' ? '★' : 'ϟ'}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.code, !unlocked && styles.lockedCode]}>{definition.code}</Text>
        </View>
        {variant === 'verification' && <View style={[styles.crown, !unlocked && styles.lockedCrown]}><View style={styles.crownPoint} /><View style={styles.crownPoint} /><View style={styles.crownPoint} /></View>}
        {unlocked && <View style={styles.spark}><View style={styles.sparkVertical} /><View style={styles.sparkHorizontal} /></View>}
      </View>
    </View>
    {!unlocked && <LockMark />}
  </Animated.View>;

  if (mode === 'celebration') return art;
  return <Pressable accessibilityLabel={`${definition.title}. ${unlocked ? 'Desbloqueada' : 'Bloqueada'}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, !unlocked && styles.lockedCard, pressed && styles.pressed]}>
    {art}
    <Text numberOfLines={2} style={[styles.title, !unlocked && styles.lockedText]}>{definition.title}</Text>
    {!!subtitle && <Text numberOfLines={1} style={styles.subtitle}>{subtitle}</Text>}
    <Text style={[styles.state, !unlocked && styles.lockedState]}>{unlocked ? 'DESBLOQUEADA' : 'BLOQUEADA'}</Text>
    <Text numberOfLines={3} style={styles.detail}>{earned ? `Obtenida: ${new Date(earned.earnedAt).toLocaleDateString('es')}` : definition.requirement}</Text>
  </Pressable>;
}

function LockMark() { return <View style={styles.lockMark}><View style={styles.lockArc} /><View style={styles.lockBody}><View style={styles.keyhole} /></View></View>; }

const styles = StyleSheet.create({
  card: { width: '48%', minWidth: 128, flexGrow: 1, alignItems: 'center', borderWidth: 1, borderColor: '#D2E7F3', borderRadius: 20, backgroundColor: colors.blanco, paddingHorizontal: 10, paddingVertical: 13 },
  lockedCard: { borderColor: '#DDE3E7', backgroundColor: '#F0F3F5' }, pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
  artStage: { width: 88, height: 92, alignItems: 'center', justifyContent: 'center' }, largeStage: { width: 124, height: 130 },
  glow: { position: 'absolute', width: '92%', height: '92%', borderRadius: 50, backgroundColor: '#8EDAFF', opacity: 0.3, shadowColor: '#4EA8DE', shadowOpacity: 0.8, shadowRadius: 13, shadowOffset: { width: 0, height: 0 } },
  verificationGlow: { backgroundColor: '#B9AEFF', shadowColor: colors.morado, opacity: 0.36 },
  outerRing: { width: '79%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#65C2EC', backgroundColor: '#123F62', transform: [{ rotate: '45deg' }], borderRadius: 19, shadowColor: '#4EA8DE', shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 4 },
  masteryOuter: { borderColor: '#91D8F5', backgroundColor: '#183B66' }, verificationOuter: { borderColor: '#9E94F2', backgroundColor: '#302C73', borderWidth: 3 }, lockedOuter: { borderColor: '#929DA4', backgroundColor: '#68757D', shadowOpacity: 0, elevation: 0 },
  badgeFace: { width: '78%', height: '78%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#A9E4FF', borderRadius: 18, backgroundColor: '#0D3150', transform: [{ rotate: '-45deg' }] },
  masteryFace: { backgroundColor: '#12365F' }, verificationFace: { borderColor: '#C4BDFF', backgroundColor: '#252161' }, lockedFace: { borderColor: '#AAB2B7', backgroundColor: '#5C6870' },
  innerRing: { width: '71%', height: '71%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#579FC4', borderRadius: 30, backgroundColor: '#0A2943' }, lockedInner: { borderColor: '#89949A', backgroundColor: '#566169' },
  symbol: { color: '#BDEBFF', fontSize: 16, fontWeight: '900', lineHeight: 18 }, lockedSymbol: { color: '#D0D5D8' }, code: { maxWidth: '88%', color: colors.blanco, fontSize: 9, fontWeight: '900', letterSpacing: 0.8 }, lockedCode: { color: '#E1E4E6' },
  techNotch: { position: 'absolute', width: 9, height: 9, borderRadius: 5, backgroundColor: '#9BE3FF' }, notchTop: { top: -5, left: '50%', marginLeft: -4 }, notchBottom: { bottom: -5, left: '50%', marginLeft: -4 },
  crown: { position: 'absolute', top: -8, flexDirection: 'row', alignItems: 'flex-end', gap: 2, borderBottomWidth: 3, borderBottomColor: '#BDB6FF', paddingBottom: 1 }, lockedCrown: { borderBottomColor: '#AAB2B7' }, crownPoint: { width: 4, height: 7, borderTopLeftRadius: 2, borderTopRightRadius: 2, backgroundColor: '#D5D0FF' },
  spark: { position: 'absolute', top: 5, right: 7, width: 12, height: 12, alignItems: 'center', justifyContent: 'center' }, sparkVertical: { position: 'absolute', width: 2, height: 12, borderRadius: 1, backgroundColor: '#DDF6FF' }, sparkHorizontal: { position: 'absolute', width: 12, height: 2, borderRadius: 1, backgroundColor: '#DDF6FF' },
  lockMark: { position: 'absolute', right: 3, bottom: 5, width: 25, height: 27, alignItems: 'center', justifyContent: 'flex-end' }, lockArc: { position: 'absolute', top: 1, width: 13, height: 13, borderWidth: 2, borderBottomWidth: 0, borderColor: '#F1F3F4', borderTopLeftRadius: 7, borderTopRightRadius: 7 }, lockBody: { width: 21, height: 17, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: '#6D7980' }, keyhole: { width: 3, height: 6, borderRadius: 2, backgroundColor: colors.blanco },
  title: { minHeight: 34, marginTop: 8, color: colors.azulOscuro, fontSize: 11, fontWeight: '800', lineHeight: 16, textAlign: 'center' }, lockedText: { color: '#65747D' }, subtitle: { marginTop: 2, color: colors.azulClaro, fontSize: 9, fontWeight: '700' }, state: { marginTop: 5, color: colors.azulClaro, fontSize: 8, fontWeight: '900', letterSpacing: 0.9 }, lockedState: { color: '#7B878E' }, detail: { minHeight: 41, marginTop: 5, color: '#71818B', fontSize: 9, lineHeight: 13, textAlign: 'center' }
});

