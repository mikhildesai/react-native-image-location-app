import SQLite from 'react-native-sqlite-storage';
import {openDatabase} from 'react-native-sqlite-storage';
import {Place} from '../models/places';
const database = SQLite.openDatabase({name: 'places.db'});

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
          )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          var temp = [];
          for (let i = 0; i < result.rows.length; ++i) {
            temp.push(result.rows.item(i));
          }
          const places = [];
          for (const dp of temp) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {address: dp.address, lat: dp.latitude, lng: dp.longitude},
                dp.id,
              ),
            );
          }
          console.log(temp);
          resolve(places);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
  return promise;
}
