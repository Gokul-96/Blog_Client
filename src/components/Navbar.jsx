import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-4 border-b">
      <Link to="/" className="font-bold text-lg">Blog App</Link>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.name || "User"}</span>
            <Link to="/blogs">Blogs</Link>
            <Link to="/create">Create</Link>
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
