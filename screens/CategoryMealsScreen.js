import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { DefaultText } from '../components/DefaultText';

import { MealList } from '../components/MealList';

import { CATEGORIES } from '../data/dummy-data';

export const CategoryMealsScreen = ({ navigation }) => {
  const catId = navigation.getParam('categoryId');

  const { filteredMeals } = useSelector(state => state.meals);

  const displayedMeals = filteredMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={navigation} />;
};

// If this is a function React Navigation will call it automatically
// and will pass in some navigation data
CategoryMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
