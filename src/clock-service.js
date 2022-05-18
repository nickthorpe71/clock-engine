import { hasZeroMinutes, convert24HourTo12Hour, range } from './utils';

export const countTollsInTimeSpan = (startTime, endTime) => {
    // convert dates to JS date object
    // **could do additional validation here**
    const start = new Date(startTime);
    const end = new Date(endTime);

    // check edge case where the start time has 0 minutes
    // and we need to ring for the start time
    const startTimeAdjust = hasZeroMinutes(start) ? convert24HourTo12Hour(start.getHours()) : 0;

    const numberOfDaysBetween = getNumberOfDaysBetween(start, end);

    // check if the start and end time fall on the same day
    if (numberOfDaysBetween === 0) {
        // handle start and end time fall on same day
        return getRingsForPartialDay(start, end) + startTimeAdjust;
    }
    else {
        // handle start and end time fall on different days

        // clone start and end times
        const cloneOfStart = new Date(start);
        const cloneOfEnd = new Date(end);

        // get the end time of the first day
        const midnightOfTheFirstDay = new Date(cloneOfStart.setHours(24, 0, 0, 0));

        // get the beginning time of the final day
        const oneMinIntoFinalDay = new Date(cloneOfEnd.setHours(0, 0, 0, 0));

        // find out how many rings in the first day
        const startDayRings = getRingsForPartialDay(start, midnightOfTheFirstDay);

        // find out how many rings in the final day
        const endDayRings = getRingsForPartialDay(oneMinIntoFinalDay, end);

        // total tolls for all days between (all of which would be whole)
        const inBetweenDaysRings = getRingsForMultipleWholeDays(numberOfDaysBetween - 1);

        // total all rings and return
        const totalRings = startDayRings + inBetweenDaysRings + endDayRings + startTimeAdjust;
        return totalRings;
    }
}

const getNumberOfDaysBetween = (start, end) => {
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    // add a day for in the case that the start time is later than
    // the end time and they land on separate days
    const totalDays = start.getHours() > end.getHours()
        ? differenceInDays + 1
        : differenceInDays;

    return totalDays;
}

const getNumberOfHoursBetween = (start, end) => {
    const timeDifferenceInSeconds = (end.getTime() - start.getTime()) / 1000;

    // get hours by dividing total seconds by seconds in a min * mins in an hour
    const hoursBetweenStartAndEndTimes = Math.round(timeDifferenceInSeconds / (60 * 60));
    return hoursBetweenStartAndEndTimes;
}

const getRingsForPartialDay = (start, end) => {
    const startHour = convert24HourTo12Hour(start.getHours());
    const numHoursBetween = getNumberOfHoursBetween(start, end);

    // step through each hour from start time to end time
    // accumulating the number of rings for each hour on the way
    const numberOfRings = range(1, numHoursBetween - 1)
        .map(i => convert24HourTo12Hour(i + startHour))
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    // if start is midnight we will be short 12 hours
    const adjustForStartIsMidnight = startHour === 0 ? 12 : 0;

    return numberOfRings + adjustForStartIsMidnight;
}

const getRingsForMultipleWholeDays = (numberOfDays) => numberOfDays * 156;