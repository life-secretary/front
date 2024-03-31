import React, { useState } from 'react';
import { StyleSheet, View, FlatList, VirtualizedList } from 'react-native';
import type { AppModalProps } from '../common/modal/AppModal';

import { AppHeader } from '../common/AppHeader';
import { AppText } from '../common/AppText';
import AppIcon from '../common/AppIcon';
import AppButton from '../common/AppButton';
import AppModal from '../common/modal/AppModal';

import ToDoListItem from '../search/ToDoListItem';
import SearchHashTagModal from '../search/SearchHashTagModal';

import Markdown from 'react-native-markdown-display';
import { getFontSize } from '../../utils/font';

const ContentModal = ({ 
    isVisible=false,
}: Partial<AppModalProps>): React.JSX.Element => {

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

    // ![20대_예산수립_1](https://github.com/life-secretary/front/assets/80025242/ab8bfe44-3f92-4d3d-a3ff-73c9671fbe8a) → 렌더 비용으로 잠깐 빼놓음

    const markdown = `

## 중간 타이틀 영역
    
#### 청년 우대형 주택청약종합저축은 기존 주택청약의 혜택에 1.5%의 우대금리를 추가로 제공합니다.
    
#### 만일 2년 이상 가입한 경우 납입 원금 5천만원 한도 내에서 최대 10년간 우대금리를 적용받을 수가 있는데요.
    
#### 보통 주택청약이 붙는 이율이 10년 이상 납입되었을 경우 2.8%라면, 청년 우대형 청약통장의 경우는 1개월 ~1년은, 1~2년에 따라 금리가 변동되며 ~10년은 4.3%로 기존의 일반청약통장 대비하여 거의 2배에 달하는 이자를 제공한다고 보시면 됩니다.
    
#### 청년 우대형 주택청약종합저축은 기존 주택청약의 혜택에 1.5%의 우대금리를 추가로 제공합니다.
    
#### 만일 2년 이상 가입한 경우 납입 원금 5천만원 한도 내에서 최대 10년간 우대금리를 적용받을 수가 있는데요.
    
#### 보통 주택청약이 붙는 이율이 10년 이상 납입되었을 경우 2.8%라면, 청년 우대형 청약통장의 경우는 1개월 ~1년은, 1~2년에 따라 금리가 변동되며 ~10년은 4.3%로 기존의 일반청약통장 대비하여 거의 2배에 달하는 이자를 제공한다고 보시면 됩니다. (공백 포함 542 공백 제외 418)
    
#### 청년 우대형 주택청약종합저축은 기존 주택청약의 혜택에 1.5%의 우대금리를 추가로 제공합니다.
    
#### 만일 2년 이상 가입한 경우 납입 원금 5천만원 한도 내에서 최대 10년간 우대금리를 적용받을 수가 있는데요.
    
#### 보통 주택청약이 붙는 이율이 10년 이상 납입되었을 경우 2.8%라면, 청년 우대형 청약통장의 경우는 1개월 ~1년은, 1~2년에 따라 금리가 변동되며 ~10년은 4.3%로 기존의 일반청약통장 대비하여 거의 2배에 달하는 이자를 제공한다고 보시면 됩니다. (공백 포함 825 공백 제외 635)`;

    const markdownStyle = {
        body: {
            paddingHorizontal: 24,
            marginBottom: 18,
        },
        image: {
            marginBottom: 18
        },
        heading2: {
            fontWeight: '600',
            fontSize: getFontSize(18),
            lineHeight: 21,
            color: '#000E24',
            marginBottom: 18,
        },
        heading4: {
            fontWeight: '400',
            fontSize: getFontSize(17),
            lineHeight: 26,
            color: '#40474F',
            marginBottom: 18,
        },
    };

    const data = [{
        id: '1',
        markdown,
        hashTags: ['해시태그', '콘텐츠키워드', '클릭시이동', '디폴트값설정필요', '키워드이곳에'],
        todolist: [
            { id: 1, title: '연금 보험 계좌 만들기' },
            { id: 2, title: '할일의 글자수는 최대 20자 제한임다' },
            { id: 3, title: '4대보험 가입내역 확인하기' },
            { id: 4, title: '국민연금 납입금액 확인하기' }
        ],
        contents: [
            { id: 5, title: '이곳은 콘텐츠의 제목이 되는 영역' },
            { id: 6, title: '콘텐츠 제목은 아마도 최대 26자 제한으로 정함' },
            { id: 7, title: '관련 키워드가 포함한 검색 결과 노출' },
            { id: 8, title: '이곳은 썸네일 없이 가는 것도 괜찮을듯' }
        ],
        notification: [
            { id: 9, title: '콘텐츠에 대한 가벼운 안내사항을 여기에 적으면 어떨까 싶습니다. 예를 들어 이 콘텐츠는 어디어디 사이트를 참고하여 제작되었으며 수정사항이 있다면 어디로 연락주세요.' },
            { id: 10, title: '일부 콘텐츠는 예고없이 삭제될 수 있습니다.' },
            { id: 11, title: '테스트 문구 추가해서 ui 검토 테스트 문구 추가해서 ui 검토 테스트 문구 추가해서 ui 검토 테스트 문구 추가해서 ui 검토' }
        ]
    }];
    
    const getItem = (_data: any, index: number) => {
        /**
         * TODO 데이터 fetch 후 할당 필요
         * FlatList 상태값 유지 확인 단위 테스트 필요
         * 데이터 관리 방법 생각
         */
        return data[0];
    };
    
    const getItemCount = (_data: any) => {
        return data.length;
    };

    // bookMarkButton [Content]
    const [isContentBookMarked, setIsContentBookMarked] = useState(false);

    const onPressContentBookMarkButton = () => {
        setIsContentBookMarked(previousValue => !previousValue);
    };

    // hashTag [Content]
    const [isHashTagModalVisible, setIsHashTagModalVisible] = useState(false);
    const [pressedHashTag, setPressedHashTag] = useState('');

    const onPressHashTag = (index) => {
        setPressedHashTag(data[0].hashTags[index]);
        setIsHashTagModalVisible(true);
    };

    const onPressHashTagModalBackButton = () => {
        setPressedHashTag('');
        setIsHashTagModalVisible(false);
    };

    // bookMarkButton [RelatedContent]
    const customRelatedContent = data[0].contents.map((item) => Object.assign(item, { isBookMarked : false }));
    const [isRelatedContent, setIsRelatedContent] = useState(customRelatedContent);

    const onPressRelatedContentBookMarkButton = (index: number) => {
        setIsRelatedContent((previousValue) => {
            const previousBookMarkStatus = previousValue[index].isBookMarked;
            previousValue[index].isBookMarked = !previousBookMarkStatus;

            return previousValue.slice();
        })
    };

    return (
        <AppModal
            isVisible={isVisible}
            backdropColor={constants.MODAL_BACKDROP_COLOR}
            backdropOpacity={constants.MODAL_BACKDROP_OPACITY}
        >
            <View style={styles.container}>
                <AppHeader style={{
                    flexDirection: 'column',
                    borderColor: 'transparent',
                    marginVertical: 0,
                    paddingBottom: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 24,
                    }}>
                        <View>
                            <AppIcon 
                                name='back'
                                width={36}
                                height={36}
                            />
                        </View>
                        <View style={styles.headerRight}>
                            <AppIcon 
                                name='upload'
                                width={36}
                                height={36}
                            />
                            <AppIcon 
                                name='bookmarkLarge'
                                width={36}
                                height={36}
                                onPress={onPressContentBookMarkButton}
                                styles={isContentBookMarked ? { fill: '#000' } : {}}
                            />
                        </View>
                    </View>
                </AppHeader>
                <VirtualizedList
                    getItem={getItem}
                    getItemCount={getItemCount}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                {/** Header */}
                                <View style={styles.mainCategoryWrapper}>
                                    <AppButton 
                                        isDisabled={true}
                                        text={'부동산'}
                                        textStyle={styles.mainCategory}
                                        buttonStyle={styles.mainCategoryPressable}
                                    />
                                </View>
                                <AppText style={styles.title}>{'2월에 신청하는 새로운 청약통장'}</AppText>
                                <AppText style={styles.date}>{'2024.01.08'}</AppText>
                                {/** Article */}
                                <Markdown style={markdownStyle}>{ item.markdown }</Markdown>
                                {/** HashTag */}
                                <View style={styles.hashTagWrapper}>
                                    {data[0].hashTags.map((item, index) => {
                                        return (
                                        <AppButton 
                                            key={`hashTag${index}`}
                                            text={`#${item}`}
                                            textStyle={styles.hashTag}
                                            buttonStyle={styles.hashTagPressable}
                                            // TODO pressedColor 통일되면 props 제거 가능
                                            pressedBackgroundColor={`#11111166`}
                                            onPressButton={() => onPressHashTag(index)}
                                        />
                                        );
                                    })}
                                </View>
                                <View style={styles.separator}/>
                                {/** Section1 : 연관된 할 일 추가하기 */}
                                <FlatList 
                                    data={data[0].todolist}
                                    keyExtractor={(item) => { return String(item.id) }}
                                    initialNumToRender={8}
                                    ListHeaderComponent={() => {
                                        return (
                                            <View style={styles.basicTitleWrapper}>
                                                <AppText style={styles.basicTitle}>연관된 할 일 추가하기</AppText>
                                                <AppButton 
                                                    text={'전체추가하기'}
                                                    textStyle={styles.todoListAddAllButton}
                                                    buttonStyle={{}}
                                                    onPressButton={() => {}}
                                                />
                                            </View>
                                        );
                                    }}
                                    renderItem={({ item, index, separators }) => {
                                        return (
                                            <ToDoListItem 
                                                hasMainCategory={false}
                                                item={item}
                                            />
                                        );
                                    }}
                                    ItemSeparatorComponent={() => {
                                        return (
                                            <View style={{ paddingBottom: 14 }} />
                                        );
                                    }}
                                    style={{
                                        paddingHorizontal: 24,
                                    }}
                                />
                                <View style={styles.separator}/>
                                {/** Section2 : 연관 콘텐츠 추천 */}
                                <View style={{
                                    paddingHorizontal: 24,
                                }}>
                                    <View style={styles.basicTitleWrapper}>
                                        <AppText style={styles.basicTitle}>연관 콘텐츠 추천</AppText>
                                    </View>
                                    {/** 가공된 데이터 사용 */}
                                    {isRelatedContent.map((item, index, data) => {
                                        return (
                                            <View key={`content${index}`} style={[
                                                styles.contentWrapper,
                                                {
                                                    borderBottomWidth : (index === data.length - 1) ? 0 : 1,
                                                    marginBottom: (index === data.length - 1) ? 0 : 10,
                                                    paddingBottom: (index === data.length - 1) ? 5 : 8,

                                                }
                                            ]}>
                                                <View style={styles.contentTitleWrapper}>
                                                    <AppText style={styles.contentTitle}>{item.title}</AppText>
                                                </View>
                                                <View style={styles.contentSaveButtonWrapper}>
                                                    <AppIcon 
                                                        name='bookmarkMedium'
                                                        width={42}
                                                        height={42}
                                                        onPress={() => onPressRelatedContentBookMarkButton(index)}
                                                        styles={item.isBookMarked ? { fill: '#A1ACB9' } : {}}
                                                    />
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                                <View style={styles.separator}/>
                                {/** Section3 : 문의 및 의견 보내기 */}
                                <View style={{
                                    paddingHorizontal: 24,
                                    paddingBottom: 40,
                                }}>
                                    <AppText style={styles.askButtonTitle}>이번 콘텐츠는 어떠신가요?</AppText>
                                    <AppText style={styles.askButtonSubTitle}>더 나은 콘텐츠를 제작하는데 큰 도움이 됩니다</AppText>
                                    <View style={styles.askButtonWrapper}>
                                        <AppButton 
                                            text={'문의 및 의견 보내기'}
                                            // 📌 임시
                                            textStyle={styles.askButtonText}
                                            buttonStyle={styles.askButton}
                                            // TODO pressedColor 통일되면 props 제거 가능
                                            pressedBackgroundColor={`#11111166`}
                                            onPressButton={() => {}}
                                        />
                                    </View>
                                </View>
                                {/** Section4 : 안내 사항 */}
                                <View style={styles.notificationWrapper}>
                                    {
                                        data[0].notification.map((item, index) => {
                                            return (
                                                <AppText 
                                                    key={`notification${index}`}
                                                    style={styles.notificationText}
                                                >&#183; {item.title}</AppText>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            );
                    }}
                    // 🤔 여기는 number 가능
                    keyExtractor={( item ) => { return item.id }}
                    initialNumToRender={1}
                ></VirtualizedList>
                </View>
            {/** HashTagModal */}
            <SearchHashTagModal 
                isVisible={isHashTagModalVisible}
                hashTag={pressedHashTag}
                pressBackButton={onPressHashTagModalBackButton}
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
        color: '#000E24'
    },
    contentSaveButtonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    askButtonTitle: {
        fontWeight: '600',
        fontSize: getFontSize(16),
        lineHeight: 21,
        color: '#000E24',
        textAlign: 'center'
    },
    askButtonSubTitle: {
        fontWeight: '500',
        fontSize: getFontSize(13),
        lineHeight: 16,
        color: '#A1ACB9',
        textAlign: 'center'
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
        backgroundColor: '#F2F4F7'
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
        backgroundColor: '#F2F4F7'
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
        backgroundColor: '#F2F4F7'
    }
})

export default ContentModal;
