import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigator';

function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;