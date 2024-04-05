import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import AppButton from '@/components/common/AppButton';
import {AppInput} from '@/components/common/AppInput';
import color from '@/styles/color';
import {font} from '@/styles/font';

type MyInfoEditFormProps = {
  user: object;
};

export function MyInfoEditForm({user}: MyInfoEditFormProps): React.JSX.Element {
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [nickname, onChangeNickname] = useState(user?.nickname);
  const [birthdate, onChangeBirthdate] = useState(user?.birthdate);
  const navigation = useNavigation();

  const moveToBack = () => {
    navigation.goBack();
  };

  const handleSubmitButtonPress = () => {
    moveToBack();
  };

  useEffect(() => {
    if (!nickname || !birthdate) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [nickname, birthdate]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.form}>
        <AppInput
          hasLabel={true}
          labelText="닉네임"
          placeholder="최대 6자 내로 입력 가능해요"
          text={nickname}
          onChangeText={onChangeNickname}
        />
        <AppInput
          hasLabel={true}
          editable={false}
          labelText="생년월일"
          text={birthdate}
          onChangeText={onChangeBirthdate}
          icon={{
            name: 'arrowDown',
            width: 24,
            height: 24,
            styles: {color: color.grey.grey400},
            onPress: () => {},
          }}
        />
      </View>
      <AppButton
        text="완료"
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        isDisabled={isEmpty}
        disabledBackgroundColor={color.grey.grey300}
        onPressButton={handleSubmitButtonPress}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  form: {
    flex: 1,
    gap: 20,
    marginTop: 32,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: color.main.primary,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    color: color.main.white,
  },
});
