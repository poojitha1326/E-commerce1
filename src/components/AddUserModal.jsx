import { useState } from "react";
import axios from "axios";
import { HiX } from "react-icons/hi";

export default function AddUserModal({ onClose }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
    district: "",
    state: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 API CALL
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://your-api-url.com/users", form);

      console.log("User Created:", res.data);

      alert("User added successfully ✅");
      onClose();

    } catch (error) {
      console.error(error);
      alert("Error creating user ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] rounded-xl p-6 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add User</h2>
          <HiX className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input name="firstName" placeholder="First Name" required onChange={handleChange} className="border p-2 rounded" />
          <input name="lastName" placeholder="Last Name" required onChange={handleChange} className="border p-2 rounded" />

          <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="border p-2 rounded col-span-2" />

          <input name="mobile" placeholder="Mobile" required onChange={handleChange} className="border p-2 rounded col-span-2" />

          {/* Gender */}
          <select name="gender" required onChange={handleChange} className="border p-2 rounded col-span-2">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input name="address" placeholder="Address" required onChange={handleChange} className="border p-2 rounded col-span-2" />

          <input name="district" placeholder="District" required onChange={handleChange} className="border p-2 rounded" />
          <input name="state" placeholder="State" required onChange={handleChange} className="border p-2 rounded" />

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
              Cancel
            </button>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}