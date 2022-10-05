import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';

export default function PlaceItem({place}) {
  return (
    <Pressable style={styles.container}>
      <Image source={{uri: place.imageUri}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'lightblue',
    borderRadius: 4,
  },
  image: {
    flex: 1,
    height: 100,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  info: {
    flex: 2,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
