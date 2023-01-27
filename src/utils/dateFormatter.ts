const addNullNumber = (dateParam:number) => {
  if (dateParam > 9) {
    return dateParam;
  }
  return `0${dateParam}`;
};
  
export const dateFormatter = (getDate: number, time?:boolean, utc?:boolean) => {
  const date = utc ? new Date(getDate * 1000) : new Date(getDate);
  
  const ymd = `${date.getFullYear()}-${addNullNumber(date.getMonth() + 1)}-${addNullNumber(date.getDate())}`;
  const hms = `${addNullNumber(date.getHours())}:${addNullNumber(date.getMinutes())}:${addNullNumber(date.getSeconds())}`;
  
  if (time === true) { return `${ymd} ${hms}`; }
  return ymd;
};