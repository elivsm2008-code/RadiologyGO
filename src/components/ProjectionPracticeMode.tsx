import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { practiceChallengeTitles } from '@/src/data/thumbLearning';

export function ProjectionPracticeMode() {
  return (
    <View>
      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Práctica preparada</Text>
        <Text style={styles.noticeText}>Los desafíos se activarán cuando incorporemos las preguntas y respuestas técnicas validadas.</Text>
      </View>

      <View style={styles.steps}>
        {practiceChallengeTitles.map((title, index) => (
          <View key={title} style={styles.step}>
            <View style={styles.number}><Text style={styles.numberText}>{index + 1}</Text></View>
            <View style={styles.stepCopy}>
              <Text style={styles.stepTitle}>{title}</Text>
              <Text style={styles.stepStatus}>Pendiente de contenido</Text>
            </View>
            <View style={styles.lock} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: { borderRadius: 20, backgroundColor: '#EAF6FC', padding: 18 },
  noticeTitle: { color: colors.azulOscuro, fontSize: 17, fontWeight: '800' },
  noticeText: { marginTop: 7, color: '#557183', fontSize: 14, lineHeight: 21 },
  steps: { gap: 12, marginTop: 16 },
  step: { minHeight: 76, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E3EBF1', borderRadius: 18, backgroundColor: colors.blanco, padding: 14 },
  number: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 19, backgroundColor: colors.grisClaro },
  numberText: { color: colors.azulClaro, fontSize: 14, fontWeight: '800' },
  stepCopy: { flex: 1, marginHorizontal: 13 },
  stepTitle: { color: colors.azulOscuro, fontSize: 15, fontWeight: '700' },
  stepStatus: { marginTop: 4, color: '#7A8D9C', fontSize: 12 },
  lock: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#C9D6DF' }
});
