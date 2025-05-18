import { useEffect, useState } from "react";
import axios from "../api";
import BlogCard from "../components/BlogCard";
import Alert from "../components/Alert";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState({ category: "", author: "" });
  const [alert, setAlert] = useState({ message: "", type: "" });

  const fetchBlogs = async () => {
    try {
      const query = [];
      if (filter.category) query.push(`category=${filter.category}`);
      if (filter.author) query.push(`author=${filter.author}`);
      const res = await axios.get(`/blogs${query.length ? "?" + query.join("&") : ""}`);
      setBlogs(res.data);
    } catch (err) {
      setAlert({ message: "Failed to fetch blogs.", type: "error" });
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filter]);

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
      <Alert message={alert.message} type={alert.type} />

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Filter by category"
          className="border p-2 rounded w-full"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        />
        <input
          placeholder="Filter by author"
          className="border p-2 rounded w-full"
          onChange={(e) => setFilter({ ...filter, author: e.target.value })}
        />
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} showActions={false} />)
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
