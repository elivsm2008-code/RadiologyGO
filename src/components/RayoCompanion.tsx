import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, type ImageStyle, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';

type RayoPose = 'neutral' | 'wave' | 'celebrate';

type RayoCompanionProps = {
  message: string;
  pose?: RayoPose;
};

const SIZE = 72;

const frames: Record<RayoPose, { column: number; row: number }> = {
  neutral: { column: 0, row: 0 },
  wave: { column: 1, row: 0 },
  celebrate: { column: 1, row: 1 }
};

export function RayoCompanion({ message, pose = 'neutral' }: RayoCompanionProps) {
  const entrance = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const frame = frames[pose];

  useEffect(() => {
    entrance.setValue(0);
    Animated.spring(entrance, { friction: 9, tension: 70, toValue: 1, useNativeDriver: true }).start();
    const idle = Animated.loop(Animated.sequence([
      Animated.timing(float, { duration: 1500, easing: Easing.inOut(Easing.sin), toValue: -3, useNativeDriver: true }),
      Animated.timing(float, { duration: 1500, easing: Easing.inOut(Easing.sin), toValue: 1, useNativeDriver: true })
    ]));
    idle.start();
    return () => idle.stop();
  }, [entrance, float, message]);

  return (
    <Animated.View style={[styles.container, { opacity: entrance, transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [7, 0] }) }] }]}>
      <Animated.View style={[styles.avatar, { transform: [{ translateY: float }] }]}>
        <Image
          fadeDuration={0}
          resizeMode="stretch"
          source={require('../../assets/images/RayoSprites.png')}
          style={[styles.sprite, { left: -frame.column * SIZE, top: -frame.row * SIZE }] as ImageStyle[]}
        />
      </Animated.View>
      <View style={styles.bubble}>
        <View style={styles.pointer} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  avatar: { width: SIZE, height: SIZE, overflow: 'hidden', borderRadius: 22, backgroundColor: '#EAF6FC' },
  sprite: { position: 'absolute', width: SIZE * 2, height: SIZE * 2 },
  bubble: { flex: 1, minHeight: 58, justifyContent: 'center', marginLeft: 12, borderWidth: 1, borderColor: '#E3EBF1', borderRadius: 17, backgroundColor: colors.blanco, paddingHorizontal: 15, paddingVertical: 10 },
  pointer: { position: 'absolute', left: -6, width: 12, height: 12, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#E3EBF1', backgroundColor: colors.blanco, transform: [{ rotate: '45deg' }] },
  message: { color: colors.azulOscuro, fontSize: 13, fontWeight: '700', lineHeight: 19 }
});
