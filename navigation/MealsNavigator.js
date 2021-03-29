import React from 'react';
import { Platform, LogBox, Text } from 'react-native';
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
import Color from '../constants/Color';

LogBox.ignoreLogs([
  'Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).',
]);

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
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
    MealDetail: {
      screen: MealDetailScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
    mode: 'modal',
  }
);

// What we really need for our Favorites tab is not a sigle screen but another stack
const FavNavigator = createStackNavigator(
  {
    Favorites: { screen: FavoritesScreen },
    MealDetail: { screen: MealDetailScreen },
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
      //tabBarLabel: 'Meals!!!',
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        ) : (
          'Meals'
        ),
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
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
        ) : (
          'Favorites'
        ),
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
          labelStyle: {
            fontFamily: 'open-sans',
          },
          activeTintColor: Colors.accentColor,
        },
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    // Option 1 for changing the title in the drawer tab: Only available if we use inside of other Navigator
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!',
    // },
    defaultNavigationOptions: defaultStackNavOptions,
    mode: 'modal',
  }
);

const MainNavigator = createDrawerNavigator(
  {
    // Option 2 for changing the title in the drawer tab
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Color.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold',
        fontWeight: 'normal', // necessary in order to work fontFamily
      },
    },
  }
);

export default createAppContainer(MainNavigator);
