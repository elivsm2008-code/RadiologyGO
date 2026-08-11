import AsyncStorage from '@react-native-async-storage/async-storage';

import { normalizeLearningProgress } from '@/src/services/progressEngine';
import type { LearningProgress } from '@/src/types/learning';

const PROGRESS_STORAGE_KEY = '@radiologygo/learning-progress/v1';

export async function loadLearningProgress() {
  try {
    const stored = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
    return normalizeLearningProgress(stored ? JSON.parse(stored) : null);
  } catch {
    return normalizeLearningProgress(null);
  }
}

export async function saveLearningProgress(progress: LearningProgress) {
  await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}
