import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { AppState, type AppStateStatus } from 'react-native';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { audioAssets } from '@/src/constants/audioAssets';
import { defaultAudioPreferences, loadAudioPreferences, saveAudioPreferences } from '@/src/services/audioPreferencesStorage';
import type { AudioPreferences, SoundEffect } from '@/src/types/audio';

type AudioContextValue = {
  hasMusicAsset: boolean;
  isHydrated: boolean;
  playEffect: (effect: SoundEffect) => void;
  preferences: AudioPreferences;
  setEffectsEnabled: (enabled: boolean) => void;
  setEffectsVolume: (volume: number) => void;
  setMusicEnabled: (enabled: boolean) => void;
  setMusicVolume: (volume: number) => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: PropsWithChildren) {
  const [preferences, setPreferences] = useState(defaultAudioPreferences);
  const [isHydrated, setIsHydrated] = useState(false);
  const preferencesRef = useRef(preferences);
  const appStateRef = useRef<AppStateStatus>((AppState.currentState ?? 'active') as AppStateStatus);
  const musicPlayerRef = useRef<AudioPlayer | null>(null);
  const effectPlayerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    setAudioModeAsync({
      interruptionMode: 'mixWithOthers',
      playsInSilentMode: false,
      shouldPlayInBackground: false
    }).catch(() => undefined);
    loadAudioPreferences().then((stored) => {
      preferencesRef.current = stored;
      setPreferences(stored);
      setIsHydrated(true);
    });
    return () => {
      musicPlayerRef.current?.remove();
      effectPlayerRef.current?.remove();
      musicPlayerRef.current = null;
      effectPlayerRef.current = null;
    };
  }, []);

  const syncMusic = (next: AudioPreferences, state = appStateRef.current) => {
    if (!audioAssets.backgroundMusic) return;
    if (!musicPlayerRef.current) {
      musicPlayerRef.current = createAudioPlayer(audioAssets.backgroundMusic);
      musicPlayerRef.current.loop = true;
    }
    musicPlayerRef.current.volume = next.musicVolume;
    if (next.musicEnabled && state === 'active') musicPlayerRef.current.play();
    else musicPlayerRef.current.pause();
  };

  useEffect(() => {
    if (!isHydrated) return;
    preferencesRef.current = preferences;
    saveAudioPreferences(preferences).catch(() => undefined);
    syncMusic(preferences);
  }, [isHydrated, preferences]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      appStateRef.current = nextState;
      syncMusic(preferencesRef.current, nextState);
    });
    return () => subscription.remove();
  }, []);

  const update = (patch: Partial<AudioPreferences>) => setPreferences((current) => ({ ...current, ...patch }));
  const value = useMemo<AudioContextValue>(() => ({
    hasMusicAsset: Boolean(audioAssets.backgroundMusic),
    isHydrated,
    preferences,
    setMusicEnabled: (musicEnabled) => update({ musicEnabled }),
    setEffectsEnabled: (effectsEnabled) => update({ effectsEnabled }),
    setMusicVolume: (musicVolume) => update({ musicVolume: Math.max(0, Math.min(1, musicVolume)) }),
    setEffectsVolume: (effectsVolume) => update({ effectsVolume: Math.max(0, Math.min(1, effectsVolume)) }),
    playEffect: (effect) => {
      const current = preferencesRef.current;
      const source = audioAssets.effects[effect];
      if (!current.effectsEnabled || !source || appStateRef.current !== 'active') return;
      effectPlayerRef.current?.remove();
      const player = createAudioPlayer(source);
      player.volume = current.effectsVolume;
      effectPlayerRef.current = player;
      player.play();
    }
  }), [isHydrated, preferences]);

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio debe utilizarse dentro de AudioProvider');
  return context;
}
