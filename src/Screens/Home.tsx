import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
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

export default HomeScreen;