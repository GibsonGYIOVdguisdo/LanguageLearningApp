import { StyleSheet, TouchableOpacity, Text } from 'react-native';
function CardButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.cardButton} onPress={onPress}>
      <Text style={styles.cardButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
export default CardButton;
