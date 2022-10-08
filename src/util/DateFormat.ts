export const dateFormat = (value: any): string => {
  let date: Date;
  if (value instanceof Date) {
    date = value;
  } else {
    date = new Date(value);
  }

  const yyyy = date.getFullYear();
  let MM = formatNumber(date.getMonth() + 1);
  let dd = formatNumber(date.getDate());
  let hh = formatNumber(date.getHours());
  let mm = formatNumber(date.getMinutes());
  let ss = formatNumber(date.getSeconds());

  const formattedToday = `${dd}/${MM}/${yyyy} ${hh}:${mm}:${ss}`;
  return formattedToday;
};

const formatNumber = (value: number): string => {
  let valueString = value.toString();
  if (value < 10) {
    valueString = '0' + valueString;
  }
  return valueString;
};
