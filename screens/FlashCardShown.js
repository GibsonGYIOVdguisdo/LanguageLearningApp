import FlashcardHeader from '../components/FlashcardHeader';

import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

function LoadNextCard(words, currentIndex) {
  console.log('sss');
  const navigation = useNavigation();
  let nextIndex = currentIndex + 1;
  if (nextIndex >= words.length) {
    console.log('Home');
    navigation.navigate('home');
  } else {
    console.log('next');
  }
}

function FlashCardFooter(words, currentIndex) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.button, styles.terribleButton]}
        onPress={() => {
          LoadNextCard(words, currentIndex);
        }}
      >
        <Text style={styles.buttonText}>Terrible</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.badButton]}
        onPress={() => {
          LoadNextCard(words, currentIndex);
        }}
      >
        <Text style={styles.buttonText}>Bad</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.goodButton]}
        onPress={() => {
          LoadNextCard(words, currentIndex);
        }}
      >
        <Text style={styles.buttonText}>Good</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.perfectButton]}
        onPress={() => {
          LoadNextCard(words, currentIndex);
        }}
      >
        <Text style={styles.buttonText}>Perfect</Text>
      </TouchableOpacity>
    </View>
  );
}

function FlashCardShown(
  cardText,
  cardTranslation,
  cardsCompleted,
  cardsToComplete,
  words,
  currentIndex
) {
  return (
    <View style={styles.body}>
      <FlashcardHeader />
      <Text style={styles.flashcardProgressText}>
        {cardsCompleted}/{cardsToComplete}
      </Text>

      <Text style={styles.flashcardText}>{cardText}</Text>
      <View style={styles.horizontalLine}></View>
      <Text style={styles.flashcardText}>{cardTranslation}</Text>
      {FlashCardFooter(words, currentIndex)}
    </View>
  );
}
function FlashCardShownScreen(navigation) {
  console.log(navigation);
  let words = navigation.route.params[0];
  let currentIndex = navigation.route.params[1];

  console.log('VALUES');
  console.log(words);
  let cardText = 'aaaf';
  console.log('1');
  let cardTranslation = 'bbbf';
  console.log('2');
  let cardsCompleted = currentIndex;
  console.log('3');
  let cardsToComplete = '1';
  console.log('4');
  return FlashCardShown(
    cardText,
    cardTranslation,
    cardsCompleted,
    cardsToComplete,
    words,
    currentIndex
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#121212'
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row'
  },
  button: {
    height: 56,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  terribleButton: {
    backgroundColor: '#C70000'
  },
  badButton: {
    backgroundColor: '#DF8600'
  },
  goodButton: {
    backgroundColor: '#95B903'
  },
  perfectButton: {
    backgroundColor: '#00960F'
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Inter-Medium'
  },
  flashcardProgressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    marginLeft: 10,
    marginTop: 10,
    color: 'white'
  },
  flashcardText: {
    marginTop: 15,
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    textAlign: 'center'
  },
  horizontalLine: {
    marginTop: 20,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#D9D9D9',
    height: 1,
    alignSelf: 'center'
  }
});
export default FlashCardShownScreen;
