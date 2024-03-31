import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {SvgProps} from 'react-native-svg';
import Icons from '../../assets/icon';

export type IconProps = SvgProps & {
  /** [icon name] assets/icon 폴더 내 사용하고 싶은 아이콘 이름 명시 */
  name: keyof typeof Icons;

  /** [icon width] */
  width: number;

  /** [icon height]  */
  height: number;

  /** [icon styles] 개별 스타일 명시 */
  styles?: object | null;

  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

const AppIcon = ({
  name,
  width,
  height,
  styles = null,
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
}: IconProps): React.JSX.Element => {
  const [isIconPress, setIsIconPress] = useState(false);

  const icon = Icons[name];

  const iconStyle =
    icon.type === 'fill'
      ? {
          fill: icon.defaultFill,
          color: icon.defaultStroke,
        }
      : {
          color: icon.defaultStroke,
        };

  const iconPressStyle =
    icon.type === 'fill'
      ? {
          fillOpacity: isIconPress ? 0.4 : 1,
          strokeOpacity: isIconPress ? 0.4 : 1,
        }
      : {
          strokeOpacity: isIconPress ? 0.4 : 1,
        };

  const IconSvg = icon.file;

  // 아이콘 press 시 색상 변경값 통일 (확정 x)
  const IconSvgProps = {
    ...(width === undefined ? {} : {width}),
    ...(height === undefined ? {} : {height}),
    ...(styles === null ? iconStyle : {...iconStyle, ...styles}),
    ...iconPressStyle,
  };

  const pressIcon = () => {
    onPress();
  };

  const pressIconIn = () => {
    setIsIconPress(true);
    onPressIn();
  };

  const pressIconOut = () => {
    setIsIconPress(false);
    onPressOut();
  };

  return (
    <Pressable
      onPress={pressIcon}
      onPressIn={pressIconIn}
      onPressOut={pressIconOut}>
      <IconSvg {...IconSvgProps} />
    </Pressable>
  );
};

export default AppIcon;
