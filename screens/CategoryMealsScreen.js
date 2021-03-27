import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

export const CategoryMealsScreen = ({ navigation }) => {
  const catId = navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return (
    <View style={styles.screen}>
      <Text>The Category Meals Screen!</Text>
      <Text>{selectedCategory.title}</Text>
      <Button
        title="Go to Meal Details!"
        onPress={() => {
          navigation.navigate('MealDetail');
        }}
      />
      <Button
        title="Go Back"
        onPress={() => {
          // To go back you can use goBack() (in others navigators)
          //navigation.goBack();
          // Or, only in StackNavigator you can use pop() too
          navigation.pop();
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
