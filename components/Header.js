import { StyleSheet, Text, View, Image } from 'react-native';


function Header(){
  return(
    <View style={styles.header}>
      <Image style={styles.burgerIcon} source={require("../assets/images/burger-icon.png")} />
      <Text style={styles.headerText}>German</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: "100%",
    backgroundColor: "#282828",
    flexDirection: "row",
    alignItems: "center"
  },
  headerText:{
    fontFamily: "Inter",
    marginLeft: 15,
    color: "white",
    fontWeight:"600",
    fontSize:22,
    verticalAlign: "middle",
    marginBottom: 4
  },
  burgerIcon:{
    marginLeft: 18,
    width: 23,
    height: 23
  }
});

export default Header;