export const hasZeroMinutes = (dateTime) => dateTime.getMinutes() === 0;
export const convert24HourTo12Hour = (hour) => hour > 12 ? hour - 12 : hour;
export const range = (start, end) => {
    if (start > end) return [];
    return [...Array(end).keys()].map(i => i + start);
}