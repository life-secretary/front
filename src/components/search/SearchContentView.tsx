import React, { useState, ReactNode } from 'react';
import { VirtualizedList, View, StyleSheet, Pressable } from 'react-native';

import { HomeContentItem } from '../home/homeContent/HomeContentItem';
import ContentModal from '../contentDetail/ContentModal';

import { fetchData } from '@/api/api';

type SearchContentViewProps = {
  data: Array<any>; // TODO 타입 구체화
  headerComponent: ReactNode;
  onEndReached: () => void;
};

const SearchContentView = ({
  data, 
  headerComponent,
  onEndReached,
}: SearchContentViewProps): React.JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState<any>({});

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

  const onPressContent = (id: number) => {
    fetchData(`/content/${id}`, {})
      .then((response) => {
        const { data : { data } } = response;

        setContent(data);
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <>
      <VirtualizedList
        initialNumToRender={8}
        renderItem={({item}) => {
          return (
            <Pressable onPress={() => onPressContent(item.id)}>
              <HomeContentItem homeContentItem={{...item}} />
            </Pressable>
          );
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
      <ContentModal 
        content={content}
        isVisible={isModalVisible}
        closeContentModal={() => setIsModalVisible(false)}
      />
    </>
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
