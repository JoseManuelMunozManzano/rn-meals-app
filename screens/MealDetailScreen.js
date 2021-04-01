import React, { useEffect, useCallback } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { CustomHeaderButton } from '../components/CustomHeaderButton';
import { DefaultText } from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

export const MealDetailScreen = ({ navigation }) => {
  const mealId = navigation.getParam('mealId');

  const { meals } = useSelector(state => state.meals);
  const { favoriteMeals } = useSelector(state => state.meals);

  const currentMealIsFavorite = favoriteMeals.some(meal => meal.id === mealId);

  const selectedMeal = meals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  // Again useCallback() in order to avoid infinite loop in useEffect()
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  // This way, with useEffect, we have to wait for the first render to finish
  // Instead we should pass this initial data into this component when we navigate to it
  useEffect(() => {
    navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  // First way to communicate redux data to navigation options
  // With setParams() and useEffect() to avoid infinite loop
  // NOT THE OPTIMAL SOLUTION because the first time we don't have the title
  // and it last a moment to load.
  // useEffect(() => {
  //   navigation.setParams({ mealTitle: selectedMeal.title });
  // }, [selectedMeal]);

  // Second way to communicate redux data to navigation options
  // Simply forward the title which we'll need from inside the
  // component you're coming from, so that you load it when you are in the
  // component that will go to his component and you send it to this component
  // before it's loaded.
  // So, we received the title from FavoritesScreen and CategoryMealsScreen
  // and in both we use MealList, so there, in MealList, in the navigation, we add the title

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId');
  // First way to communicate redux data to navigation options
  // Retrieving the params from useEffect() and setParams() above
  // Or
  // Second way to communicate redux data to navigation options
  // Retrieving the params from MealList.js
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);

  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});
