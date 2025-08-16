import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import FocusBattleScreen from '../screens/FocusBattleScreen';
import { useTheme } from 'styled-components/native';

const Stack = createStackNavigator();

function AppNavigator() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.secondary,
          },
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontFamily: theme.fonts.main,
          },
        }}>
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => <TabNavigator theme={theme} />}
        </Stack.Screen>
        <Stack.Screen
          name="FocusBattle"
          component={FocusBattleScreen}
          options={{ title: 'Focus Battle' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;