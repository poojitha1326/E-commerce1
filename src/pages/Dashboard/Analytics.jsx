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

// Dummy Data
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
    <div className="p-4 md:p-6">

      {/* Header */}
      <h1 className="text-xl md:text-3xl font-bold mb-2">
        Analytics Dashboard
      </h1>

      <p className="text-gray-500 text-sm md:text-base mb-6">
        Overview of your eCommerce performance
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">

        <div className="bg-white p-4 md:p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-lg md:text-xl font-bold">$12000</h2>
            <p className="text-green-500 text-sm">+7.2%</p>
          </div>
          <HiCurrencyDollar className="text-blue-500 text-2xl md:text-3xl" />
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-lg md:text-xl font-bold">700</h2>
            <p className="text-green-500 text-sm">+2.1%</p>
          </div>
          <HiShoppingBag className="text-purple-500 text-2xl md:text-3xl" />
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="text-lg md:text-xl font-bold">250</h2>
            <p className="text-sm">Active: 423</p>
          </div>
          <HiCube className="text-green-500 text-2xl md:text-3xl" />
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <h2 className="text-lg md:text-xl font-bold">1100</h2>
            <p className="text-green-500 text-sm">+7.2%</p>
          </div>
          <HiUsers className="text-orange-500 text-2xl md:text-3xl" />
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">

        <div className="bg-white p-4 md:p-5 rounded-xl shadow overflow-x-auto">
          <h2 className="font-semibold mb-4 text-sm md:text-base">
            Revenue Trend
          </h2>

          <LineChart width={500} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
          </LineChart>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow overflow-x-auto">
          <h2 className="font-semibold mb-4 text-sm md:text-base">
            Orders Trend
          </h2>

          <BarChart width={500} height={300} data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#8b5cf6" />
          </BarChart>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

        <div className="bg-white p-4 md:p-5 rounded-xl shadow overflow-x-auto">
          <h2 className="font-semibold mb-4 text-sm md:text-base">
            Sales by Category
          </h2>

          <PieChart width={300} height={250}>
            <Pie data={pieData} dataKey="value" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4 text-sm md:text-base">
            Top Selling Products
          </h2>

          <div className="space-y-3 md:space-y-4">

            {[
              { name: "Formal T-Shirt", sold: "5678 units sold", price: "$1000" },
              { name: "Formal Pants", sold: "520 units sold", price: "$4000" },
              { name: "Summer Suits", sold: "400 units sold", price: "$3200" },
              { name: "Lehanga", sold: "250 units sold", price: "$2500" },
              { name: "Wood Land", sold: "300 units sold", price: "$5000" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between border-b pb-2 last:border-none">

                <div>
                  <p className="text-sm md:text-base">{item.name}</p>
                  <span className="text-xs md:text-sm text-gray-500">
                    {item.sold}
                  </span>
                </div>

                <p className="text-sm md:text-base">{item.price}</p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}