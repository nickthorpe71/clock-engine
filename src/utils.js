export const landsOnEvenHour = (dateTime) => dateTime.getMinutes() === 0;
export const convertTo12Hour = (hour) => hour > 12 ? hour - 12 : hour;
export const range = (length) => [...Array(length).keys()];