import * as FileSystem from 'expo-file-system';

import ENV from '../../Env/env'

import { insertPlace, fetchPlaces } from "../../helpers/db";
import {add} from "react-native-reanimated";

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {

    return async dispatch => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`)

        if (!response.ok) {
            throw new Error('Something went wrong getting address');
        }

        const resData = await response.json();
        // console.log(resData);

        if (!resData.results) {
            throw new Error('No address found');
        }

        const address = resData.results[0].formatted_address;

        // console.log(address)



        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                location.lat,
                location.lng
            );
            console.log(dbResult);

            dispatch ({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coordinates: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            })

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            // console.log(dbResult);
            dispatch({
                type: SET_PLACES,
                places: dbResult.rows._array
            })

        } catch (error) {
            throw error;
        }
    }
};