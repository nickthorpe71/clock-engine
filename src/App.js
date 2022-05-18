import { useState } from 'react';
import { countTollsInTimeSpan } from './clock-service';
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
