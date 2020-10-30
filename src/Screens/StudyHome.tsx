import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomHeader from '~/components/customHeader';

interface prop {
  navigation: any;
  route: any;
}

const screenWidth = Dimensions.get('screen').width;

const StudyHomeScreen = () => {
  return (
    <View style={s.wrap}>
      <CustomHeader title="Study" />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View style={s.wordContainer}>
            <TouchableOpacity style={s.btnStartStudy}>
              <Text style={s.rootVoca}>Cap</Text>
              <Text style={s.changed}>cept</Text>
              <Text style={s.rootMean}>머리</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnSave}></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  wordContainer: {
    width: '90%',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#CDCDCD',
  },
  btnStartStudy: {
    width: '60%',
    height: '50%',
    backgroundColor: 'blue',
    borderRadius: 7,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnSave: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    backgroundColor: 'blue',
    borderRadius: 7,
  },
  rootVoca: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'sd_gothic_b',
  },
  changed: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'sd_gothic_b',
  },
  rootMean: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'sd_gothic_b',
  },
});

export default StudyHomeScreen;
