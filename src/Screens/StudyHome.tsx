import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '~/components/customHeader';
import rootData from '~/assets/roots';
import axios from 'axios';
import db from '~/DB';

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
  isCached: boolean;
  completedDownload: any;
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
  isCached,
  completedDownload,
}: ChildProp) => {
  return (
    <View style={s.wordContainer}>
      <TouchableOpacity
        style={{...s.btnStartStudy, backgroundColor: bgColor || '#CDCDCD'}}
        onPressOut={() => navigation.push('Study', {title, rootVoca})}>
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
        style={[s.btnSave, {backgroundColor: bgColor || '#CDCDCD'}]}
        onPressOut={() => {
          db.getTitlesInCachedWords()
            .then((titles: any) => {
              if (titles.includes(title)) {
                ToastAndroid.show(
                  '이미 다운로드 되었습니다',
                  ToastAndroid.SHORT,
                );
                return null;
              } else
                return axios.get(
                  `https://vokaglorywords.firebaseio.com/${title}.json`,
                );
            })
            .then((res: any) => {
              if (res !== null)
                return db.cacheWords(title, JSON.stringify(res.data));
              else return null;
            })
            .then((result: any) => {
              console.log(typeof result, result);
              if (result !== null) completedDownload(title);
            });
        }}>
        <AntDesign
          name={isCached ? 'check' : 'download'}
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
  const [cachedTitle, setCachedTitle] = useState(new Array());

  const updateState_cachedTitle = (newItem: string) => {
    let copied = cachedTitle.slice();
    copied.push(newItem);
    setCachedTitle(copied);
  };

  useEffect(() => {
    db.getTitlesInCachedWords().then((titles: any) => setCachedTitle(titles));
  }, []);

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
              isCached={cachedTitle.includes(root.title)}
              completedDownload={updateState_cachedTitle}
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
    alignItems: 'center',
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
