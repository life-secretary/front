import React, {ReactNode, useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

type AppBottomSheetProps = {
  isVisible: boolean;
  children?: ReactNode;
  contentsStyle?: ViewStyle;
  handleBottomSheetVisible: Function;
};

const AppBottomSheet = ({
  isVisible,
  children,
  contentsStyle,
  handleBottomSheetVisible,
}: AppBottomSheetProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // TODO: dynamic value로 변경
  const snapPoints = useMemo(() => ['70%'], []);

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={true}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={handleBottomSheetVisible(false)}
      />
    ),
    [handleBottomSheetVisible],
  );

  useEffect(() => {
    isVisible ? openBottomSheet() : closeBottomSheet();
  }, [isVisible]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetView style={[styles.contentContainer, contentsStyle]}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

export default AppBottomSheet;
