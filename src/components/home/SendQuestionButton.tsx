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
      <AppText style={styles.buttonText}>Send Question Button</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
  },
});
