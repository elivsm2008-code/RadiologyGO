import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

import { colors } from '@/src/constants/colors';

const IMAGE_HEIGHT = 300;
const IMAGE_WIDTH = IMAGE_HEIGHT * (471 / 824);

export function RayoIntro() {
  const revealHeight = useRef(new Animated.Value(0)).current;
  const beamPosition = useRef(new Animated.Value(0)).current;
  const beamOpacity = useRef(new Animated.Value(0)).current;
  const pulseOpacity = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(0.55)).current;
  const activationY = useRef(new Animated.Value(0)).current;
  const saluteY = useRef(new Animated.Value(0)).current;
  const saluteRotation = useRef(new Animated.Value(0)).current;
  const idleY = useRef(new Animated.Value(0)).current;
  const idleRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scan = Animated.sequence([
      Animated.delay(280),
      Animated.parallel([
        Animated.timing(revealHeight, {
          toValue: IMAGE_HEIGHT,
          duration: 2500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false
        }),
        Animated.timing(beamPosition, {
          toValue: IMAGE_HEIGHT,
          duration: 2500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.sequence([
          Animated.timing(beamOpacity, { toValue: 1, duration: 260, useNativeDriver: true }),
          Animated.delay(1950),
          Animated.timing(beamOpacity, { toValue: 0, duration: 290, useNativeDriver: true })
        ])
      ]),
      Animated.parallel([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(pulseOpacity, { toValue: 0.24, duration: 180, useNativeDriver: true }),
            Animated.timing(pulseScale, { toValue: 0.78, duration: 180, useNativeDriver: true })
          ]),
          Animated.parallel([
            Animated.timing(pulseOpacity, { toValue: 0, duration: 760, useNativeDriver: true }),
            Animated.timing(pulseScale, {
              toValue: 1.45,
              duration: 760,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true
            })
          ])
        ]),
        Animated.sequence([
          Animated.timing(activationY, {
            toValue: -10,
            duration: 360,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true
          }),
          Animated.timing(activationY, {
            toValue: 2,
            duration: 300,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true
          }),
          Animated.timing(activationY, {
            toValue: 0,
            duration: 220,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true
          })
        ])
      ]),
      Animated.sequence([
        Animated.parallel([
          Animated.timing(saluteRotation, { toValue: -1, duration: 310, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(saluteY, { toValue: -4, duration: 310, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(saluteRotation, { toValue: 0, duration: 280, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(saluteY, { toValue: 0, duration: 280, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(saluteRotation, { toValue: 1, duration: 310, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(saluteY, { toValue: -3, duration: 310, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(saluteRotation, { toValue: 0, duration: 300, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(saluteY, { toValue: 0, duration: 300, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
        ])
      ])
    ]);

    const idle = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(idleY, { toValue: -5, duration: 1900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(idleRotation, { toValue: 1, duration: 1900, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(idleY, { toValue: 0, duration: 1900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(idleRotation, { toValue: -1, duration: 1900, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ])
      ])
    );

    scan.start(({ finished }) => {
      if (finished) idle.start();
    });

    return () => {
      scan.stop();
      idle.stop();
    };
  }, [activationY, beamOpacity, beamPosition, idleRotation, idleY, pulseOpacity, pulseScale, revealHeight, saluteRotation, saluteY]);

  const saluteRotate = saluteRotation.interpolate({ inputRange: [-1, 1], outputRange: ['-2.2deg', '2.2deg'] });
  const idleRotate = idleRotation.interpolate({ inputRange: [-1, 1], outputRange: ['-0.5deg', '0.5deg'] });

  return (
    <View accessibilityLabel="Rayo, mascota de RadiologyGO" style={styles.stage}>
      <Animated.View style={[styles.energyPulse, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]} />

      <Animated.View style={{ transform: [{ translateY: activationY }, { translateY: saluteY }, { rotate: saluteRotate }] }}>
        <Animated.View style={{ transform: [{ translateY: idleY }, { rotate: idleRotate }] }}>
          <View style={styles.imageFrame}>
            <Animated.View style={[styles.revealWindow, { height: revealHeight }]}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/Rayo.png')}
                style={styles.image}
              />
            </Animated.View>
          </View>
        </Animated.View>
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[styles.beamGlow, { opacity: beamOpacity, transform: [{ translateY: beamPosition }] }]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.scanBeam, { opacity: beamOpacity, transform: [{ translateY: beamPosition }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { width: '100%', height: IMAGE_HEIGHT, alignItems: 'center', justifyContent: 'flex-start' },
  imageFrame: { width: IMAGE_WIDTH, height: IMAGE_HEIGHT, overflow: 'hidden', backgroundColor: colors.blanco },
  revealWindow: { width: IMAGE_WIDTH, overflow: 'hidden' },
  image: { position: 'absolute', top: 0, left: 0, width: IMAGE_WIDTH, height: IMAGE_HEIGHT },
  energyPulse: {
    position: 'absolute',
    top: 66,
    width: 176,
    height: 176,
    borderRadius: 88,
    backgroundColor: colors.azulClaro
  },
  beamGlow: {
    position: 'absolute',
    top: -5,
    width: IMAGE_WIDTH + 46,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.azulClaro
  },
  scanBeam: {
    position: 'absolute',
    top: 0,
    width: IMAGE_WIDTH + 30,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#79DFFF',
    shadowColor: colors.azulClaro,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 7,
    elevation: 5
  }
});
