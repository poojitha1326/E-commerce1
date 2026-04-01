import { HiTag, HiPencil, HiTrash, HiPlus } from "react-icons/hi";

export default function Categories() {

  const categories = [
    {
      name: "T-Shirts",
      count: 145,
      desc: "Casual and formal t-shirts"
    },
    {
      name: "Jeans",
      count: 89,
      desc: "Denim jeans for all occasions"
    },
    {
      name: "Dresses",
      count: 67,
      desc: "Elegant and casual dresses"
    },
    {
      name: "Jackets",
      count: 54,
      desc: "Outerwear and jackets"
    },
    {
      name: "Accessories",
      count: 101,
      desc: "Bags, belts, and more"
    }
  ];

  return (
    <div>

      {/* 🔥 Header */}
      <h1 className="text-2xl font-bold mb-1">
        Category Management
      </h1>
      <p className="text-gray-500 mb-6">
        Organize your product catalog
      </p>

      {/* 📦 Container */}
      <div className="bg-white p-6 rounded-xl shadow">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-blue-600 font-semibold text-lg">
            Categories ({categories.length})
          </h2>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <HiPlus />
            Add Category
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6">

          {categories.map((cat, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 hover:shadow-md transition"
            >

              {/* Top Row */}
              <div className="flex justify-between items-start">

                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <HiTag className="text-blue-600 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {cat.count} products
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <HiPencil className="text-blue-500 cursor-pointer hover:scale-110" />
                  <HiTrash className="text-red-500 cursor-pointer hover:scale-110" />
                </div>

              </div>

              {/* Description */}
              <p className="text-gray-500 mt-4 text-sm">
                {cat.desc}
              </p>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}