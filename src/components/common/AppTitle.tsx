import React from 'react';

import {AppText} from '@/components/common/AppText';

export function AppTitle({text, style}: any): React.JSX.Element {
  return <AppText style={style}>{text}</AppText>;
}
