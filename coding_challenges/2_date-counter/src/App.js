import { useState } from "react";
import { addDays, format, max } from "date-fns";
import "./index.css";

export default function App() {
  const [countDays, setCountDays] = useState(0); // Quantos dias passarão
  const [step, setStep] = useState(1); // Multiplicador dos dias que passarão

  return (
    <div className="App">
      <Step step={step} setStep={setStep} />
      <Counter countDays={countDays} setCountDays={setCountDays} step={step} />
      <DateText countDays={countDays} step={step} setCountDays={setCountDays} setStep={setStep} />
    </div>
  );
}

function Step({ step, setStep }) {
  return (
    <div className="step">
      <input
        className="slider"
        type="range"
        min="1"
        max="10"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      ></input>
      <span>Step: {step}</span>
    </div>
  );
}

function Counter({ countDays, setCountDays, step }) {
  return (
    <div>
      <button onClick={() => setCountDays(countDays - step)}>-</button>
      <input type="text" value={countDays} onChange={(e) => setCountDays(Number(e.target.value))} />
      <button onClick={() => setCountDays(countDays + step)}>+</button>
    </div>
  );
}

function DateText({ countDays, step, setCountDays, setStep }) {
  const currentDate = new Date();
  const targetDate = addDays(currentDate, countDays);
  const formattedDate = format(targetDate, "MMMM d, yyyy");

  function handleReset() {
    setCountDays(0);
    setStep(1);
  }

  return (
    <>
      <p>
        {countDays === 0 ? null : Math.abs(countDays)}{" "}
        {countDays < 0 ? "days ago was" : countDays === 0 ? "Today is" : "days from today is"} {formattedDate}
      </p>
      {countDays !== 0 || step !== 1 ? <button onClick={handleReset}>Reset</button> : null}
    </>
  );
}
