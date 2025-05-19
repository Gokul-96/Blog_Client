import { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../utils/auth";
import Alert from "../components/Alert";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const user = getUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/blogs",
        { ...form, author: user.name },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setAlert({ message: "Blog created successfully!", type: "success" });
      setTimeout(() => navigate("/blogs"), 1500);
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Failed to create blog.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-semibold mb-4">Create a Blog</h2>
      <Alert message={alert.message} type={alert.type} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="p-2 border rounded"
          value={form.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          className="p-2 border rounded"
          value={form.content}
          onChange={handleChange}
          rows={5}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          className="p-2 border rounded"
          value={form.image}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
