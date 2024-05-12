import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAllWords } from './CourseInteraction';

// How often a decay is done in milliseconds
let decayInterval = 1 * 24 * 60 * 60 * 1000;
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
    return parseInt(storedVal);
  }
  return 0;
}

async function LearnWord(word, buttonPressed) {
  const progress = await GetWordProgress(word);
  const progressIncrement = learnAmount[buttonPressed];
  const newProgress = progress + progressIncrement;
  let decayDate = new Date().getTime();
  decayDate = decayDate + decayInterval;
  AsyncStorage.setItem('words_german_progress_' + word, newProgress.toString());
  AsyncStorage.setItem('words_german_decay_' + word, decayDate.toString());
}

async function ShouldWordDecay(word) {
  const currentDate = new Date().getTime();
  const decayDate = await GetDecayDate(word);
  return currentDate > decayDate && (await GetWordProgress(word)) > -1;
}

async function DoWordDelay(word) {
  const currentDate = new Date().getTime();
  const decayDate = currentDate + decayInterval;
  const progress = await GetWordProgress(word);
  const decayAmount = 1 * Math.floor((currentDate - decayDate) / decayInterval);
  const newProgress = Math.max(progress - decayAmount, -1);
  AsyncStorage.setItem('words_german_progress_' + word, newProgress.toString());
  AsyncStorage.setItem('words_german_decay_' + word, decayDate.toString());
}

async function DoAllWordDecays(courseName) {
  const words = GetAllWords(courseName);
  for (let word of words) {
    if (await ShouldWordDecay(word)) {
      DoWordDelay(word);
    }
  }
}
export {
  IsWordLearnt,
  LearnWord,
  GetWordProgress,
  IsWordPerfected,
  GetDecayDate,
  DoesWordNeedReview,
  DoAllWordDecays
};
