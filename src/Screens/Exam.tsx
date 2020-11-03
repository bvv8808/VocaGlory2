import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface prop {
  navigation: any;
  route: any;
}

const ExamScreen = ({navigation, route}: prop) => {
  console.log('## words ##', route.params.words);
  return (
    <View style={s.wrap}>
      <Text>This is Exam Screen.</Text>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});

export default ExamScreen;
