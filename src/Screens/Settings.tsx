import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface prop {
  navigation: any;
  route: any;
}

const SettingsScreen = () => {
  return (
    <View style={s.wrap}>
      <Text>Hi</Text>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});

export default SettingsScreen;
