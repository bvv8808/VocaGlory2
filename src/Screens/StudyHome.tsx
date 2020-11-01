import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '~/components/customHeader';
import rootData from '~/assets/roots';

const screenWidth = Dimensions.get('screen').width;

interface ChildProp {
  title: string;
  navigation: any;
  rootVoca?: string;
  changed?: string;
  rootMean?: string;
  bgColor?: string;
  vocaColor?: string;
  changedColor?: string;
  meanColor?: string;
}

const StudyButton = ({
  title,
  rootVoca,
  changed,
  rootMean,
  bgColor,
  vocaColor,
  changedColor,
  meanColor,
  navigation,
}: ChildProp) => {
  return (
    <View style={s.wordContainer}>
      <TouchableOpacity
        style={{...s.btnStartStudy, backgroundColor: bgColor || '#CDCDCD'}}
        onPressOut={() => navigation.push('Study', {title})}>
        <Text style={{...s.rootVoca, color: vocaColor || '#444444'}}>
          {rootVoca}
        </Text>
        <Text style={{...s.changed, color: changedColor || '#444444'}}>
          {changed}
        </Text>
        <Text style={{...s.rootMean, color: meanColor || '#444444'}}>
          {rootMean}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.btnSave, {backgroundColor: bgColor || '#CDCDCD'}]}>
        <AntDesign
          name="download"
          size={screenWidth * 0.06}
          color={vocaColor}
        />
      </TouchableOpacity>
    </View>
  );
};

interface prop {
  navigation: any;
  route: any;
}

const StudyHomeScreen = ({navigation}: prop) => {
  return (
    <View style={s.wrap}>
      <CustomHeader title="Study" />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
          }}>
          {rootData.map((root: any) => (
            <StudyButton
              key={root.id}
              title={root.title}
              navigation={navigation}
              rootVoca={root.rootVoca}
              changed={root.changed}
              rootMean={root.rootMean}
              bgColor={root.bgColor}
              vocaColor={root.vocaColor}
              changedColor={root.changedColr}
              meanColor={root.meanColor}
            />
          ))}
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
    borderRadius: 7,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnSave: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
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
