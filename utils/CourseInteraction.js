const courses = {
  'German': require('../languageCourses/German.json')
};

function GetCourse(courseName) {
  return courses[courseName][courseName];
}

function GetAllSections(courseName) {
  const sections = Object.keys(GetCourse(courseName));
  return sections;
}

function GetAllWords(courseName, section) {
  if (section) {
    const courseContent = GetCourse(courseName);
    return Object.keys(courseContent[section]);
  }
  let words = [];
  for (section of GetAllSections(courseName)) {
    words.concat(GetAllWords(courseName, section));
  }
  return words;
}

function GetAllWordPairs(courseName, section) {
  const courseContent = GetCourse(courseName);
  if (section) {
    return courseContent[section];
  }
  let words = [];
  for (section of GetAllSections(courseName)) {
    words.concat(GetAllWords(courseName, section));
  }
  return words;
}

function GetTranslation(courseName, section, word) {
  const wordPairs = GetAllWordPairs(courseName, section);
  return wordPairs[word];
}

export {
  GetCourse,
  GetTranslation,
  GetAllWordPairs,
  GetAllWords,
  GetAllSections
};
