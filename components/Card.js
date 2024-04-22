import { StyleSheet, Text, View, Image } from 'react-native';


function Card({text}){
  return(
    <View style={styles.cardContainer}>
        <View style={styles.card}>
            <Text style={styles.cardText}>{text}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    card:{
        width:"90%",
        height: 180,
        backgroundColor: "#282828",
        borderRadius: 29
    },
    cardText:{
        height: 27,
        marginTop: 15,
        fontSize: 18,
        color: "white",
        textAlign: "center",
        fontWeight: "500"
    },
    cardContainer:{
        flexDirection: "row",
        justifyContent: "space-around",
        width:"100%"
    }
});

export default Card;