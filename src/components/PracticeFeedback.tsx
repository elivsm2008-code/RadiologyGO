import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';

type PracticeFeedbackProps = {
  correct: boolean;
  explanation?: string;
  message?: string;
};

export function PracticeFeedback({ correct, explanation, message }: PracticeFeedbackProps) {
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(entrance, { friction: 9, tension: 80, toValue: 1, useNativeDriver: true }).start();
  }, [entrance]);

  return (
    <Animated.View style={[styles.card, correct ? styles.correct : styles.review, { opacity: entrance, transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }]}>
      <View style={styles.signal} />
      <View style={styles.copy}>
        <Text style={styles.title}>{message ?? (correct ? '¡Correcto!' : 'Casi. Revisemos este paso.')}</Text>
        <Text style={styles.text}>{explanation ?? 'Aquí aparecerá la explicación técnica validada para convertir la respuesta en aprendizaje.'}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', borderRadius: 18, padding: 16 },
  correct: { backgroundColor: '#EAF6FC' },
  review: { backgroundColor: '#F3F1FF' },
  signal: { width: 5, borderRadius: 3, backgroundColor: colors.azulClaro },
  copy: { flex: 1, marginLeft: 13 },
  title: { color: colors.azulOscuro, fontSize: 16, fontWeight: '800' },
  text: { marginTop: 5, color: '#5E7382', fontSize: 13, lineHeight: 19 }
});
