import HomeScreen from './screens/Home';
import Courses from './screens/Courses';
import FlashCardHiddenScreen from './screens/FlashCardHidden';
import FlashCardShownScreen from './screens/FlashCardShown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { DoAllWordDecays } from './utils/WordLearning';
import { SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();

export default function App() {
  DoAllWordDecays('German');
  const [fontsLoaded] = useFonts({
    'Inter': require('./assets/fonts/Inter/Inter.ttf'),
    'Inter-Black': require('./assets/fonts/Inter/Inter-Black.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('./assets/fonts/Inter/Inter-ExtraBold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter/Inter-Light.ttf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter/Inter-ExtraLight.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter/Inter-SemiBold.ttf'),
    'Inter-Thin': require('./assets/fonts/Inter/Inter-Thin.ttf')
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen
          name="flashCardShown"
          component={FlashCardShownScreen}
          options={{ animation: 'none' }}
        />
        <Stack.Screen
          name="flashCardHidden"
          component={FlashCardHiddenScreen}
        />
        <Stack.Screen
          name="courses"
          component={Courses}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
