import React from 'react';
import { StyleSheet, View } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { useSplashScreen } from './hooks/useSplashScreen';
import MealsNavigator from './navigation/MealsNavigator';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mealsReducer } from './store/reducers/meals';

// For better performance, especially in larger applications
enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const { dataLoaded, onLayoutRootView } = useSplashScreen();

  if (!dataLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.screen} onLayout={onLayoutRootView}>
        <MealsNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
