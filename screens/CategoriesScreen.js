import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const CategoriesScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>The Categories Screen!</Text>
      <Button
        title="Go to Meals!"
        onPress={() => {
          // navigation.navigate('CategoryMeals')
          navigation.navigate({ routeName: 'CategoryMeals' });
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
