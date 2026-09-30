import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { RayoMascot } from './RayoMascot';

const SIZE = 238;

export function RayoIntro() {
  const scale = useRef(new Animated.Value(0.92)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.spring(scale, { friction: 9, tension: 60, toValue: 1, useNativeDriver: true }),
      Animated.timing(translateY, { duration: 520, easing: Easing.out(Easing.cubic), toValue: 0, useNativeDriver: true })
    ]);
    entrance.start();
    return () => entrance.stop();
  }, [scale, translateY]);

  return (
    <View accessibilityLabel="Rayo, mascota animada de RadiologyGO" style={styles.stage}>
      <View style={styles.glow} />
      <View style={styles.shadow} />
      <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
        <RayoMascot pose="wave" size={SIZE} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { width: '100%', height: SIZE + 16, alignItems: 'center', justifyContent: 'center', overflow: 'visible' },
  glow: { position: 'absolute', width: 190, height: 190, borderRadius: 95, backgroundColor: colors.azulClaro, opacity: 0.09 },
  shadow: { position: 'absolute', bottom: 2, width: 126, height: 18, borderRadius: 63, backgroundColor: colors.azulOscuro, opacity: 0.14 }
});

