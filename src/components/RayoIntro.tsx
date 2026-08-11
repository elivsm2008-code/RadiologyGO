import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

import { colors } from '@/src/constants/colors';

const FRAME_SIZE = 238;
const SHEET_SIZE = FRAME_SIZE * 2;

type SpriteFrameProps = {
  column: 0 | 1;
  opacity: Animated.Value;
  row: 0 | 1;
};

function SpriteFrame({ column, opacity, row }: SpriteFrameProps) {
  return (
    <Animated.View style={[styles.frame, { opacity }]}>
      <Image
        fadeDuration={0}
        resizeMode="stretch"
        source={require('../../assets/images/RayoSprites.png')}
        style={[
          styles.spriteSheet,
          {
            left: -column * FRAME_SIZE,
            top: -row * FRAME_SIZE
          }
        ]}
      />
    </Animated.View>
  );
}

export function RayoIntro() {
  const entranceOpacity = useRef(new Animated.Value(0)).current;
  const entranceScale = useRef(new Animated.Value(0.72)).current;
  const entranceY = useRef(new Animated.Value(32)).current;
  const idleY = useRef(new Animated.Value(0)).current;
  const idleRotation = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.7)).current;
  const neutralOpacity = useRef(new Animated.Value(1)).current;
  const waveOpacity = useRef(new Animated.Value(0)).current;
  const blinkOpacity = useRef(new Animated.Value(0)).current;
  const celebrateOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showPose = (from: Animated.Value, to: Animated.Value, duration = 170) =>
      Animated.parallel([
        Animated.timing(from, { toValue: 0, duration, useNativeDriver: true }),
        Animated.timing(to, { toValue: 1, duration, useNativeDriver: true })
      ]);

    const introduction = Animated.sequence([
      Animated.delay(180),
      Animated.parallel([
        Animated.timing(entranceOpacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(entranceScale, {
          toValue: 1,
          duration: 850,
          easing: Easing.out(Easing.back(1.15)),
          useNativeDriver: true
        }),
        Animated.timing(entranceY, {
          toValue: 0,
          duration: 760,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(glowOpacity, { toValue: 0.32, duration: 260, useNativeDriver: true }),
            Animated.timing(glowScale, { toValue: 0.9, duration: 260, useNativeDriver: true })
          ]),
          Animated.parallel([
            Animated.timing(glowOpacity, { toValue: 0.08, duration: 720, useNativeDriver: true }),
            Animated.timing(glowScale, { toValue: 1.25, duration: 720, easing: Easing.out(Easing.cubic), useNativeDriver: true })
          ])
        ])
      ]),
      Animated.delay(240),
      showPose(neutralOpacity, waveOpacity),
      Animated.delay(760),
      showPose(waveOpacity, neutralOpacity),
      Animated.delay(320),
      showPose(neutralOpacity, celebrateOpacity),
      Animated.delay(520),
      showPose(celebrateOpacity, neutralOpacity)
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

    const blink = Animated.loop(
      Animated.sequence([
        Animated.delay(2800),
        showPose(neutralOpacity, blinkOpacity, 90),
        Animated.delay(130),
        showPose(blinkOpacity, neutralOpacity, 110),
        Animated.delay(1700)
      ])
    );

    const breathingGlow = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowOpacity, { toValue: 0.14, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(glowScale, { toValue: 1.32, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(glowOpacity, { toValue: 0.06, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(glowScale, { toValue: 1.18, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ])
      ])
    );

    introduction.start(({ finished }) => {
      if (finished) {
        idle.start();
        blink.start();
        breathingGlow.start();
      }
    });

    return () => {
      introduction.stop();
      idle.stop();
      blink.stop();
      breathingGlow.stop();
    };
  }, [blinkOpacity, celebrateOpacity, entranceOpacity, entranceScale, entranceY, glowOpacity, glowScale, idleRotation, idleY, neutralOpacity, waveOpacity]);

  const idleRotate = idleRotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-0.6deg', '0.6deg']
  });

  return (
    <View accessibilityLabel="Rayo, mascota animada de RadiologyGO" style={styles.stage}>
      <Animated.View style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]} />

      <Animated.View
        style={[
          styles.character,
          {
            opacity: entranceOpacity,
            transform: [
              { translateY: entranceY },
              { translateY: idleY },
              { scale: entranceScale },
              { rotate: idleRotate }
            ]
          }
        ]}
      >
        <SpriteFrame column={0} opacity={neutralOpacity} row={0} />
        <SpriteFrame column={1} opacity={waveOpacity} row={0} />
        <SpriteFrame column={0} opacity={blinkOpacity} row={1} />
        <SpriteFrame column={1} opacity={celebrateOpacity} row={1} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    width: '100%',
    height: FRAME_SIZE + 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  character: {
    width: FRAME_SIZE,
    height: FRAME_SIZE
  },
  frame: {
    position: 'absolute',
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    overflow: 'hidden'
  },
  spriteSheet: {
    position: 'absolute',
    width: SHEET_SIZE,
    height: SHEET_SIZE
  },
  glow: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: colors.azulClaro
  }
});
