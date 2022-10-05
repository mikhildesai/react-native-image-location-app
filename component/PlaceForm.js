import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import { Place } from '../models/places';

export default function PlaceForm({onCreate}) {
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  function updateText(enteredText) {
    setTitle(enteredText);
  }

  function imageSelectHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  function locationSelectHandler(location) {
    setSelectedLocation(location);
  }

  function submitHandler() {
    const placeData = new Place(title, selectedImage, selectedLocation);
    onCreate(placeData);
  }

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={updateText}
        />
      </View>
      <ImagePicker onImageSelect={imageSelectHandler} />
      <LocationPicker onLocationSelect={locationSelectHandler} />
      <View style={styles.rootContainer}>
        <Button
          style={styles.rootContainer}
          title="Add Place"
          color="green"
          onPress={submitHandler}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },

  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: 'lightblue',
    borderRadius: 8,
  },
});
