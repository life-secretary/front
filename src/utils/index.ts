export const getFormattedDate = (date: Date, unit: string): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  switch (unit) {
    case '.':
      return `${year}.${month}.${day}`;
    case 'kor':
      return `${year}년 ${month}월 ${day}일`;
    default:
      return date.toLocaleString();
  }
};

export const generateRandomId = () => {
  let randomId = '';
  for (let i = 0; i < 10; i++) {
    randomId += Math.floor(Math.random() * 10);
  }

  return randomId;
};
