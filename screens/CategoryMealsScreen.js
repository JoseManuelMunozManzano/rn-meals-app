import React from 'react';

import { MealList } from '../components/MealList';

import { CATEGORIES, MEALS } from '../data/dummy-data';

export const CategoryMealsScreen = ({ navigation }) => {
  const catId = navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

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
