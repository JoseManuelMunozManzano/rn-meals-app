import React from 'react';
import { StyleSheet, View } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { useSplashScreen } from './hooks/useSplashScreen';
import MealsNavigator from './navigation/MealsNavigator';

// For better performance, especially in larger applications
enableScreens();

export default function App() {
  const { dataLoaded, onLayoutRootView } = useSplashScreen();

  if (!dataLoaded) {
    return null;
  }

  return (
    <View style={styles.screen} onLayout={onLayoutRootView}>
      <MealsNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
