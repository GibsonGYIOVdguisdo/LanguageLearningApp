import AsyncStorage from '@react-native-async-storage/async-storage';

function IsWordLearnt(word) {
  const storedVal = AsyncStorage.getItem('words_german_progress_' + word);
  if (storedVal) {
    return parseInt(storedVal) > 0;
  }
  return false;
}

function LearnWord(word) {
  let date = new Date().getDate() + 1;
  AsyncStorage.setItem('words_german_progress_' + word, '1');
  AsyncStorage.setItem('words_german_lastGap_' + word, '1');
  AsyncStorage.setItem('words_german_nextReview_' + word, Date.toString(date));
}

function GetReviewGap(word) {
  const storedVal = AsyncStorage.getItem('words_german_lastGap_' + word);
  if (storedVal) {
    return parseInt(storedVal);
  }
  return 0;
}

function GetReviewDate(word) {
  const storedVal = AsyncStorage.getItem('words_german_nextReview_' + word);
  if (storedVal) {
    return Date.parse(storedVal);
  }
  return new Date();
}
export { IsWordLearnt, LearnWord, GetReviewDate, GetReviewGap };
