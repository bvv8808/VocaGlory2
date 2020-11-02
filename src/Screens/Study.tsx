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

interface prop {
  navigation: any;
  route: any;
}

const StudyScreen = ({navigation, route}: prop) => {
  const [words, setWords] = useState(new Array());
  const [curWord, setCurWord] = useState({voca: '', pronounce: '', mean: ''});
  const [curIdx, setCurIdx] = useState(-1);
  const [shownMean, setShownMean] = useState(false);

  useEffect(() => {
    axios
      .get(`https://vokaglorywords.firebaseio.com/${route.params.title}.json`)
      .then((res: any) => {
        // console.log('# WORDS #', typeof res.data, res.data[0].mean);
        const sortedWords = res.data.sort((a: any, b: any) => {
          if (a.voca < b.voca) return -1;
          else return 1;
        });
        setWords(sortedWords);
        // setCurVoca(sortedWords[0].voca);
        // setCurPronounce(sortedWords[0].procounce);
        // setCurMean(sortedWords[0].mean);
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
        <TouchableOpacity style={s.btnAdd}>
          <Text style={s.txtAdd}>단어장에 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  wordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    flex: 7,
  },
  txtVoca: {
    fontSize: 45,
    margin: 8,
  },
  txtPronounce: {
    fontFamily: 'wdpron',
    fontSize: 23,
    margin: 8,
  },
  txtMean: {
    fontSize: 30,
    margin: 8,
  },
  btnContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAdd: {},
  txtAdd: {},
});

export default StudyScreen;
