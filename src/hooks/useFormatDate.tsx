const useFormatDate = () => {
  const calculateDayElapsed = (miliseconds: number): number => {
    const milisecondsPerDay: number = 24 * 60 * 60 * 1000
    const currentDate: Date = new Date()
    const pastDate: Date = new Date(miliseconds)

    const dayElapsed: number = Math.floor((currentDate.getTime() - pastDate.getTime()) / milisecondsPerDay)
    return dayElapsed
  }
  const calculateHourElapsed = (miliseconds: number): number => {
    // const milisecondsPerHour: number = 60*60*1000;
    const currentHour: number = new Date().getHours()
    const pastHour: number = new Date(miliseconds).getHours()

    const hourElapsed: number = Math.floor(currentHour - pastHour)
    return hourElapsed
  }
  const formatMilisecondToDate = (milliseconds: number | undefined) => {
    if (milliseconds && milliseconds > Date.now()) {
      return 'Trống'
    }
    const date: Date = new Date(milliseconds || 0)
    const day: number = date.getDate()
    const month: number = date.getMonth()
    const year: number = date.getFullYear()

    return `${day}/${month}/${year}`
  }
  const formatDate = (miliseconds: number | undefined) => {
    if (miliseconds && calculateHourElapsed(miliseconds) > 24) {
      return calculateDayElapsed(miliseconds) + ' ngày trước'
    }
    return miliseconds && calculateHourElapsed(miliseconds) + ' giờ trước'
    // miliseconds && calculateDayElapsed(miliseconds) > 1 && calculateDayElapsed(miliseconds)
  }
  return {
    formatDate,
    formatMilisecondToDate
  }
}

export default useFormatDate
