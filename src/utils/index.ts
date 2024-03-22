export const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const generateRandomId = () => {
  let randomId = '';
  for (let i = 0; i < 10; i++) {
    randomId += Math.floor(Math.random() * 10);
  }

  return randomId;
};
