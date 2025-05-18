import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import MyBlogs from "./pages/MyBlogs";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-blogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
