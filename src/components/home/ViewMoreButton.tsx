import * as React from 'react';
import {StyleSheet} from 'react-native';
import {AppButton} from '../common/button/AppButton';

export function ViewMoreButton(): React.JSX.Element {
  const iconPath = require('@/assets/images/sampleIcon.png');

  return (
    <AppButton
      // type="contained"
      textStyle={styles.buttonText}
      buttonStyle={styles.button}
      endIcon={iconPath}>
      더보기
    </AppButton>
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
  },
});
