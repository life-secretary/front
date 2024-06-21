import React, {useState, useEffect, useMemo} from 'react';
import {AppLayout} from '@/components/common/AppLayout';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import {AppText} from '../common/AppText';
import {AppHeader} from '../common/AppHeader';
import AppIcon from '../common/AppIcon';
import AppButton from '../common/AppButton';
import AppConfirmModal from '../common/modal/AppConfirmModal';

import ToDoListItem from '../search/ToDoListItem';
import Toast from 'react-native-toast-message';

import Markdown from 'react-native-markdown-display';
import {getFontSize} from '../../utils/font';
import {getFormattedDate} from '@/utils';
import {markdownStyle} from '@/styles/content';
import {getNewData} from '@/utils/search';

import {categoryListState} from '@/store/categoryState';
import {userState} from '@/store/userState';
import {fetchData, createData, deleteData} from '@/api/api';

import {useRecoilValue} from 'recoil';

const Content = ({route, navigation}: any) => {
  const {id} = route.params;
  const [content, setContent] = useState<any>({});

  const categories = useRecoilValue(categoryListState);
  const [item, setItem] = useState<any>([]);
  const [todos, setTodos] = useState<any>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [confirmData, setConfirmData] = useState<any>({});
  const [isScrollTop, setIsScrollTop] = useState(true);

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
    })
      .then(response => {
        const {
          data: {data},
        } = response;

        if (data) {
          Toast.show({
            type: 'success',
            props: {
              text: '콘텐츠를 저장했어요',
              style: { marginBottom: 20 },
            },
            position: 'bottom',
            bottomOffset: 20,
            visibilityTime: 2000,
            autoHide: true,
          });
          return true;
        }  
      })
      .catch(error => {
        console.log('스크랩 성공 에러', error);
        Toast.show({
          type: 'error',
          props: {
            text: '콘텐츠 저장에 실패했어요',
            style: { marginBottom: 20 },
          },
          position: 'bottom',
          bottomOffset: 20,
          visibilityTime: 2000,
          autoHide: true,
        });

        return false;
      });
  };

  const deleteScrap = (id: number) => {
    return deleteData('/scrap', {}, id)
      .then(response => {
        const {data} = response;

        if (data.status === 'SUCCESS') {
          Toast.show({
            type: 'success',
            props: {
              text: '콘텐츠 저장을 취소했어요',
              style: { marginBottom: 20 },
            },
            position: 'bottom',
            bottomOffset: 20,
            visibilityTime: 2000,
            autoHide: true,
          });

          return true;
        }
      })
      .catch(error => {
        console.log('스크랩 삭제 에러', error);
        Toast.show({
          type: 'error',
          props: {
            text: '콘텐츠 저장 취소에 실패했어요',
            style: { marginBottom: 20 },
          },
          position: 'bottom',
          bottomOffset: 20,
          visibilityTime: 2000,
          autoHide: true,
        });

        return false;
      });
  };

  const onPressContentBookMarkButton = () => {
    if (isContentBookMarked === false) {
      postScrap({
        title: content.title,
        categoryId: content.categoryId,
        contentId: content.id,
      })
      .then((res) => {
        if (res) {
          setIsContentBookMarked(true);
        } else {
          setIsContentBookMarked(false);
        }
      })
    } else {
      deleteScrap(content.id)
      .then((res) => {
        if (res) {
          setIsContentBookMarked(false);
        }
      })
    }
  };

  const onPressContentUploadButton = async () => {
    // TODO share 기능 붙이기
    // ERROR await Share.share({ url: item[0].url });
  };

  const onPressHashTag = (hashtag: string) => {
    navigation.navigate('SearchHashTagModal', {pressedHashtag: hashtag});
  };

  // addToDo [RelatedTodo]
  const addToDoItem = (id: number, index: number) => {
    createData('/todo/save', {id})
      .then(response => {
        const {
          data: {data},
        } = response;

        if (data) {
          Toast.show({
            type: 'success',
            props: {
              text: '할일을 저장했어요',
              style: { marginBottom: 20 },
            },
            position: 'bottom',
            bottomOffset: 20,
            visibilityTime: 2000,
            autoHide: true,
          });
          setTodos((prev: any) => {
            const newValue = [...prev];
            newValue[index].isSaved = true;
            return newValue;
          });
        }
      })
      .catch(error => {
        console.log('할 일 생성 에러', error);
        Toast.show({
          type: 'error',
          props: {
            text: '할일 저장에 실패했어요',
            style: { marginBottom: 20 },
          },
          position: 'bottom',
          bottomOffset: 20,
          visibilityTime: 2000,
          autoHide: true,
        });
      });
  };

  // addToDos [RelatedTodo]
  const addToDoItems = () => {
    Promise.all(
      todos.map((item: any) =>
        createData('/todo/save', {
          id: item.id,
        }),
      ),
    )
      .then(response => {
        const {data}: any = response[0];

        if (data.status === 'SUCCESS') {
          Toast.show({
            type: 'success',
            props: {
              text: '할일을 모두 저장했어요',
              style: { marginBottom: 20 },
            },
            position: 'bottom',
            bottomOffset: 20,
            visibilityTime: 2000,
            autoHide: true,
          });
          setTodos((prev: any) => {
            return prev.map((item: any) => ({
              ...item,
              isSaved: true,
            }));
          });
        }
      })
      .catch(error => {
        console.log('할 일 생성 에러', error);
        Toast.show({
          type: 'error',
          props: {
            text: '할일 모두 저장에 실패했어요',
            style: { marginBottom: 20 },
          },
          position: 'bottom',
          bottomOffset: 20,
          visibilityTime: 2000,
          autoHide: true,
        });
      });
  };

  const isAllSavedToDos = () => {
    return todos.reduce((prev: any, curr: any) => (prev && curr.isSaved), true);
  };

  // bookMarkButton [RelatedContent]
  const [relatedContent, setRelatedContent] = useState<any>([]);

  const onPressRelatedContentBookMarkButton = (item: any, index: number) => {
    if (relatedContent[index].isBookMarked === false) {
      postScrap({
        title: item.title,
        categoryId: item.categoryId,
        contentId: item.id,
      })
      .then((res) => {
        if (res) {
          setRelatedContent((prev: any) => prev.map((item: any, idx: number) => {
            if (idx === index) { item.isBookMarked = true }
            return item;
          }));
        } else {
          setRelatedContent((prev: any) => prev.map((item: any, idx: number) => {
            if (idx === index) { item.isBookMarked = false }
            return item;
          }));
        }
      });
    } else {
      deleteScrap(item.id)
      .then((res) => {
        if (res) {
          setRelatedContent((prev: any) => prev.map((item: any, idx: number) => {
            if (idx === index) { item.isBookMarked = false }
            return item;
          }));
        }
      });
    }
  };

  const onPressAskQuestionButton = () => {
    navigation.navigate('SettingModal', {menu: {key: 'sendFeedback'}});
  };

  const onScroll = ({nativeEvent}: any) => {
    const offsetY = Math.floor(nativeEvent.contentOffset.y);

    if (offsetY <= 0) {
      setIsScrollTop(prev => {
        if (prev === true) {
          return prev;
        }
        return true;
      });
    } else {
      setIsScrollTop(prev => {
        if (prev === false) {
          return prev;
        }
        return false;
      });
    }
  };

  useEffect(() => {
    fetchData('/scrap', {})
      .then((res) => {
        const { data: { data } } = res;

        const isSavedContent = data.find((item: any) => item.contentId === id);

        if (isSavedContent) {
          setIsContentBookMarked(true);
        } else {
          setIsContentBookMarked(false);
        }
        
      })
      .catch((error) => {
        console.log('사용자 스크랩 데이터 에러', error);
      })
  }, []);

  useEffect(() => {
    fetchData(`/content/${id}`, {})
      .then(response => {
        const {
          data: {data},
        } = response;

        setContent(data);

        if (!data || !data.todos) {
          return;
        }

        const category: any = categories.find(
          (item: any) => item.id === Number(data.categoryId),
        );
        const todos: any = [];

        if (!todos.length) {
          const newData = data.todos.map((item: any) => ({
            ...item,
            isSaved: false,
          }));
          setTodos(newData);
        }

        const item = {
          id: data.id,
          title: data.title,
          url: data.contentUrl,
          content: String(data.content),
          hashtags: data.hashtags,
          createdTime: data.createdTime,
          category: category ? category.title : '카테고리',
          notification: [
            // {id: 10, title: '일부 콘텐츠는 예고없이 삭제될 수 있습니다.'},
          ],
        };

        setItem([item]);
        // NOTE 임시 연관 컨텐츠 -> 카테고리 컨텐츠 검색
        fetchData('/content', {
          categoryId: data.categoryId,
          page: 0,
          size: 5,
          sort: 'viewCount,desc',
        })
          .then(response => {
            const {
              data: {data},
            } = response;

            setRelatedContent(
              data.content
                .map((item: any) => ({
                  ...item,
                  isBookMarked: false,
                }))
                .filter((item: any) => item.id !== data.id),
              // 현재 컨텐츠 제외하고 연관 컨텐츠 노출
            );
          })
          .catch(error => {
            console.log('연관된 컨텐츠 조회 에러', error);
          });
      })
      .catch(error => {
        setConfirmData({
          title: '400 에러',
          description: '해당 컨텐츠는 존재하지 않습니다',
          button: {
            first: {
              text: '닫기',
              onPressButton: () => {
                setIsConfirmOpen(false);
                navigation.goBack();
              },
            },
          },
        });
        setIsConfirmOpen(true);
      });
  }, [id]);

  return (
    <AppLayout style={styles.container}>
      <AppHeader
        style={[
          styles.header,
          // NOTE 레이아웃 변경하면서 임시로 주석처리 TODO 불투명하게 변경
          // isScrollTop ? {} : {backgroundColor: 'rgba(170, 170, 170, 0.262)'},
        ]}>
        <View style={styles.headerWrapper}>
          <AppIcon
            name="back"
            width={36}
            height={36}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerRight}>
            {/** TODO 추후 기능 추가 */}
            {/* <AppIcon
              name="upload"
              width={36}
              height={36}
              onPress={onPressContentUploadButton}
            /> */}
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
      {item.length ? (
        <VirtualizedList
          onScroll={onScroll}
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
                <AppText style={styles.title}>{item.title}</AppText>
                <AppText style={styles.date}>
                  {getFormattedDate(new Date(item.createdTime), '.')}
                </AppText>
                {/** Article */}
                {/** BUG 왜 마크다운 style 에러 ??? */}
                <Markdown style={markdownStyle() as any}>{item.content}</Markdown>
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
                        // onPressButton={() => onPressHashTag(item)}
                      />
                    );
                  })}
                </View>
                <View style={styles.separator} />
                {/** Section1 : 연관된 할 일 추가하기 */}
                <View style={{paddingHorizontal: 24}}>
                  <View style={styles.basicTitleWrapper}>
                    <AppText style={styles.basicTitle}>
                      연관된 할 일 추가하기
                    </AppText>
                    <View style={styles.allAddWrapper}>
                      {
                        isAllSavedToDos() ?
                        <AppIcon 
                          name="check"
                          width={30}
                          height={30}
                        />
                        :
                        <AppIcon
                          name="addDark"
                          width={30}
                          height={30}
                          styles={{color: '#4681F6'}}
                        />
                      }
                      <AppButton
                        text={isAllSavedToDos() ? '전체 추가완료' : '전체 추가하기'}
                        textStyle={styles.todoListAddAllButton}
                        buttonStyle={{}}
                        onPressButton={addToDoItems}
                      />
                    </View>
                  </View>
                </View>
                {todos.length ? (
                  todos.map((item: any, index: number, array: any) => {
                    return (
                      <View
                        key={`similar_todo${index}`}
                        style={{
                          paddingHorizontal: 24,
                          paddingBottom: index === array.length - 1 ? 0 : 14,
                        }}>
                        <ToDoListItem
                          hasMainCategory={false}
                          index={index}
                          item={item}
                          onPressAddItem={addToDoItem}
                        />
                      </View>
                    );
                  })
                ) : (
                  <AppText>연관된 할 일이 존재하지 않습니다</AppText>
                )}
                <View style={styles.separator} />
                {/** Section2 : 연관 콘텐츠 추천 */}
                <View style={{paddingHorizontal: 24}}>
                  <View style={styles.basicTitleWrapper}>
                    <AppText style={styles.basicTitle}>
                      연관 콘텐츠 추천
                    </AppText>
                  </View>
                  {relatedContent.length ? (
                    relatedContent.map(
                      (item: any, index: number, array: any) => {
                        return (
                          <View
                            key={`content${index}`}
                            style={[
                              styles.contentWrapper,
                              {
                                borderBottomWidth:
                                  index === array.length - 1 ? 0 : 1,
                                marginBottom:
                                  index === array.length - 1 ? 0 : 10,
                                paddingBottom:
                                  index === array.length - 1 ? 5 : 8,
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
                                  onPressRelatedContentBookMarkButton(
                                    item,
                                    index,
                                  )
                                }
                                styles={
                                  item.isBookMarked ? {fill: '#A1ACB9'} : {}
                                }
                              />
                            </View>
                          </View>
                        );
                      },
                    )
                  ) : (
                    <AppText>연관된 컨텐츠가 존재하지 않습니다</AppText>
                  )}
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
                <View style={styles.notificationWrapper}>
                  {item.notification.map((item: any, index: number) => {
                    return (
                      <AppText
                        key={`notification${index}`}
                        style={styles.notificationText}>
                        {item.title}
                      </AppText>
                    );
                  })}
                </View>
              </View>
            );
          }}
          // 🤔 여기는 number 가능
          keyExtractor={(item, index) => 'similar_content' + index}
          initialNumToRender={1}
        />
      ) : (
        <></>
      )}
      <AppConfirmModal
        isVisible={isConfirmOpen}
        title={confirmData.title ? confirmData.title : ''}
        description={confirmData.description ? confirmData.description : ''}
        button={
          confirmData.button
            ? confirmData.button
            : {
                first: {
                  text: '',
                  textStyle: {},
                  buttonStyle: {},
                  onPressButton: () => {},
                },
              }
        }
      />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'column',
    borderColor: 'transparent',
    // paddingTop: 55,
    paddingBottom: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 24,
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
    paddingTop: 15,
    paddingBottom: 3,
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
    alignItems: 'center',
    marginBottom: 24,
  },
  basicTitle: {
    fontWeight: '600',
    fontSize: getFontSize(18),
    lineHeight: 21,
  },

  allAddWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  todoListAddAllButton: {
    color: '#4681F6',
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

export default Content;
