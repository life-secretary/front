import React from 'react';
import Modal from '../../common/AppModal';
import type {AppModalProps} from '../../common/AppModal';

const ContentModal = ({isVisible = false}: Partial<AppModalProps>) => {
  const constants = {
    MODAL_BACKDROP_COLOR: 'white',
    MODAL_BACKDROP_OPACITY: 1,
  }; // TODO 상수로 관리

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={constants.MODAL_BACKDROP_COLOR}
      backdropOpacity={constants.MODAL_BACKDROP_OPACITY}
    />
  );
};

export default ContentModal;
