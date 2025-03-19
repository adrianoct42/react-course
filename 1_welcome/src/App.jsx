import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function fetchAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    console.log(data);
    setAdvice(data.slip.advice);
    setCount(count + 1);
  }

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <>
      <div>
        <h1>{advice}</h1>
        <button onClick={fetchAdvice}>Get Advice!</button>
        <Message count={count}></Message>
      </div>
    </>
  );
}

function Message(props) {
  return <p>You have read {props.count} pieces of advice.</p>;
}
