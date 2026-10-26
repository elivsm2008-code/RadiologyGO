import AsyncStorage from '@react-native-async-storage/async-storage';

import type { AudioPreferences } from '@/src/types/audio';

const AUDIO_PREFERENCES_KEY = '@radiologygo/audio-preferences/v1';

export const defaultAudioPreferences: AudioPreferences = {
  musicEnabled: false,
  effectsEnabled: true,
  musicVolume: 0.2,
  effectsVolume: 0.45
};

const clamp = (value: unknown, fallback: number) => typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : fallback;

export async function loadAudioPreferences(): Promise<AudioPreferences> {
  try {
    const stored = await AsyncStorage.getItem(AUDIO_PREFERENCES_KEY);
    if (!stored) return defaultAudioPreferences;
    const parsed = JSON.parse(stored) as Partial<AudioPreferences>;
    return {
      musicEnabled: parsed.musicEnabled === true,
      effectsEnabled: parsed.effectsEnabled !== false,
      musicVolume: clamp(parsed.musicVolume, defaultAudioPreferences.musicVolume),
      effectsVolume: clamp(parsed.effectsVolume, defaultAudioPreferences.effectsVolume)
    };
  } catch {
    return defaultAudioPreferences;
  }
}

export async function saveAudioPreferences(preferences: AudioPreferences) {
  await AsyncStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(preferences));
}
