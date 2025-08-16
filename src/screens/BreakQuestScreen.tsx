import { View, Text, StyleSheet } from 'react-native';

function BreakQuestScreen() {
  return (
    <View style={styles.container}>
      <Text>Break Quest Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BreakQuestScreen;