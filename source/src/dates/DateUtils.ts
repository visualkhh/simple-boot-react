import { StringUtils } from '../strings/StringUtils';

export namespace DateUtils {
  export const create = (data: string): Date => new Date(data);

  export const fullMilliSecond = (): number => new Date().getTime();

  export const fullSecond = (): number => new Date().getTime() / 1000;
  export const milliSecond = (): number => new Date().getMilliseconds();

  //yyyy yy ,    MM ,dd  ,e , HH hh , mm, ss ,a/p
  //yyyy.MM.dd HH:mm:ss
  export const format = (format_s: string, date_o?: Date | number): string => {
    if (date_o === undefined) {
      date_o = new Date();
    }
    if (!isNaN(Number(date_o))) {
      date_o = new Date(date_o);
    }

    const date = date_o as Date;
    //var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    //var timeType = ["오전", "오후"];
    // var weekName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekName = ['일', '월', '화', '수', '목', '금', '토'];
    const timeType = ['AM', 'PM'];

    return format_s.replace(/(yyyy|SSS|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, ($1: string) => {
      let h;
      switch ($1) {
        case 'yyyy':
          return String(date.getFullYear());
        case 'yy':
          return StringUtils.lpad('0', 2, (date.getFullYear() % 1000).toString());
        case 'MM':
          return StringUtils.lpad('0', 2, (date.getMonth() + 1).toString());
        case 'dd':
          return StringUtils.lpad('0', 2, date.getDate().toString());
        case 'E':
          return weekName[date.getDay()];
        case 'HH':
          return StringUtils.lpad('0', 2, date.getHours().toString());
        case 'hh':
          return StringUtils.lpad('0', 2, ((h = date.getHours() % 12) ? h : 12).toString());
        case 'mm':
          return StringUtils.lpad('0', 2, date.getMinutes().toString());
        case 'ss':
          return StringUtils.lpad('0', 2, date.getSeconds().toString());
        case 'SSS':
          return StringUtils.lpad('0', 3, date.getMilliseconds().toString());
        case 'a/p':
          return String(date.getHours() < 12 ? timeType[0] : timeType[1]);
        default:
          return $1;
      }
    });
  };

  export const age = (dateOfBirth: Date, until: Date = new Date()) => {
    let age = until.getFullYear() - dateOfBirth.getFullYear();
    const m = until.getMonth() - dateOfBirth.getMonth();

    if (m < 0 || (m === 0 && until.getDate() < dateOfBirth.getDate())) {
      age--;
    }

    return Math.max(age, 0);
  };

  export const countingAge = (dateOfBirth: Date, until: Date = new Date()) => {
    return Math.max(until.getFullYear() - dateOfBirth.getFullYear(), 0) + 1;
  };

  export const yearAge = (dateOfBirth: Date, until: Date = new Date()) => {
    return until.getFullYear() - dateOfBirth.getFullYear();
  };
}
