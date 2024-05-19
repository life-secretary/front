import React from 'react';
import {StyleSheet, useWindowDimensions, Platform, View} from 'react-native';
import Modal from 'react-native-modal';
import AppIcon from '../AppIcon';
import { AppText } from '../AppText';
import Toast from 'react-native-toast-message';
import type {ModalProps} from 'react-native-modal';
import spacing from '@/styles/spacing';
import color from '@/styles/color';
import {font} from '@/styles/font';


export type AppModalProps = Partial<ModalProps> & {
  /** [Required] Show the modal */
  isVisible: boolean;

  animationIn?: string | object;

  animationOut?: string | object;

  /** The backdrop background color */
  backdropColor?: string;

  /** The backdrop opacity when the modal is visible */
  backdropOpacity?: number;
};

const AppModal = ({
  children,
  isVisible,
  animationIn,
  animationOut,
  backdropColor = '#FFFFFF',
  backdropOpacity = 1,
}: AppModalProps): React.JSX.Element => {
  const {width, height} = useWindowDimensions();
  const toastWidth = width - spacing.layoutPaddingHorizontal * 2;

  const toastConfig = {
    success: ({ props }: any) => (
      <View style={[styles.toast, {width: toastWidth}]}>
        <View style={styles.iconContainer}>
          <AppIcon
            name="checkBoxCircle"
            width={24}
            height={24}
            styles={{fill: color.main.secondary, stroke: color.main.white}}
          />
        </View>
        <AppText style={styles.toastText}>{props?.text}</AppText>
      </View>
    ),
  };

  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={width}
      deviceHeight={height}
      animationIn={animationIn}
      animationOut={animationOut}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      onModalShow={() => {}} // Modal 이 완전히 띄워졌을 때 실행되는 callback 함수 (props로 전달)
      style={styles.modal}>
      <View style={styles.modalContainer}>{children}</View>
      <Toast config={toastConfig} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    ...Platform.select({
      ios: {
        marginTop: 30,
      },
    }),
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 6,
    borderRadius: 10,
    backgroundColor: '#000E24B2',
  },
  toastText: {
    fontSize: 14,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 16.71,
    color: color.main.white,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
});

export default AppModal;
