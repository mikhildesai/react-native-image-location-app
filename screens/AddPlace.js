import {View, Text} from 'react-native';
import React from 'react';
import PlaceForm from '../component/PlaceForm';
import {insertPlace} from '../utils/database';

export default function AddPlace({navigation}) {
  async function createPlaceHandler(place) {
    console.log(place);
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  }
  return (
    <View>
      <PlaceForm onCreate={createPlaceHandler} />
    </View>
  );
}
