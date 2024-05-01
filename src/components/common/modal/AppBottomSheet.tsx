import React, {ReactNode, useCallback, useEffect, useMemo, useRef} from 'react';

import {ViewStyle} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {useRecoilState} from 'recoil';
import {bottomSheetVisibleState} from '@/store/bottomSheetState';

type AppBottomSheetProps = {
  snapPointsArr?: string[];
  children?: ReactNode;
  contentsStyle?: ViewStyle;
};

const AppBottomSheet = ({
  snapPointsArr = ['25%', '50%'],
  children,
  contentsStyle,
}: AppBottomSheetProps) => {
  const [isVisible, setIsVisible] = useRecoilState(bottomSheetVisibleState);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => snapPointsArr, [snapPointsArr]);

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => {
      const handlePress = () => {
        setIsVisible(false);
      };

      return (
        <BottomSheetBackdrop
          {...props}
          enableTouchThrough={true}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          onPress={() => handlePress()}
        />
      );
    },
    [setIsVisible],
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
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={contentsStyle}>{children}</BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default AppBottomSheet;
