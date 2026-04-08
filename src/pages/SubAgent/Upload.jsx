import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

export default function Upload() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: null,
    preview: ""
  });

     // Handle input //
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
      
         // Upload image 

  const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

         // Allow only images 

  if (!file.type.startsWith("image/")) {
    alert("Only images allowed ❌");
    return;
  }

  try {
    const options = {
      maxSizeMB: 0.05, // 50KB
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    console.log("Original:", file.size / 1024, "KB");
    console.log("Compressed:", compressedFile.size / 1024, "KB");

    const previewURL = URL.createObjectURL(compressedFile);

     // correct state update

    setForm((prev) => ({
       ...prev,
      image: compressedFile,
      preview: previewURL
    }));

  } catch (error) {
    console.error("Compression error:", error);
  }
};

       // API CALL

       const handleSubmit = async () => {
    if (!form.image) {
      alert("Please select image ❌");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("image", form.image);

      const res = await axios.post(
        "http://localhost:5000/api/products", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      alert("Product uploaded successfully");

      // Reset form
      setForm({
        name: "",
        category: "",
        description: "",
        price: "",
        image: null,
        preview: ""
      });

    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Upload Product
      </h1>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow space-y-4">

        <input
          name="name"
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full border p-3 rounded"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option>Stocks</option>
          <option>Real Estate</option>
          <option>Home Loans</option>
          <option>Insurance</option>
          <option>Electric Vehicles</option>
          <option>Commodities</option>
        </select>

        <input
          name="price"
          placeholder="Price"
          className="w-full border p-3 rounded"
          value={form.price}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          value={form.description}
          onChange={handleChange}
        />
        
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="w-full"
          onChange={handleImageChange}
        />
        
        {/* preview image */}

        {form.preview && (
      <img
         src={form.preview}
         alt="preview"
         className="w-40 h-40 object-cover rounded"
         />
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Submit Product
        </button>

      </div>
    </div>
  );
}