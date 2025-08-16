import { View, Text, StyleSheet } from 'react-native';

function FocusBattleScreen() {
  return (
    <View style={styles.container}>
      <Text>Focus Battle Screen</Text>
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

export default FocusBattleScreen;