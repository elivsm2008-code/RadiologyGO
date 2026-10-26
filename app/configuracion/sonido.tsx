import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { useAudio } from '@/src/context/AudioContext';

function VolumeControl({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const percent = Math.round(value * 100);
  return <View style={styles.volumeBlock}>
    <View style={styles.row}><Text style={styles.optionTitle}>{label}</Text><Text style={styles.percent}>{percent}%</Text></View>
    <View style={styles.volumeRow}>
      <Pressable accessibilityLabel={`Bajar ${label}`} onPress={() => onChange(value - 0.1)} style={styles.stepButton}><Text style={styles.stepText}>−</Text></Pressable>
      <View style={styles.track}><View style={[styles.fill, { width: `${percent}%` }]} /></View>
      <Pressable accessibilityLabel={`Subir ${label}`} onPress={() => onChange(value + 0.1)} style={styles.stepButton}><Text style={styles.stepText}>+</Text></Pressable>
    </View>
  </View>;
}

export default function SoundSettingsScreen() {
  const { hasMusicAsset, isHydrated, preferences, setEffectsEnabled, setEffectsVolume, setMusicEnabled, setMusicVolume } = useAudio();
  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.content}>
    <Text accessibilityRole="button" onPress={() => router.back()} style={styles.back}>‹  Configuración</Text>
    <View style={styles.header}><Text style={styles.eyebrow}>CONFIGURACIÓN</Text><Text style={styles.title}>Sonido y música</Text><Text style={styles.subtitle}>Personaliza el ambiente de estudio de RadiologyGO.</Text></View>
    {!isHydrated ? <View style={styles.card}><Text style={styles.note}>Cargando preferencias…</Text></View> : <>
      <View style={styles.card}>
        <View style={styles.row}><View style={styles.copy}><Text style={styles.optionTitle}>Música de fondo</Text><Text style={styles.optionText}>Música ambiental suave durante el estudio.</Text></View><Switch disabled={!hasMusicAsset} onValueChange={setMusicEnabled} trackColor={{ false:'#C9D4DB', true:colors.azulClaro }} value={hasMusicAsset && preferences.musicEnabled} /></View>
        {!hasMusicAsset && <Text style={styles.notice}>La infraestructura está lista. Añade una pista original en assets/audio para habilitar esta opción.</Text>}
        <VolumeControl label="Volumen de música" onChange={setMusicVolume} value={preferences.musicVolume} />
      </View>
      <View style={styles.card}>
        <View style={styles.row}><View style={styles.copy}><Text style={styles.optionTitle}>Efectos de sonido</Text><Text style={styles.optionText}>Respuestas, desafíos, insignias y verificaciones.</Text></View><Switch onValueChange={setEffectsEnabled} trackColor={{ false:'#C9D4DB', true:colors.azulClaro }} value={preferences.effectsEnabled} /></View>
        <VolumeControl label="Volumen de efectos" onChange={setEffectsVolume} value={preferences.effectsVolume} />
      </View>
      <Text style={styles.note}>RadiologyGO respeta el modo silencioso y mezcla su audio con otras aplicaciones.</Text>
    </>}
  </ScrollView></SafeAreaView>;
}

const styles=StyleSheet.create({safeArea:{flex:1,backgroundColor:colors.grisClaro},content:{width:'100%',maxWidth:720,alignSelf:'center',paddingHorizontal:20,paddingVertical:22,paddingBottom:40},back:{alignSelf:'flex-start',color:colors.azulClaro,fontSize:16,fontWeight:'700',paddingVertical:8},header:{marginTop:24,marginBottom:20},eyebrow:{color:colors.morado,fontSize:11,fontWeight:'800',letterSpacing:1.3},title:{marginTop:8,color:colors.azulOscuro,fontSize:29,fontWeight:'800'},subtitle:{marginTop:8,color:'#637988',fontSize:14,lineHeight:21},card:{marginBottom:14,borderWidth:1,borderColor:'#DDE7ED',borderRadius:22,backgroundColor:colors.blanco,padding:18},row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:14},copy:{flex:1},optionTitle:{color:colors.azulOscuro,fontSize:16,fontWeight:'800'},optionText:{marginTop:4,color:'#667B89',fontSize:12,lineHeight:18},notice:{marginTop:14,borderRadius:12,backgroundColor:'#F3F1FF',padding:12,color:'#675D8D',fontSize:12,lineHeight:18},volumeBlock:{marginTop:20},percent:{color:colors.azulClaro,fontSize:14,fontWeight:'800'},volumeRow:{marginTop:10,flexDirection:'row',alignItems:'center',gap:12},stepButton:{width:40,height:40,alignItems:'center',justifyContent:'center',borderRadius:14,backgroundColor:'#EAF6FC'},stepText:{color:colors.azulOscuro,fontSize:23,fontWeight:'700'},track:{flex:1,height:10,overflow:'hidden',borderRadius:5,backgroundColor:'#E4EBEF'},fill:{height:'100%',borderRadius:5,backgroundColor:colors.azulClaro},note:{marginTop:4,color:'#71838F',fontSize:12,lineHeight:18,textAlign:'center'}});
