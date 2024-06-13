import React, {useCallback, useState} from 'react';

import {useRecoilState} from 'recoil';
import {scrapListState} from '@/store/scrapState';

import AppIcon from '../common/AppIcon';
import color from '@/styles/color';
import {createData, deleteData, fetchData} from '@/api/api';

type Props = {
  contents: object;
};

export function BookmarkButton({contents}: Props): React.JSX.Element {
  const [isScrapped, setIsScrapped] = useState(true);
  const [scrapList, setScrapList] = useRecoilState(scrapListState);

  const handleButtonPress = () => {
    setIsScrapped((prevState: any) => !prevState);
    toggleScrap();
  };

  // TODO: 중복 코드 제거 필요
  const fetchScrapList = useCallback(async () => {
    const res = await fetchData('/scrap', null);
    const list = res.data.data;

    if (res.status === 200) {
      setScrapList(list);
    }
  }, [setScrapList]);

  const toggleScrap = () => {
    isScrapped ? unscrap() : scrap();
  };

  const scrap = useCallback(async () => {
    await createData('/scrap', contents);
  }, [contents]);

  const unscrap = useCallback(async () => {
    const res = await deleteData('/scrap', {}, contents?.id);

    if (res.status === 200) {
      fetchScrapList();
    }
  }, [contents?.id, fetchScrapList]);

  return (
    <AppIcon
      name="bookmarkMedium"
      width={42}
      height={42}
      styles={isScrapped ? {fill: color.grey.grey400} : null}
      onPress={handleButtonPress}
    />
  );
}
