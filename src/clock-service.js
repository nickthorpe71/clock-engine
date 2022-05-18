import { landsOnEvenHour, convertTo12Hour, range } from './utils';

export const countTollsInTimeSpan = (startTime, endTime) => {
    // convert dates to JS UTC date
    const start = new Date(startTime);
    const end = new Date(endTime);

    // determine if we should toll on start time
    const startTolls = (landsOnEvenHour(start)) ? convertTo12Hour(start.getHours()) : 0;

    // determine remaining tolls after start time
    const tollsPostStart = getTollsPostStart(start, end);
    console.log(tollsPostStart);

    return startTolls + tollsPostStart;
}

const getTollsPostStart = (startTime, endTime) => {
    const startHour = convertTo12Hour(startTime.getHours());
    const timeDifferenceInSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
    const timeDifferenceInHours = Math.abs(Math.round(timeDifferenceInSeconds / (60 * 60)));

    // if we don't cross over into the next day
    // return the number of tolls for this day
    if (startHour + timeDifferenceInHours <= 24) {
        return range(timeDifferenceInHours)
            .map(i => convertTo12Hour(i + 1 + startHour))
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }

    // otherwise calculate tolls for all following days

    // determine tolls left in remaining day
    const toNextDay = 24 - startTime.getHours();
    const tollsLeftInStartDay = range(toNextDay).map(i => convertTo12Hour(i + 1 + startHour));

    // determine remaining tolls after the first day
    const remainingHoursToEnd = timeDifferenceInHours - toNextDay;
    const remainingTolls = range(remainingHoursToEnd).map(i => convertTo12Hour(i % 24 + 1));

    const totalTolls = tollsLeftInStartDay.concat(remainingTolls)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    return totalTolls;
}