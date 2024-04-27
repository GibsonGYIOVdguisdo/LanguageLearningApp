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

function LoadNextCard(navigation, words, currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= words.length) {
    navigation.navigate('home');
  } else {
    navigation.navigate('flashCardHidden', [words, nextIndex]);
  }
}

function FlashCardFooter(words, currentIndex) {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.button, styles.terribleButton]}
        onPress={() => {
          LoadNextCard(navigation, words, currentIndex);
        }}
      >
        <Text style={styles.buttonText}>Terrible</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.badButton]}
        onPress={() => {
          LoadNextCard(navigation, words, currentIndex);
        }}
      >
        <Text style={styles.buttonText}>Bad</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.goodButton]}
        onPress={() => {
          LoadNextCard(navigation, words, currentIndex);
        }}
      >
        <Text style={styles.buttonText}>Good</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.perfectButton]}
        onPress={() => {
          LoadNextCard(navigation, words, currentIndex);
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
  let words = navigation.route.params[0];
  let currentIndex = navigation.route.params[1];
  let cardText = words[currentIndex][0];
  let cardTranslation = words[currentIndex][1];
  let cardsCompleted = currentIndex;
  let cardsToComplete = words.length;
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
