import type { AudioSource } from 'expo-audio';

/**
 * Registro central de audio. Se mantiene en null hasta que existan archivos
 * originales/licenciados. Para conectar uno, colócalo en assets/audio y cambia,
 * por ejemplo, backgroundMusic a require('../../assets/audio/background-music.mp3').
 */
export const audioAssets: {
  backgroundMusic: AudioSource | null;
  effects: Record<string, AudioSource | null>;
} = {
  backgroundMusic: null,
  effects: {
    answerCorrect: null,
    answerIncorrect: null,
    challengeComplete: null,
    badgeUnlocked: null,
    verificationComplete: null
  }
};
