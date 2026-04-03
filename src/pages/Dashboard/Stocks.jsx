import { useState } from "react";
import { HiRefresh } from "react-icons/hi";

export default function Stock() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const stockData = [
    {
      name: "Classic White T-Shirt",
      category: "T-Shirts",
      current: 150,
      min: 50,
      max: 500,
      status: "in stock",
      date: "2024-02-15"
    },
    {
      name: "Denim Jeans",
      category: "Jeans",
      current: 85,
      min: 30,
      max: 300,
      status: "in stock",
      date: "2024-02-10"
    },
    {
      name: "Summer Dress",
      category: "Dresses",
      current: 18,
      min: 20,
      max: 200,
      status: "low stock",
      date: "2024-01-25"
    },
    {
      name: "Leather Jacket",
      category: "Jackets",
      current: 0,
      min: 10,
      max: 100,
      status: "out of stock",
      date: "2024-01-15"
    },
    {
      name: "Cotton Hoodie",
      category: "Hoodies",
      current: 12,
      min: 25,
      max: 250,
      status: "low stock",
      date: "2024-02-01"
    }
  ];

  // Summary Counts
  const totalProducts = stockData.length;
  const inStock = stockData.filter(i => i.status === "in stock").length;
  const lowStock = stockData.filter(i => i.status === "low stock").length;
  const outStock = stockData.filter(i => i.status === "out of stock").length;

  // Filter
  const filteredData = stockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "" || item.status === statusFilter)
  );

  return (
    <div className="p-4 md:p-6">

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold mb-1">Stock Management</h1>
      <p className="text-gray-500 text-sm md:text-base mb-6">
        Monitor and manage inventory levels
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 md:p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-lg md:text-xl font-bold">{totalProducts}</h2>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">In Stock</p>
          <h2 className="text-lg md:text-xl font-bold text-green-600">{inStock}</h2>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Low Stock</p>
          <h2 className="text-lg md:text-xl font-bold text-yellow-600">{lowStock}</h2>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Out of Stock</p>
          <h2 className="text-lg md:text-xl font-bold text-red-600">{outStock}</h2>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">

        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:flex-1 p-2 md:p-3 border rounded-xl shadow-sm text-sm md:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full md:w-52 p-2 md:p-3 border rounded-xl text-sm md:text-base"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="in stock">In Stock</option>
          <option value="low stock">Low Stock</option>
          <option value="out of stock">Out of Stock</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm md:text-base">

          <thead className="bg-gray-100 text-xs md:text-sm">
            <tr>
              <th className="p-3 md:p-4">Product</th>
              <th>Category</th>
              <th>Current</th>
              <th>Min</th>
              <th>Max</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">

                <td className="p-3 md:p-4 font-medium">{item.name}</td>
                <td>{item.category}</td>

                <td
                  className={
                    item.current === 0
                      ? "text-red-600 font-bold"
                      : item.current < item.min
                      ? "text-yellow-600 font-bold"
                      : ""
                  }
                >
                  {item.current}
                </td>

                <td>{item.min}</td>
                <td>{item.max}</td>

                <td>
                  <span
                    className={`text-xs md:text-sm px-3 py-1 rounded-full ${
                      item.status === "in stock"
                        ? "bg-green-100 text-green-600"
                        : item.status === "low stock"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>{item.date}</td>

                <td>
                  <button className="flex items-center gap-1 md:gap-2 bg-blue-600 text-white px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm hover:bg-blue-700">
                    <HiRefresh />
                    <span className="hidden sm:inline">Restock</span>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}