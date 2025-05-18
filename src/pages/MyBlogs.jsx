import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import { getToken, getUser } from "../utils/auth";
import Alert from "../components/Alert";
import BlogCard from "../components/BlogCard";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const user = getUser();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blogs", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const myBlogs = res.data.filter((blog) => blog.userId === user._id);
      setBlogs(myBlogs);
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Error fetching blogs",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setAlert({ message: "Blog deleted successfully", type: "success" });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Delete failed",
        type: "error",
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-8">
      <h2 className="text-xl font-semibold mb-4">My Blogs</h2>
      <Alert message={alert.message} type={alert.type} />
      <div className="grid gap-4">
        {blogs.length ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              showActions
              onEdit={() => handleEdit(blog._id)}
              onDelete={() => handleDelete(blog._id)}
            />
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
