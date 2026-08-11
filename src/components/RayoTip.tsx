import { Image, ImageStyle, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';

const AVATAR_SIZE = 68;

export function RayoTip() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          resizeMode="stretch"
          source={require('../../assets/images/RayoSprites.png')}
          style={styles.sprite as ImageStyle}
        />
      </View>
      <View style={styles.bubble}>
        <View style={styles.bubblePointer} />
        <Text style={styles.text}>¿Qué vamos a posicionar hoy?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginTop: 22 },
  avatar: { width: AVATAR_SIZE, height: AVATAR_SIZE, overflow: 'hidden', borderRadius: 22, backgroundColor: '#EAF6FC' },
  sprite: { position: 'absolute', top: 0, left: 0, width: AVATAR_SIZE * 2, height: AVATAR_SIZE * 2 },
  bubble: { flex: 1, minHeight: 52, justifyContent: 'center', marginLeft: 12, borderRadius: 16, backgroundColor: colors.blanco, paddingHorizontal: 16, paddingVertical: 10 },
  bubblePointer: { position: 'absolute', left: -6, width: 14, height: 14, backgroundColor: colors.blanco, transform: [{ rotate: '45deg' }] },
  text: { color: colors.azulOscuro, fontSize: 14, fontWeight: '600', lineHeight: 20 }
});
