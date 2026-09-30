import { StyleSheet, View } from 'react-native';

import { RayoCompanion } from './RayoCompanion';

export function RayoTip() {
  return <View style={styles.container}><RayoCompanion message="¿Qué vamos a posicionar hoy?" pose="neutral" size={68} /></View>;
}

const styles = StyleSheet.create({ container: { marginTop: 22 } });

