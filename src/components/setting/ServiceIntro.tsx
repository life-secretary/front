import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';
import spacing from '@/styles/spacing';
import {getFontSize} from '@/utils/font';
import {font} from '@/styles/font';
import color from '@/styles/color';

export function ServiceIntro(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <AppText style={styles.text}>
          필수 교육과정에서 알려주지 않지만{'\n'}인생을 살아가는데 있어 필요한
          정보들을 알려주는{'\n'}‘인생비서’ 입니다.
        </AppText>
      </View>
      <View style={styles.section}>
        <AppText style={styles.text}>
          ■ ‘정보’ 확인부터 ‘할 일’ 관리까지 한 번에{'\n'}궁금한 내용들을
          찾아보고 내 것으로 만들기까지{'\n'}번거롭고 실천하기 어려우셨죠?{'\n'}
          내게 딱 맞는 정보를 확인하고 바로 할 일 목록을 만들어보세요.
        </AppText>
      </View>
      <View style={styles.section}>
        <AppText style={styles.text}>
          ■ 내 관심사를 입력하고 빠르게 ‘콘텐츠 확인'{'\n'}내 성별과 나이,
          관심사 등 여러 가지 정보를 바탕으로{'\n'}딱 맞는 콘텐츠를 추천해 줘요.
          {'\n'}
          나만 모르고 있는 내용이 없는지 다시 한 번 확인해 보세요.
        </AppText>
      </View>
      <View style={styles.section}>
        <AppText style={styles.text}>
          ■ 하루가 아닌 ‘목표에 맞춰 실천’하기{'\n'}내가 이루고자 하는 목표에
          맞춰 할 일을 만들고 관리할 수 있어요.{'\n'}오늘 하루 목표를 못
          이뤘다고 낙담하기 보다는{'\n'}꾸준히 실천해 보기 어떠세요?
        </AppText>
      </View>
      <View style={styles.section}>
        <AppText style={styles.text}>
          ■ 나중에 또 보고 싶을 때는 ‘저장'{'\n'}계속 늘어나는 스크린샷, 핸드폰
          용량 차지는 이제 그만!{'\n'}나중에 또 확인하고 싶은 내용은 보관함에
          바로 저장해요.
        </AppText>
      </View>
    </View>
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
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 24,
    color: color.grey.grey700,
  },
});
