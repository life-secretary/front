import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {AppText} from '../common/AppText';

export function ViewMoreButton(): React.JSX.Element {
  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: pressed ? 'skyblue' : null},
        styles.button,
      ]}
      onPress={() => {
        console.log('pressed!');
      }}>
      <AppText style={styles.buttonText}>더보기</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 36,
    paddingVertical: 15,
    borderRadius: 6,
    backgroundColor: '#F2F4F7',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
