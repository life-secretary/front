import React, {useCallback, useMemo, useRef} from 'react';
import {Text, StyleSheet, Button} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const App = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // TODO: dynamic value로 변경
  const snapPoints = useMemo(() => ['25%'], []);

  const handleModalVisible = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // const handleModalClose = () => bottomSheetModalRef.current?.close();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={true}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModalProvider>
      <Button
        onPress={handleModalVisible}
        title="Present Modal"
        color="black"
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          {/* TODO: props로 받은 component 렌더링 */}
          <Text>Contents</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
