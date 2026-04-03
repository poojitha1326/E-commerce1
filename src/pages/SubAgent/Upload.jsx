import { useState } from "react";

export default function Upload() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    contact: "",
    image: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Upload Product
      </h1>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow space-y-4">

        <input
          name="name"
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option>Stocks</option>
          <option>Real Estate</option>
          <option>Home Loans</option>
          <option>Insurance</option>
          <option>Electric Vehicles</option>
          <option>Commodities</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="contact"
          placeholder="Contact Details"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="file"
          className="w-full"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Submit Product
        </button>

      </div>
    </div>
  );
}