import FlashcardHeader from '../components/FlashcardHeader';

import {
  StyleSheet,
  View,
  Platform,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

function FlashCardFooter() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={[styles.button, styles.terribleButton]}>
        <Text style={styles.buttonText}>Terrible</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.badButton]}>
        <Text style={styles.buttonText}>Bad</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.goodButton]}>
        <Text style={styles.buttonText}>Good</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.perfectButton]}>
        <Text style={styles.buttonText}>Perfect</Text>
      </TouchableOpacity>
    </View>
  );
}

function FlashCardShown({
  cardText,
  cardTranslation,
  cardsCompleted,
  cardsToComplete
}) {
  return (
    <View style={styles.body}>
      <FlashcardHeader />
      <Text style={styles.flashcardProgressText}>
        {cardsCompleted}/{cardsToComplete}
      </Text>

      <Text style={styles.flashcardText}>{cardText}</Text>
      <View style={styles.horizontalLine}></View>
      <Text style={styles.flashcardText}>{cardTranslation}</Text>
      {FlashCardFooter()}
    </View>
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
export default FlashCardShown;
