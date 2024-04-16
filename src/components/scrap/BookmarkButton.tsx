import React from 'react';

import AppIcon from '../common/AppIcon';
import {createData, deleteData} from '@/api/api';

type Props = {
  iconWidth: number;
  iconHeight: number;
  iconStyles?: object;
  contents: object;
  isScrapped: boolean;
  handleScrapStatus: Function;
};

export function BookmarkButton({
  iconWidth,
  iconHeight,
  iconStyles,
  contents,
  isScrapped,
  handleScrapStatus,
}: Props): React.JSX.Element {
  const handleButtonPress = () => {
    toggleScrapStatus();
    handleScrapStatus(!isScrapped);
  };

  const toggleScrapStatus = () => {
    isScrapped ? scrap() : unscrap();
  };

  const scrap = async () => {
    await createData('/scrap', contents);
  };

  const unscrap = async () => {
    await deleteData('/scrap', {}, contents?.id);
  };

  return (
    <AppIcon
      name="bookmarkMedium"
      width={iconWidth}
      height={iconHeight}
      styles={iconStyles}
      onPress={handleButtonPress}
    />
  );
}
