import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

let date = new Date();

function App() {
  return (
    <div className="container">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState("Today is");
  const [currentDate, setCurrentDate] = useState(new Date());

  function handleNext() {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + step)));
    setCount((c) => c + step);
    if (currentDate.getTime() - date.getTime() > 20) {
      setCurrent(`${count + step} days from today`);
    } else if (currentDate.toDateString() === date.toDateString()) {
      setCurrent(`Today is`);
    } else {
      setCurrent(`${Math.abs(count + step)} days ago was`);
    }
  }
  function handlePrevious() {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - step)));
    setCount((c) => c - step);
    if (currentDate.getTime() - date.getTime() > 20) {
      setCurrent(`${count - step} days from today`);
    } else if (currentDate.toDateString() === date.toDateString()) {
      setCurrent(`Today is`);
    } else {
      setCurrent(`${Math.abs(count - step)} days ago was`);
    }
  }

  function handleChange(e) {
    setCount(+e.target.value);
    setCurrentDate(
      new Date(new Date().setDate(new Date().getDate() + +e.target.value))
    );
    if (
      new Date(
        new Date().setDate(new Date().getDate() + +e.target.value)
      ).toDateString() === date.toDateString()
    ) {
      setCurrent(`Today is`);
    } else if (
      new Date(
        new Date().setDate(new Date().getDate() + +e.target.value)
      ).getTime() -
        date.getTime() >
      20
    ) {
      setCurrent(`${+e.target.value} days from today`);
    } else {
      setCurrent(`${Math.abs(+e.target.value)} days ago was`);
    }
  }

  function handleReset() {
    setCount(0);
    setStep(1);
    setCurrentDate(date);
    setCurrent("Today is");
  }

  return (
    <>
      <h3>Step</h3>
      <div className="step">
        <span>
          <input
            type="range"
            min={1}
            max={50}
            value={step}
            onChange={(e) => setStep(+e.target.value)}
          ></input>
        </span>
        <span style={{ marginInline: "8px", fontWeight: "bold" }}>{step}</span>
      </div>
      <div className="count">
        <button onClick={handlePrevious}>-</button>
        <input type="number" value={count} onChange={handleChange}></input>
        <button onClick={handleNext}>+</button>
      </div>
      <p>
        {current} {currentDate.toDateString()}
      </p>
      {(count !== 0 || step !== 1) && (
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
