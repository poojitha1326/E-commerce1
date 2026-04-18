import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    addedBy: "",
    uploadedOn: "",
    approvedBy: "",
    approvedOn: "",
    images: [],
    previews: [],
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

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE ADDRESS
  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  // IMAGE COMPRESS
  const compressToTarget = async (file) => {
    return await imageCompression(file, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    });
  };

  // IMAGE SELECT
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
          const compressed = await compressToTarget(file);
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

    } catch {
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

  // SUBMIT
  const handleSubmit = async () => {
    if (
  !form.name ||
  !form.category ||
  !form.price ||
  !form.description ||
  !form.addedBy ||
  !form.uploadedOn ||
  !form.approvedBy ||
  !form.approvedOn ||
  !form.address.locality ||
  !form.address.village ||
  !form.address.city ||
  !form.address.state ||
  !form.address.pincode ||
  !form.address.latitude ||
  !form.address.longitude ||
  !form.address.project_name ||
  form.images.length === 0
) {
  alert("Please fill required fields");
  return;
}

    if (form.images.length === 0) {
      alert("Select at least 1 image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", Number(form.price));
      formData.append("addedBy", form.addedBy);
      formData.append("uploadedOn", form.uploadedOn);
      formData.append("approvedBy", form.approvedBy);
      formData.append("approvedOn", form.approvedOn);

      // ADDRESS
      formData.append("address", JSON.stringify(form.address));

      // IMAGES ARRAY
      form.images.forEach((img) => {
        formData.append("images", img);
      });

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/products/add_product",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.data.status) {
        alert("Product Uploaded Successfully");

        setForm({
          name: "",
          category: "",
          description: "",
          price: "",
          addedBy: "",
          uploadedOn: "",
          approvedBy: "",
          approvedOn: "",
          images: [],
          previews: [],
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
      }

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Product</h1>

      {/* BASIC DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input name="name" placeholder="Name" className="border p-3 rounded" value={form.name} onChange={handleChange} />

        <select name="category" className="border p-3 rounded" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option>Stocks</option>
          <option>Real Estate</option>
          <option>Home Loans</option>
          <option>Insurance</option>
        </select>

        <input name="price" placeholder="Price" className="border p-3 rounded" value={form.price} onChange={handleChange} />

        <textarea name="description" placeholder="Description" className="border p-3 rounded" value={form.description} onChange={handleChange} />

        <input name="addedBy" placeholder="Added By" className="border p-3 rounded" value={form.addedBy} onChange={handleChange} />

        <input name="approvedBy" placeholder="Approved By" className="border p-3 rounded" value={form.approvedBy} onChange={handleChange} />

        <input type="text" name="uploadedOn" placeholder="Uploaded On" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} className="border p-3 rounded" value={form.uploadedOn} onChange={handleChange} />

        <input type="text" name="approvedOn" placeholder="Approved On" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} className="border p-3 rounded" value={form.approvedOn} onChange={handleChange} />

      </div>

      {/* ADDRESS */}
      <h2 className="mt-6 font-semibold">Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <input name="locality" placeholder="Locality" onChange={handleAddressChange} className="border p-2" />
        <input name="village" placeholder="Village" onChange={handleAddressChange} className="border p-2" />
        <input name="city" placeholder="City" onChange={handleAddressChange} className="border p-2" />
        <input name="state" placeholder="State" onChange={handleAddressChange} className="border p-2" />
        <input name="pincode" placeholder="Pincode" onChange={handleAddressChange} className="border p-2" />
        <input name="latitude" placeholder="Latitude" onChange={handleAddressChange} className="border p-2" />
        <input name="longitude" placeholder="Longitude" onChange={handleAddressChange} className="border p-2" />
        <input name="project_name" placeholder="Project Name" onChange={handleAddressChange} className="border p-2" />
      </div>

      {/* FILE INPUT */}
      <div className="mt-6">
        <input type="file" multiple accept="image/*" onChange={handleImageChange} disabled={compressing} />
      </div>

      {compressing && (
        <p className="text-blue-500 text-sm mt-2">Compressing images...</p>
      )}

      {/* IMAGE PREVIEW */}
      <div className="flex gap-3 flex-wrap mt-4">
        {form.previews.map((img, index) => (
          <div key={index} className="relative">
            <img src={img} className="w-24 h-24 object-cover rounded" />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

     {/* FOOTER */}
<div className="flex justify-end gap-3 mt-6">

  <button
    onClick={() => navigate(-1)}
    className="px-4 py-2 border rounded"
  >
    Cancel
  </button>

  <button
    onClick={handleSubmit}
    disabled={loading || compressing}
    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
  >
    {loading ? "Uploading..." : "Save Product"}
  </button>
  </div>

</div>
);
}