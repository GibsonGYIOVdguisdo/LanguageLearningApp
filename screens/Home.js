import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CardButton from '../components/CardButton';
import {
  ChooseWordsToLearn,
  ChooseWordsToReview
} from '../utils/FlashCardChoosing';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Text,
  ScrollView
} from 'react-native';
import { useCallback, useState } from 'react';
import { GetAllWords } from '../utils/CourseInteraction';
import { DoesWordNeedReview, IsWordLearnt } from '../utils/WordLearning';
import { SafeAreaView } from 'react-native-safe-area-context';
function HopBackInCard(amountToReview, amountToLearn, amountLearnt) {
  const navigation = useNavigation();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Hop Back In</Text>
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
                ChooseWordsToReview().then((words) => {
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
                ChooseWordsToLearn().then((words) => {
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

function LearningStreakCard(currentLearningStreak, bestLearningStreak) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Learning Streak</Text>
        <View style={{ marginTop: 28 }}></View>
        <View style={styles.cardDivide1}>
          <View style={styles.dividedItem}>
            <Text style={styles.cardSubText}>Current streak</Text>
            <Text style={styles.cardBigText}>{currentLearningStreak}</Text>
          </View>
          <View style={styles.dividedItem}>
            <Text style={styles.cardSubText}>Best streak</Text>
            <Text style={styles.cardBigText}>{bestLearningStreak}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function ProgressCard(
  allTimeWordCount,
  todaysWordCount,
  allTimeMinutes,
  todaysMinutes
) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Progress</Text>
        <View style={styles.cardDivide2}>
          <View style={styles.dividedItem}>
            <Text style={[styles.cardSubText, { marginBottom: 4 }]}>
              All time
            </Text>
            <Text style={styles.cardSubText}>
              {allTimeWordCount}
              {'\n'}words
            </Text>
            <Text style={styles.cardSubText}>
              {allTimeMinutes}
              {'\n'}minutes
            </Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.dividedItem}>
            <Text style={[styles.cardSubText, { marginBottom: 4 }]}>Today</Text>
            <Text style={styles.cardSubText}>
              {todaysWordCount}
              {'\n'}words
            </Text>
            <Text style={styles.cardSubText}>
              {todaysMinutes}
              {'\n'}minutes
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function Home({
  amountToReview,
  amountToLearn,
  amountLearnt,
  currentLearningStreak,
  bestLearningStreak,
  allTimeWordCount,
  todaysWordCount,
  allTimeMinutes,
  todaysMinutes
}) {
  return (
    <SafeAreaView style={styles.body}>
      <Header />
      <ScrollView style={styles.cardScroll}>
        {HopBackInCard(amountToReview, amountToLearn, amountLearnt)}
        {LearningStreakCard(currentLearningStreak, bestLearningStreak)}
        {ProgressCard(
          allTimeWordCount,
          todaysWordCount,
          allTimeMinutes,
          todaysMinutes
        )}
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

function HomeScreen() {
  const [amountToReview, SetAmountToReview] = useState(0);
  const [amountToLearn, SetAmountToLearn] = useState(0);
  const [amountLearnt, SetAmountLearnt] = useState(0);
  const [currentLearningStreak, SetCurrentLearningStreak] = useState(0);
  const [bestLearningStreak, SetBestLearningStreak] = useState(0);
  const [allTimeWordCount, SetAllTimeWordCount] = useState(0);
  const [todaysWordCount, SetTodaysWordCount] = useState(0);
  const [allTimeMinutes, SetAllTimeMinutes] = useState(0);
  const [todaysMinutes, SetTodaysMinutes] = useState(0);

  useFocusEffect(() => {
    const GetAmountToReview = async () => {
      const words = GetAllWords('German');
      let amountToReview = 0;
      for (let word of words) {
        if (await DoesWordNeedReview(word)) {
          amountToReview += 1;
        }
      }
      return amountToReview;
    };
    const GetAmountToLearn = async () => {
      const words = GetAllWords('German');
      return words.length;
    };
    const GetAmountLearnt = async () => {
      const words = GetAllWords('German');
      let amountLearnt = 0;
      for (let word of words) {
        if (await IsWordLearnt(word)) {
          amountLearnt += 1;
        }
      }
      return amountLearnt;
    };
    GetAmountToReview().then((amount) => {
      SetAmountToReview(amount);
      SetAmountToReview(amount);
    });
    GetAmountToLearn().then((amount) => {
      SetAmountToLearn(amount);
    });
    GetAmountLearnt().then((amount) => {
      SetAmountLearnt(amount);
      SetAllTimeWordCount(amount);
    });
  });

  return Home({
    amountToReview,
    amountToLearn,
    amountLearnt,
    currentLearningStreak,
    bestLearningStreak,
    allTimeWordCount,
    todaysWordCount,
    allTimeMinutes,
    todaysMinutes
  });
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#121212'
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
  cardBigText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Inter-Medium'
  },
  cardSubText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter-Regular'
  },
  cardContainer: {
    marginTop: 33,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  cardDivide1: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  cardDivide2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    paddingTop: 7,
    paddingBottom: 10
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#D9D9D9'
  },
  dividedItem: {
    alignItems: 'center',
    flex: 1
  }
});

export default HomeScreen;
