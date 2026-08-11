import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PositioningCategoryCard, type PositioningCategory } from '@/src/components/PositioningCategoryCard';
import { RayoTip } from '@/src/components/RayoTip';
import { SearchBar } from '@/src/components/SearchBar';
import { colors } from '@/src/constants/colors';

const categories: PositioningCategory[] = [
  { code: 'CR', title: 'Cráneo y cara', description: 'Cráneo, senos paranasales y huesos faciales', slug: 'craneo-y-cara' },
  { code: 'TX', title: 'Tórax', description: 'Tórax y caja torácica', slug: 'torax' },
  { code: 'CV', title: 'Columna vertebral', description: 'Cervical, torácica y lumbar', slug: 'columna-vertebral' },
  { code: 'MS', title: 'Miembro superior', description: 'Hombro, húmero, codo, antebrazo, muñeca, mano y dedos', slug: 'miembro-superior' },
  { code: 'MI', title: 'Miembro inferior', description: 'Pelvis, fémur, rodilla, pierna, tobillo, pie y dedos', slug: 'miembro-inferior' }
];

export default function PositioningsScreen() {
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');
    if (!normalizedQuery) return categories;

    return categories.filter((category) =>
      `${category.title} ${category.description}`.toLocaleLowerCase('es').includes(normalizedQuery)
    );
  }, [query]);

  const openCategory = (category: PositioningCategory) => {
    if (category.slug === 'miembro-superior') {
      router.push('/posicionamientos/miembro-superior');
      return;
    }

    router.push({ pathname: '/posicionamientos/[region]', params: { region: category.slug, title: category.title } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>‹  Inicio</Text>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>PRÁCTICA RADIOGRÁFICA</Text>
          <Text style={styles.title}>Posicionamientos</Text>
          <Text style={styles.subtitle}>Explora y practica las principales proyecciones radiográficas.</Text>
          <RayoTip />
        </View>

        <SearchBar onChangeText={setQuery} value={query} />

        <View style={styles.list}>
          {filteredCategories.map((category, index) => (
            <PositioningCategoryCard
              category={category}
              index={index}
              key={category.slug}
              onPress={() => openCategory(category)}
            />
          ))}
          {filteredCategories.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Sin resultados</Text>
              <Text style={styles.emptyText}>Prueba con el nombre de otra región o estudio.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.grisClaro },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 36 },
  backButton: { alignSelf: 'flex-start', color: colors.azulClaro, fontSize: 16, fontWeight: '700', paddingVertical: 8, paddingRight: 16 },
  header: { marginTop: 18, marginBottom: 24 },
  eyebrow: { color: colors.azulClaro, fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  title: { marginTop: 8, color: colors.azulOscuro, fontSize: 32, fontWeight: '800', letterSpacing: -0.6 },
  subtitle: { maxWidth: 500, marginTop: 9, color: '#5D7282', fontSize: 15, lineHeight: 22 },
  list: { gap: 14, marginTop: 22 },
  emptyState: { alignItems: 'center', borderRadius: 20, backgroundColor: colors.blanco, padding: 28 },
  emptyTitle: { color: colors.azulOscuro, fontSize: 18, fontWeight: '700' },
  emptyText: { marginTop: 7, color: '#6D8190', fontSize: 14, textAlign: 'center' }
});
