import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

function HopBackInCard(amountToReview, amountToLearn, amountLearnt) {

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Hop back in</Text>
        <View style={styles.hopBackInCardDivide}>
          <View>
            <Text style={styles.cardSubText}>
              {amountToReview}
              {"\n"}to review
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Review</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.cardSubText}>
              {amountLearnt}/{amountToLearn}
              {"\n"}learnt
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Learn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

function ProgressCard(AllTimeWordCount, TodaysWordCount, AllTimeMinutes, TodaysMinutes){
  
}

function LearningStreakCard(currentLearningStreak, bestLearningStreak){

}

function Home({ amountToReview, amountToLearn, amountLearnt }) {
  return (
    <View style={styles.body}>
      <Header />
      <ScrollView style={styles.cardView}>
        {HopBackInCard(amountToReview, amountToLearn, amountLearnt)}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "#121212",
  },
  cardView: {
    paddingTop: 33,
    width: "100%",
    height: "auto",
    flexDirection: "column",
    overflow: "scroll",
  },

  card: {
    width: "90%",
    height: 180,
    backgroundColor: "#282828",
    borderRadius: 29,
  },
  cardText: {
    height: 27,
    marginTop: 15,
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "Inter",
  },
  cardSubText: {
    marginTop: 15,
    fontSize: 16,
    color: "white",
    textAlign: "center",
    fontWeight: "400",
    fontFamily: "Inter",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cardButton: {
    width: 136,
    height: 53,
    borderRadius: 12,
    backgroundColor: "#A0D39C",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cardButtonText: {
    fontSize: 16,
    fontFamily: "Inter",
  },
  hopBackInCardDivide: {
    width: "100%",
    marginTop: 1,
    justifyContent: "space-around",
    flexDirection: "row",
  },
});

export default Home;
