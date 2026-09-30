import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, type ImageStyle, StyleSheet, type ViewStyle } from 'react-native';

import { RAYO_SPRITE_SHEET } from '@/src/constants/assets';

export type RayoPose = 'neutral' | 'wave' | 'celebrate';

type Props = { animated?: boolean; pose?: RayoPose; size?: number; style?: ViewStyle };

const frames: Record<RayoPose, { column: number; row: number }> = {
  neutral: { column: 0, row: 0 },
  wave: { column: 1, row: 0 },
  celebrate: { column: 1, row: 1 }
};

export function RayoMascot({ animated = true, pose = 'neutral', size = 72, style }: Props) {
  const movement = useRef(new Animated.Value(0)).current;
  const frame = frames[pose];

  useEffect(() => {
    movement.stopAnimation();
    movement.setValue(0);
    if (!animated) return;
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(movement, { duration: 1450, easing: Easing.inOut(Easing.sin), toValue: -3, useNativeDriver: true }),
      Animated.timing(movement, { duration: 1450, easing: Easing.inOut(Easing.sin), toValue: 1, useNativeDriver: true })
    ]));
    loop.start();
    return () => { loop.stop(); movement.stopAnimation(); movement.setValue(0); };
  }, [animated, movement]);

  return (
    <Animated.View
      accessibilityIgnoresInvertColors
      accessibilityLabel={`Rayo, mascota de RadiologyGO, en estado ${pose}`}
      style={[styles.viewport, { height: size, transform: [{ translateY: movement }], width: size }, style]}
    >
      <Image
        defaultSource={RAYO_SPRITE_SHEET}
        fadeDuration={0}
        resizeMode="stretch"
        source={RAYO_SPRITE_SHEET}
        style={[styles.sheet, { height: size * 2, left: -frame.column * size, top: -frame.row * size, width: size * 2 }] as ImageStyle[]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  viewport: { zIndex: 2, flexShrink: 0, overflow: 'hidden', borderRadius: 22, backgroundColor: '#EAF6FC' },
  sheet: { position: 'absolute' }
});

