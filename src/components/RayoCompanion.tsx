import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { colors } from '@/src/constants/colors';
import { RayoMascot, type RayoPose } from './RayoMascot';

type Props = { animated?: boolean; message: string; pose?: RayoPose; size?: number; style?: ViewStyle };

export function RayoCompanion({ animated = true, message, pose = 'neutral', size = 72, style }: Props) {
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    entrance.stopAnimation();
    entrance.setValue(0);
    Animated.spring(entrance, { friction: 9, tension: 70, toValue: 1, useNativeDriver: true }).start();
    return () => entrance.stopAnimation();
  }, [entrance]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }) }] }, style]}>
      <RayoMascot animated={animated} pose={pose} size={size} />
      <View style={styles.bubble}>
        <View style={styles.pointer} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { zIndex: 2, width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 14, overflow: 'visible' },
  bubble: { zIndex: 1, flex: 1, flexShrink: 1, minWidth: 0, minHeight: 58, justifyContent: 'center', marginLeft: 12, borderWidth: 1, borderColor: '#E3EBF1', borderRadius: 17, backgroundColor: colors.blanco, paddingHorizontal: 15, paddingVertical: 10 },
  pointer: { position: 'absolute', left: -6, width: 12, height: 12, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#E3EBF1', backgroundColor: colors.blanco, transform: [{ rotate: '45deg' }] },
  message: { flexShrink: 1, color: colors.azulOscuro, fontSize: 13, fontWeight: '700', lineHeight: 19 }
});

