import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

export default function Upload() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    images: "",
    previews: [],
  });

  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // COMPRESS IMAGE (~50KB)
  const compressToTarget = async (file) => {
    const options = {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  // HANDLE IMAGE SELECT
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("Max 5 images allowed");
      return;
    }

    setCompressing(true);

    try {
      const results = await Promise.all(
        files.map(async (file) => {
          console.log("Original:", file.name, (file.size / 1024).toFixed(1), "KB");

          const compressed = await compressToTarget(file);

          console.log("Compressed:", (compressed.size / 1024).toFixed(1), "KB");

          return {
            file: compressed,
            preview: URL.createObjectURL(compressed),
          };
        })
      );

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...results.map((r) => r.file)],
        previews: [...prev.previews, ...results.map((r) => r.preview)],
      }));

    } catch (err) {
      console.error(err);
      alert("Image processing failed");
    } finally {
      setCompressing(false);
    }
  };

  // REMOVE IMAGE
  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(form.previews[index]);

    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      previews: prev.previews.filter((_, i) => i !== index),
    }));
  };

  // SUBMIT API CALL
  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.price) {
      alert("Please fill required fields");
      return;
    }

    if (form.images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", Number(form.price));
      formData.append("description", form.description);

      if (form.images && form.images.length > 0) {
  formData.append("image", form.images[0]);  // MUST be "image"
}

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/products/add_product",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      console.log("Response:", res.data);

      if (res.data.status) {
        alert("Product Uploaded Successfully");

        setForm({
          name: "",
          category: "",
          description: "",
          price: "",
          images: [],
          previews: [],
        });
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Upload Product
      </h1>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow space-y-4">

        {/* NAME */}
        <input
          name="name"
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={handleChange}
        />

        {/* CATEGORY */}
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
        </select>

        {/* PRICE */}
        <input
          name="price"
          placeholder="Price"
          className="w-full border p-3 rounded"
          value={form.price}
          onChange={handleChange}
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          value={form.description}
          onChange={handleChange}
        />

        {/* FILE INPUT */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          disabled={compressing}
        />

        {compressing && (
          <p className="text-blue-500 text-sm animate-pulse">
            Compressing images...
          </p>
        )}

        {/* IMAGE PREVIEW + SIZE */}
        <div className="flex gap-3 flex-wrap">
          {form.previews.map((img, index) => (
            <div key={index} className="relative flex flex-col items-center">

              {/* IMAGE */}
              <img
                src={img}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />

              {/* REMOVE BUTTON */}
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>

              {/* FILE SIZE */}
              <p className="text-xs text-gray-500 mt-1 text-center">
                {(form.images[index]?.size / 1024).toFixed(1)} KB
              </p>

            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading || compressing}
          className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>

      </div>
    </div>
  );
}