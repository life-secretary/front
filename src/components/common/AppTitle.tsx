import * as React from 'react';
import {AppText} from './AppText';

export function AppTitle({text, style}: any): React.JSX.Element {
  return <AppText style={style}>{text}</AppText>;
}
