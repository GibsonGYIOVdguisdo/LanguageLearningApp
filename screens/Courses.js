import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { IsWordLearnt } from '../utils/WordLearning';
import CardButton from '../components/CardButton';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const languageLocation = '../languageCourses/german.json';
const languageCourse = require(languageLocation);

function GetAllCourseCards() {
  let returnArray = [];
  for (let section of GetCourseSections()) {
    let allWords = Object.keys(languageCourse.German[section]);
    let wordCount = allWords.length;
    let learntWords = 0;
    for (word in allWords) {
      if (IsWordLearnt(word)) {
        learntWords += 1;
      }
    }
    returnArray.push(CourseCard(section, learntWords, wordCount, 1));
  }
  return returnArray;
}

function GetCourseSections() {
  const sections = Object.keys(languageCourse.German);
  return sections;
}
function GetNextWordsToLearn(section) {
  const languageLocation = '../languageCourses/german.json';
  const languageCourse = require(languageLocation);
  let words = [];
  for (let word in languageCourse.German[section]) {
    if (words.length >= 10) {
      break;
    }
    if (!IsWordLearnt(word)) {
      words.push([word, languageCourse.German[section][word]]);
    }
  }
  return words;
}

function CourseCard(courseName, amountLearnt, amountToLearn, amountToReview) {
  const navigation = useNavigation();
  navigation.navi;
  return (
    <View style={styles.cardContainer} key={courseName}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{courseName}</Text>
        <View style={{ marginTop: 20 }}></View>
        <View style={styles.cardDivide1}>
          <View>
            <Text style={styles.cardSubText}>
              {amountToReview}
              {'\n'}to review
            </Text>
            <CardButton text="Review" />
          </View>
          <View>
            <Text style={styles.cardSubText}>
              {amountLearnt}/{amountToLearn}
              {'\n'}learnt
            </Text>
            <CardButton
              text="Learn"
              onPress={() => {
                navigation.navigate('flashCardHidden', [
                  GetNextWordsToLearn(courseName),
                  0
                ]);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function Courses() {
  return (
    <View style={styles.body}>
      <Header />
      <ScrollView style={styles.cardScroll}>
        <Text style={styles.titleText}>Course Segments</Text>
        {GetAllCourseCards()}
        <View style={{ height: 30 }}></View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#121212'
  },
  titleText: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'Inter-SemiBold',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white'
  },
  cardScroll: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    overflow: 'scroll'
  },
  card: {
    width: '90%',
    height: 180,
    backgroundColor: '#282828',
    borderRadius: 29
  },
  cardText: {
    height: 27,
    marginTop: 15,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold'
  },
  cardSubText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter-Regular'
  },
  cardDivide1: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  cardContainer: {
    marginTop: 33,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default Courses;
