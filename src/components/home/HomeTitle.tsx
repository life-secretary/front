import * as React from 'react';
import {AppText} from '../common/AppText';

export function HomeTitle({text, style}: any): React.JSX.Element {
  return <AppText style={style}>{text}</AppText>;
}
