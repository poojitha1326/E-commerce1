import { useState } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios"; // ✅ ADDED

export default function EditProductModal({ product, onClose }) {
  const [form, setForm] = useState(product);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ✅ MAIN ADDITION (THIS IS WHERE YOUR JSON GOES)
  const handleSubmit = async () => {
    try {
      // 👉 THIS IS YOUR JSON CONVERTED INTO CODE
      const payload = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        description: form.description || ""
      };

      console.log("Payload:", payload); // debug

      const token = localStorage.getItem("token"); // optional

      // 👉 API CALL (EDIT PRODUCT)
      const res = await axios.put(
        `http://localhost:5000/api/products/${form.id}`, // make sure id exists
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Updated:", res.data);

      alert("Product updated ✅");
      onClose();

    } catch (err) {
      console.error("Error:", err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      
      <div className="bg-white w-[700px] rounded-xl p-6 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Product</h2>
          <HiX
            className="cursor-pointer text-xl"
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">

          {/* Product Name */}
          <div>
            <label className="text-sm">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option>T-Shirts</option>
              <option>Jeans</option>
              <option>Dresses</option>
              <option>Jackets</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="text-sm">Brand</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm">Price ($)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="text-sm">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

        </div>

        {/* Tags */}
        <div className="mt-4">
          <label className="text-sm">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* ✅ ADDED DESCRIPTION (REQUIRED FOR BACKEND) */}
        <div className="mt-4">
          <label className="text-sm">Description</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Upload */}
        <div className="mt-4 border-2 border-dashed p-6 text-center rounded">
          <p className="text-gray-500">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG up to 10MB
          </p>
        </div>

        {/* Checkbox */}
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            Publish immediately
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          {/* ✅ CONNECTED BUTTON */}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Product
          </button>
        </div>

      </div>
    </div>
  );
}