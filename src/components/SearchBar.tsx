import { StyleSheet, TextInput, View } from 'react-native';

import { colors } from '@/src/constants/colors';

type SearchBarProps = {
  onChangeText: (value: string) => void;
  value: string;
};

export function SearchBar({ onChangeText, value }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View aria-hidden style={styles.searchIcon}>
        <View style={styles.searchCircle} />
        <View style={styles.searchHandle} />
      </View>
      <TextInput
        accessibilityLabel="Buscar una región o estudio"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder="Buscar una región o estudio..."
        placeholderTextColor="#7A8D9C"
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DFE8EF',
    borderRadius: 17,
    backgroundColor: colors.blanco,
    paddingHorizontal: 17
  },
  searchIcon: { width: 24, height: 24, marginRight: 11 },
  searchCircle: { position: 'absolute', top: 2, left: 2, width: 15, height: 15, borderWidth: 2, borderColor: colors.azulClaro, borderRadius: 8 },
  searchHandle: { position: 'absolute', top: 16, left: 16, width: 8, height: 2, borderRadius: 1, backgroundColor: colors.azulClaro, transform: [{ rotate: '45deg' }] },
  input: { flex: 1, color: colors.azulOscuro, fontSize: 15, paddingVertical: 14 }
});
