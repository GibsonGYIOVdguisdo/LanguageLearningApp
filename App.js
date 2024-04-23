import Home from './screens/Home'
import Courses from './screens/Courses'
import FlashCardHidden from './screens/FlashCardHidden'
import { useFonts } from 'expo-font'

export default function App () {
  const [fontsLoaded] = useFonts({
    Inter: require('./assets/fonts/Inter/Inter.ttf'),
    'Inter-Black': require('./assets/fonts/Inter/Inter-Black.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('./assets/fonts/Inter/Inter-ExtraBold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter/Inter-Light.ttf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter/Inter-ExtraLight.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter/Inter-SemiBold.ttf'),
    'Inter-Thin': require('./assets/fonts/Inter/Inter-Thin.ttf')
  })
  if (!fontsLoaded) {
    return null
  }
  return (
    <FlashCardHidden
      cardsCompleted='1'
      cardsToComplete='10'
      cardText='Wie geht es dir?'
    />
  )
}
