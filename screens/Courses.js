import Header from '../components/Header'
import Footer from '../components/Footer'

import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native'

function CourseCard (courseName, amountLearnt, amountToLearn, amountToReview) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{courseName}</Text>
        <View style={{ marginTop: 20 }}></View>
        <View style={styles.cardDivide1}>
          <View>
            <Text style={styles.cardSubText}>
              {amountToReview}
              {'\n'}to review
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Review</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.cardSubText}>
              {amountLearnt}/{amountToLearn}
              {'\n'}learnt
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Learn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

function Courses () {
  return (
    <View style={styles.body}>
      <Header />
      {CourseCard('Greetings', 4, 55, 55)}
      {CourseCard('Greetings', 23, 43, 30)}
      {CourseCard('Greetings', 0, 100, 0)}
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#121212'
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
  },
  cardButton: {
    width: 136,
    height: 53,
    borderRadius: 12,
    backgroundColor: '#A0D39C',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cardButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium'
  }
})

export default Courses
