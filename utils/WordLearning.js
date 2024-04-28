import AsyncStorage from '@react-native-async-storage/async-storage';

function IsWordLearnt(word) {
  if (!AsyncStorage.getItem('words_german_' + word)) {
  }
  return false;
}
function SetWordLearnt(word) {
  if (!AsyncStorage.getItem('words_german_' + word)) {
  }
  return false;
}

export default IsWordLearnt;
