import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  let tip = Number(
    parseFloat(bill * ((percentage1 + percentage2) / 2 / 100)).toFixed(2)
  );
  function handleReset() {
    setBill("");
    setPercentage1("");
    setPercentage2("");
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?{" "}
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?{" "}
      </SelectPercentage>

      {bill > 0 && (
        <>
          <Output tip={tip} bill={bill} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>{" "}
      <input
        type="number"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelectPercentage({ percentage, onSelect, children }) {
  return (
    <div>
      <label>{children}</label>
      <select
        type="number"
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value=""></option>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ tip, bill }) {
  return (
    <h2>
      You pay ${Number(parseFloat(bill + tip).toFixed(2))} (${bill} + ${tip}{" "}
      tip)
    </h2>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
