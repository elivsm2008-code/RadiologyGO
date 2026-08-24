import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import type { LearningProjection } from '@/src/data/thumbLearning';

type ProjectionLearningModeProps = {
  projection: LearningProjection;
};

export function ProjectionLearningMode({ projection }: ProjectionLearningModeProps) {
  return (
    <View style={styles.list}>
      {projection.learningSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <View style={styles.icon}><Text style={styles.iconText}>{section.code}</Text></View>
          <View style={styles.copy}>
            <Text style={styles.title}>{section.title}</Text>
            {section.content.map((paragraph) => (
              <View key={paragraph} style={styles.contentRow}>
                {section.content.length > 1 && <View style={styles.bullet} />}
                <Text style={styles.content}>{paragraph}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12 },
  section: { flexDirection: 'row', borderWidth: 1, borderColor: '#E3EBF1', borderRadius: 18, backgroundColor: colors.blanco, padding: 16 },
  icon: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#EAF6FC' },
  iconText: { color: colors.azulOscuro, fontSize: 10, fontWeight: '800' },
  copy: { flex: 1, marginLeft: 13 },
  title: { color: colors.azulOscuro, fontSize: 16, fontWeight: '800' },
  contentRow: { flexDirection: 'row', marginTop: 7 },
  bullet: { width: 5, height: 5, marginTop: 7, marginRight: 8, borderRadius: 3, backgroundColor: colors.azulClaro },
  content: { flex: 1, color: '#5E7382', fontSize: 14, lineHeight: 21 }
});

