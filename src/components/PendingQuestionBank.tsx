import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { RayoCompanion } from './RayoCompanion';

export function PendingQuestionBank() {
  return (
    <View style={styles.card}>
      <RayoCompanion message="El contenido para aprender ya está listo. La práctica se activará con tu banco académico oficial." pose="wave" />
      <Text style={styles.eyebrow}>PRÁCTICA PREPARADA</Text>
      <Text style={styles.title}>Banco oficial pendiente</Text>
      <Text style={styles.text}>Aquí se integrarán las 30 preguntas oficiales de esta proyección. No se han añadido preguntas provisionales.</Text>
      <View style={styles.status}><Text style={styles.statusText}>0 de 30 preguntas disponibles</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#DCE8EF', borderRadius: 22, backgroundColor: colors.blanco, padding: 18 },
  eyebrow: { marginTop: 16, color: colors.azulClaro, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  title: { marginTop: 7, color: colors.azulOscuro, fontSize: 20, fontWeight: '800' },
  text: { marginTop: 8, color: '#5E7382', fontSize: 14, lineHeight: 21 },
  status: { alignSelf: 'flex-start', marginTop: 16, borderRadius: 14, backgroundColor: '#EDF3F6', paddingHorizontal: 12, paddingVertical: 7 },
  statusText: { color: '#718492', fontSize: 11, fontWeight: '700' }
});

