import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="header">ClockEngine</h1>
        <h2 className="sub-header">DETERMINE TOLLS</h2>
      </header>
      <div className="result-container">
        <h3>6</h3>
      </div>
      <div className="control-panel">
        <input className="time-input" name="start-input" placeholder="START" />
        <input className="time-input" name="end-input" placeholder="END" />
        <button className="submit-button">SUBMIT</button>
      </div>
    </div>
  );
}

export default App;
