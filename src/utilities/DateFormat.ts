import dayjs from 'dayjs';

const DISPLAY_FORMAT: string = 'DD/MM/YYYY HH:mm';
const DISPLAY_FORMAT_DATE: string = 'DD/MM/YYYY';
const API_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

export const displayFormat = (value: any): string => {
  if (value) {
    return dayjs(value).format(DISPLAY_FORMAT);
  } else {
    return '...';
  }
};

export const displayFormatDate = (value: any): string => {
  if (value) {
    return dayjs(value).format(DISPLAY_FORMAT_DATE);
  } else {
    return '...';
  }
};

export const apiFormat = (value: Date | undefined): string | undefined => {
  if (value) {
    return dayjs(value).format(API_FORMAT);
  } else {
    return undefined;
  }
};
