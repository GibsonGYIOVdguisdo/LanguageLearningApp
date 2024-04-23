import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

function Header () {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>German</Text>
      <TouchableOpacity>
        <Image
          style={styles.crossIcon}
          source={require('../assets/images/cross-icon.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#282828',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 10
  },
  headerText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    fontWeight: '600',
    fontSize: 22,
    verticalAlign: 'middle',
    marginBottom: 4
  },
  crossIcon: {
    marginLeft: 18,
    width: 23,
    height: 23
  }
})

export default Header
