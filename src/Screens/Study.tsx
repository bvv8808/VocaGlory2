import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

interface prop {
  navigation: any;
  route: any;
}

const StudyScreen = ({navigation, route}: prop) => {
  const [words, setWords] = useState(new Array());
  const [wordsLen, setWordsLen] = useState(-1);

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
      });
  }, []);

  return (
    <View style={s.wrap}>
      <Text>{route.params.title}</Text>
      <TouchableOpacity style={s.wordContainer}></TouchableOpacity>
      {/* <View style={s.btnContainer}>
        <TouchableOpacity style={s.btnAdd}>
          <Text style={s.txtAdd}>단어장에 추가</Text>
        </TouchableOpacity>
      </View> */}
      <View>
        {words.map((word: any, idx: number) => {
          return (
            <View key={idx} style={{padding: 10, borderWidth: 1}}>
              <Text>{word.voca}</Text>
              <Text style={{fontFamily: 'wdpron'}}>{word.pronounce}</Text>
              <Text>{word.mean}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  wordContainer: {},
  btnContainer: {},
  btnAdd: {},
  txtAdd: {},
});

export default StudyScreen;
