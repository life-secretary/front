import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, VirtualizedList, Share } from 'react-native';
import type { AppModalProps } from '../common/modal/AppModal';
import { useRecoilValue } from 'recoil';

import { AppHeader } from '../common/AppHeader';
import { AppText } from '../common/AppText';
import AppIcon from '../common/AppIcon';
import AppButton from '../common/AppButton';
import AppModal from '../common/modal/AppModal';
import ToDoListItem from '../search/ToDoListItem';
import SearchHashTagModal from '../search/SearchHashTagModal';
import Toast from 'react-native-toast-message';

import Markdown from 'react-native-markdown-display';
import { getFontSize } from '../../utils/font';
import { getFormattedDate } from '@/utils';
import { markdownStyle } from '@/styles/content';
import { getNewData } from '@/utils/search';

import { categoryListState } from '@/store/categoryState';
import { userInfoState } from '@/store/userInfoState';
import { fetchData, createData, deleteData } from '@/api/api';

type ContentModalProps = Partial<AppModalProps> & {
  content: any;
  isVisible: boolean;
  closeContentModal: () => void;
};

export const ContentModal = ({
  content,
  isVisible = false,
  closeContentModal,
}: ContentModalProps): React.JSX.Element => {
  const categories = useRecoilValue(categoryListState);
  const userInfo = useRecoilValue(userInfoState);
  const [item, setItem] = useState<any>([]);
  const [todos, setTodos] = useState<any>([]);
  const constants = {
    MODAL_BACKDROP_COLOR: 'white',
    MODAL_BACKDROP_OPACITY: 1,
    MODAL_ICON_SIZE: 30,
    MODAL_ICON_COLOR: 'black',
    ADD_ICON_SIZE: 18,
    ADD_ICON_COLOR: '#526070',
    CONTENT_ICON_SIZE: 25,
    CONTENT_ICON_COLOR: '#A1ACB9',
  }; // TODO 상수로 관리

  /**
   * NOTE PressableButton 을
   * 01 텍스트 only 버튼
   * 02 아이콘 only 버튼
   * 구분해서 공통 컴포넌트 생성하면 좋겠다
   */

  const getItem = (_data: any, index: number) => {
    /**
     * TODO 데이터 fetch 후 할당 필요
     * FlatList 상태값 유지 확인 단위 테스트 필요
     * 데이터 관리 방법 생각
     */
    return item[0];
  };

  const getItemCount = (_data: any) => {
    return item.length;
  };

  // bookMarkButton [Content]
  const [isContentBookMarked, setIsContentBookMarked] = useState(false);

  const postScrap = ({
    title,
    categoryId,
    contentId,
  }: any) => {
    return createData('/scrap', {
      title,
      categoryId,
      contentId,
      userId: userInfo.id,
    })
    .then((response) => {
      const { data: { data } } = response;
      
      if (data) {
        Toast.show({
          type: 'success',
          props: { text: '콘텐츠를 저장했어요' },
          position: 'bottom',
          bottomOffset: 20,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    })
    .catch((error) => {
      console.log('스크랩 성공 에러', error);
    });
  };

  const deleteScrap = (id: number) => {
    return deleteData('/scrap', {}, id)
    .then((response) => {
      const { data } = response;
      if (data.status === 'SUCCESS') {
        Toast.show({
          type: 'success',
          props: { text: '콘텐츠 저장을 취소했어요' },
          position: 'bottom',
          bottomOffset: 20,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    })
    .catch((error) => {
      console.log('스크랩 삭제 에러', error);
    })
  };

  const onPressContentBookMarkButton = () => {
    setIsContentBookMarked(previousValue => {
      if (previousValue === false) {
        postScrap({
          title: content.title,
          categoryId: content.categoryId,
          contentId: content.id,
        });
      } else {
        deleteScrap(content.id);
      }

      return !previousValue;
    });
  };

  const onPressContentUploadButton = async() => {
    // TODO share 기능 붙이기
    // ERROR await Share.share({ url: item[0].url }); 
  };

  // hashTag [Content]
  const pageHashTagContent = useRef<number>(0);
  const isHashTagLoading = useRef<boolean>(false);
  const [isHashTagModalVisible, setIsHashTagModalVisible] = useState(false);
  const [pressedHashTag, setPressedHashTag] = useState('');
  const [hashTagContent, setHashTagContent] = useState([]);

  const fetchHashTagContent = ({
    hashTagContentText,
    hashTagContentPage,
    hashTagContentSize,
    hashTagContentSort,
  }: any) => {
    const hashtag = hashTagContentText ? hashTagContentText : pressedHashTag;
    const page = hashTagContentPage ? hashTagContentPage : pageHashTagContent.current;
    const size = hashTagContentSize ? hashTagContentSize : 10;
    const sort = hashTagContentSort ? hashTagContentSort : 'viewCount,desc';

    fetchData(`/content/search`, {
      hashtag,
      page,
      size,
      sort,
    })
    .then((response) => {
      const { data : { data } } = response;

      setHashTagContent((previousValue) => {
        return getNewData(previousValue, data.content);
      })
    })
    .catch((error) => {
      console.log('콘텐츠 해시태그 검색 에러', error);
    })
    .finally(() => {
      isHashTagLoading.current = false;
    });
  }

  const onPressHashTag = (hashtag: string) => {
    setPressedHashTag(hashtag);
    fetchHashTagContent({ hashTagContentText: hashtag });
    setIsHashTagModalVisible(true);
  };

  const onPressHashTagModalBackButton = () => {
    setPressedHashTag('');
    setIsHashTagModalVisible(false);
  };

  const onHashTagContentPageEndReached = () => {
    if ((hashTagContent.length >= 10) && isHashTagLoading.current === false) {
      isHashTagLoading.current = true;
      pageHashTagContent.current += 1;
      fetchHashTagContent({});
    }
  };

  // addToDo [RelatedTodo]
  const addToDoItem = (item: any) => {
    createData('/todo/save', {
      id: item.id,
      userId: userInfo.id,
    })
    .then((response) => {
      const { data : { data } } = response;
      
      if (data) {
        Toast.show({
          type: 'success',
          props: { text: '할일을 저장했어요' },
          position: 'bottom',
          bottomOffset: 20,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    })
    .catch((error) => {
      console.log('할 일 생성 에러', error);
      Toast.show({
        type: 'error',
        props: { text: '할일 저장에 실패했어요' },
        position: 'bottom',
        bottomOffset: 20,
        visibilityTime: 2000,
        autoHide: true,
      });
    });
  };

  // addToDos [RelatedTodo]
  const addToDoItems = () => {
    Promise.all(todos.map((item: any) => 
      createData('/todo/save', {
        id: item.id,
        userId: userInfo.id,
    })))
    .then((response) => {
      const { data }: any = response[0];
      
      if (data.status === 'SUCCESS') {
        Toast.show({
          type: 'success',
          props: { text: '할일을 모두 저장했어요' },
          position: 'bottom',
          bottomOffset: 20,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    })
    .catch((error) => {
      console.log('할 일 생성 에러', error);
      Toast.show({
        type: 'error',
        props: { text: '할일 모두 저장에 실패했어요' },
        position: 'bottom',
        bottomOffset: 20,
        visibilityTime: 2000,
        autoHide: true,
      });
    });
  };

  // bookMarkButton [RelatedContent]
  const [relatedContent, setRelatedContent] = useState<any>([]);

  const onPressRelatedContentBookMarkButton = (item: any, index: number) => {
    setRelatedContent((previousValue: any) => {
      const newValue = [...previousValue];
      const previousBookMarkStatus = previousValue[index].isBookMarked;
      newValue[index].isBookMarked = !previousBookMarkStatus;

      if (previousBookMarkStatus === false) {
        postScrap({
          title: item.title,
          categoryId: item.categoryId,
          contentId: item.id,
        });
      } else {
        deleteScrap(item.id);
      }

      return newValue;
    });
  };

  const onPressAskQuestionButton = () => {
    console.log('문의 버튼 클릭');
    // navigation.navigate('SettingModal', { menu: { key: 'sendFeedback' }});
  };

  useEffect(() => {
    if (!content || !content.todos) {
      return;
    }

    // console.log('content', content);

    const category: any = categories.find((item: any) => 
      item.id === Number(content.categoryId)
    );
    const todos: any = [];

    // console.log('content.todos', content.todos);

    if (!todos.length) {
      setTodos([...content.todos ]);
    }

    const item = {
      id: content.id,
      title: content.title,
      url: content.contentUrl,
      content: content.content,
      hashtags: content.hashtags,
      createdTime: content.createdTime,
      category: category ? category.title : '카테고리',
      notification: [
        {
          id: 9,
          title:
            '콘텐츠에 대한 가벼운 안내사항을 여기에 적으면 어떨까 싶습니다. 예를 들어 이 콘텐츠는 어디어디 사이트를 참고하여 제작되었으며 수정사항이 있다면 어디로 연락주세요.',
        },
        {id: 10, title: '일부 콘텐츠는 예고없이 삭제될 수 있습니다.'},
        {
          id: 11,
          title:
            '테스트 문구 추가해서 ui 검토 테스트 문구 추가해서 ui 검토 테스트 문구 추가해서 ui 검토 테스트 문구 추가해서 ui 검토',
        },
      ],
    };

    setItem([item]);
    // NOTE 임시 연관 컨텐츠 -> 카테고리 컨텐츠 검색 
    fetchData('/content', {
      categoryId: content.categoryId,
      page: 0,
      size: 5,
      sort: ['viewCount', 'desc']
    })
    .then((response) => {
      const { data: { data } } = response;
      console.log('연관 컨텐츠', data);

      setRelatedContent(data.content
        .map((item: any) => ({
          ...item, isBookMarked: false,
        }))
        .filter((item: any) => item.id !== content.id)
        // 현재 컨텐츠 제외하고 연관 컨텐츠 노출
    )
    })
    .catch((error) => {
      console.log('연관된 컨텐츠 조회 에러', error);
    });
  }, [content]);

  return (
    <AppModal
      isVisible={isVisible}
      backdropColor={constants.MODAL_BACKDROP_COLOR}
      backdropOpacity={constants.MODAL_BACKDROP_OPACITY}>
      <View style={styles.container}>
        <AppHeader
          style={{
            flexDirection: 'column',
            borderColor: 'transparent',
            marginVertical: 0,
            paddingBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 24,
            }}>
            <View>
              <AppIcon
                name="back"
                width={36}
                height={36}
                onPress={closeContentModal}
              />
            </View>
            <View style={styles.headerRight}>
              <AppIcon 
                name="upload" 
                width={36} 
                height={36} 
                onPress={onPressContentUploadButton}
              />
              <AppIcon
                name="bookmarkLarge"
                width={36}
                height={36}
                onPress={onPressContentBookMarkButton}
                styles={isContentBookMarked ? {fill: '#000'} : {}}
              />
            </View>
          </View>
        </AppHeader>
        {
          item.length &&
          <VirtualizedList
            getItem={getItem}
            getItemCount={getItemCount}
            renderItem={({item, index}) => {
              return (
                <View>
                  {/** Header */}
                  <View style={styles.mainCategoryWrapper}>
                    <AppButton
                      isDisabled={true}
                      text={item.category}
                      textStyle={styles.mainCategory}
                      buttonStyle={styles.mainCategoryPressable}
                      disabledBackgroundColor="#0B2A4F"
                    />
                  </View>
                  <AppText style={styles.title}>
                    {item.title}
                  </AppText>
                  <AppText style={styles.date}>{getFormattedDate(new Date(item.createdTime), '.')}</AppText>
                  {/** Article */}
                  <Markdown style={markdownStyle()}>{item.content}</Markdown>
                  {/** HashTag */}
                  <View style={styles.hashTagWrapper}>
                    {item.hashtags.map((item: any, index: number) => {
                      return (
                        <AppButton
                          key={`hashTag${index}`}
                          text={`#${item}`}
                          textStyle={styles.hashTag}
                          buttonStyle={styles.hashTagPressable}
                          // TODO pressedColor 통일되면 props 제거 가능
                          pressedBackgroundColor={'#11111166'}
                          onPressButton={() => onPressHashTag(item)}
                        />
                      );
                    })}
                  </View>
                  <View style={styles.separator} />
                  {/** Section1 : 연관된 할 일 추가하기 */}
                  <View style={{ paddingHorizontal: 24 }}>
                    <View style={styles.basicTitleWrapper}>
                      <AppText style={styles.basicTitle}>
                        연관된 할 일 추가하기
                      </AppText>
                      <AppButton
                        text={'전체추가하기'}
                        textStyle={styles.todoListAddAllButton}
                        buttonStyle={{}}
                        onPressButton={addToDoItems}
                      />
                    </View>
                  </View>
                  {todos.length ?
                    todos.map((item: any, index: number, array: any) => {
                      return (
                        <View 
                          key={`similar_todo${index}`}
                          style={{ 
                            paddingHorizontal: 24,
                            paddingBottom: index === array.length - 1 ? 0 : 14,
                          }}
                          >
                          <ToDoListItem 
                            hasMainCategory={false} 
                            item={item} 
                            onPressAddItem={() => addToDoItem(item)} 
                          />
                        </View>
                      )
                    })
                    :
                    <AppText>연관된 할 일이 존재하지 않습니다</AppText>
                  }
                  <View style={styles.separator} />
                  {/** Section2 : 연관 콘텐츠 추천 */}
                  <View style={{ paddingHorizontal: 24 }}>
                    <View style={styles.basicTitleWrapper}>
                      <AppText style={styles.basicTitle}>
                        연관 콘텐츠 추천
                      </AppText>
                    </View>
                    {relatedContent.length ? 
                      relatedContent.map((item: any, index: number, array: any) => {
                        return (
                          <View
                            key={`content${index}`}
                            style={[
                              styles.contentWrapper,
                              {
                                borderBottomWidth: index === array.length - 1 ? 0 : 1,
                                marginBottom: index === array.length - 1 ? 0 : 10,
                                paddingBottom: index === array.length - 1 ? 5 : 8,
                              },
                            ]}>
                            <View style={styles.contentTitleWrapper}>
                              <AppText style={styles.contentTitle}>
                                {item.title}
                              </AppText>
                            </View>
                            <View style={styles.contentSaveButtonWrapper}>
                              <AppIcon
                                name="bookmarkMedium"
                                width={42}
                                height={42}
                                onPress={() =>
                                  onPressRelatedContentBookMarkButton(item, index)
                                }
                                styles={item.isBookMarked ? {fill: '#A1ACB9'} : {}}
                              />
                            </View>
                          </View>
                        );
                      })
                      :
                      <AppText>연관된 컨텐츠가 존재하지 않습니다</AppText>
                    }
                  </View>
                  <View style={styles.separator} />
                  {/** Section3 : 문의 및 의견 보내기 */}
                  <View
                    style={{
                      paddingHorizontal: 24,
                      paddingBottom: 40,
                    }}>
                    <AppText style={styles.askButtonTitle}>
                      이번 콘텐츠는 어떠신가요?
                    </AppText>
                    <AppText style={styles.askButtonSubTitle}>
                      더 나은 콘텐츠를 제작하는데 큰 도움이 됩니다
                    </AppText>
                    <View style={styles.askButtonWrapper}>
                      <AppButton
                        text={'문의 및 의견 보내기'}
                        // 📌 임시
                        textStyle={styles.askButtonText}
                        buttonStyle={styles.askButton}
                        // TODO pressedColor 통일되면 props 제거 가능
                        pressedBackgroundColor={'#11111166'}
                        onPressButton={onPressAskQuestionButton}
                      />
                    </View>
                  </View>
                  {/** Section4 : 안내 사항 */}
                  {/* <View style={styles.notificationWrapper}>
                    {item[0].notification.map((item: any, index: number) => {
                      return (
                        <AppText
                          key={`notification${index}`}
                          style={styles.notificationText}>
                          &#183; {item.title}
                        </AppText>
                      );
                    })}
                  </View> */}
                </View>
              );
            }}
            // 🤔 여기는 number 가능
            keyExtractor={(item, index) => {
              return 'similar_content' + index;
            }}
            initialNumToRender={1}
          />
        }
      </View>
      {/** HashTagModal */}
      <SearchHashTagModal
        isVisible={isHashTagModalVisible}
        hashTag={pressedHashTag}
        content={hashTagContent}
        pressBackButton={onPressHashTagModalBackButton}
        onContentPageEndReached={onHashTagContentPageEndReached}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red', // for test
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
  },

  // TODO font style 상수로 관리
  mainCategoryWrapper: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingHorizontal: 24,
  },
  mainCategoryPressable: {
    overflow: 'hidden',
    borderRadius: 6,
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#0B2A4F',
  },
  mainCategory: {
    fontWeight: '600',
    fontSize: getFontSize(13),
    lineHeight: 16,
    color: '#FFFFFF',
  },

  title: {
    fontWeight: '600',
    fontSize: getFontSize(26),
    lineHeight: 36,
    color: '#000E24',
    paddingHorizontal: 24,
    marginBottom: 8,
  },

  date: {
    fontWeight: '500',
    fontSize: getFontSize(14),
    lineHeight: 17,
    color: '#A1ACB9',
    paddingHorizontal: 24,
    marginBottom: 18,
  },

  hashTagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
  },
  hashTagPressable: {
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: '#F2F4F7',
  },
  hashTag: {
    fontWeight: '500',
    fontSize: getFontSize(14),
    lineHeight: 17,
    color: '#526070',
  },

  basicTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  basicTitle: {
    fontWeight: '600',
    fontSize: getFontSize(18),
    lineHeight: 21,
  },

  todoListAddAllButton: {
    fontWeight: '500',
    fontSize: getFontSize(15),
    lineHeight: 18,
    textDecorationLine: 'underline',
  },

  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },
  contentTitleWrapper: {
    flex: 7,
    justifyContent: 'center',
  },
  contentTitle: {
    fontWeight: '500',
    fontSize: getFontSize(15),
    lineHeight: 18,
    color: '#000E24',
  },
  contentSaveButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  askButtonTitle: {
    fontWeight: '600',
    fontSize: getFontSize(16),
    lineHeight: 21,
    color: '#000E24',
    textAlign: 'center',
  },
  askButtonSubTitle: {
    fontWeight: '500',
    fontSize: getFontSize(13),
    lineHeight: 16,
    color: '#A1ACB9',
    textAlign: 'center',
  },
  askButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  askButton: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#F2F4F7',
  },
  askButtonText: {
    fontWeight: '700',
    fontSize: getFontSize(13),
    lineHeight: 16,
    color: '#000E24',
  },

  notificationWrapper: {
    gap: 10,
    paddingTop: 34,
    paddingHorizontal: 24,
    paddingBottom: 56,
    backgroundColor: '#F2F4F7',
  },
  notificationText: {
    fontWeight: '500',
    fontSize: getFontSize(13),
    lineHeight: 19,
    color: '#A1ACB9',
  },

  separator: {
    height: 8,
    marginVertical: 40,
    backgroundColor: '#F2F4F7',
  },
});

export default ContentModal;
