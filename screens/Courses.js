import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { IsWordLearnt, DoesWordNeedReview } from '../utils/WordLearning';
import CardButton from '../components/CardButton';
import { useEffect, useState } from 'react';
import {
  ChooseWordsToLearn,
  ChooseWordsToReview
} from '../utils/FlashCardChoosing';
import { GetAllSections, GetAllWords } from '../utils/CourseInteraction';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
  ScrollView
} from 'react-native';

async function GetAllCourseCards(navigation) {
  let returnArray = [];
  const sections = GetAllSections('German');
  for (let section of sections) {
    let allWords = GetAllWords('German', section);
    let wordCount = allWords.length;
    let learntWords = 0;
    let wordsToReview = 0;
    for (word of allWords) {
      if (await DoesWordNeedReview(word)) {
        wordsToReview += 1;
      }
      if (await IsWordLearnt(word)) {
        learntWords += 1;
      }
    }
    returnArray.push(
      CourseCard(navigation, section, learntWords, wordCount, wordsToReview)
    );
  }
  return returnArray;
}

function CourseCard(
  navigation,
  courseName,
  amountLearnt,
  amountToLearn,
  amountToReview
) {
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
            <CardButton
              text="Review"
              onPress={() => {
                ChooseWordsToReview(courseName).then((words) => {
                  navigation.navigate('flashCardHidden', [words, 0]);
                });
              }}
            />
          </View>
          <View>
            <Text style={styles.cardSubText}>
              {amountLearnt}/{amountToLearn}
              {'\n'}learnt
            </Text>
            <CardButton
              text="Learn"
              onPress={() => {
                ChooseWordsToLearn(courseName).then((words) => {
                  navigation.navigate('flashCardHidden', [words, 0]);
                });
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function Courses() {
  const [courseCards, setCourseCards] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    GetAllCourseCards(navigation).then((result) => {
      setCourseCards(result);
    });
  }, []);

  return (
    <View style={styles.body}>
      <Header />
      <ScrollView style={styles.cardScroll}>
        <Text style={styles.titleText}>Course Segments</Text>
        {courseCards}
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
