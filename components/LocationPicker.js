import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { View, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Colors from "../constants/Colors";

import MapPreview from "./MapPreview";

const LocationPicker = props => {

    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const [pickedLocation, setPickedLocation] = useState(null);

    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    const {onLocationPicked} = props;

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    }, [mapPickedLocation, onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);

        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficent Permissions!',
                'You need to grant location permissions',
                [{text: 'Okay'}]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
       const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }

        try {
            setIsFetchingLocation(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000,
            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

        } catch (error) {
            Alert.alert(
                'Could not fetch location',
                'Please try again later or pick location on the map',
                [{text: 'Okay'}])
        }
        setIsFetchingLocation(false);
    };

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    };

 return (
      <View style={styles.locationPicker}>
          <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}/>
          {isFetchingLocation
              ?
              <ActivityIndicator size={'large'} color={Colors.primary}/>
              :
              <Text>No location chosen yet!</Text>
          }
          <View style={styles.actions}>
              <Button
                  title={'Get User Location'}
                  color={Colors.primary}
                  onPress={getLocationHandler}
              />
              <Button
                  title={'Pick on Map'}
                  color={Colors.primary}
                  onPress={pickOnMapHandler}
              />
          </View>

      </View>
 );
};

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    }
});

export default LocationPicker;