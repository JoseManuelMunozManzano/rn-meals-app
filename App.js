import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useSplashScreen } from './hooks/useSplashScreen';
import MealsNavigator from './navigation/MealsNavigator';

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
