import {
  GetAllWords,
  GetTranslation,
  GetAllSections,
  GetAllWordPairs
} from './CourseInteraction';
import { DoesWordNeedReview, IsWordLearnt } from './WordLearning';

async function GetNextWordsToReview(section) {
  let words = [];
  let sectionWords = GetAllWords('German', section);
  for (let word of sectionWords) {
    if (words.length >= 10) {
      break;
    }
    if (await DoesWordNeedReview(word)) {
      words.push([word, GetTranslation('German', section, word)]);
    }
  }
  return words;
}

async function GetNextWordsToLearn(section) {
  let words = [];
  for (let word of GetAllWords('German', section)) {
    if (words.length >= 10) {
      break;
    }
    if (!(await IsWordLearnt(word))) {
      words.push([word, GetTranslation('German', section, word)]);
    }
  }
  return words;
}
async function GetRandomWords(section) {
  let words = [];
  let wordsToChooseFrom = [];
  let cardAmount = 10;
  if (section) {
    for (let word of GetAllWords('German', section)) {
      wordsToChooseFrom.push([word, GetTranslation('German', section, word)]);
    }
  } else {
    for (let section of GetAllSections('German')) {
      for (let word of GetAllWords('German', section)) {
        wordsToChooseFrom.push([word, GetTranslation('German', section, word)]);
      }
    }
  }
  cardAmount = Math.min(wordsToChooseFrom.length, 10);
  for (let i = 0; i < cardAmount; i++) {
    let chosenIndex = Math.floor(Math.random() * wordsToChooseFrom.length);
    let chosenWord = wordsToChooseFrom[chosenIndex];
    words.push(chosenWord);
    wordsToChooseFrom.splice(chosenIndex, 1);
  }
  return words;
}

async function ShuffleWords(words) {
  let newWords = [];
  while (words.length !== 0) {
    let chosenIndex = Math.floor(Math.random() * words.length);
    let chosenWord = words[chosenIndex];
    words.splice(chosenIndex, 1);
    newWords.push(chosenWord);
  }
  return newWords;
}

async function getWordsToLearnFromSection(section, fill = true) {
  words = [];
  words = words.concat(await GetNextWordsToLearn(section));
  if (words.length === 0 && fill) {
    words = words.concat(await GetNextWordsToReview(section));
  }
  if (words.length === 0 && fill) {
    words = words.concat(await GetRandomWords(section));
  }
  return words;
}

async function ChooseWordsToLearn(section) {
  let words = [];
  if (section) {
    words = words.concat(await getWordsToLearnFromSection(section));
  } else {
    for (let section of GetAllSections('German')) {
      words = words.concat(await getWordsToLearnFromSection(section, false));
      if (words.length >= 10) {
        words = words.slice(0, 10);
        break;
      }
    }
    if (words.length === 0) {
      words = await GetRandomWords();
    }
  }
  return words;
}
async function getWordsToReviewFromSection(section, fill = true) {
  words = [];
  words = words.concat(await GetNextWordsToReview(section));
  if (words.length === 0 && fill) {
    words = words.concat(await GetRandomWords(section));
  }
  return words;
}

async function ChooseWordsToReview(section) {
  let words = [];
  if (section) {
    words = words.concat(await getWordsToReviewFromSection(section));
  } else {
    for (let section of GetAllSections('German')) {
      words = words.concat(await getWordsToReviewFromSection(section, false));
      if (words.length >= 10) {
        words = words.slice(0, 10);
        break;
      }
    }
    if (words.length === 0) {
      words = await GetRandomWords();
    }
  }
  words = await ShuffleWords(words);
  return words;
}

export { ChooseWordsToReview, ChooseWordsToLearn };
