import React from 'react';
import { Pressable } from 'react-native';
import type { PressableProps } from 'react-native';

import { AppText } from './AppText';

export type ButtonProps = {
    /** [Required] Button text */
    text: string,

    /** [Required] Button text style */
    textStyle: object, // TODO StyleSheet 관련 타입으로 변경

    /** [Required] Button style */
    buttonStyle: object, // TODO StyleSheet 관련 타입으로 변경

    /** Button background color when pressed */
    pressedBackgroundColor?: string,

    /** Button press event handler */
    onPressButton?: Function,
};

export type AppButtonProps = Partial<PressableProps> & ButtonProps & {
    /** Whether the press behavior is disabled */
    isDisabled?: boolean,
};

const AppButton = ({ 
    isDisabled = false,
    text, 
    textStyle,
    buttonStyle,
    pressedBackgroundColor = '',  
    onPressButton = () => {},
}: AppButtonProps): React.JSX.Element => {

    return (
        <Pressable
            disabled={isDisabled}
            style={({ pressed }) => {
                return [
                    buttonStyle,
                    {
                        backgroundColor: pressed ? pressedBackgroundColor : buttonStyle.backgroundColor
                    }
                ]
            }}
            onPress={() => onPressButton}
        >
            <AppText style={textStyle}>{text}</AppText>
        </Pressable>
    );
}

export default AppButton;