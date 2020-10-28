import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface prop {
    navigation: any;
    route: any;
}

const StudyScreen = ({navigation, route}: prop) => {
    return (
        <View style={s.wrap}>
            <Text>Hi</Text>
        </View>
    )
}

const s = StyleSheet.create({
    wrap: {
        flex: 1
    }
})

export default StudyScreen;