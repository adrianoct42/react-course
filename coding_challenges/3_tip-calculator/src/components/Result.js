export default function Result({ bill, service, friendService }) {
  const serviceValue = parseFloat((bill * (service / 100)).toFixed(2));
  const friendServiceValue = parseFloat(
    (bill * (friendService / 100)).toFixed(2)
  );
  const tip = (serviceValue + friendServiceValue) / 2;

  return (
    <p className="flex" style={{ fontSize: "26px", fontWeight: "bold" }}>
      💳 You pay ${parseFloat(bill + tip).toFixed(2)} ($
      {parseFloat(bill).toFixed(2)} + ${parseFloat(tip).toFixed(2)} tip)
    </p>
  );
}
