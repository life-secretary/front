import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {AppText} from '../common/AppText';
import {ScrollView} from 'react-native-gesture-handler';
import AppIcon from '../common/AppIcon';
import {getFontSize} from '@/utils/font';
import AppButton from '../common/AppButton';
import {fetchData, createData} from '@/api/api';
import {useRecoilValue} from 'recoil';
import {categoryListState} from '@/store/categoryState';
import AppConfirmModal from '../common/modal/AppConfirmModal';

const ToDoDetail = ({navigation, route}: any) => {
  const {id} = route.params;
  const categories = useRecoilValue(categoryListState);
  const [data, setData] = useState<any>({});
  const [toDo, setToDo] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [confirmData, setConfirmData] = useState<any>({});

  const onPressCloseIcon = () => {
    navigation.goBack();
  };

  const onPressAddToDosButton = () => {
    createData('/todo/save', {id}).then(response => {
      const {
        data: {data},
      } = response;

      if (data) {
        // 추가완료 팝업 띄우기
        setConfirmData({
          title: '추가 완료',
          description: '할 일 목록에서 확인할 수 있어요',
          button: {
            first: {
              text: '목록 바로 가기',
              onPressButton: () => {
                setIsConfirmOpen(false);
                navigation.navigate('Todo');
              },
            },
            second: {
              text: '계속 둘러보기',
              onPressButton: () => {
                setIsConfirmOpen(false);
                navigation.goBack();
              },
            },
          },
        });
        setIsConfirmOpen(true);
      }
    });
  };

  useEffect(() => {
    if (!id && id !== 0) {
      return;
    }

    fetchData(`/todo/${id}/sub`, {}).then(response => {
      const {
        data: {data},
      } = response;

      setToDo(data);
    });

    // testing
    fetchData(`/todo/${id}`, {}).then(response => {
      const {
        data: {data},
      } = response;

      setData(data);
    });
  }, [id]);

  return (
    <View style={styles.background}>
      <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <View style={styles.closeIconWrapper}>
            <AppIcon
              name="closeFillDark"
              width={42}
              height={42}
              onPress={onPressCloseIcon}
              style={styles.closeIconWrapper}
            />
          </View>
          <View style={styles.titleTextWrapper}>
            <AppText style={styles.categoryIcon}>
              {categories.find(
                (category: any) => category?.id === data?.category?.id,
              )?.title || '카테고리'}
            </AppText>
            <AppText style={styles.title}>
              {data?.title || ''}
              {/** TODO 예외처리 정확히 하기 */}
            </AppText>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <AppText style={styles.infoText}>
            아래 순서로 할 일을 진행해보세요
          </AppText>
          <ScrollView style={styles.scrollView}>
            <View style={styles.todoWrapper}>
              {toDo.map((item: any) => {
                return (
                  <AppText key={`sub_detail_${item.id}`} style={styles.todo}>
                    {item.title}
                  </AppText>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <AppButton
            text="할 일 추가하기"
            textStyle={styles.buttonTextStyle}
            buttonStyle={styles.buttonStyle}
            endIcon={{
              name: 'addLight',
              styles: {color: '#FFFFFF'},
              width: 36,
              height: 36,
            }}
            onPressButton={onPressAddToDosButton}
          />
        </View>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: 'rgba(17, 17, 17, 0.4)',
  },
  content: {
    width: '100%',
    height: '90%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  titleWrapper: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: '#F2F4F7',
  },
  closeIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryIcon: {
    alignSelf: 'flex-start',

    fontWeight: '600',
    fontSize: getFontSize(12),
    lineHeight: 15,
    color: '#4681F6',

    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 11,
    backgroundColor: '#E7EDF3',
  },
  titleTextWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    color: '#000E24',
    fontSize: getFontSize(22),
    fontWeight: '600',
  },
  contentWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  infoText: {
    color: '#A1ACB9',
    fontSize: 12,
    marginBottom: 12,
  },
  scrollView: {
    height: 330,
  },
  todoWrapper: {
    gap: 20,
  },
  todo: {
    color: '#40474F',
    fontSize: getFontSize(16),
    fontWeight: '600',
    width: '100%',
    borderColor: '#E7EDF3',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 23,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  buttonWrapper: {
    position: 'relative',
    paddingHorizontal: 120, // 임시
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: getFontSize(13),
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 5,
    backgroundColor: '#000E24',
  },
});

export default ToDoDetail;
