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

          // push works like navigate.
          //navigation.push('CategoryMeals');
          // But you can go to a page where you already are on
          //navigation.push('Categories');

          // To go to CategoryMeals but you don't want to add it to the stack, but
          // you want to instead replace your current component in the stack with it.
          // That means that you won't be able to go back on the new page, because
          // the stack would be empty (in this example) thereafter
          // This could be used on a login screen where a user did sign in, and once
          // signed in, the user shouldn't be able to go back to the login screen.
          //navigation.replace('CategoryMeals');
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
