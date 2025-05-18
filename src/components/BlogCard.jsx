import { Link } from "react-router-dom";

const BlogCard = ({ blog, isMyBlog, handleDelete }) => {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p className="text-sm text-gray-600">Category: {blog.category}</p>
      <p className="text-sm text-gray-500">Author: {blog.author}</p>
      {blog.image && (
        <img src={blog.image} alt="Blog" className="my-2 w-full h-48 object-cover" />
      )}
      <p className="mt-2 text-gray-700">{blog.content.slice(0, 100)}...</p>

      {isMyBlog && (
        <div className="mt-4 flex space-x-2">
          <Link
            to={`/edit/${blog._id}`}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(blog._id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
