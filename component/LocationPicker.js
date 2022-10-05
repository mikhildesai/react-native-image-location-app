import {
  View,
  Text,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {API_KEY, getAddress, getMapImage} from '../utils/location';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

export default function LocationPicker({onLocationSelect}) {
  const [pickedLocation, setPickedLocation] = useState();
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused && route.params) {
      const pickedFromMap = {
        latitude: route.params.pickedLat,
        longitude: route.params.pickedLong,
      };
      console.log(pickedFromMap);
      setPickedLocation(pickedFromMap);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function helper() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.latitude,
          pickedLocation.longitude,
        );
        onLocationSelect({...pickedLocation, address: address});
      }
    }
    helper();
  }, [pickedLocation, onLocationSelect]);

  function mapHandler() {
    navigation.navigate('Map');
  }
  let mapImagePreview = <Text>No Location Picked yet!</Text>;
  if (pickedLocation) {
    mapImagePreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapImage(pickedLocation.latitude, pickedLocation.longitude),
        }}
      />
    );
  }
  const getLocationaccess = async () => {
    const chckLocationPermission = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      getLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message:
              'We required Location permission in order to get device location ' +
              'Please grant us.',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          alert("You don't have access for the location");
        }
      } catch (err) {
        alert("You don't have access ");
      }
    }
  };

  const getLocation = () => {
    Geocoder.init(API_KEY, {language: 'en'});
    Geolocation.getCurrentPosition(
      position => {
        // let ret = await Geocoder.from({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude,
        // });
        console.log('logging the location', position);
        console.log('latitude', position.coords.latitude);
        console.log('longitude', position.coords.longitude);
        setPickedLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // ret.results[0].address_components.forEach(item => {
        //   if (item.types[0] === 'country') {
        //   }
        // });
      },
      _error => {
        if (_error?.code === 1) {
          getLocationaccess();
        } else {
          getLocationaccess();
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.locationPreview}>{mapImagePreview}</View>
      <View style={styles.buttonContainer}>
        <Button title="Locate User" onPress={getLocation} />
        <Button title="Pick on Map" onPress={mapHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 20,
  },
  locationPreview: {
    width: '100%',
    height: 150,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
