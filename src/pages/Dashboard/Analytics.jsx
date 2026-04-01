import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
  PieChart, Pie, Cell
} from "recharts";

import {
  HiCurrencyDollar,
  HiShoppingBag,
  HiCube,
  HiUsers
} from "react-icons/hi";

// 📊 Dummy Data
const revenueData = [
  { month: "Jan", revenue: 21000 },
  { month: "Feb", revenue: 25000 },
  { month: "Mar", revenue: 34000 },
  { month: "Apr", revenue: 45000 },
  { month: "May", revenue: 40000 },
  { month: "Jun", revenue: 65000 },
];

const ordersData = [
  { month: "Jan", orders: 100 },
  { month: "Feb", orders: 150 },
  { month: "Mar", orders: 200 },
  { month: "Apr", orders: 250 },
  { month: "May", orders: 300 },
  { month: "Jun", orders: 350 },
];

const pieData = [
  { name: "Men's Wear", value: 35 },
  { name: "Women's Wear", value: 40 },
  { name: "Accessories", value: 15 },
  { name: "Footwear", value: 10 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

export default function Analytics() {
  return (
    <div>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Overview of your eCommerce performance
      </p>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-4 rounded-xl shadow flex justify-between">
          <div>
            <p>Total Revenue</p>
            <h2 className="text-xl font-bold">$12000</h2>
            <p className="text-green-500">+7.2%</p>
          </div>
          <HiCurrencyDollar className="text-blue-500 text-3xl" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between">
          <div>
            <p>Total Orders</p>
            <h2 className="text-xl font-bold">700</h2>
            <p className="text-green-500">+2.1%</p>
          </div>
          <HiShoppingBag className="text-purple-500 text-3xl" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between">
          <div>
            <p>Total Products</p>
            <h2 className="text-xl font-bold">250</h2>
            <p>Active: 423</p>
          </div>
          <HiCube className="text-green-500 text-3xl" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between">
          <div>
            <p>Total Customers</p>
            <h2 className="text-xl font-bold">1100</h2>
            <p className="text-green-500">+7.2%</p>
          </div>
          <HiUsers className="text-orange-500 text-3xl" />
        </div>

      </div>

      {/* 🔹 Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* Revenue Line */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Revenue Trend</h2>
          <LineChart width={550} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
          </LineChart>
        </div>

        {/* Orders Bar */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Orders Trend</h2>
          <BarChart width={550} height={300} data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#8b5cf6" />
          </BarChart>
        </div>

      </div>

      {/* 🔹 Bottom Row */}
      <div className="grid grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Sales by Category</h2>
          <PieChart width={300} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Top Products */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Top Selling Products</h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <div>
                <p>Classic White T-Shirt</p>
                <span className="text-sm text-gray-500">5678 units sold</span>
              </div>
              <p>$1000</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <div>
                <p>Denim Jeans</p>
                <span className="text-sm text-gray-500">520 units sold</span>
              </div>
              <p>$4000</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <div>
                <p>Summer Dress</p>
                <span className="text-sm text-gray-500">400 units sold</span>
              </div>
              <p>$3200</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <div>
                <p>Leather Jacket</p>
                <span className="text-sm text-gray-500">250 units sold</span>
              </div>
              <p>$2500</p>
            </div>

            <div className="flex justify-between">
              <div>
                <p>Sneakers</p>
                <span className="text-sm text-gray-500">300 units sold</span>
              </div>
              <p>$5000</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}