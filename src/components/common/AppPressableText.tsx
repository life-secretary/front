import React from 'react';
import { Pressable } from 'react-native';
import type { PressableProps } from 'react-native';

import { AppText } from './AppText';

export type AppPressableProps = Partial<PressableProps> & {
    /** Whether the press behavior is disabled */
    isDisabled?: boolean,

    /** Pressable 내부 텍스트 */
    text: string,

    /** Pressable 내부 텍스트 스타일 */
    defaultTextStyle: any,

    /** Pressable 기본 스타일 */
    defaultPressableStyle: any,

    /** Pressable 눌렀을 때 색상  */
    pressedBackgroundColor?: string,

    onPressHandler?: Function,
};

const AppPressable = ({ 
    isDisabled = false,
    text, 
    defaultTextStyle,
    defaultPressableStyle,
    pressedBackgroundColor = '',  
    onPressHandler = () => {},
}: AppPressableProps): React.JSX.Element => {

    return (
        <Pressable
            disabled={isDisabled}
            style={({ pressed }) => {
                return [
                    defaultPressableStyle,
                    {
                        backgroundColor: pressed ? pressedBackgroundColor : defaultPressableStyle.backgroundColor
                    }
                ]
            }}
            onPress={() => onPressHandler}
        >
            <AppText style={defaultTextStyle}>{text}</AppText>
        </Pressable>
    );
}

export default AppPressable;