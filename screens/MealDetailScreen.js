import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { MEALS } from '../data/dummy-data';

export const MealDetailScreen = ({ navigation }) => {
  mealId = navigation.getParam('mealId');

  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
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

MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return {
    headerTitle: selectedMeal.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
