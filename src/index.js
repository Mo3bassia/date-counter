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

  function handlePlus() {
    setStep((step) => step + 1);
  }
  function handleMinus() {
    setStep((step) => step - 1);
  }

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

  return (
    <>
      <div className="step">
        <button onClick={handleMinus}>-</button>
        <span>Step: {step}</span>
        <button onClick={handlePlus}>+</button>
      </div>
      <div className="count">
        <button onClick={handlePrevious}>-</button>
        <span>Count: {count}</span>
        <button onClick={handleNext}>+</button>
      </div>
      <p>
        {current} {currentDate.toDateString()}
      </p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
