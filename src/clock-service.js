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
    if (numberOfDaysBetween == 0) {
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

    const startIsLaterThenEnd = start.getHours() > end.getHours();

    return startIsLaterThenEnd ? differenceInDays + 1 : differenceInDays;
}

const getNumberOfHoursBetween = (start, end) => {
    const timeDifferenceInSeconds = (end.getTime() - start.getTime()) / 1000;
    const hoursBetweenStartAndEndTimes = Math.round(timeDifferenceInSeconds / (60 * 60));
    return hoursBetweenStartAndEndTimes;
}

const getRingsForPartialDay = (start, end) => {
    const startHour = convert24HourTo12Hour(start.getHours());
    const numHoursBetween = getNumberOfHoursBetween(start, end);
    const numberOfRings = range(1, numHoursBetween - 1)
        .map(i => convert24HourTo12Hour(i + startHour))
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    return startHour === 0 ? numberOfRings + 12 : numberOfRings;
}

const getRingsForMultipleWholeDays = (numberOfDays) => numberOfDays * 156;