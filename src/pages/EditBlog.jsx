import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api";
import { getToken } from "../../utils/auth";
import Alert from "../components/Alert";

const EditBlog = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs`);
        const blog = res.data.find((b) => b._id === id);
        if (blog) {
          setForm({
            title: blog.title,
            category: blog.category,
            content: blog.content,
            image: blog.image || "",
          });
        } else {
          setAlert({ message: "Blog not found", type: "error" });
        }
      } catch (err) {
        setAlert({
          message: err.response?.data?.message || "Error loading blog",
          type: "error",
        });
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/blogs/${id}`, form, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setAlert({ message: "Blog updated successfully!", type: "success" });
      setTimeout(() => navigate("/myblogs"), 1500);
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Failed to update blog",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
      <Alert message={alert.message} type={alert.type} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={5}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
