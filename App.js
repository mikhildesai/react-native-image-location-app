/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPlace from './screens/AllPlace';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import {init} from './utils/database';
import PlaceDetails from './screens/PlaceDetails';
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Stack = createNativeStackNavigator();

function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch(err => console.log(err));
  }, []);

  if (!dbInitialized) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AllPlaces"
          component={AllPlace}
          options={({navigation}) => ({
            headerRight: () => (
              <Button
                title="Add"
                onPress={() => navigation.navigate('AddPlace')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{title: 'Add Your Places'}}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="PlaceDetail" component={PlaceDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
