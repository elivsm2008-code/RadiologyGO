export type AudioPreferences = {
  effectsEnabled: boolean;
  effectsVolume: number;
  musicEnabled: boolean;
  musicVolume: number;
};

export type SoundEffect = 'answerCorrect' | 'answerIncorrect' | 'challengeComplete' | 'badgeUnlocked' | 'verificationComplete';
