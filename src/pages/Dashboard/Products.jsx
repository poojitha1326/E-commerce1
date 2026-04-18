import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    images: "",
    address: {
      locality: "",
      village: "",
      city: "",
      state: "",
      pincode: "",
      latitude: "",
      longitude: "",
      project_name: ""
    }
  });

  const [errors, setErrors] = useState({});

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // VALIDATION FUNCTION
  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description) newErrors.description = "Description required";
    if (!formData.category) newErrors.category = "Category required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price required";

    if (!formData.images)
      newErrors.images = "At least one image URL required";

    // Address validation
    if (!formData.address.city) newErrors.city = "City required";
    if (!formData.address.state) newErrors.state = "State required";
    if (!formData.address.pincode)
      newErrors.pincode = "Pincode required";

    return newErrors;
  };

  // 🔹 SUBMIT
  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        images: formData.images.split(",") // convert to array
      };

      const res = await fetch(
        "http://localhost:5000/api/products/add_product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (data.status) {
        alert("Product Added");
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add Product</h1>

        {/* + Add PRODUCT BUTTON */}
        <button
          onClick={() => navigate("/subagent/upload")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Products
        </button>
      </div>

      {/* FORM CARD */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">

        {/* NAME */}
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <p className="text-red-500 text-xs mb-2">{errors.name}</p>

      {/* DESCRIPTION */}
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <p className="text-red-500 text-xs mb-2">{errors.description}</p>

        {/* CATEGORY */}
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <p className="text-red-500 text-xs mb-2">{errors.category}</p>

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <p className="text-red-500 text-xs mb-2">{errors.price}</p>

        {/* IMAGES */}
        <input
          name="images"
          placeholder="Image URLs (comma separated)"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <p className="text-red-500 text-xs mb-2">{errors.images}</p>

        {/* ADDRESS */}
        <h3 className="text-lg font-semibold mb-3">Address</h3>

        <div className="grid grid-cols-2 gap-3">
          <input name="locality" placeholder="Locality" onChange={handleChange} className="p-3 border rounded-lg" />
          <p className="text-red-500 text-xs mb-2">{errors.locality}</p>
          <input name="village" placeholder="Village" onChange={handleChange} className="p-3 border rounded-lg" />
          <p className="text-red-500 text-xs mb-2">{errors.village}</p>
        </div>

        <input name="city" placeholder="City" onChange={handleChange} className="w-full p-3 border rounded-lg mt-3" />
        <p className="text-red-500 text-xs mb-2">{errors.city}</p>

        <input name="state" placeholder="State" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" />
        <p className="text-red-500 text-xs mb-2">{errors.state}</p>

        <input name="pincode" placeholder="Pincode" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" />
        <p className="text-red-500 text-xs mb-2">{errors.pincode}</p>

        <div className="grid grid-cols-2 gap-3">
          <input name="latitude" placeholder="Latitude" onChange={handleChange} className="p-3 border rounded-lg" />
          <input name="longitude" placeholder="Longitude" onChange={handleChange} className="p-3 border rounded-lg" />
        </div>

        <input name="project_name" placeholder="Project Name" onChange={handleChange} className="w-full p-3 border rounded-lg mt-3" />

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 mt-5 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>

      </div>
    </div>
  );
}