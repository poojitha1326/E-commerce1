import { useState } from "react";

export default function ViewProducts() {
  const [filter, setFilter] = useState("");

  const products = [
    { name: "Stock Plan", category: "Stocks", price: 5000 },
    { name: "House Loan", category: "Home Loans", price: 20000 },
    { name: "EV Bike", category: "Electric Vehicles", price: 80000 },
    { name: "Health Insurance", category: "Insurance", price: 3000 },
  ];

  const filtered = products.filter(
    (p) => filter === "" || p.category === filter
  );

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-6">
        My Products
      </h1>

      <select
        className="mb-4 p-2 border rounded"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All</option>
        <option>Stocks</option>
        <option>Real Estate</option>
        <option>Home Loans</option>
        <option>Insurance</option>
        <option>Electric Vehicles</option>
        <option>Commodities</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {filtered.map((p, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold">{p.name}</h2>
            <p>{p.category}</p>
            <p>₹{p.price}</p>
          </div>
        ))}

      </div>
    </div>
  );
}