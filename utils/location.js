import axios from "axios";

export const API_KEY = 'AIzaSyALXS_1qAzYUknZa7JKSaEk3EYhA_XwNRM';

export function getMapImage(lat, long) {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=13&size=600x300&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${long}&key=${API_KEY}`;
  return url;
}

export async function getAddress(lat, long) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;
  const response = await axios.get(url);
  return response?.data?.results[0].formatted_address;

}