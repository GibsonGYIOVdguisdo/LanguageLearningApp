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

function FlashCardHidden(
  cardText,
  cardsCompleted,
  cardsToComplete,
  words,
  currentIndex
) {
  const navigation = useNavigation();
  return (
    <View style={styles.body}>
      <FlashcardHeader />
      <Text style={styles.flashcardProgressText}>
        {cardsCompleted}/{cardsToComplete}
      </Text>
      <Text style={styles.flashcardText}>{cardText}</Text>
      <TouchableOpacity
        style={styles.revealButton}
        onPress={() => {
          navigation.navigate('flashCardShown', [words, currentIndex]);
        }}
      >
        <Text style={styles.buttonText}>Show translation</Text>
      </TouchableOpacity>
    </View>
  );
}

function FlashCardHiddenScreen(navigation) {
  let words = navigation.route.params[0];
  let currentIndex = navigation.route.params[1];
  let maxIndex = words.length;
  return FlashCardHidden(
    words[currentIndex][0],
    currentIndex,
    maxIndex,
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
  revealButton: {
    height: 56,
    backgroundColor: '#A0D39C',
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 15,
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
  }
});
export default FlashCardHiddenScreen;
