import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { CategoriesScreen } from '../screens/CategoriesScreen';
import { CategoryMealsScreen } from '../screens/CategoryMealsScreen';
import { MealDetailScreen } from '../screens/MealDetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';

import Colors from '../constants/Color';

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
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    },

    mode: 'modal',
  }
);

// We can (and must!) use multiple navigators.
const MealsFavTabNavigator = createBottomTabNavigator({
  // One is our Stack Navigator
  Meals: MealsNavigator,
  Favorites: FavoritesScreen,
});

// We export MealsFavTabNavigator that includes MealsNavigator
export default createAppContainer(MealsFavTabNavigator);
