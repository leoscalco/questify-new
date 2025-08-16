import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/styles/ThemeProvider';
import useAppBlocker from './src/hooks/useAppBlocker';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    MedievalSharp: require('./src/assets/fonts/MedievalSharp-Regular.ttf'),
  });

  useAppBlocker();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
