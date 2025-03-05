import { useState } from "react";
import Bill from "./Bill";
import Service from "./Service";
import Result from "./Result";

export default function App() {
  const [bill, setBill] = useState(0);
  const [service, setService] = useState(0);
  const [friendService, setFriendService] = useState(0);

  function handleResetData() {
    const confirmReset = window.confirm(
      "Are you sure you want reset bill data?"
    );
    if (confirmReset) {
      setBill(0);
      setService(0);
      setFriendService(0);
    }
  }

  return (
    <>
      <Bill bill={bill} onSetBill={setBill} />
      <Service service={service} setService={setService}>
        🧾 How did you like the service?
      </Service>
      <Service service={friendService} setService={setFriendService}>
        🧾 How did your friend like the service?
      </Service>
      {bill > 0 && (
        <>
          <Result bill={bill} service={service} friendService={friendService} />
          <button className="button" onClick={handleResetData}>
            Reset
          </button>
        </>
      )}
    </>
  );
}
