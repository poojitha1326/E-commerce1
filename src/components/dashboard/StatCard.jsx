// src/components/dashboard/StatCard.jsx

export default function StatCard({ title, value, growth, icon, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
        {growth && <p className="text-green-500 text-sm">{growth}</p>}
      </div>
      <div className={`text-3xl ${color}`}>{icon}</div>
    </div>
  );
}