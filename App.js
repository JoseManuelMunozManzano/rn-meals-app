import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSplashScreen } from './hooks/useSplashScreen';

export default function App() {
  const { dataLoaded, onLayoutRootView } = useSplashScreen();

  if (!dataLoaded) {
    return null;
  }

  return (
    <View style={styles.screen} onLayout={onLayoutRootView}>
      <Text>Hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
