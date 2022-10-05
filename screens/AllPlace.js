import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import PlaceList from '../component/PlaceList';
import {useIsFocused} from '@react-navigation/native';
import {fetchPlaces} from '../utils/database';

export default function AllPlace({route}) {
  const [placeList, setPlaceList] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setPlaceList(places);
    }
    if (isFocused) {
      loadPlaces();
      // setPlaceList(curr => [...curr, route.params.place]);
    }
  }, [isFocused]);
  return (
    <View>
      <PlaceList placeList={placeList} />
    </View>
  );
}
