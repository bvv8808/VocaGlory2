import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomHeader from '~/components/customHeader';

interface prop {
  navigation: any;
  route: any;
}

const StudyHomeScreen = () => {
  return (
    <View style={s.wrap}>
      <CustomHeader title="Study" />
      <Text>Hi</Text>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});

export default StudyHomeScreen;
