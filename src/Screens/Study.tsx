import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '~/components/customHeader';
import axios from 'axios';
import db from '~/DB';

interface prop {
  navigation: any;
  route: any;
}

const StudyScreen = ({navigation, route}: prop) => {
  const [words, setWords] = useState(new Array());
  const [curWord, setCurWord] = useState({voca: '', pronounce: '', mean: ''});
  const [curIdx, setCurIdx] = useState(-1);
  const [shownMean, setShownMean] = useState(false);
  // const [notShowInDict, setNotShowInDict] = useState(false);

  useEffect(() => {
    let notShowInDict = false;
    db.getSettings()
      .then((settings: any) => {
        console.log('### settings ### ', typeof settings, settings);
        // setNotShowInDict(settings.notShowWordInDict === 1 ? true : false);
        notShowInDict = settings.notShowWordInDict === 1 ? true : false;
      })
      .then(() => db.getCachedWords(route.params.title))
      .then((cachedWords: any) => {
        console.log('## words.data ##', cachedWords);
        if (cachedWords === null) {
          return axios.get(
            `https://vokaglorywords.firebaseio.com/${route.params.title}.json`,
          );
        } else return {data: JSON.parse(cachedWords.words)};
      })
      .then(async (words: any) => {
        console.log('## notShowWordInDict ##', notShowInDict);
        const existedVoca: any = await db.getDictByTitle(route.params.title);
        return notShowInDict
          ? words.data.filter((word: any) => !existedVoca.includes(word.voca))
          : words.data;
      })
      .then((words: any) => {
        // console.log('# WORDS #', typeof res.data, res.data[0].mean);
        const sortedWords = words.sort((a: any, b: any) => {
          if (a.voca < b.voca) return -1;
          else return 1;
        });
        setWords(sortedWords);
        setCurWord(sortedWords[0]);
        setCurIdx(0);
      });
  }, []);

  return (
    <View style={s.wrap}>
      <CustomHeader title="Study" />
      <TouchableOpacity
        style={s.wordContainer}
        onPressOut={() => {
          if (shownMean === false) {
            setShownMean(true);
          } else {
            if (curIdx !== -1 && curIdx <= words.length - 1) {
              if (curIdx === words.length - 1) {
                ToastAndroid.show(
                  '해당 어원의 단어 공부가 끝났습니다',
                  ToastAndroid.SHORT,
                );
                navigation.goBack();
              } else {
                setShownMean(false);

                const nextIdx = curIdx + 1;
                setCurWord(words[nextIdx]);
                setCurIdx(nextIdx);
              }
            }
          }
        }}>
        <Text style={s.txtVoca}>
          {curIdx < words.length ? curWord.voca : ''}
        </Text>
        <Text style={s.txtPronounce}>
          {curIdx < words.length ? curWord.pronounce : ''}
        </Text>
        <Text style={s.txtMean}>
          {curIdx < words.length && shownMean ? curWord.mean : ''}
        </Text>
      </TouchableOpacity>

      <View style={s.btnContainer}>
        <TouchableOpacity
          style={s.btnAdd}
          onPressOut={() => {
            db.isInDict(curWord.voca)
              .then((isExist: any) => {
                if (isExist) {
                  ToastAndroid.show(
                    '이미 단어장에 존재합니다',
                    ToastAndroid.SHORT,
                  );
                  return null;
                } else {
                  return db.saveToDict(
                    route.params.title,
                    curWord.voca,
                    curWord.mean,
                    route.params.rootVoca,
                  );
                }
              })
              .then((res: any) => {
                if (res !== null) {
                  console.log('## saveToDict RESPONSE ## ', res);
                  ToastAndroid.show(
                    '단어장에 추가되었습니다',
                    ToastAndroid.SHORT,
                  );
                }
              });
          }}>
          <Text style={s.txtAdd}>단어장에 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  wordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
  },
  txtVoca: {
    fontSize: 45,
    margin: 8,
    marginTop: 50,
  },
  txtPronounce: {
    fontFamily: 'wdpron',
    fontSize: 23,
    margin: 8,
  },
  txtMean: {
    fontSize: 30,
    marginVertical: 8,
    textAlign: 'center',
  },
  btnContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnAdd: {
    width: '55%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 5,
    backgroundColor: '#E36473',
  },
  txtAdd: {
    fontSize: 26,
    fontFamily: 'sd_gothic_m',
    alignSelf: 'center',
    color: '#FBFBFB',
  },
});

export default StudyScreen;
