export default function Wallet() {
  const earnings = [
    { product: "Stock Plan", amount: 2000 },
    { product: "Home Loan", amount: 5000 },
    { product: "Insurance", amount: 3000 },
    { product: "EV Bike", amount: 10000 },
  ];

  const total = earnings.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Wallet
      </h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <p>Total Earnings</p>
        <h2 className="text-2xl font-bold text-green-600">
          ₹{total}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-4">

        {earnings.map((e, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <p>{e.product}</p>
            <p>₹{e.amount}</p>
          </div>
        ))}

      </div>

    </div>
  );
}