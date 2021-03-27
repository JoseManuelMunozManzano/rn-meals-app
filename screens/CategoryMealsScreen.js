import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const CategoryMealsScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>The Category Meals Screen!</Text>
      <Button
        title="Go to Meal Details!"
        onPress={() => {
          navigation.navigate('MealDetail');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
