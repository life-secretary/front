import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {AppText} from '../common/AppText';

export function SendQuestionButton(): React.JSX.Element {
  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: pressed ? 'orangered' : null},
        styles.button,
      ]}
      onPress={() => {
        console.log('pressed!');
      }}>
      <AppText style={styles.buttonText}>문의 및 의견 보내기</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#0B2A4F',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
