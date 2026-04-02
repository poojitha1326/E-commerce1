import { useState } from "react";
import { HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import AddUserModal from "../../components/AddUserModal";

export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ✅ USERS STATE (IMPORTANT)
  const [users, setUsers] = useState([
    {
      name: "Admin User",
      email: "admin@store.com",
      role: "admin",
      status: "active",
      joined: "2023-01-15",
      lastLogin: "2024-02-28",
    },
    {
      name: "Sub Admin",
      email: "subadmin@store.com",
      role: "subadmin",
      status: "active",
      joined: "2023-02-10",
      lastLogin: "2024-02-26",
    },
    {
      name: "Agent User",
      email: "agent@store.com",
      role: "agent",
      status: "active",
      joined: "2023-03-20",
      lastLogin: "2024-02-25",
    },
    {
      name: "Sub Agent",
      email: "subagent@store.com",
      role: "subagent",
      status: "inactive",
      joined: "2023-06-10",
      lastLogin: "2024-01-20",
    },
  ]);

  // 🔍 Filter
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter === "" || u.role === roleFilter)
  );

  // 📊 Stats
  const total = users.length;
  const admins = users.filter((u) => u.role === "admin").length;
  const subadmins = users.filter((u) => u.role === "subadmin").length;
  const agents = users.filter((u) => u.role === "agent").length;
  const active = users.filter((u) => u.status === "active").length;

  // ✅ ADD USER FUNCTION
  const handleAddUser = (newUser) => {
    const user = {
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      role: "agent", // default role
      status: "active",
      joined: new Date().toISOString().split("T")[0],
      lastLogin: "-",
    };

    setUsers([user, ...users]); // add new user to top
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500">
            Manage staff and access control
          </p>
        </div>

        {/* ✅ OPEN MODAL */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <HiUserAdd />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Users</p>
          <h2 className="text-xl font-bold">{total}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Admins</p>
          <h2 className="text-xl font-bold text-red-500">{admins}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Sub Admin</p>
          <h2 className="text-xl font-bold text-purple-500">{subadmins}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Agents</p>
          <h2 className="text-xl font-bold text-blue-500">{agents}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Active</p>
          <h2 className="text-xl font-bold text-green-500">{active}</h2>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="flex-1 p-2 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="subadmin">Sub Admin</option>
          <option value="agent">Agent</option>
          <option value="subagent">Sub Agent</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">

                <td className="p-3">
                  <p className="font-medium">{u.name}</p>
                  <p className="text-gray-500 text-sm">{u.email}</p>
                </td>

                <td>
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
                    {u.role}
                  </span>
                </td>

                <td>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                    {u.status}
                  </span>
                </td>

                <td>{u.joined}</td>
                <td>{u.lastLogin}</td>

                <td className="flex gap-3 mt-2">
                  <HiPencil className="text-blue-500 cursor-pointer" />
                  <HiTrash className="text-red-500 cursor-pointer" />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onAddUser={handleAddUser}   // 🔥 important
        />
      )}
    </div>
  );
}