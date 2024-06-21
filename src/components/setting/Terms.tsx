import React, { useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';
import spacing from '@/styles/spacing';
import {getFontSize} from '@/utils/font';
import { ScrollView } from 'react-native-gesture-handler';
import Config from 'react-native-config';

export function Terms(): React.JSX.Element {
  const [policyText, setPolicyText] = useState('');
  useEffect(() => {
    fetch(Config.CLOUDFRONT_URL + 'policy/Terms.txt')
      .then((response) => response.text())
      .then((text) => setPolicyText(text))
      .catch((error) => {
        console.error('Error fetching the text:', error);
      });
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <AppText style={styles.text}>
          {policyText}
        </AppText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.layoutPaddingHorizontal,
  },
  section: {
    marginBottom: 30,
  },
  text: {
    fontSize: getFontSize(13),
    lineHeight: 24,
  },
});
