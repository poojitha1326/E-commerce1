export default function SubDashboard() {
  const stats = [
    { title: "Total Products", value: 120 },
    { title: "Approved", value: 80 },
    { title: "Rejected", value: 15 },
    { title: "Pending", value: 25 },
    { title: "Total Earnings", value: "₹45,000" },
  ];

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

        {stats.map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-lg md:text-xl font-bold">{item.value}</h2>
            <div
            onClick={() => {
              localStorage.setItem("role", "admin"); // important for routing
              navigate("/dashboard");
            }}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-gray-300 hover:bg-gray-800"
           >

          </div>
          </div>
        ))}

      </div>

    </div>
  );
}