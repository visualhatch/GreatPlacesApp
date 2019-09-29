import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import * as placesActions from '../store/actions/places'

import {ScrollView, View, Text, Button, TextInput, StyleSheet, Platform} from 'react-native';
import Colors from "../constants/Colors";

const NewPlaceScreen = props => {

    const dispatch = useDispatch();

    const [titleValue, setTitleValue] = useState('');


    const titleChangedHandler = text => {
        setTitleValue(text)
    };

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue));
        props.navigation.goBack();
    };

 return (
     <ScrollView>
         <View style={styles.form}>
             <Text style={styles.label}>Title</Text>
             <TextInput
                 style={styles.textInput}
                 onChangeText={titleChangedHandler}
                 value={titleValue}
             />
             <Button
                 title={'Save Place'}
                 color={Colors.primary}
                 onPress={savePlaceHandler}
             />
         </View>
     </ScrollView>
 );
};

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Add a Place',
    }

};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;