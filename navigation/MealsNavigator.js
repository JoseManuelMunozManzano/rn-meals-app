import React from 'react';
import { Platform, LogBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'; // Tabs that looks more like iOS tabs
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'; // Tabs that looks more like Android tabs
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import { CategoriesScreen } from '../screens/CategoriesScreen';
import { CategoryMealsScreen } from '../screens/CategoryMealsScreen';
import { MealDetailScreen } from '../screens/MealDetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { FiltersScreen } from '../screens/FiltersScreen';

import Colors from '../constants/Color';

LogBox.ignoreLogs([
  'Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).',
]);

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen',
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
    mode: 'modal',
  }
);

// What we really need for our Favorites tab is not a sigle screen but another stack
const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
    mode: 'modal',
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor, // In order to work --> shifting: true
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      //tabBarLabel: 'Favorites!',
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor, // In order to work --> shifting: true
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        // With shifting: false, if you want to change your background color for the entire tab bar
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
        },
      });

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
});

const MainNavigator = createDrawerNavigator({
  MealsFavs: MealsFavTabNavigator,
  Filters: FiltersNavigator,
});

export default createAppContainer(MainNavigator);
