import React, { ReactNode } from 'react';
import {VirtualizedList, View, StyleSheet} from 'react-native';

import {HomeContentsItem} from '../home/homeContent/HomeContentItem';

type SearchContentViewProps = {
  data: Array<{}>; // TODO 타입 구체화
  headerComponent: ReactNode;
  onEndReached: () => void;
};

const SearchContentView = ({
  data, 
  headerComponent,
  onEndReached,
}: SearchContentViewProps): React.JSX.Element => {
  const getContentTabItem = (_data: any, index: number) => { // TODO 타입 구체화
    return data[index];
  };

  const getContentTabItemCount = () => {
    return data.length;
  };

  const getContentTabKeyExtractor = (item: any, index: number) => { // TODO 타입 구체화
    const keyName = 'content' + item.id;

    return keyName;
  };

  return (
    <VirtualizedList
      initialNumToRender={8}
      renderItem={({item}) => {
        return <HomeContentsItem item={{...item}} />;
      }}
      keyExtractor={getContentTabKeyExtractor}
      getItemCount={getContentTabItemCount}
      getItem={getContentTabItem}
      ListHeaderComponent={() => headerComponent}
      ListFooterComponent={() => <View style={styles.contentFooter} />}
      ItemSeparatorComponent={() => <View style={styles.separatorContent} />}
      style={styles.contentContainer}
      onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 24,
  },
  contentFooter: {
    height: 60,
  },

  separatorContent: {
    marginVertical: 16,
    borderWidth: 0.5,
    borderColor: '#F2F4F7',
  },
});

export default SearchContentView;
