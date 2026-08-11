import { StyleSheet, Text, View } from 'react-native';

import { learningSectionTitles } from '@/src/data/thumbLearning';
import { colors } from '@/src/constants/colors';

export function ProjectionLearningMode() {
  return (
    <View style={styles.list}>
      {learningSectionTitles.map((title) => (
        <View key={title} style={styles.section}>
          <View style={styles.marker} />
          <View style={styles.copy}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.placeholder}>Pendiente de contenido técnico validado.</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12 },
  section: { flexDirection: 'row', borderWidth: 1, borderColor: '#E3EBF1', borderRadius: 18, backgroundColor: colors.blanco, padding: 16 },
  marker: { width: 5, borderRadius: 3, backgroundColor: colors.azulClaro },
  copy: { flex: 1, marginLeft: 13 },
  title: { color: colors.azulOscuro, fontSize: 16, fontWeight: '700' },
  placeholder: { marginTop: 5, color: '#718492', fontSize: 13, lineHeight: 19 }
});
