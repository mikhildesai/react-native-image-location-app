import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import PlaceItem from './PlaceItem';

export default function PlaceList({placeList}) {
  let listPreview = (
    <Text style={styles.previewText}> No Places Added Yet!</Text>
  );
  if (placeList.length > 0) {
    listPreview = (
      <FlatList
        data={placeList}
        keyExtractor={item => item.id}
        renderItem={({item}) => <PlaceItem place={item} />}
      />
    );
  }
  return <View>{listPreview}</View>;
}

const styles = StyleSheet.create({
  previewText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
