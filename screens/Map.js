/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, Button, StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';

export default function Map({navigation}) {
  const [pickedLocation, setPickedLocation] = useState();

  function mapPressHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setPickedLocation({lat: lat, lng: lng});
  }
  function savePickedLocation() {
    if (!pickedLocation) {
      Alert.alert(
        'No Location Picked',
        'Please Tap on the Map to select location then tap save',
      );
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: pickedLocation.lat,
      pickedLong: pickedLocation.lng,
    });
  }
  const region = {
    latitude: 18.98,
    longitude: 73.11,
    latitudeDelta: 0.098,
    longitudeDelta: 0.0421,
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="save" onPress={savePickedLocation} />,
    });
  }, [navigation, pickedLocation]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={event => mapPressHandler(event)}>
      {pickedLocation && (
        <Marker
          title="picked location"
          pinColor="red"
          coordinate={{
            latitude: pickedLocation.lat ? pickedLocation.lat : 0,
            longitude: pickedLocation.lng ? pickedLocation.lng : 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
