import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/src/constants/colors';
import { LearningProgressProvider } from '@/src/context/LearningProgressContext';
import { AudioProvider } from '@/src/context/AudioContext';

export default function RootLayout() {
  return (
    <AudioProvider>
      <LearningProgressProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.grisClaro } }} />
      </LearningProgressProvider>
    </AudioProvider>
  );
}
