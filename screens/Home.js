import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
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
  AllTimeWordCount,
  TodaysWordCount,
  AllTimeMinutes,
  TodaysMinutes
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
              {AllTimeWordCount}
              {'\n'}words
            </Text>
            <Text style={styles.cardSubText}>
              {AllTimeMinutes}
              {'\n'}minutes
            </Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.dividedItem}>
            <Text style={[styles.cardSubText, { marginBottom: 4 }]}>Today</Text>
            <Text style={styles.cardSubText}>
              {TodaysWordCount}
              {'\n'}words
            </Text>
            <Text style={styles.cardSubText}>
              {TodaysMinutes}
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
  AllTimeWordCount,
  TodaysWordCount,
  AllTimeMinutes,
  TodaysMinutes
}) {
  return (
    <View style={styles.body}>
      <Header />
      <ScrollView style={styles.cardScroll}>
        {HopBackInCard(amountToReview, amountToLearn, amountLearnt)}
        {LearningStreakCard(currentLearningStreak, bestLearningStreak)}
        {ProgressCard(
          AllTimeWordCount,
          TodaysWordCount,
          AllTimeMinutes,
          TodaysMinutes
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}

function HomeScreen() {
  let amountToReview = 1;
  let amountToLearn = 1;
  let amountLearnt = 1;
  let currentLearningStreak = 1;
  let bestLearningStreak = 1;
  let AllTimeWordCount = 1;
  let TodaysWordCount = 1;
  let AllTimeMinutes = 1;
  let TodaysMinutes = 1;

  return Home({
    amountToReview,
    amountToLearn,
    amountLearnt,
    currentLearningStreak,
    bestLearningStreak,
    AllTimeWordCount,
    TodaysWordCount,
    AllTimeMinutes,
    TodaysMinutes
  });
}

const styles = StyleSheet.create({
  body: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
