import { useState } from "react";
import { HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import AddUserModal from "../../components/AddUserModal";

export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter === "" || u.role === roleFilter)
  );

  const total = users.length;
  const admins = users.filter((u) => u.role === "admin").length;
  const subadmins = users.filter((u) => u.role === "subadmin").length;
  const agents = users.filter((u) => u.role === "agent").length;
  const active = users.filter((u) => u.status === "active").length;

  const handleAddUser = (newUser) => {
    const user = {
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      role: "agent",
      status: "active",
      joined: new Date().toISOString().split("T")[0],
      lastLogin: "-",
    };

    setUsers([user, ...users]);
  };

  return (
    <div className="p-3 md:p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-3 md:justify-between md:items-center mb-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">User Management</h1>
          <p className="text-gray-500 text-xs md:text-base">
            Manage staff and access control
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
        >
          <HiUserAdd />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
        <div className="bg-white p-3 rounded-xl shadow text-center">
          <p className="text-xs text-gray-500">Total</p>
          <h2 className="font-bold">{total}</h2>
        </div>

        <div className="bg-white p-3 rounded-xl shadow text-center">
          <p className="text-xs text-gray-500">Admins</p>
          <h2 className="font-bold text-red-500">{admins}</h2>
        </div>

        <div className="bg-white p-3 rounded-xl shadow text-center">
          <p className="text-xs text-gray-500">Sub</p>
          <h2 className="font-bold text-purple-500">{subadmins}</h2>
        </div>

        <div className="bg-white p-3 rounded-xl shadow text-center">
          <p className="text-xs text-gray-500">Agents</p>
          <h2 className="font-bold text-blue-500">{agents}</h2>
        </div>

        <div className="bg-white p-3 rounded-xl shadow text-center">
          <p className="text-xs text-gray-500">Active</p>
          <h2 className="font-bold text-green-500">{active}</h2>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          placeholder="Search..."
          className="w-full p-2 text-sm border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full md:w-40 p-2 text-sm border rounded-lg"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="subadmin">Sub</option>
          <option value="agent">Agent</option>
          <option value="subagent">Sub Agent</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-xs md:text-base">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">User</th>
              <th>Role</th>
              <th>Status</th>

              {/* Hide on mobile */}
              <th className="hidden md:table-cell">Joined</th>
              <th className="hidden md:table-cell">Last Login</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={i} className="border-t">

                <td className="p-2">
                  <p className="font-medium">{u.name}</p>
                  <p className="text-gray-500 text-xs">{u.email}</p>
                </td>

                <td>{u.role}</td>

                <td>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
                    {u.status}
                  </span>
                </td>

                {/* Hidden columns */}
                <td className="hidden md:table-cell">{u.joined}</td>
                <td className="hidden md:table-cell">{u.lastLogin}</td>

                <td className="flex gap-2">
                  <HiPencil />
                  <HiTrash />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onAddUser={handleAddUser}
        />
      )}

    </div>
  );
}