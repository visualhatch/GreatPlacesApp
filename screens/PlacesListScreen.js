import React from 'react';

import { useSelector } from "react-redux";

import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";

const PlacesListScreen = props => {

    const places = useSelector(state => state.places.places);

    console.log(places);

 return (
      <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={itemData =>
              <PlaceItem
                  image={itemData.item.image}
                  title={itemData.item.title}
                  address={null}
                  onSelect={() => {
                      props.navigation.navigate('PlaceDetail',
                          {placeTitle: itemData.item.title,
                              placeId: itemData.item.id,
                          })
                  }}
              />}
      />
 );
};

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Places',
        headerRight:
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title={'Add Place'}
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlace')
                    }}
                />
            </HeaderButtons>
    }

};

const styles = StyleSheet.create({

});

export default PlacesListScreen;