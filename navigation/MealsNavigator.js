import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { CategoriesScreen } from '../screens/CategoriesScreen';
import { CategoryMealsScreen } from '../screens/CategoryMealsScreen';
import { MealDetailScreen } from '../screens/MealDetailScreen';

import Colors from '../constants/Color';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      // First point when you can declare navigationOptions
      // navigationOptions: { headerTitle: 'Meal Categories Win' },
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  // Second point when you can declare navigationOptions
  {
    // defaultNavigationOptions allows you to set up options that apply to every screen
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    },

    // mode. The default value is card
    // It's the type of transition between screens. Only for iOS
    mode: 'modal',

    // The default initial Route is the first of the above (Categories)
    // but you can change it
    // initialRouteName: 'MealDetail',
  }
);

export default createAppContainer(MealsNavigator);
