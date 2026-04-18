import { useState } from "react";

export default function Profile() {
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    firstName: "Sub",
    lastName: "Agent",
    email: "subagent@store.com",
    mobile: "9876543210",
    gender: "Female",
    address: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana"
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Handle profile change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle password change
  const handlePassword = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Save
  const handleSave = () => {
    console.log("Updated User:", user);
    console.log("Password Data:", passwords);

    alert("Profile Updated Successfully");

    setEdit(false);
  };

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Profile
      </h1>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow space-y-6">

        {/* ================= PROFILE SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            name="firstName"
            value={user.firstName}
            disabled={!edit}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-3 rounded"
          />

          <input
            name="lastName"
            value={user.lastName}
            disabled={!edit}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-3 rounded"
          />

          <input
            name="email"
            value={user.email}
            disabled
            className="border p-3 rounded bg-gray-100"
          />

          <input
            name="mobile"
            value={user.mobile}
            disabled={!edit}
            onChange={handleChange}
            placeholder="Mobile"
            className="border p-3 rounded"
          />

          <select
            name="gender"
            value={user.gender}
            disabled={!edit}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            name="address"
            value={user.address}
            disabled={!edit}
            onChange={handleChange}
            placeholder="Address"
            className="border p-3 rounded"
          />

          <input
            name="district"
            value={user.district}
            disabled={!edit}
            onChange={handleChange}
            placeholder="District"
            className="border p-3 rounded"
          />

          <input
            name="state"
            value={user.state}
            disabled={!edit}
            onChange={handleChange}
            placeholder="State"
            className="border p-3 rounded"
          />

        </div>

        {/* ================= PASSWORD SECTION ================= */}
        {edit && (
          <div className="border-t pt-6 space-y-4">

            <h2 className="font-semibold text-lg">
              Change Password
            </h2>

            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={passwords.oldPassword}
              onChange={handlePassword}
              className="w-full border p-3 rounded"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={handlePassword}
              className="w-full border p-3 rounded"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwords.confirmPassword}
              onChange={handlePassword}
              className="w-full border p-3 rounded"
            />

          </div>
        )}

        {/* ================= BUTTONS ================= */}
        <div className="flex gap-3">

          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEdit(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}