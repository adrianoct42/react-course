export default function Bill({ bill, onSetBill }) {
  function handleChange(e) {
    const value = e.target.value;
    if (value === "") {
      onSetBill(0);
    } else {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        onSetBill(parseFloat(numberValue.toFixed(2)));
      }
    }
  }
  return (
    <div className="flex">
      <p>💵 How much was the bill?</p>
      <input
        type="number"
        placeholder="Type the bill here"
        value={bill}
        onChange={handleChange}
        step="0.01"
        min={0}
      />
    </div>
  );
}
