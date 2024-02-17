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
      <AppText style={styles.buttonText}>View More Button</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
  },
});
