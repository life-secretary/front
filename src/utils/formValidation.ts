export const formValidation = {
  common: {
    specialChar: {
      errorMsg: '특수문자는 입력할 수 없어요.',
    },
    inappropriate: {
      keywords: ['개새끼'],
      errorMsg: '부적절한 내용을 담고 있습니다. 내용을 수정해 주세요.',
    },
  },
};

export const checkSpecialChar = (text: string) => {
  const regExp = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g;
  return regExp.test(text);
};

export const checkInappropriateKeyword = (keywords: string[], text: string) => {
  let result: boolean = false;

  keywords.forEach((keyword: string) => {
    if (text.indexOf(keyword) !== -1) {
      result = true;
    } else {
      result = false;
    }
  });
  return result;
};
