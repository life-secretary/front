import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {SvgProps} from 'react-native-svg';
import * as Icon from '../../assets/icon';

export type IconProps = SvgProps & {
  /** [icon type] 'stroke' or 'fill' 크게 2가지 타입으로 분류 */
  type: string;

  /** [icon name] assets/icon 폴더 내 사용하고 싶은 아이콘 이름 명시 */
  name: keyof typeof Icon;

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
  type,
  name,
  width,
  height,
  styles = null,
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
}: IconProps): React.JSX.Element => {
  const [isIconPress, setIsIconPress] = useState(false);

  const IconSvg = Icon[name];

  console.log(name);

  // console.log(styles);

  // 아이콘 press 시 색상 변경값 통일 (확정 x)
  const IconSvgProps = {
    ...(width === undefined ? {} : {width}),
    ...(height === undefined ? {} : {height}),
    ...(type === 'stroke' ? {strokeOpacity: isIconPress ? 0.4 : 1} : {}),
    ...(type === 'fill' ? {fillOpacity: isIconPress ? 0.4 : 1} : {}),
    ...(styles === null ? {} : styles),
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
