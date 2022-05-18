import { useState } from 'react';
import './App.css';


function App() {
  const [numberOfTolls, setNumberOfTolls] = useState("");

  const onSubmitTimes = (event) => {
    event.preventDefault();

    // set dates to ISO 8601 to meet challenge requirements
    const startTime = new Date(event.target[0].value).toISOString();
    const endTime = new Date(event.target[1].value).toISOString();

    // validate that the start time comes before the end time
    if (startTime > endTime) {
      setNumberOfTolls("");
      alert("The start time must come before the end time.");
      return;
    }

    const numTolls = countTollsInTimeSpan(startTime, endTime);
    setNumberOfTolls(numTolls);
  }

  const countTollsInTimeSpan = (startTime, endTime) => {
    // convert dates back to 
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

  // Utilities
  const landsOnEvenHour = (dateTime) => dateTime.getMinutes() === 0;
  const convertTo12Hour = (hour) => hour > 12 ? hour - 12 : hour;
  const range = (length) => [...Array(length).keys()];

  return (
    <div className="App">
      <header>
        <h1 className="header">ClockEngine</h1>
        <h2 className="sub-header">DETERMINE TOLLS</h2>
      </header>
      <div className="result-container">
        <h3>{numberOfTolls}</h3>
      </div>
      <form className="time-select-form" onSubmit={onSubmitTimes}>
        <input type="datetime-local" required className="time-input" placeholder="START TIME (ISO 8601)" />
        <input type="datetime-local" required className="time-input" placeholder="END TIME (ISO 8601)" />
        <input type="submit" className="submit-button" value="CALCULATE" />
      </form>
    </div>
  );
}

export default App;
