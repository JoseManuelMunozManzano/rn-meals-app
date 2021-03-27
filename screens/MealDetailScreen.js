import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const MealDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>The Meal Detail Screen!</Text>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          // popToTop() pops all screens from the stack and takes you back to your root
          // screen
          navigation.popToTop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
