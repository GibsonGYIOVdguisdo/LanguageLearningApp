import { StyleSheet, Text, View, Image } from 'react-native';

function FooterCategory(CategoryTitle, ImageSource){
  return(
    <View style={styles.footer}>
        
      <View style={styles.footerCategoryContainer}>
        <Image style={styles.footerIcon} source={ImageSource} />
        <Text style={styles.footerCategoryText}>
          {CategoryTitle}
        </Text>
      </View>
    </View>
  )
}

function Footer(){
  return(
  <View style={styles.footer}>
    {FooterCategory("Home", require("../assets/images/home-icon.png"))}
    {FooterCategory("Course", require("../assets/images/book.png"))}
  </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 56,
    backgroundColor: "#282828",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  footerCategoryContainer:{
    alignItems: "center",
  },
  footerCategoryText:{
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
    color: "white",
    fontFamily: "Inter"
  },
  footerIcon: {
    height: 27,
    width: 30,
    overflow: "visible",
    resizeMode: "contain"
  }
});

export default Footer;