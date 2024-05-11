import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from 'react-native';

// How often a decay is done in days
const decayInterval = 2;

const learnAmount = {
  'terrible': 0,
  'bad': 1,
  'good': 2,
  'perfect': 4
};

async function IsWordLearnt(word) {
  const storedVal = await AsyncStorage.getItem('words_german_progress_' + word);
  if (storedVal) {
    return parseInt(storedVal) >= 0;
  }
  return false;
}

async function DoesWordNeedReview(word) {
  const storedVal = await AsyncStorage.getItem('words_german_progress_' + word);
  if (storedVal) {
    return parseInt(storedVal) != -1 && parseInt(storedVal) < 4;
  }
  return false;
}
async function IsWordPerfected(word) {
  const storedVal = await AsyncStorage.getItem('words_german_progress_' + word);
  if (storedVal) {
    return parseInt(storedVal) >= 5;
  }
  return false;
}

async function GetWordProgress(word) {
  const storedVal = await AsyncStorage.getItem('words_german_progress_' + word);
  if (storedVal) {
    return parseInt(storedVal);
  }
  return -1;
}

async function GetDecayDate(word) {
  const storedVal = await AsyncStorage.getItem('words_german_decay_' + word);
  if (storedVal) {
    return Date.parse(storedVal);
  }
  return false;
}

async function LearnWord(word, buttonPressed) {
  const progress = await GetWordProgress(word);
  const progressIncrement = learnAmount[buttonPressed];
  const newProgress = progress + progressIncrement;
  let decayDate = new Date();
  decayDate.setDate(decayDate.getDate() + decayInterval);
  AsyncStorage.setItem('words_german_progress_' + word, newProgress.toString());
  AsyncStorage.setItem('words_german_decay_' + word, Date.toString(decayDate));
}

export {
  IsWordLearnt,
  LearnWord,
  GetWordProgress,
  IsWordPerfected,
  GetDecayDate,
  DoesWordNeedReview
};
