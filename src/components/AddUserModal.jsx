import { useState } from "react";
import axios from "axios";
import { HiX } from "react-icons/hi";

export default function AddUserModal({ onClose, onAddUser }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 API CALL
      const res = await axios.post("http://localhost:5000/api/users", form);

      console.log("API Response:", res.data);

      // ✅ Update UI instantly
      onAddUser(form);

      alert("User Added Successfully ✅");
      onClose();

    } catch (error) {
      console.error(error);
      alert("Error creating user ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

        <div className="bg-white w-[95%] md:w-[600px] lg:w-[700px] p-6 rounded-xl">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Add User</h2>
          <HiX onClick={onClose} className="cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input name="firstName" placeholder="First Name" onChange={handleChange} className="border p-2 rounded" required />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-2 rounded" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" required />
          <input name="mobile" placeholder="Mobile" onChange={handleChange} className="border p-2 rounded" required />

          <select name="gender" onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input name="address" placeholder="Address" onChange={handleChange} className="border p-2 rounded" required />
          <input name="district" placeholder="District" onChange={handleChange} className="border p-2 rounded" required />
          <input name="state" placeholder="State" onChange={handleChange} className="border p-2 rounded" required />

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