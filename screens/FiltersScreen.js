import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Switch, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import { CustomHeaderButton } from '../components/CustomHeaderButton';
import Colors from '../constants/Color';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = ({ label, state, onChange }) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        value={state}
        onValueChange={onChange}
      />
    </View>
  );
};

export const FiltersScreen = ({ navigation }) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  // A way of communicating between component and navigation options.
  // It's a typical pattern that you need when you have action items in
  // your action bar and you want to trigger something that depends on
  // data managed in your component with the help of these buttons.

  // We use useCallback to avoid unnecessary rebuilds of this function.
  // So that when you update the params and therefore this component rebuilds,
  // you don't also rebuild that function and therefore also enter an infinite loop.
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lastoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    // We can use setParams() to update the params values for the currently loaded screen.
    // If you had existing params, you'd still use setParams() like this. Your new params
    // get merged with existing params.
    // IMPORTANT: setParams() causes the component to rebuild because its props
    //    (the navigation prop) change
    navigation.setParams({ save: saveFilters });
    // We delete navigation because it will generate an infinite loop
  }, [
    //navigation,
    saveFilters,
  ]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={() => {
            navData.navigation.getParam('save')();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
});
