import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/styles/ThemeProvider';
import useAppBlocker from './src/hooks/useAppBlocker';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import useSetupStore from './src/store/setupStore';
import SetupScreen from './src/screens/SetupScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'MedievalSharp-Book': require('./src/assets/fonts/medieval_sharp/MedievalSharp-Book.ttf'),
    'MedievalSharp-Bold': require('./src/assets/fonts/medieval_sharp/MedievalSharp-Bold.ttf'),
    'MedievalSharp-BookOblique': require('./src/assets/fonts/medieval_sharp/MedievalSharp-BookOblique.ttf'),
    'MedievalSharp-BoldOblique': require('./src/assets/fonts/medieval_sharp/MedievalSharp-BoldOblique.ttf'),
  });
  const { isSetupComplete } = useSetupStore();

  useAppBlocker();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ThemeProvider>
      {isSetupComplete ? <AppNavigator /> : <SetupScreen />}
    </ThemeProvider>
  );
}
