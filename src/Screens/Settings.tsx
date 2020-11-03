import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Switch, ToastAndroid} from 'react-native';
import CustomHeader from '~/components/customHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import db from '~/DB';

interface prop {
  navigation: any;
  route: any;
}

const SettingsScreen = () => {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch1 = () => {
    db.updateSetting1(!isEnabled1).then(() =>
      setIsEnabled1((previousState: boolean) => !previousState),
    );
  };

  const toggleSwitch2 = () => {
    db.updateSetting2(!isEnabled2).then(() =>
      setIsEnabled2((previousState: boolean) => !previousState),
    );
  };

  useEffect(() => {
    db.getSettings().then((setting: any) => {
      console.log(setting.isRandom, setting.notShowWordInDict);
      setIsEnabled1(setting.isRandom === 1 ? true : false);
      setIsEnabled2(setting.notShowWordInDict === 1 ? true : false);
    });
  }, []);

  return (
    <View style={s.wrap}>
      <CustomHeader title="Settings" />
      <View style={{...s.settingContainer, borderBottomWidth: 0.5}}>
        <View style={s.txtSettingBox}>
          <Text style={s.txtSetting}>단어 시험 시,</Text>
          <Text style={s.txtSetting}>단어 순서를 무작위로 출제</Text>
        </View>
        <View style={s.swtichContainer}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled1 ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
        </View>
      </View>

      <View style={{...s.settingContainer, borderBottomWidth: 0.5}}>
        <View style={s.txtSettingBox}>
          <Text style={s.txtSetting}>단어장에 추가된 단어는</Text>
          <Text style={s.txtSetting}>‘단어 공부’동안 보이지 않음</Text>
        </View>
        <View style={s.swtichContainer}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
        </View>
      </View>

      <View style={s.settingContainer}>
        <View style={s.txtSettingBox}>
          <Text style={s.txtSetting}>기기에 캐싱된 영단어 데이터 비우기</Text>
          <Text style={s.txtRed}>* 단어장의 영단어들은 삭제되지 않습니다</Text>
        </View>
        <View style={{...s.swtichContainer, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPressOut={() => {
              db.deleteCache().then(() =>
                ToastAndroid.show('캐시가 삭제되었습니다', ToastAndroid.SHORT),
              );
            }}>
            <EvilIcons name="trash" size={50} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
  },
  settingContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    paddingVertical: 50,
    borderColor: '#CDCDCD',
  },
  txtSettingBox: {
    flex: 8,
    justifyContent: 'center',
  },
  txtSetting: {
    fontSize: 20,
    fontFamily: 'sd_gothic_m',
  },
  txtRed: {
    fontSize: 16,
    fontFamily: 'sd_gothic_m',
    color: '#EA6060',
  },
  swtichContainer: {
    flex: 2,
    justifyContent: 'center',
  },
});

export default SettingsScreen;
