type DateType = {
  hour: string
  date: string
}

const CustomDateFormatFunction = (FullDate: string): DateType => {
 
    const data = new Date(FullDate).toLocaleDateString('es', {
      day: '2-digit',
      month: 'numeric',
      year: 'numeric',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    const [date, hour] = data.split(' ')
    return { hour: hour, date: date }
 
}
export const getDateAsSpanishShortDate = (
  dateAsString = 'notSet',
  country = 'es-ES',
): DateType => {
 
    const data = (
      dateAsString === 'notSet' ? new Date() : new Date(dateAsString)
    ).toLocaleDateString(country, {
      day: '2-digit',
      month: 'numeric',
      year: 'numeric',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const [date, hour, Periods] = data.split(' ');
    return {
      date: date.replace(/[/]/g, '-').replace(',', ''),
      hour: `${hour} ${Periods}`,
    };
 
};
type SpanishLongDateType = {
  dateString?: string | Date;
  language?: string;
};
export function getDateAsSpanishLongDate ({
  dateString = 'currentDate',
  language = 'es-ES',
}: SpanishLongDateType): string {
  return (
    dateString === 'currentDate' ? new Date() : new Date(dateString)
  ).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: `${language === 'es-ES' ? '2-digit' : 'numeric'}`,
  });
}
export default CustomDateFormatFunction 
