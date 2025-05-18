import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="text-xl font-bold">
        <Link to="/">Blog App</Link>
      </div>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/blogs">Blogs</Link>
            <Link to="/my-blogs">My Blogs</Link>
            <Link to="/create">Create Blog</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
