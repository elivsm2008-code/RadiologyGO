import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

import { colors } from '@/src/constants/colors';

const CARD_WIDTH = 226;
const CARD_HEIGHT = 300;

export function RayoIntro() {
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.88)).current;
  const entranceY = useRef(new Animated.Value(24)).current;
  const scanY = useRef(new Animated.Value(-12)).current;
  const scanOpacity = useRef(new Animated.Value(0)).current;
  const haloOpacity = useRef(new Animated.Value(0)).current;
  const haloScale = useRef(new Animated.Value(0.7)).current;
  const saluteRotation = useRef(new Animated.Value(0)).current;
  const saluteY = useRef(new Animated.Value(0)).current;
  const idleY = useRef(new Animated.Value(0)).current;
  const idleRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const introduction = Animated.sequence([
      Animated.delay(250),
      Animated.parallel([
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 1050,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(imageScale, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.back(1.08)),
          useNativeDriver: true
        }),
        Animated.timing(entranceY, {
          toValue: 0,
          duration: 1100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(scanY, {
          toValue: CARD_HEIGHT,
          duration: 1450,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.sequence([
          Animated.timing(scanOpacity, { toValue: 0.9, duration: 180, useNativeDriver: true }),
          Animated.delay(960),
          Animated.timing(scanOpacity, { toValue: 0, duration: 310, useNativeDriver: true })
        ])
      ]),
      Animated.parallel([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(haloOpacity, { toValue: 0.3, duration: 180, useNativeDriver: true }),
            Animated.timing(haloScale, { toValue: 0.88, duration: 180, useNativeDriver: true })
          ]),
          Animated.parallel([
            Animated.timing(haloOpacity, { toValue: 0, duration: 720, useNativeDriver: true }),
            Animated.timing(haloScale, {
              toValue: 1.45,
              duration: 720,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true
            })
          ])
        ]),
        Animated.sequence([
          Animated.timing(entranceY, {
            toValue: -9,
            duration: 330,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true
          }),
          Animated.timing(entranceY, {
            toValue: 0,
            duration: 420,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true
          })
        ])
      ]),
      Animated.sequence([
        Animated.parallel([
          Animated.timing(saluteRotation, { toValue: -1, duration: 280, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(saluteY, { toValue: -4, duration: 280, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(saluteRotation, { toValue: 1, duration: 520, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(saluteY, { toValue: 1, duration: 520, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(saluteRotation, { toValue: 0, duration: 300, easing: Easing.out(Easing.sin), useNativeDriver: true }),
          Animated.timing(saluteY, { toValue: 0, duration: 300, easing: Easing.out(Easing.sin), useNativeDriver: true })
        ])
      ])
    ]);

    const idle = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(idleY, { toValue: -5, duration: 2100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(idleRotation, { toValue: 1, duration: 2100, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(idleY, { toValue: 0, duration: 2100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(idleRotation, { toValue: -1, duration: 2100, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ])
      ])
    );

    introduction.start(({ finished }) => {
      if (finished) idle.start();
    });

    return () => {
      introduction.stop();
      idle.stop();
    };
  }, [entranceY, haloOpacity, haloScale, idleRotation, idleY, imageOpacity, imageScale, saluteRotation, saluteY, scanOpacity, scanY]);

  const saluteRotate = saluteRotation.interpolate({ inputRange: [-1, 1], outputRange: ['-2deg', '2deg'] });
  const idleRotate = idleRotation.interpolate({ inputRange: [-1, 1], outputRange: ['-0.45deg', '0.45deg'] });

  return (
    <View accessibilityLabel="Rayo, mascota de RadiologyGO" style={styles.stage}>
      <Animated.View style={[styles.halo, { opacity: haloOpacity, transform: [{ scale: haloScale }] }]} />

      <Animated.View
        style={[
          styles.card,
          {
            opacity: imageOpacity,
            transform: [
              { translateY: entranceY },
              { translateY: saluteY },
              { translateY: idleY },
              { scale: imageScale },
              { rotate: saluteRotate },
              { rotate: idleRotate }
            ]
          }
        ]}
      >
        <Image
          fadeDuration={0}
          resizeMode="cover"
          source={require('../../assets/images/RayoInicioOptimizado.jpg')}
          style={styles.image}
        />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[styles.scanGlow, { opacity: scanOpacity, transform: [{ translateY: scanY }] }]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.scanLine, { opacity: scanOpacity, transform: [{ translateY: scanY }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { width: '100%', height: CARD_HEIGHT + 14, alignItems: 'center', justifyContent: 'flex-start' },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#BDEBFF',
    borderRadius: 30,
    backgroundColor: colors.azulOscuro,
    shadowColor: colors.azulClaro,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8
  },
  image: { width: '100%', height: '100%' },
  halo: {
    position: 'absolute',
    top: 46,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: colors.azulClaro
  },
  scanGlow: {
    position: 'absolute',
    top: -5,
    width: CARD_WIDTH + 28,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.azulClaro
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    width: CARD_WIDTH + 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#C6F5FF',
    shadowColor: '#55DFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6
  }
});
