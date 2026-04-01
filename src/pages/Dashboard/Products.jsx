import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import EditProductModal from "../../components/EditProductModal";

export default function Products() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: "Classic White T-Shirt",
      category: "T-Shirts",
      brand: "Nike",
      price: "25",
      discount: "10",
      stock: 120,
      status: "Active"
    },
    {
      name: "Blue Denim Jeans",
      category: "Jeans",
      brand: "Levis",
      price: "60",
      discount: "15",
      stock: 80,
      status: "Active"
    },
    {
      name: "Summer Dress",
      category: "Dresses",
      brand: "Zara",
      price: "45",
      discount: "5",
      stock: 50,
      status: "Low Stock"
    },
    {
      name: "Leather Jacket",
      category: "Jackets",
      brand: "Puma",
      price: "120",
      discount: "20",
      stock: 20,
      status: "Out of Stock"
    }
  ];

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "" || p.category === categoryFilter)
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Product
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full mb-4 p-2 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">

          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Product</th>

              {/* Category Filter */}
              <th>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Jackets">Jackets</option>
                </select>
              </th>

              <th>Brand</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredProducts.map((p, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">

                <td className="p-3 font-medium">{p.name}</td>
                <td>{p.category}</td>
                <td>{p.brand}</td>
                <td>${p.price}</td>
                <td className="text-green-600">{p.discount}%</td>
                <td>{p.stock}</td>

                {/* Status */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : p.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex gap-3 mt-2">
                  {/* ✅ EDIT BUTTON */}
                  <HiPencil
                    className="text-blue-500 cursor-pointer hover:scale-110 transition"
                    onClick={() => setSelectedProduct(p)}
                  />

                  <HiTrash className="text-red-500 cursor-pointer hover:scale-110 transition" />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ✅ MODAL */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}