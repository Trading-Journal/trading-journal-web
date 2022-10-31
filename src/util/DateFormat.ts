import dayjs from 'dayjs';

const DISPLAY_FORMAT: string = 'DD/MM/YYYY HH:mm';
const API_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

export const displayFormat = (value: any): string => {
  return dayjs(value).format(DISPLAY_FORMAT);
};

export const apiFormat = (value: Date | undefined): string | undefined => {
  if (value) {
    return dayjs(value).format(API_FORMAT);
  } else {
    return undefined;
  }
};
