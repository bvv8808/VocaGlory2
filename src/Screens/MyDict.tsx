import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import db from '~/DB';

const screenWidth = Dimensions.get('screen').width;

interface prop {
  navigation: any;
  route: any;
}

const getRandomIdx = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start) + start);
};

interface AccordianProp {
  curKey: string;
  curWords: any;
  goExam: any;
}

const Accordian = ({curKey, curWords, goExam}: AccordianProp) => {
  const [opened, setOpened] = useState(false);
  return (
    <View style={s.accordian}>
      <TouchableOpacity
        style={s.accordianHeader}
        onPressOut={() => {
          setOpened(!opened);
        }}>
        <View style={{width: 50}}></View>
        <Text style={s.headerKey}>{curKey}</Text>
        <TouchableOpacity
          style={s.btnExam}
          onPressOut={() => goExam()}></TouchableOpacity>
      </TouchableOpacity>
      <ScrollView style={[s.accordianBody, opened ? {} : {height: 0}]}>
        {curWords.map((word: any) => {
          return (
            <View key={word.voca} style={s.bodyContainer}>
              <Text style={s.bodyVoca}>{word.voca}</Text>
              <Text style={s.bodyMean}>{word.mean}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const MyDictScreen = ({navigation, route}: prop) => {
  const [showByDate, setShowByDate] = useState(true);
  const [dict, setDict] = useState(new Array());
  const [dateDict, setDateDict] = useState(new Object());
  const [rootDict, setRootDict] = useState(new Object());
  const [dateKeys, setDateKeys] = useState(new Array());
  const [rootKeys, setRootKeys] = useState(new Array());

  useEffect(() => {
    db.getDict()
      .then((dict: any) => {
        setDict(dict);
        return dict;
      })
      .then((dict: any) => {
        let initialDateDict = new Object();
        let initialRootDict = new Object();
        let initialDateKeys = new Array();
        let initialRootKeys = new Array();
        dict.forEach((word: any) => {
          if (initialDateDict.hasOwnProperty(word.pushedAt)) {
            initialDateDict[word.pushedAt].push(word);
          } else {
            initialDateDict[word.pushedAt] = new Array();
            initialDateKeys.push(word.pushedAt);

            initialDateDict[word.pushedAt].push(word);
          }

          if (initialRootDict.hasOwnProperty(word.rootVoca)) {
            initialRootDict[word.rootVoca].push(word);
          } else {
            initialRootDict[word.rootVoca] = new Array();
            initialRootKeys.push(word.rootVoca);

            initialRootDict[word.rootVoca].push(word);
          }
        });
        setDateDict(initialDateDict);
        setRootDict(initialRootDict);
        setDateKeys(initialDateKeys.sort());
        setRootKeys(initialRootKeys.sort());

        console.log(initialDateKeys);
        console.log(initialRootKeys);
      });
  }, []);

  return (
    <View style={s.wrap}>
      <Text>Hi</Text>
      <View style={s.selectTab}>
        <TouchableOpacity
          style={s.radioContainer}
          onPressOut={() => {
            setShowByDate(true);
          }}>
          <MaterialIcons
            name={
              showByDate ? 'radio-button-checked' : 'radio-button-unchecked'
            }
            size={20}
            color="red"
          />
          <Text>날짜별</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.radioContainer}
          onPressOut={() => {
            setShowByDate(false);
          }}>
          <MaterialIcons
            name={
              showByDate ? 'radio-button-unchecked' : 'radio-button-checked'
            }
            size={20}
            color="red"
          />
          <Text>어원별</Text>
        </TouchableOpacity>
      </View>

      {/* {dict.map((word: any) => {
        return (
          <View style={{padding: 20, borderWidth: 1}} key={word.id}>
            <Text>{word.voca}</Text>
            <Text>{word.mean}</Text>
            <Text>{word.rootVoca}</Text>
            <Text>{word.pushedAt}</Text>
          </View>
        );
      })} */}

      {showByDate
        ? dateKeys.map((key: string) => {
            const curWords = dateDict[key];
            return (
              <Accordian
                curWords={curWords}
                curKey={key}
                key={key}
                goExam={() => navigation.push('Exam', {words: curWords})}
              />
            );
          })
        : rootKeys.map((key: string) => {
            const curWords = rootDict[key];
            return (
              <Accordian
                curWords={curWords}
                curKey={key}
                key={key}
                goExam={() => navigation.push('Exam', {words: curWords})}
              />
            );
          })}
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  selectTab: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordian: {
    width: '100%',
  },
  accordianHeader: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  accordianBody: {
    backgroundColor: '#CFCFCF',
  },
  headerKey: {
    fontFamily: 'sd_gothic_m',
    fontSize: 25,
    color: '#444444',
  },
  bodyContainer: {
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  bodyVoca: {
    fontSize: 20,
    color: '#444444',
    paddingLeft: 5,
  },
  bodyMean: {
    fontSize: 16,
    color: '#555555',
    paddingLeft: 5,
  },
  btnExam: {
    width: 35,
    height: 35,
    marginRight: 15,
    borderWidth: 1,
  },
});

export default MyDictScreen;
