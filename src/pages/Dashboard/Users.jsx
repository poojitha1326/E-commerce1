import { useState, useEffect } from "react";
import { HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import AddUserModal from "../../components/AddUserModal";
import axios from "axios";

export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  // FIRST BOX
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

  // DATA (API)
  const [apiUsers, setApiUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setApiUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // FILTER
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter === "" || u.role === roleFilter)
  );

  // STATS (only for first box)
  const total = users.length;
  const admins = users.filter((u) => u.role === "admin").length;
  const subadmins = users.filter((u) => u.role === "subadmin").length;
  const agents = users.filter((u) => u.role === "agent").length;
  const active = users.filter((u) => u.status === "active").length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage staff and access control</p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <HiUserAdd /> Add User
        </button>
      </div>

      {/* main BOX */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">

        <div className="bg-white p-4 rounded-xl shadow text-Left">
          <p>Total</p>
          <h2 className="font-bold">{total}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-Left">
          <p>Admins</p>
          <h2 className="text-red-500 font-bold">{admins}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-Left">
          <p>Sub</p>
          <h2 className="text-purple-500 font-bold">{subadmins}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-Left">
          <p>Agents</p>
          <h2 className="text-blue-500 font-bold">{agents}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-Left">
          <p>Active</p>
          <h2 className="text-green-500 font-bold">{active}</h2>
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search..."
          className="flex-1 p-2 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded-lg"
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="subadmin">Sub</option>
          <option value="agent">Agent</option>
          <option value="subagent">Sub Agent</option>
        </select>
      </div>

      {/* FIRST TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Joined</th>
              <th className="p-3 text-left">Last Login</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.email} className="border-t">
                <td className="p-3">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-gray-500 text-sm">{u.email}</p>
                </td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>{u.joined}</td>
                <td>{u.lastLogin}</td>
                <td className="flex gap-3 justify-center">
                  <HiPencil />
                  <HiTrash />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* API JSON Table*/}
      <div className="bg-white rounded-xl shadow p-4">

        <h2 className="text-lg font-semibold mb-3">
          API Users (JSON Data)
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">username</th>
              <th className="p-3 text-left">city</th>
            </tr>
          </thead>

          <tbody>
            {apiUsers.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.username}</td>
                <td>{u.address.city}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}