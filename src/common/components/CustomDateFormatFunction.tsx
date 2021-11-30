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

export default CustomDateFormatFunction 
