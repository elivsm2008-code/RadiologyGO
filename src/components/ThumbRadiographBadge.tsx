import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import type { Achievement, AchievementDefinition } from '@/src/types/learning';

export const thumbRadiographBadgeIds = [
  'dominio-dedo-pulgar-ap',
  'dominio-dedo-pulgar-oblicua',
  'dominio-dedo-pulgar-lateral',
  'dedo-pulgar-verificado'
] as const;

type ThumbBadgeId = typeof thumbRadiographBadgeIds[number];
type BadgeVariant = 'ap' | 'oblicua' | 'lateral' | 'verified';

type Props = {
  definition: AchievementDefinition;
  earned?: Achievement;
  mode?: 'collection' | 'celebration';
  onPress?: () => void;
};

const variants: Record<ThumbBadgeId, BadgeVariant> = {
  'dominio-dedo-pulgar-ap': 'ap',
  'dominio-dedo-pulgar-oblicua': 'oblicua',
  'dominio-dedo-pulgar-lateral': 'lateral',
  'dedo-pulgar-verificado': 'verified'
};

export function isThumbRadiographAchievement(id: string): id is ThumbBadgeId {
  return thumbRadiographBadgeIds.includes(id as ThumbBadgeId);
}

export function ThumbRadiographBadge({ definition, earned, mode = 'collection', onPress }: Props) {
  const unlocked = Boolean(earned);
  const variant = isThumbRadiographAchievement(definition.id) ? variants[definition.id] : 'ap';
  const entrance = useRef(new Animated.Value(unlocked ? 0 : 1)).current;

  useEffect(() => {
    if (!unlocked) return;
    Animated.sequence([
      Animated.timing(entrance, { duration: 260, toValue: 1, useNativeDriver: true }),
      Animated.timing(entrance, { duration: 220, toValue: 0.72, useNativeDriver: true }),
      Animated.timing(entrance, { duration: 240, toValue: 1, useNativeDriver: true })
    ]).start();
  }, [entrance, unlocked]);

  const plate = (
    <Animated.View style={[styles.plateFrame, mode === 'celebration' && styles.celebrationFrame, !unlocked && styles.lockedFrame, { opacity: unlocked ? entrance : 1 }]}>
      {unlocked && <Animated.View style={[styles.lightboxGlow, { opacity: entrance }]} />}
      <View style={[styles.plate, variant === 'verified' && styles.verifiedPlate, !unlocked && styles.lockedPlate]}>
        <View style={[styles.scanLine, styles.scanLineOne]} />
        <View style={[styles.scanLine, styles.scanLineTwo]} />
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerBottomRight} />
        {variant === 'verified' ? <VerifiedAnatomy unlocked={unlocked} /> : <ThumbAnatomy unlocked={unlocked} variant={variant} />}
        <View style={[styles.projectionTag, !unlocked && styles.lockedTag]}>
          <Text style={[styles.projectionText, !unlocked && styles.lockedProjectionText]}>{variant === 'verified' ? 'VERIFICADO' : variant.toLocaleUpperCase('es')}</Text>
        </View>
        {!unlocked && <LockMark />}
        {unlocked && <View style={styles.statusDot} />}
      </View>
    </Animated.View>
  );

  if (mode === 'celebration') return plate;

  return (
    <Pressable accessibilityLabel={`${definition.title}. ${unlocked ? 'Desbloqueada' : 'Bloqueada'}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.collectionCard, !unlocked && styles.lockedCard, pressed && styles.pressed]}>
      {plate}
      <Text numberOfLines={2} style={[styles.title, !unlocked && styles.lockedText]}>{definition.title}</Text>
      <Text style={[styles.state, !unlocked && styles.lockedState]}>{unlocked ? 'DESBLOQUEADA' : 'BLOQUEADA'}</Text>
      <Text numberOfLines={3} style={styles.detail}>{earned ? `Obtenida: ${new Date(earned.earnedAt).toLocaleDateString('es')}` : definition.requirement}</Text>
    </Pressable>
  );
}

function ThumbAnatomy({ unlocked, variant }: { unlocked: boolean; variant: Exclude<BadgeVariant, 'verified'> }) {
  return (
    <View style={[styles.anatomy, variant === 'oblicua' && styles.obliqueAnatomy, variant === 'lateral' && styles.lateralAnatomy]}>
      <Bone unlocked={unlocked} style={[styles.distal, variant === 'lateral' && styles.lateralDistal]} />
      <View style={[styles.joint, !unlocked && styles.lockedJoint]} />
      <Bone unlocked={unlocked} style={[styles.proximal, variant === 'oblicua' && styles.obliqueProximal, variant === 'lateral' && styles.lateralProximal]} />
      <View style={[styles.joint, !unlocked && styles.lockedJoint]} />
      <Bone unlocked={unlocked} style={[styles.metacarpal, variant === 'oblicua' && styles.obliqueMetacarpal, variant === 'lateral' && styles.lateralMetacarpal]} />
    </View>
  );
}

function VerifiedAnatomy({ unlocked }: { unlocked: boolean }) {
  return (
    <View style={styles.verifiedAnatomy}>
      <View style={[styles.miniProjection, styles.miniOblique]}><MiniThumb unlocked={unlocked} /></View>
      <View style={[styles.miniProjection, styles.miniAp]}><MiniThumb unlocked={unlocked} /></View>
      <View style={[styles.miniProjection, styles.miniLateral]}><MiniThumb narrow unlocked={unlocked} /></View>
      <View style={[styles.verificationSeal, !unlocked && styles.lockedSeal]}><Text style={[styles.bolt, !unlocked && styles.lockedBolt]}>ϟ</Text></View>
    </View>
  );
}

function MiniThumb({ narrow = false, unlocked }: { narrow?: boolean; unlocked: boolean }) {
  return <><Bone unlocked={unlocked} style={[styles.miniDistal, narrow && styles.miniNarrow]} /><Bone unlocked={unlocked} style={[styles.miniProximal, narrow && styles.miniNarrow]} /><Bone unlocked={unlocked} style={[styles.miniMetacarpal, narrow && styles.miniNarrow]} /></>;
}

function Bone({ style, unlocked }: { style: object | object[]; unlocked: boolean }) {
  return <View style={[styles.bone, !unlocked && styles.lockedBone, style]}><View style={[styles.boneCore, !unlocked && styles.lockedBoneCore]} /></View>;
}

function LockMark() {
  return <View style={styles.lockMark}><View style={styles.lockArc} /><View style={styles.lockBody}><View style={styles.keyhole} /></View></View>;
}

const styles = StyleSheet.create({
  collectionCard: { width: '48%', minWidth: 145, flexGrow: 1, alignItems: 'center', borderWidth: 1, borderColor: '#BEDFF1', borderRadius: 22, backgroundColor: '#F8FCFF', padding: 13 },
  lockedCard: { borderColor: '#D4DCE1', backgroundColor: '#EEF1F3' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
  plateFrame: { width: 112, height: 137, borderRadius: 17, borderWidth: 1, borderColor: '#77C7EF', backgroundColor: '#12334F', padding: 6, shadowColor: '#4EA8DE', shadowOpacity: 0.32, shadowRadius: 11, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  celebrationFrame: { width: 138, height: 168, borderRadius: 21, padding: 7 },
  lockedFrame: { borderColor: '#818D95', backgroundColor: '#394750', shadowOpacity: 0, elevation: 0 },
  lightboxGlow: { position: 'absolute', top: -7, right: -7, bottom: -7, left: -7, borderRadius: 22, backgroundColor: '#8DD9FF' },
  plate: { flex: 1, overflow: 'hidden', borderWidth: 1, borderColor: '#447894', borderRadius: 12, backgroundColor: '#071C2B' },
  verifiedPlate: { borderColor: '#85D8FF', backgroundColor: '#071828' },
  lockedPlate: { borderColor: '#69757C', backgroundColor: '#28343B' },
  scanLine: { position: 'absolute', left: 7, right: 7, height: 1, backgroundColor: '#21516D', opacity: 0.38 },
  scanLineOne: { top: '33%' },
  scanLineTwo: { top: '66%' },
  cornerTopLeft: { position: 'absolute', top: 7, left: 7, width: 13, height: 13, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#7BCFF7', opacity: 0.55 },
  cornerBottomRight: { position: 'absolute', right: 7, bottom: 7, width: 13, height: 13, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#7BCFF7', opacity: 0.55 },
  anatomy: { position: 'absolute', top: 13, left: '50%', width: 34, alignItems: 'center', transform: [{ translateX: -17 }] },
  obliqueAnatomy: { top: 14, left: '48%', transform: [{ translateX: -17 }, { rotate: '-18deg' }] },
  lateralAnatomy: { top: 12, left: '53%', transform: [{ translateX: -17 }, { rotate: '8deg' }] },
  bone: { alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#D9F4FF', backgroundColor: '#79C5E9', shadowColor: '#BEEBFF', shadowOpacity: 0.9, shadowRadius: 5, shadowOffset: { width: 0, height: 0 } },
  boneCore: { width: '42%', height: '68%', borderRadius: 6, backgroundColor: '#EAF9FF', opacity: 0.62 },
  lockedBone: { borderColor: '#8B979E', backgroundColor: '#637079', shadowOpacity: 0 },
  lockedBoneCore: { backgroundColor: '#ACB5BA', opacity: 0.36 },
  distal: { width: 24, height: 25, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 },
  proximal: { width: 27, height: 35, borderRadius: 9 },
  metacarpal: { width: 29, height: 43, borderRadius: 10 },
  obliqueProximal: { marginLeft: 3 },
  obliqueMetacarpal: { marginLeft: 7 },
  lateralDistal: { width: 15, height: 27 },
  lateralProximal: { width: 18, height: 37 },
  lateralMetacarpal: { width: 20, height: 44 },
  joint: { width: 13, height: 4, borderRadius: 3, backgroundColor: '#B9E9FF', opacity: 0.62 },
  lockedJoint: { backgroundColor: '#8C979D', opacity: 0.45 },
  projectionTag: { position: 'absolute', left: 7, bottom: 7, borderWidth: 1, borderColor: '#3A7899', borderRadius: 6, backgroundColor: '#0A2A3E', paddingHorizontal: 5, paddingVertical: 3 },
  lockedTag: { borderColor: '#68757C', backgroundColor: '#344149' },
  projectionText: { color: '#A9E4FF', fontSize: 6.5, fontWeight: '900', letterSpacing: 0.8 },
  lockedProjectionText: { color: '#A5AEB3' },
  statusDot: { position: 'absolute', right: 8, top: 8, width: 6, height: 6, borderRadius: 3, backgroundColor: '#92E5FF', shadowColor: '#92E5FF', shadowOpacity: 1, shadowRadius: 5, shadowOffset: { width: 0, height: 0 } },
  lockMark: { position: 'absolute', right: 8, bottom: 8, width: 25, height: 27, alignItems: 'center', justifyContent: 'flex-end' },
  lockArc: { position: 'absolute', top: 1, width: 13, height: 13, borderWidth: 2, borderBottomWidth: 0, borderColor: '#CDD3D6', borderTopLeftRadius: 7, borderTopRightRadius: 7 },
  lockBody: { width: 21, height: 17, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: '#77838A' },
  keyhole: { width: 3, height: 6, borderRadius: 2, backgroundColor: '#DCE1E3' },
  verifiedAnatomy: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 15 },
  miniProjection: { width: 21, alignItems: 'center', gap: 2 },
  miniOblique: { marginRight: -1, transform: [{ rotate: '-18deg' }] },
  miniAp: { zIndex: 2, marginHorizontal: 5 },
  miniLateral: { marginLeft: -1, transform: [{ rotate: '8deg' }] },
  miniDistal: { width: 13, height: 14, borderRadius: 6 },
  miniProximal: { width: 14, height: 20, borderRadius: 5 },
  miniMetacarpal: { width: 15, height: 25, borderRadius: 6 },
  miniNarrow: { width: 9 },
  verificationSeal: { position: 'absolute', alignSelf: 'center', bottom: 24, width: 27, height: 27, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#AEE8FF', borderRadius: 14, backgroundColor: colors.azulOscuro },
  lockedSeal: { borderColor: '#8B969C', backgroundColor: '#49565D' },
  bolt: { color: '#BFEFFF', fontSize: 17, fontWeight: '900' },
  lockedBolt: { color: '#AAB2B6' },
  title: { minHeight: 37, marginTop: 12, color: colors.azulOscuro, fontSize: 12, fontWeight: '800', lineHeight: 17, textAlign: 'center' },
  lockedText: { color: '#65747D' },
  state: { marginTop: 6, color: colors.azulClaro, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  lockedState: { color: '#7B878E' },
  detail: { minHeight: 43, marginTop: 6, color: '#71818B', fontSize: 9, lineHeight: 14, textAlign: 'center' }
});

