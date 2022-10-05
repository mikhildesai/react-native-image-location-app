import {View, Text, Button, StyleSheet, Image} from 'react-native';

import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function ImagePicker({onImageSelect}) {
  const [img, setImg] = useState({fileData: '', filePath: '', fileUri: ''});
  async function openCamera() {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    });
    //console.log(result);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      setImg({
        filePath: result,
        fileData: result.assets[0].data,
        fileUri: result.assets[0].uri,
      });
      onImageSelect(result.assets[0].uri);
    }
  }
 
  async function openGallery() {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    return result;
  }
  let imagePreview = <Text>No Images yet!</Text>;
  if (img.fileUri) {
    imagePreview = <Image source={{uri: img.fileUri}} style={styles.image} />;
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Take Image" onPress={openCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer:{
    marginHorizontal:20
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePreview: {
    width: '100%',
    height: 150,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    
  },
});
