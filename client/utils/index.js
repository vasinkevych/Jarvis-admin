const location = window.location;

export const getBaseUrl = () => {
  return `${location.protocol}//${location.hostname}${
    location.port ? ':3000' : ''
  }`;
};

const needZero = val => (val < 10 ? '0' + val : val);

export const validateDate = date => {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (isNaN(date.getTime())) {
      // d.valueOf() could also work
      throw new Error('Date is invalid');
    } else {
      return true;
    }
  } else {
    throw new Error('Inserted value is not a date');
  }
};

export const dateToView = value => {
  let date;
  if (value instanceof Date) {
    date = new Date(value);
  } else date = new Date(value);
  validateDate(date);
  return `${needZero(date.getDate())}-${needZero(
    date.getMonth() + 1
  )}-${date.getFullYear()} [${date.getHours()}:${needZero(date.getMinutes())}]`;
};
