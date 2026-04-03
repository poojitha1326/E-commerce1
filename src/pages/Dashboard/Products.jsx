import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import EditProductModal from "../../components/EditProductModal";

export default function Products() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: "Formal T-Shirt",
      category: "T-Shirts",
      brand: "Nike",
      price: "25",
      discount: "10",
      stock: 120,
      status: "Active"
    },
    {
      name: "Formal Pants",
      category: "Pants",
      brand: "Levis",
      price: "60",
      discount: "15",
      stock: 80,
      status: "InActive"
    },
    {
      name: "Summer Suits",
      category: "Dresses",
      brand: "Zara",
      price: "45",
      discount: "5",
      stock: 50,
      status: "Low Stock"
    },
    {
      name: "Wood Land",
      category: "Slippers",
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
    <div className="p-3 md:p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-3 md:justify-between md:items-center mb-4">
        <h1 className="text-lg md:text-2xl font-bold">Products</h1>

        <button className="w-full md:w-auto text-sm md:text-base bg-blue-600 text-white px-3 py-2 rounded-lg">
          + Add Product
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full mb-3 p-2 text-sm border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-xs md:text-base">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">
                <select
                  className="text-xs border rounded px-1 py-1"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Dresses">Dresses</option>
                </select>
              </th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p, i) => (
              <tr key={i} className="border-t">

                <td className="p-2">{p.name}</td>
                <td>{p.category}</td>
                <td>{p.brand}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>

                <td>
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-600">
                    {p.status}
                  </span>
                </td>

                <td className="flex gap-2">
                  <HiPencil onClick={() => setSelectedProduct(p)} />
                  <HiTrash />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}