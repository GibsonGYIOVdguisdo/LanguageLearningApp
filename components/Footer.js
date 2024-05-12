import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
function FooterCategory(CategoryTitle, ImageSource, PageToSelect) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.footerCategoryContainer}
      onPress={() => navigation.navigate(PageToSelect)}
    >
      <Image style={styles.footerIcon} source={ImageSource} />
      <Text style={styles.footerCategoryText}>{CategoryTitle}</Text>
    </TouchableOpacity>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      {FooterCategory(
        'Home',
        require('../assets/images/home-icon.png'),
        'home'
      )}
      {FooterCategory(
        'Course',
        require('../assets/images/book.png'),
        'courses'
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 56,
    backgroundColor: '#282828',
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  footerCategoryContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  footerCategoryText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    color: 'white',
    fontFamily: 'Inter-Medium'
  },
  footerIcon: {
    height: 25,
    width: 30,
    overflow: 'visible',
    resizeMode: 'contain'
  }
});

export default Footer;
