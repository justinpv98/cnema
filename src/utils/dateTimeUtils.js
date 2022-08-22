export function formatYearOnly(date) {
    //checks if input date is in a valid date format
    const isValidDate = Date.parse(date);
  
    //returns null if not a valid Date, else returns date in full year format only
    //ex Jan 17 1970 -> 1970
    if (!isValidDate) {
      return null;
    } else {
      const dateObj = new Date(date);
      return dateObj.getFullYear();
    }
  }

export function convertMinToHourMin(minutes){
  const hour = Math.floor(minutes / 60)
  minutes = minutes % 60

  return hour === 0 ? `${minutes}m` : `${hour}h ${minutes}m` 
}