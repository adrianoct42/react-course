import { Currency } from "./enum/currency";
import React from "react";
import { useState, useEffect } from "react";

// API CALL: `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(Currency.USD);
  const [toCurrency, setToCurrency] = useState(Currency.EUR);
  const [result, setResult] = useState(0);

  function handleAmountChange(e) {
    const value = parseFloat(e.target.value);
    if (value > 0) {
      setAmount(value.toFixed(2));
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function convertCurrency() {
      try {
        if (amount <= 0 && toCurrency === fromCurrency) return;

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setResult(data.rates[toCurrency]);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted!");
        } else {
          console.error(`Fetch error: ${err}`);
        }
      }
    }

    convertCurrency();

    return function () {
      controller.abort();
    };
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type="number"
        placeholder="Please type a amount..."
        value={amount}
        onChange={handleAmountChange}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value={Currency.USD}>USD</option>
        <option value={Currency.EUR}>EUR</option>
        <option value={Currency.CAD}>CAD</option>
        <option value={Currency.INR}>INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value={Currency.USD}>USD</option>
        <option value={Currency.EUR}>EUR</option>
        <option value={Currency.CAD}>CAD</option>
        <option value={Currency.INR}>INR</option>
      </select>
      <p>
        {fromCurrency === toCurrency
          ? "Please select different currencies for the conversion to work!"
          : `💵 Value from ${fromCurrency} to ${toCurrency}: ${result.toFixed(
              2
            )}`}
      </p>
    </div>
  );
}
