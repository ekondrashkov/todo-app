export { getId, getTodayDate, generateDate }

/**
* id generator
* @returns {string} - id
*/
function getId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
* today date generator
* @returns {string} - date for field
*/
function getTodayDate(): string {
  const date: Date = new Date();
  let day: number | string = date.getDate();
  let month: number | string = date.getMonth() + 1;
  const year: number = date.getFullYear();

  day < 10 ? day = `0${day}` : day.toString();
  month < 10 ? month = `0${month}` : month.toString();

  return `${day}.${month}.${year}`
}

/**
* task date generator
* @returns {string} - date for field
*/
function generateDate(taskDate: string): string {
  const date: Date = new Date(taskDate.split(".").reverse().join("-"));
  let dayDate: number | string = date.getDate();
  let dayWeek: number | string = date.getDay();
  const month: number = date.getMonth();

  let monthToDisplay: string = '';
  switch (month) {
    case 1:
      monthToDisplay = 'Feb';
      break;
    case 2:
      monthToDisplay = 'Mar';
      break;
    case 3:
      monthToDisplay = 'Apr';
      break;
    case 4:
      monthToDisplay = 'May';
      break;
    case 5:
      monthToDisplay = 'Jun';
      break;
    case 6:
      monthToDisplay = 'Jul';
      break;
    case 7:
      monthToDisplay = 'Aug';
      break;
    case 8:
      monthToDisplay = 'Sep';
      break;
    case 9:
      monthToDisplay = 'Oct';
      break;
    case 10:
      monthToDisplay = 'Nov';
      break;
    case 11:
      monthToDisplay = 'Dec';
      break;
    case 0:
      monthToDisplay = 'Jan';
      break;
  }

  let dayToDisplay: string = '';
  switch (dayWeek) {
    case 1:
      dayToDisplay = 'Monday';
      break;
    case 2:
      dayToDisplay = 'Tuesday';
      break;
    case 3:
      dayToDisplay = 'Wednesday';
      break;
    case 4:
      dayToDisplay = 'Thursday';
      break;
    case 5:
      dayToDisplay = 'Friday';
      break;
    case 6:
      dayToDisplay = 'Saturday';
      break;
    case 0:
      dayToDisplay = 'Sunday';
      break;
  }

  return `${dayToDisplay}, ${dayDate} ${monthToDisplay}`
}
