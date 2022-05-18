import { useState } from 'react';
import './App.css';


function App() {
  const [numberOfTolls, setNumberOfTolls] = useState("");

  const onSubmitTimes = (event) => {
    event.preventDefault();

    const startTime = event.target[0].value;
    const endTime = event.target[1].value;

    if (startTime > endTime) {
      setNumberOfTolls("");
      alert("The start time must come before the end time.");
      return;
    }

    const numTolls = countTollsInTimeSpan(startTime, endTime);
    setNumberOfTolls(numTolls);
  }

  const countTollsInTimeSpan = (startTime, endTime) => {
    return "6"
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
        <button className="submit-button">CALCULATE</button>
      </form>
    </div>
  );
}

export default App;
