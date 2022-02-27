import { DateType } from "../../types/general.type";

export const getDateAsSpanishShortDate = (
  dateAsString:Date|string = 'notSet',
  country = 'es-ES',
  options: Intl.DateTimeFormatOptions ={}
): DateType  => {
  options = {
      day: '2-digit',
      month: 'numeric',
      year: 'numeric',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      ...options
    }
  
  try {
    const data = (
      dateAsString === 'notSet' ? new Date() : new Date(dateAsString)
    ).toLocaleDateString(country, options);
    const [date, hour, Periods] = data.split(' ');
    return { date: date.replace(/[/]/g, '-').replace(/[,]/g,''), hour: `${hour} ${Periods}` };
  } catch (error) {
    return error as unknown as DateType;
  }
};