import React from 'react';
import {Pressable} from 'react-native';
import type {PressableProps} from 'react-native';

import {AppText} from './AppText';
import AppIcon from './AppIcon';

export type ButtonProps = {
  /** [Required] Button text */
  text: string;

  /** [Required] Button text style */
  textStyle: object | Array<object>; // TODO StyleSheet 관련 타입으로 변경

  /** [Required] Button style */
  buttonStyle?: object | Array<object>; // TODO StyleSheet 관련 타입으로 변경

  /** Button background color when pressed */
  pressedBackgroundColor?: string;

  /** Button background color when disabled */
  disabledBackgroundColor?: string;

  /** Button press event handler */
  onPressButton?: Function;
};

export type AppButtonProps = Partial<PressableProps> &
  ButtonProps & {
    /** Whether the press behavior is disabled */
    isDisabled?: boolean;
    /** Icon in front of the button text */
    startIcon?: any;
    /** Icon behind the button text */
    endIcon?: any;
  };

const AppButton = ({
  isDisabled = false,
  text = '',
  textStyle = {} || [],
  buttonStyle = {} || [],
  pressedBackgroundColor = '',
  disabledBackgroundColor = '',
  startIcon,
  endIcon,
  onPressButton = () => {},
}: AppButtonProps): React.JSX.Element => {
  const pressableStyle = (pressed: any) => {
    const defaultStyle =
      Array.isArray(buttonStyle) === true ? buttonStyle : [buttonStyle];

    const backgroundColor = pressed
      ? pressedBackgroundColor
      : defaultStyle.find((style: object) =>
          style.hasOwnProperty('backgroundColor'),
        )?.backgroundColor;


    return [...defaultStyle, {backgroundColor}];
  };

  const disabledStyle = (disabled: boolean) => {
    const defaultStyle =
      Array.isArray(buttonStyle) === true ? buttonStyle : [buttonStyle];
      
    const backgroundColor = disabled
      ? disabledBackgroundColor
      : defaultStyle[0].backgroundColor;

    return [...defaultStyle, {backgroundColor}];
  };

  return (
    <Pressable
      disabled={isDisabled}
      style={({pressed}) => [
        pressableStyle(pressed),
        isDisabled && disabledStyle(isDisabled),
      ]}
      onPress={() => onPressButton()}>
      {startIcon && (
        <AppIcon
          name={startIcon.name}
          width={startIcon.width}
          height={startIcon.height}
          styles={startIcon.styles}
          onPress={() => onPressButton()}
        />
      )}
      <AppText style={textStyle}>{text}</AppText>
      {endIcon && (
        <AppIcon
          name={endIcon.name}
          width={endIcon.width}
          height={endIcon.height}
          styles={endIcon.styles}
          onPress={() => onPressButton()}
        />
      )}
    </Pressable>
  );
};

export default AppButton;
